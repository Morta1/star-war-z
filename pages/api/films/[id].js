import { getFilmById } from "@/backend/services/swapi/service";
import { errorObject, responseObject } from "@/backend/utils";

export default async function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json(errorObject(405));
    }
    const { expand, id } = req.query;
    if (isNaN(id)) {
      return res.status(400).json(errorObject(400))
    }
    const searchResults = await getFilmById({ id, expand });
    return res.json(responseObject(searchResults));
  } catch (e) {
    console.error('An error has occurred in films/{id} route', e);
    return res.status(500).json(errorObject(500));
  }
}
