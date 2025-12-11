import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
  connectAuthEmulator,
} from "firebase/auth";
import {
  initializeFirestore,
  connectFirestoreEmulator,
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

//Initialize Firebase FIRST
const app = initializeApp(firebaseConfig);

// Init auth
export const auth = getAuth(app);

// Set session-only persistence
setPersistence(auth, browserSessionPersistence)
  .then(() => {
    console.info("✅ Auth persistence: SESSION");
  })
  .catch((err) => {
    console.error("❌ Failed to set auth persistence:", err);
  });

console.info(`Firebase project initialised: ${firebaseConfig.projectId}`);

// Init Firestore
export const firestore = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
  }),
});

const { VITE_CONNECT_EMULATOR } = import.meta.env;

// ✅ Optional emulator
// if (VITE_CONNECT_EMULATOR === "true") {
//   connectAuthEmulator(auth, "http://localhost:9099");
//   connectFirestoreEmulator(firestore, "localhost", 8080);
// }
