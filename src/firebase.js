// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "lotusislandtours-d302f.firebaseapp.com",
  projectId: "lotusislandtours-d302f",
  storageBucket: "lotusislandtours-d302f.firebasestorage.app",
  messagingSenderId: "954676049318",
  appId: "1:954676049318:web:4e4b3dd826b9b017770b67",
  measurementId: "G-D1E9WH7X0W"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);