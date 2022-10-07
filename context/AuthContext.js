import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, doc, documentId, getDoc, getDocs, query, where } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { fs } from "../firebase-config";


const AuthContext = createContext();

export function AuthProvider ({ children, authUser }) {
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(null);
	const [admin, setAdmin] = useState(null);
	const authUserDoc = doc(fs, 'users', authUser.uid)
	const userCollectionRef = collection(fs, 'users');

	useEffect(() => {

		// GET ADMIN USER INFO AND LOGGED IN USER INFO
		// getAdminInfo()
		// getUserInfo().then(() => {
		// 	setLoading(false);
		// })
		Promise.all([getAdminInfo(), getUserInfo()])
			.catch(err => {
				console.log(err);
			})
			.finally(() => {
				setLoading(false);
			});

	}, []);

	const getAdminInfo = async () => {
		return AsyncStorage.getItem("admin", function (err, result) {
			if (result) {
				// If admin is in the localstorage
				setAdmin(JSON.parse(result));
			} else {
				// fetch admin from firebase and add to localstorage
				const adminQuery = query(userCollectionRef, where("role", "==", "admin"));
				getDocs(adminQuery).then((snapshot) => {
					const adminData = {
						...snapshot.docs[0].data(),
						uid: snapshot.docs[0].id
					};
					setAdmin(adminData);
					AsyncStorage.setItem("admin", JSON.stringify(adminData));
				})
			}
		});
	}

	const getUserInfo = async () => {
		return AsyncStorage.getItem("user", function (err, result) {
			if (result) {
				setUser(JSON.parse(result));
			} else {
				getDoc(authUserDoc).then((doc) => {
					if (doc.exists()) {
						const userDetails = {
							...doc.data(),
							uid: authUser.uid,
							createdAt: doc.data().createdAt.toDate()
						};
						setUser(userDetails);
						AsyncStorage.setItem("user", JSON.stringify(userDetails));
					}
				}).catch((err) => {
					console.error(err);
				});
			}
		});
	}

	return (
		<AuthContext.Provider value={{ user, loading, setUser, admin, setAdmin }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContext;