// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";


// export default defineNuxtPlugin((nuxtApp) => {
//     //doing something

//     const config = useRuntimeConfig();

//     const firebaseConfig ={
//         apiKey: config.FIREBASE_API_KEY,
//     };

//     // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// console.log(app);
// const auth = getAuth(app);
// });


import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


export default defineNuxtPlugin(({ $config }) => {
  const firebaseConfig = {
    apiKey: $config.FIREBASE_API_KEY,
    // Add other required Firebase configuration parameters here
  };

  try {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    console.log('Firebase app initialized:', app);
    const auth = getAuth(app);

    // Check the authentication state
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is signed in:', user);
      } else {
        console.log('User is signed out');
      }
    });
  } catch (error) {
    console.error('Firebase initialization error:', error);
  }
});
