import Head from 'next/head'
import {
  Box,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  Pagination,
  PaginationItem,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import ResultsList from "@/frontend/components/ResultsList";
import { useLazyGetFilmQuery, useLazyGetFilmsQuery } from "@/frontend/services/api";

const PAGE_SIZE = 10;
export default function Home() {
  const [fetchFilms, films] = useLazyGetFilmsQuery();
  const [fetchFilm, film] = useLazyGetFilmQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [results, setResults] = useState();
  const [searchResultTitle, setSearchResultTitle] = useState({ title: '', movie: '' });
  const [error, setError] = useState('');

  const slice = useMemo(() => results?.slice((page - 1) * PAGE_SIZE, (page - 1) * PAGE_SIZE + PAGE_SIZE),
    [results, page]);

  useEffect(() => {
    if (films.error || film.error) {
      setError('An error has occurred, please try again later')
    } else {
      setError('')
    }
  }, [film, films]);

  useEffect(() => {
    if (films?.status === 'pending' || films?.status === 'uninitialized') return;
    if (films?.data?.length === 1 && films?.data?.at(0)?.characters) {
      setSearchResultTitle({ title: 'Characters', movie: films?.data?.at(0)?.title });
      setResults(films?.data?.at(0)?.characters)
    } else {
      setSearchResultTitle({ title: 'Films', movie: '' });
      setResults(films?.data)
    }
  }, [films]);

  useEffect(() => {
    if (film?.status === 'pending' || film?.status === 'uninitialized') return;
    setSearchResultTitle({ title: 'Characters', movie: film?.data?.title });
    setSearchTerm(film?.data?.title)
    setResults(film?.data?.characters)
  }, [film])

  const handleOnKeyDown = async (e) => {
    if (e.key !== 'Enter') return null;
    await handleSearch();
  }

  const reset = () => {
    setPage(1)
    setResults(undefined);
    setSearchResultTitle({ title: '', movie: '' });
    setError('')
  }

  const handleSearch = async () => {
    reset()
    await fetchFilms(searchTerm);
  }

  const handleMovieOnClick = async ({ id, expand }) => {
    reset();
    await fetchFilm({ id, expand })
  }

  return (
    <>
      <Head>
        <title>Star War Z</title>
        <meta name="description" content="star war app"/>
      </Head>
      <Container sx={{ maxWidth: 1024 }}>
        <Typography variant={'h2'} my={5} align={'center'}>Star War Z</Typography>
        <Box sx={{ width: 350, margin: '0 auto' }}>
          <Stack justifyContent={'center'} direction={'row'}>
            <TextField label={'Search'}
                       sx={{ width: 350 }}
                       value={searchTerm}
                       onKeyDown={handleOnKeyDown}
                       onChange={(e) => setSearchTerm(e.target.value)}
                       id={'search-field'}
                       inputProps={{
                         autoComplete: 'off'
                       }}
                       InputProps={{
                         endAdornment: <InputAdornment position="end">
                           <IconButton onClick={handleSearch}>
                             <SearchIcon/>
                           </IconButton>
                         </InputAdornment>
                       }}
            />
          </Stack>
        </Box>
        <Box sx={{ width: 350, margin: '0 auto' }}>
          {results?.length > 0 ? <Box my={2}>
            <Typography variant={'h5'}>{searchResultTitle?.title}</Typography>
            {searchResultTitle?.title === 'Characters' && searchResultTitle?.movie ? <Typography
              variant={'caption'}>Movie: {searchResultTitle?.movie}</Typography> : null}
          </Box> : null}
          {films?.status === 'pending' || film?.status === 'pending' ?
            <Stack my={2} direction={'row'} alignItems={'center'}
                   justifyContent={'center'}><CircularProgress/>
            </Stack> : null}
          {error ? <Typography>{error}</Typography> : null}
          <ResultsList results={slice} onClick={handleMovieOnClick}/>
        </Box>
        <Stack>
          {results?.length > 0 && films?.status !== 'pending' ?
            <Pagination sx={{ alignSelf: 'center', mt: 3 }}
                        id={'pagination'}
                        renderItem={(item) => <PaginationItem
                          data-cy={`${item?.type}-button-${item?.page}`}  {...item} />}
                        page={page}
                        onChange={(e, value) => setPage(value)}
                        count={Math.ceil(results?.length / PAGE_SIZE)}/> : null}
        </Stack>
      </Container>
    </>
  )
}
