import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyApmVKcY3vWQX8X0HCJdTrbCCnd7P3WfOc",
    authDomain: "chat-app-v2-33a87.firebaseapp.com",
    databaseURL: "https://chat-app-v2-33a87.firebaseio.com",
    projectId: "chat-app-v2-33a87",
    storageBucket: "chat-app-v2-33a87.appspot.com",
    messagingSenderId: "679569824451",
    appId: "1:679569824451:web:41c7deac8b5fc1a928e076",
    measurementId: "G-23QZCCKMKW"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;