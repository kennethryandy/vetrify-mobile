import moment from 'moment/moment';
import { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Agenda } from 'react-native-calendars';
import Spinner from 'react-native-loading-spinner-overlay';
import { Avatar, Card, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import AdminContext from '../../context/AdminContext';

const AdminAppointments = () => {
	const { appointments, loadingAppointments } = useContext(AdminContext);
	const { colors } = useTheme();
	const [appointmentsByDates, setAppointmentsByDates] = useState({});

	useEffect(() => {
		const aptByDate = appointments.reduce((acc, curr) => {
			if (curr.day in acc) {
				acc[curr.day].push({ ...curr });
			} else {
				acc[curr.day] = [{ ...curr }];
			}
			return acc;
		}, {});
		setAppointmentsByDates(aptByDate);
	}, [appointments]);

	const renderEmptyDate = () => (
		<View style={{ marginTop: 16 }}>
			<Text variant="titleMedium" style={{ textAlign: "center" }}>No appointments in the selected day.</Text>
		</View>
	)
	const renderItem = (appointment) => {
		let statusColor = colors.success;
		switch (appointment.status) {
			case "Cancelled":
				statusColor = colors.error;
				break;
			case "Pending":
				statusColor = colors.info;
		}
		return (
			<Card style={{ marginRight: 10, marginTop: 32, marginBottom: 4 }}>
				<Card.Title
					title={appointment.owner.firstname + " " + appointment.owner.lastname}
					subtitle={<Text variant="bodySmall" style={{ color: statusColor }}>{appointment.status}</Text>}
					left={(props) => (
						appointment.owner.photoURL ? (
							<Avatar.Image {...props} source={{ uri: appointment.owner.photoURL }} />
						) : (
							<Avatar.Icon {...props} icon={appointment.owner?.gender === "Female" ? "face-man" : "face-woman"} />
						)
					)}
				/>
				<Card.Content>
					<Text variant="bodyMedium">{`Date: ${appointment.day} - ${appointment.time}`}</Text>
					<Text variant="bodyMedium">{"Purpose: " + appointment.purpose}</Text>
					<View style={{ flexDirection: "row" }}>
						<Text style={{ marginRight: 4 }}>Pets: </Text>
						<View>
							{appointment.pets.map(pet => (
								<Text key={pet.id}>{pet.nickname} - {pet.breed}</Text>
							))}
						</View>
					</View>
					{appointment.description && (
						<View>
							<Text variant="bodyMedium">Description: {appointment.description}</Text>
						</View>
					)}
				</Card.Content>
			</Card >
		);
	}

	if (loadingAppointments) {
		return <Spinner visible color={colors.primary} />
	}
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Agenda
				items={appointmentsByDates}
				selected={moment().format("YYYY-MM-DD")}
				renderItem={renderItem}
				showClosingKnob={true}
				renderEmptyData={renderEmptyDate}
			/>
		</SafeAreaView>
	);
}

export default AdminAppointments;