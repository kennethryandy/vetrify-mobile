import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const app = initializeApp({
	apiKey: "AIzaSyCvwTlp5Mrv0_r7Zyx2hAYRdqkMbNR-rAQ",
	authDomain: "vetrify-1bca9.firebaseapp.com",
	projectId: "vetrify-1bca9",
	storageBucket: "vetrify-1bca9.appspot.com",
	messagingSenderId: "1007809710621",
	appId: "1:1007809710621:web:8f76aa6590a7a8cbae94f4"
});

const auth = getAuth(app);
const fs = getFirestore(app)

export {
	app,
	fs,
	auth
}