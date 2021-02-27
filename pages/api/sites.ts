import { NextApiRequest, NextApiResponse } from "next"

import { getAllSites } from "@/lib/db-admin";

export default async (_: NextApiRequest, res: NextApiResponse) => {
  const { sites, error } = await getAllSites()

  if (error) {
    return res.status(500).json({ error })
  }

  res.status(200).json({ sites })
}
