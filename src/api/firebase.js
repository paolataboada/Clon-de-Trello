import settings from './settings'
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// import { getFirestore, ref, set } from 'firebase/firestore'

// Initialize Firebase
const firebaseApp = initializeApp(settings)

// export const db = getFirestore(firebaseApp)

export default firebaseApp
