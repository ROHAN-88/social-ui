// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyC_4tf_Pr893pTdV76GqYi6Jigx5J639p0",
  authDomain: "social-media-7bd5c.firebaseapp.com",
  projectId: "social-media-7bd5c",
  storageBucket: "social-media-7bd5c.appspot.com",
  messagingSenderId: "614443793608",
  appId: "1:614443793608:web:67de309e814ce222ac39fd",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
// Now in app.js or wherever you needed add this code.

// /*firebase daniel start*/
// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken, onMessage } from "firebase/messaging";

// const firebaseConfig = {
//   apiKey: "YOURDATA",
//   authDomain: "YOURDATA",
//   projectId: "YOURDATA",
//   storageBucket: "YOURDATA",
//   messagingSenderId: "YOURDATA",
//   appId: "YOURDATA",
//   measurementId: "YOURDATA",
// };
// const fapp = initializeApp(firebaseConfig);
// const messaging = getMessaging(fapp);

// getToken(messaging, {
//   vapidKey:
//     "YOURKEY",
// })
//   .then((currentToken) => {
//     if (currentToken) {
//       console.log("Firebase Token", currentToken);
//     } else {
//       // Show permission request UI
//       console.log(
//         "No registration token available. Request permission to generate one."
//       );
//       // ...
//     }
//   })
//   .catch((err) => {
//     console.log("An error occurred while retrieving token. ", err);
//     // ...
//   });
//   onMessage(messaging, (payload) => {
//   console.log("Message received. ", payload);
//   // ...
// });
