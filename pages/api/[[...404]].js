import { errorObject } from "@/backend/utils";

export default async function handler(req, res) {
  return res.status(404).json(errorObject(404))
}
