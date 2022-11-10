import { initializeApp } from "firebase/app";
const firebaseConfig = {
            apiKey: "AIzaSyCoCWVsRAXXdpQNzZlIPRmCQi8YtLkO-IQ",
            authDomain: "triviapeli.firebaseapp.com",
            databaseURL: "https://triviapeli-default-rtdb.europe-west1.firebasedatabase.app",
            projectId: "triviapeli",
            storageBucket: "triviapeli.appspot.com",
            messagingSenderId: "214513811775",
            appId: "1:214513811775:web:eb86ffbba4242dac9e938a",
            measurementId: "G-QYXCV6DVV8"
    };
const app = initializeApp(firebaseConfig);


export default app;
