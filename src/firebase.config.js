import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCJNrgOs1MLYTw_5V7XlmSEUoXgY8C9yo0',
  authDomain: 'house-marketplace-app-33d96.firebaseapp.com',
  projectId: 'house-marketplace-app-33d96',
  storageBucket: 'house-marketplace-app-33d96.appspot.com',
  messagingSenderId: '807529026371',
  appId: '1:807529026371:web:19fb1620af35ee9a4315f6',
}

// Initialize Firebase
initializeApp(firebaseConfig)
export const db = getFirestore()
