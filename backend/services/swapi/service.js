import { fetchAdditionalData, fetchFilm, fetchFilms } from "@/backend/services/swapi/repository";
import { extractIdFromUrl } from "@/backend/utils";

export const getFilms = async (filmTitle) => {
  try {
    const { results: films } = await fetchFilms(filmTitle) || {};
    let structuredFilms = films?.map(({ title, url }) => {
      const id = extractIdFromUrl(url);
      return {
        id,
        title
      };
    });
    if (films?.length === 1 && films[0]?.characters) {
      const characters = await getAdditionalData('characters', films[0].characters) || {};
      structuredFilms = structuredFilms?.map((film) => ({ ...film, ...characters }))
    }
    return structuredFilms;
  } catch (err) {
    console.error(`getFilms -> An error has occurred while fetching films ${filmTitle ? `with title ${filmTitle}` : ''}`);
    throw err;
  }
}

const getAdditionalData = async (field, additionalDataUrls) => {
  try {
    const promises = additionalDataUrls.map((url) => fetchAdditionalData(url))
    const additionalData = await Promise.all(promises);
    return { [field]: additionalData }
  } catch (err) {
    return {};
  }
}
export const getFilmById = async ({ id, expand }) => {
  try {
    const film = await fetchFilm({ id });
    let additionalData;
    if (expand) {
      const additionalFields = expand.split(',')?.filter((field) => field);
      const promises = additionalFields.map((field) => film?.[field] ? getAdditionalData(field, film?.[field]) : null)?.filter((urls) => urls);
      const promisesResult = await Promise.all(promises);
      additionalData = promisesResult.reduce((res, data) => ({ ...res, ...data }), {});
    }
    return {
      title: film?.title,
      ...additionalData
    };
  } catch (err) {
    console.error(`getFilmById -> An error has occurred while fetching results for film id: ${id}`, err);
    throw err;
  }
}
