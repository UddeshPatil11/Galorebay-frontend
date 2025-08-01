// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

// ✅ FIX: declare this FIRST
const auth = getAuth(app);

// ✅ Optional: Dev only bypass
if (location.hostname === 'localhost') {
  // this will prevent the recaptcha from blocking dev test
  auth.settings.appVerificationDisabledForTesting = true;
}

const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
