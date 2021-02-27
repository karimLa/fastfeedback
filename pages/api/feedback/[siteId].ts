import { NextApiRequest, NextApiResponse } from "next"

import { getAllFeedback } from "@/lib/db-admin";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	let siteId = req.query.siteId

	if (Array.isArray(siteId)) {
		// get last one
		siteId = siteId[siteId.length - 1]
	}

	const { feedback, error } = await getAllFeedback(siteId)

	if (error) {
		return res.status(500).json({ error })
	}

	res.status(200).json({ feedback })
}

