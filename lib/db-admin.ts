import { FirebaseError } from 'firebase-admin'
import { compareDesc, parseISO } from 'date-fns'

import IFeedback from '@/interfaces/feeback'
import ISite from '@/interfaces/site'
import { db } from '@/lib/firebase-admin'

type getAllFeedbackRespone = {
	feedback: IFeedback[] | null,
	error: FirebaseError | null
}

export async function getAllFeedback(siteId: string): Promise<getAllFeedbackRespone> {
	try {
		const snapshot = await db.collection('feedback').where('siteId', '==', siteId).get()
		const feedback: IFeedback[] = []

		snapshot.forEach(doc => {
			feedback.push({ id: doc.id, ...doc.data() } as IFeedback)
		})

		feedback.sort((a, b) => compareDesc(parseISO(a.createdAt), parseISO(b.createdAt)))

		return { feedback, error: null }
	} catch (error) {
		return { error, feedback: null }
	}
}

type getAllSitesRespone = {
	sites: ISite[] | null,
	error: FirebaseError | null
}

export async function getAllSites(): Promise<getAllSitesRespone> {
	try {
		const snapshot = await db.collection('sites').get()
		const sites: ISite[] = []

		snapshot.forEach(doc => {
			sites.push({ id: doc.id, ...doc.data() } as ISite)
		})

		return { sites, error: null }
	} catch (error) {
		return { error, sites: null }
	}
}

type getUserSitesRespone = {
	sites: ISite[]
}

export async function getUserSites(userId: string): Promise<getUserSitesRespone> {
	const snapshot = await db.collection('sites').where('authorId', '==', userId).get()
	const sites: ISite[] = []

	snapshot.forEach(doc => {
		sites.push({ id: doc.id, ...doc.data() } as ISite)
	})

	return { sites }
}