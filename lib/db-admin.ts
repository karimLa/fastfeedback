import { FirebaseError } from 'firebase-admin'
import { compareDesc, parseISO } from 'date-fns'

import IFeedback from '@/interfaces/feeback'
import ISite from '@/interfaces/site'
import { db } from '@/lib/firebase-admin'

type getAllFeedbackRespone = {
	feedback: IFeedback[]
}

export async function getAllFeedback(siteId: string): Promise<getAllFeedbackRespone> {
	const snapshot = await db.collection('feedback').where('siteId', '==', siteId).get()
	const feedback: IFeedback[] = []

	snapshot.forEach(doc => {
		feedback.push({ id: doc.id, ...doc.data() } as IFeedback)
	})

	feedback.sort((a, b) => compareDesc(parseISO(a.createdAt), parseISO(b.createdAt)))

	return { feedback }
}

type getAllSitesRespone = {
	sites: ISite[],
}

export async function getAllSites(): Promise<getAllSitesRespone> {
	const snapshot = await db.collection('sites').get()
	const sites: ISite[] = []

	snapshot.forEach(doc => {
		sites.push({ id: doc.id, ...doc.data() } as ISite)
	})

	return { sites }
}

type getUserSitesRespone = getAllSitesRespone

export async function getUserSites(userId: string): Promise<getUserSitesRespone> {
	const snapshot = await db.collection('sites').where('authorId', '==', userId).get()
	const sites: ISite[] = []

	snapshot.forEach(doc => {
		sites.push({ id: doc.id, ...doc.data() } as ISite)
	})

	return { sites }
}