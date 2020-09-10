import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDvIDRxE5VmrG0LmbgTrq4OXSPHd6pKSPQ",
  authDomain: "messenger-clone-1b860.firebaseapp.com",
  databaseURL: "https://messenger-clone-1b860.firebaseio.com",
  projectId: "messenger-clone-1b860",
  storageBucket: "messenger-clone-1b860.appspot.com",
  messagingSenderId: "92868085165",
  appId: "1:92868085165:web:6444d9daeaf9f3f3fb4d24",
  measurementId: "G-X74VY0QQWM",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
