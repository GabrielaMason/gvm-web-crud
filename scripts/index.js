import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1tWJUQJXZy4_wrzq9qHc_XjNduZqDngY",
  authDomain: "fazt-srud-fb.firebaseapp.com",
  projectId: "fazt-srud-fb",
  storageBucket: "fazt-srud-fb.appspot.com",
  messagingSenderId: "633048505294",
  appId: "1:633048505294:web:d08f1ff74973b54fda299f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
