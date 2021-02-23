import { IUser } from './auth'
import firebase from './firebase'

const firestore = firebase.firestore()

export function createUser(uid: string, data: IUser) {
	return firestore.collection('users').doc(uid).set({ uid, ...data }, { merge: true })
}

export function createSite(data: any) {
	return firestore.collection('sites').add(data);
}