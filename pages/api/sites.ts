import { NextApiRequest, NextApiResponse } from "next"

import db from '@/lib/firebase-admin';

export default async (_: NextApiRequest, res: NextApiResponse) => {
  const snapshot = await db.collection('sites').get()
  const data = []

  if (snapshot.empty) {
    return res.status(200).json({ sites: data })
  }

  snapshot.forEach(doc => {
    data.push({ id: doc.id, ...doc.data() })
  })

  res.status(200).json({ sites: data })
}
