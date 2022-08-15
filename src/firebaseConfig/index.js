import firebase from 'firebase/compat/app';
import { getDatabase } from 'firebase/database';
import 'firebase/compat/auth';

// Your web app's Firebase configuration
function StartFirebase(){
  const config = {
    //your config json file
    apiKey: "AIzaSyAySnr_Ehtqi2_rzGvXuWWVAmXqNDX8VtI",
    authDomain: "utakresto.firebaseapp.com",
    databaseURL: "https://utakresto-default-rtdb.firebaseio.com",
    projectId: "utakresto",
    storageBucket: "utakresto.appspot.com",
    messagingSenderId: "997242893301",
    appId: "1:997242893301:web:26d3acdc8c13883827e6bc",
    measurementId: "G-EJ3BQK85EX"
  };
  
  
  const app = firebase.initializeApp(config);
  return getDatabase(app);
}
export default StartFirebase