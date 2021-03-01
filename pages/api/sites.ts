import { NextApiRequest, NextApiResponse } from "next"

import { getUserSites } from "@/lib/db-admin";
import { auth } from "@/lib/firebase-admin";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const token = req.headers.token
    if (!token || Array.isArray(token)) {
      return res.status(401).json({ error: 'unauthorized' })
    }

    const { uid } = await auth.verifyIdToken(token)
    const sites = await getUserSites(uid)

    res.status(200).json(sites)

  } catch (error) {
    return res.status(500).json({ error })
  }
}
