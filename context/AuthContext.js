import { collection, doc, getDoc, orderBy, query, where } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { fs } from "../firebase-config";


const AuthContext = createContext();

export function AuthProvider ({ children, authUser }) {
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(null);
	const userCollectionRef = doc(fs, 'users', authUser.uid);

	const updateUser = (updatedUser) => {
		setUser(updatedUser);
	}

	// Get all pets base where the ownerId of the pet is equal to the userId of the of the user
	const petsRef = collection(fs, 'pets');
	const petsQuery = query(petsRef, where("ownerId", "==", authUser.uid), orderBy('createdAt'));
	const [pets, loadingPets] = useCollection(petsQuery);

	const appointmentsColRef = collection(fs, 'appointments');
	const appointmentsQuery = query(appointmentsColRef, where("userId", "==", authUser.uid), where("status", "!=", "Deleted"), orderBy('status'), orderBy('createdAt', 'desc'));
	const [appointments, loadingAppointment] = useCollection(appointmentsQuery);

	useEffect(() => {
		getDoc(userCollectionRef).then((doc) => {
			if (doc.exists()) {
				setUser({
					...doc.data(),
					uid: authUser.uid,
					createdAt: doc.data()?.createdAt ? doc.data().createdAt.toDate() : new Date(),
					birthDate: doc.data()?.birthDate ? doc.data().birthDate.toDate() : null,
				});
			}
			setLoading(false);
		}).catch((err) => {
			console.error(err);
			setLoading(false);
		});
	}, [authUser]);

	return (
		<AuthContext.Provider value={{ user, loading, updateUser, pets, loadingPets, appointments, loadingAppointment }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContext;