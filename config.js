import firebase from 'firebase'
require("@firebase/firestore")

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCVfAqF4DyzKy53ZuxJWXgVirZAL1laXVA",
    authDomain: "booksanta-3e209.firebaseapp.com",
    projectId: "booksanta-3e209",
    storageBucket: "booksanta-3e209.appspot.com",
    messagingSenderId: "99238239674",
    appId: "1:99238239674:web:cdffb9d15b02a5363e9183"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore()