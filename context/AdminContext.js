import { collection, doc, getDoc, orderBy, query, where } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { fs } from "../firebase-config";


const AdminContext = createContext();

export function AdminProvider ({ children, authUser }) {
	const [users, setUsers] = useState([]);
	const [pets, setPets] = useState([]);
	const [appointments, setAppointments] = useState([]);

	const usersColRef = collection(fs, "users");
	const usersQuery = query(usersColRef, where("role", "!=", "admin"), orderBy("role"), orderBy('createdAt', 'desc'));
	const [usersCol, loadingUsers] = useCollection(usersQuery);

	const appointmentsColRef = collection(fs, 'appointments');
	const appointmentsQuery = query(appointmentsColRef, orderBy('createdAt', 'desc'));
	const [appointmentsCol, loadingAppointment] = useCollection(appointmentsQuery);

	const petsColRef = collection(fs, "pets");
	const [petsCol, loadingPets] = useCollection(petsColRef);

	useEffect(() => {
		if (!loadingUsers && !loadingAppointment && !loadingPets) {
			const userCompile = usersCol.docs.reduce((acc, curr) => {
				const userApt = appointmentsCol.docs.filter(apt => apt.data().userId === curr.id).map(doc => ({ ...doc.data(), id: doc.id }));
				const userPet = petsCol.docs.filter(pet => pet.data().ownerId === curr.id).map(doc => ({ ...doc.data(), id: doc.id }));
				return [
					...acc,
					{
						...curr.data(),
						createdAt: curr.data().createdAt.toDate(),
						birthDate: curr.data().birthDate ? curr.data().birthDate.toDate() : null,
						uid: curr.id,
						appointments: userApt,
						pets: userPet
					}
				];
			}, []);
			setUsers(userCompile);

			const petsUser = petsCol.docs.map((pet) => {
				const owner = usersCol.docs.find(user => user.id === pet.data().ownerId).data();
				return {
					...pet.data(),
					id: pet.id,
					owner
				}
			});
			setPets(petsUser);

			const appointmentsUser = appointmentsCol.docs.map((apt) => {
				const owner = usersCol.docs.find(user => user.id === apt.data().userId).data();
				const aptPets = apt.data().petIds.map(petId => ({ ...petsCol.docs.find(p => p.id === petId).data(), id: petId }));
				return {
					...apt.data(),
					id: apt.id,
					owner,
					pets: aptPets
				}
			})
			setAppointments(appointmentsUser);
		}
	}, [usersCol, appointmentsCol, petsCol])

	return (
		<AdminContext.Provider value={{ users, usersCol, loadingUsers, appointments, appointmentsCol, loadingAppointment, pets, loadingPets }}>
			{children}
		</AdminContext.Provider>
	)
}

export default AdminContext;