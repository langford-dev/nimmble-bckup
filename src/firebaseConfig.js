import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyCbRWR8_d8d9CUq3lyfkHryJr82coB0yNA",
  authDomain: "next-2c39b.firebaseapp.com",
  projectId: "next-2c39b",
  storageBucket: "next-2c39b.appspot.com",
  messagingSenderId: "308196675345",
  appId: "1:308196675345:web:175a88014fdfb475d106b0"

  // apiKey: "AIzaSyDEsQW2RxYccVsZXDtSJ-TiOeFIEVWvPMU",
  // authDomain: "nimmble-726eb.firebaseapp.com",
  // projectId: "nimmble-726eb",
  // storageBucket: "nimmble-726eb.appspot.com",
  // messagingSenderId: "715911840692",
  // appId: "1:715911840692:web:5e9424ab1dd986ea9b68e1",
  // measurementId: "G-XSMK7SXWRG"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
firebaseApp.serverTimestamp = firebase.firestore.FieldValue.serverTimestamp()

export default firebaseApp;