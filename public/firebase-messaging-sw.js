importScripts(
  "https://www.gstatic.com/firebasejs/9.13.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.13.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyArmnY882o59UMXTYs7vuWZqHSSmbadZuU",
  authDomain: "whisper-server.firebaseapp.com",
  projectId: "whisper-server",
  storageBucket: "whisper-server.appspot.com",
  messagingSenderId: "230389987022",
  appId: "1:230389987022:web:429eeedb5781c187e1829f",
  measurementId: "G-H0XKPFRQJW",
});

const messaging = firebase.messaging();