import firebase from 'firebase'
const config = {
  apiKey: "AIzaSyBgVRitd7uU4YlNpwYx1Yq1_rsw2ZBqwOI",
  authDomain: "lotto-numbers-big-data.firebaseapp.com",
  databaseURL: "https://lotto-numbers-big-data.firebaseio.com",
  projectId: "lotto-numbers-big-data",
  storageBucket: "lotto-numbers-big-data.appspot.com",
  messagingSenderId: "980621010694"
};
firebase.initializeApp(config);
export default firebase;
