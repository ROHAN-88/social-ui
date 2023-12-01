import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC_4tf_Pr893pTdV76GqYi6Jigx5J639p0",
  authDomain: "social-media-7bd5c.firebaseapp.com",
  projectId: "social-media-7bd5c",
  storageBucket: "social-media-7bd5c.appspot.com",
  messagingSenderId: "614443793608",
  appId: "1:614443793608:web:67de309e814ce222ac39fd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
