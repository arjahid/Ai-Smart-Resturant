// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAPgcItLfrSi2_W6FTnaieSxQaxAsGjPU",
  authDomain: "ai-smart-resturant-9db29.firebaseapp.com",
  projectId: "ai-smart-resturant-9db29",
  storageBucket: "ai-smart-resturant-9db29.firebasestorage.app",
  messagingSenderId: "48077550291",
  appId: "1:48077550291:web:069d1a64e21b76d98b5a26",
  measurementId: "G-5G3DRFSNPB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;