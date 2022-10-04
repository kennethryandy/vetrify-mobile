import { doc, getDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { fs } from "../firebase-config";


const AuthContext = createContext();

export function AuthProvider ({ children, authUser }) {
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(null);
	const userCollectionRef = doc(fs, 'users', authUser.uid);

	useEffect(() => {
		getDoc(userCollectionRef).then((doc) => {
			if (doc.exists()) {
				setUser({
					...doc.data(),
					uid: authUser.uid,
					photoURL: authUser.photoURL
				});
			}
			setLoading(false);
		}).catch((err) => {
			console.error(err);
			setLoading(false);
		});
	}, []);

	return (
		<AuthContext.Provider value={{ user, loading }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContext;