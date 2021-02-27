import IFeedback from '@/interfaces/feeback';
import ISite from '@/interfaces/site';
import IUser from '@/interfaces/user';
import firebase from '@/lib/firebase'

const firestore = firebase.firestore()

export function createUser(uid: string, data: IUser) {
	return firestore.collection('users').doc(uid).set(data, { merge: true })
}

export function createSite(data: ISite) {
	return firestore.collection('sites').add(data);
}

export function createFeedback(data: IFeedback) {
	return firestore.collection('feedback').add(data);
}