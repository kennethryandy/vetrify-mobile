import { collection, doc, getDoc, orderBy, query, updateDoc, where } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { fs } from "../firebaseConfig";
import { useNotifications } from "../hooks/useNotifications";
import { AdminProvider } from "./AdminContext";
import * as Notifications from 'expo-notifications';

const AuthContext = createContext();

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

export function AuthProvider ({ children, authUser }) {
	const { registerForPushNotificationsAsync, handleNotificationResponse } = useNotifications();
	const [loading, setLoading] = useState(true);

	const adminColRef = collection(fs, 'users');
	const adminQuery = query(adminColRef, where("role", "==", "admin"), where("pushToken", "!=", null));
	const [admins, loadingAdmins] = useCollection(adminQuery);

	const [user, setUser] = useState(null);
	const userCollectionRef = doc(fs, 'users', authUser.uid);

	const updateUser = (updatedUser) => {
		setUser(updatedUser);
	}

	// Get all pets base where the ownerId of the pet is equal to the userId of the of the user
	const petsRef = collection(fs, 'pets');
	const petsQuery = query(petsRef, where("ownerId", "==", authUser.uid), orderBy('createdAt', 'desc'));
	const [pets, loadingPets] = useCollection(petsQuery);

	const appointmentsColRef = collection(fs, 'appointments');
	const appointmentsQuery = query(appointmentsColRef, where("userId", "==", authUser.uid), where("status", "!=", "Deleted"), orderBy('status'), orderBy('createdAt', 'desc'));
	const [appointments, loadingAppointment] = useCollection(appointmentsQuery);

	useEffect(() => {
		getDoc(userCollectionRef).then(async (snapshot) => {
			if (snapshot.exists()) {
				const token = await registerForPushNotificationsAsync();
				const docRef = doc(fs, "users", snapshot.id);
				if (snapshot.data()?.pushToken && token) {
					if (snapshot.data().pushToken !== token) {
						await updateDoc(docRef, {
							pushToken: token
						});
					}
				} else {
					await updateDoc(docRef, {
						pushToken: token
					});
				}

				setUser({
					...snapshot.data(),
					uid: authUser.uid,
					createdAt: snapshot.data()?.createdAt ? snapshot.data().createdAt.toDate() : new Date(),
					birthDate: snapshot.data()?.birthDate ? snapshot.data().birthDate.toDate() : null,
				});
			}
			setLoading(false);
		}).catch((err) => {
			console.error(err);
			setLoading(false);
		});

		const responseListener = Notifications.addNotificationResponseReceivedListener(handleNotificationResponse);

		return () => {
			if (responseListener) Notifications.removeNotificationSubscription(responseListener);
		};
	}, [authUser]);

	return (
		<AuthContext.Provider value={{ user, loading, updateUser, pets, loadingPets, appointments, loadingAppointment, admins, loadingAdmins }}>
			{user?.role === "admin" ? (
				<AdminProvider authUser={user}>
					{children}
				</AdminProvider>
			) : (
				<>
					{children}
				</>
			)}
		</AuthContext.Provider>
	)
}

export default AuthContext;