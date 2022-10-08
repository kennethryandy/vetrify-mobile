import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, getDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { fs } from "../firebase-config";


const AuthContext = createContext();

export function AuthProvider ({ children, authUser }) {
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(null);
	const userCollectionRef = doc(fs, 'users', authUser.uid);

	useEffect(() => {
		AsyncStorage.getItem("user", function (_err, result) {
			if (result) {
				setUser(JSON.parse(result));
				setLoading(false);
			} else {
				getDoc(userCollectionRef).then((doc) => {
					if (doc.exists()) {
						setUser({
							...doc.data(),
							createdAt: doc.data().createdAt.toDate(),
							uid: authUser.uid
						});
					}
					setLoading(false);
				}).catch((err) => {
					console.error(err);
					setLoading(false);
				});
			}
		});
	}, [authUser]);

	const updateUser = (updatedUser) => {
		setLoading(true);
		setUser({ ...user, ...updatedUser });
		setLoading(false);
	}

	return (
		<AuthContext.Provider value={{ user, loading, updateUser }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContext;