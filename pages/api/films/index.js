// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getFilms } from "@/backend/services/swapi/service";
import { errorObject, responseObject } from "@/backend/utils";

export default async function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json(errorObject(405));
    }
    const { title } = req.query;
    const searchResults = await getFilms(title);
    return res.json(responseObject(searchResults));
  } catch (e) {
    console.error('An error has occurred in user route', e);
    return res.status(500).json(errorObject(500));
  }
}
