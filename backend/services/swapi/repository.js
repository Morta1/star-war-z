export const fetchFilms = async (filmTitle) => {
  try {
    const search = filmTitle ? `?search=${encodeURIComponent(filmTitle)}` : '';
    const result = await fetch(`https://swapi.dev/api/films/${search}`);
    return await result.json();
  } catch (err) {
    console.error(`fetchFilms -> An error has occurred while fetching results`);
    throw err;
  }
}

export const fetchAdditionalData = async (url) => {
  try {
    const result = await fetch(url);
    return await result.json();
  } catch (err) {
    console.error(`fetchAdditionalData -> An error has occurred while fetching results for ${url}`);
    throw err;
  }
}

export const fetchFilm = async ({ id }) => {
  try {
    const result = await fetch(`https://swapi.dev/api/films/${id}`);
    return await result.json();
  } catch (err) {
    console.error(`fetchFilm -> An error has occurred while fetching a film with id:${id}`);
    throw err;
  }
}