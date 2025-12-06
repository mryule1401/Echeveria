import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import {
  connectFirestoreEmulator,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";

const DEFAULT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyDWHlsU_Bfb31gIRpSiYbsr8zTtOmCewU8",
  authDomain: "encheveria-dev.firebaseapp.com",
  projectId: "encheveria-dev",
  storageBucket: "encheveria-dev.firebasestorage.app",
  messagingSenderId: "1064613217176",
  appId: "1:1064613217176:web:1888ebaff9dfad15b561ed",
  measurementId: "G-6R0TVNL8C1",
};

const firebaseConfig = {
  apiKey:
    import.meta.env.VITE_FIREBASE_API_KEY || DEFAULT_FIREBASE_CONFIG.apiKey,
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ||
    DEFAULT_FIREBASE_CONFIG.authDomain,
  projectId:
    import.meta.env.VITE_FIREBASE_PROJECT_ID ||
    DEFAULT_FIREBASE_CONFIG.projectId,
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ||
    DEFAULT_FIREBASE_CONFIG.storageBucket,
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ||
    DEFAULT_FIREBASE_CONFIG.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || DEFAULT_FIREBASE_CONFIG.appId,
  measurementId:
    import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ||
    DEFAULT_FIREBASE_CONFIG.measurementId,
};

console.info(`Firebase project initialised: ${firebaseConfig.projectId}`);
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore with persistent cache
const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
  }),
});

// Initialize Analytics (optional)
// const analytics = getAnalytics(app);

// Export auth and firestore instances
export const auth = getAuth(app);
export const firestore = db;

const {
  VITE_CONNECT_EMULATOR: connectEmulator
} = import.meta.env

if (connectEmulator === 'true') {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", 8080)
}