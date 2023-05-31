import { Card, CardContent, Stack, Typography } from "@mui/material";


const ResultsList = ({ results, onClick }) => {
  if (!results) return null;
  if (Array.isArray(results) && results.length === 0) {
    return <Stack direction={'row'} justifyContent={'center'}>
      <Typography>Your search did not match any documents.</Typography>
    </Stack>
  }
  return <Stack gap={3} sx={{ minHeight: 300 }}>
    {results?.map(({ title, name, id }, index) => (<Card key={index} sx={{ minWidth: 200 }}>
      <CardContent>
        <Stack>
          <Typography onClick={() => title && onClick({ id, expand: 'characters' })}
                      data-cy={title}
                      sx={{ cursor: title ? 'pointer' : 'default' }}>{title || name}</Typography>
        </Stack>
      </CardContent>
    </Card>))}
  </Stack>
};

export default ResultsList;
