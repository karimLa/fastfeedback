import IFeedback from '@/interfaces/feeback';
import ISite from '@/interfaces/site';
import IUser from '@/interfaces/user';
import firebase from '@/lib/firebase'

const firestore = firebase.firestore()

export function createUser(data: IUser) {
	const { token, ...userWithoutToken } = data
	return firestore.collection('users').doc(data.uid).set(userWithoutToken, { merge: true })
}

export function createSite(data: ISite) {
	return firestore.collection('sites').add(data);
}

export function createFeedback(data: IFeedback) {
	return firestore.collection('feedback').add(data);
}