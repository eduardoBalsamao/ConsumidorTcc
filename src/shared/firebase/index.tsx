// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAA3ZVT-fPpv5ByWoylYi2aBspjhzRvh6E',
  authDomain: 'connect-group-analytics.firebaseapp.com',
  projectId: 'connect-group-analytics',
  storageBucket: 'connect-group-analytics.appspot.com',
  messagingSenderId: '724130053144',
  appId: '1:724130053144:web:aef02324bbdc52675bd76d',
  measurementId: 'G-D1M0T90QFH'
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();

export default app;
//const analytics = getAnalytics(app);