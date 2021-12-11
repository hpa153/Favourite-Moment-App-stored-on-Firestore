// Import the functions you need from the SDKs you need
import * as firebase from 'firebase';
import '@firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtNIvJ6TAnZtFm1K-03ayNVIqNDTqDbZ8",
  authDomain: "final-project-ae9e5.firebaseapp.com",
  projectId: "final-project-ae9e5",
  storageBucket: "final-project-ae9e5.appspot.com",
  messagingSenderId: "412230524626",
  appId: "1:412230524626:web:c993213ca126558d45170b"
};

// Initialize Firebase
let app

if (!firebase.apps.length) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

export const db = app.database();
export const firestore = firebase.firestore(app);
export const auth = app.auth();