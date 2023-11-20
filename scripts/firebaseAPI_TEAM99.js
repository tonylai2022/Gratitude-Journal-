//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------

var firebaseConfig = {
    apiKey: "AIzaSyCPFzGVTIzN_9aF6SXy25cieHTcMaUp9Vk",
    authDomain: "gratitude-diary-eea81.firebaseapp.com",
    projectId: "gratitude-diary-eea81",
    storageBucket: "gratitude-diary-eea81.appspot.com",
    messagingSenderId: "162651631366",
    appId: "1:162651631366:web:68b29696102c19329f7887"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();