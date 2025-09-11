// firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfAtKHJwLqzm74u8XMSMzHmMEwk3Xrnbo",
  authDomain: "dealzup-homes.firebaseapp.com",
  projectId: "dealzup-homes",
  storageBucket: "dealzup-homes.appspot.com", // ✅ FIXED
  messagingSenderId: "999978583794",
  appId: "1:999978583794:web:4fe192b3196a7661d4b26b",
  measurementId: "G-ZK2KZVD3KS",
};

// Initialize Firebase safely (avoid duplicate apps in Next.js)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Export Firebase Auth
export const auth = getAuth(app);
