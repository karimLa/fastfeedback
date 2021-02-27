import IFeedback from '@/interfaces/feeback'
import ISite from '@/interfaces/site'
import firebase from '@/lib/firebase-admin'

export async function getAllFeedback(siteId: string): Promise<IFeedback[]> {
	const snapshot = await firebase.collection('feedback').where('siteId', '==', siteId).get()
	const data: IFeedback[] = []

	snapshot.forEach(doc => {
		data.push({ id: doc.id, ...doc.data() } as IFeedback)
	})

	return data
}

export async function getAllSites(): Promise<ISite[]> {
	const snapshot = await firebase.collection('sites').get()
	const data: ISite[] = []

	snapshot.forEach(doc => {
		data.push({ id: doc.id, ...doc.data() } as ISite)
	})

	return data
}