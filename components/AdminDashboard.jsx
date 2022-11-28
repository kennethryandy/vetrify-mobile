import { ScrollView, View } from 'react-native'
import { Button, Divider, Text, useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native';
import AppointmentCard from './AppointmentCard';
import Spinner from 'react-native-loading-spinner-overlay';
import { useContext } from 'react';
import AdminContext from '../context/AdminContext';
import UserCard from './UserCard';

const AdminDashboard = ({ admin }) => {
	const { users, appointments, loadingUsers, loadingAppointment } = useContext(AdminContext);
	const navigation = useNavigation();
	const { colors } = useTheme();

	if (loadingUsers || loadingAppointment) {
		return <Spinner visible colors={colors.primary} />
	}

	return (
		<ScrollView style={{ marginTop: 24, paddingHorizontal: 16, flex: 1 }}>
			<View style={{ marginBottom: 8 }}>
				<Text variant='titleLarge'>
					Welcome back <Text style={{ color: colors.primary }}>{admin.lastname}</Text>
				</Text>
			</View>

			<View style={{ marginVertical: 16 }}>
				{users.length > 0 && (
					<>
						<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
							<Text variant='titleMedium'>
								Recently Joined Users
							</Text>
							<Button icon="chevron-right" contentStyle={{ flexDirection: "row-reverse" }} compact mode="text" labelStyle={{ paddingRight: 4 }} onPress={() => navigation.navigate("Users")}>
								View All
							</Button>
						</View>
						<Divider bold style={{ marginTop: 4, marginBottom: 8 }} />
						{users.slice(0, 3).map((user, idx) => <UserCard key={idx} user={user} />)}
					</>
				)}
			</View>

			{appointments.filter(apt => apt.status === "Pending").length > 0 && (
				<View style={{ marginVertical: 16 }}>
					<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
						<Text variant='titleMedium'>
							Pending Appointments
						</Text>
						<Button icon="chevron-right" contentStyle={{ flexDirection: "row-reverse" }} compact mode="text" labelStyle={{ paddingRight: 4 }} onPress={() => navigation.navigate("Appointment")}>
							View All
						</Button>
					</View>
					<Divider bold style={{ marginBottom: 8 }} />
					{appointments.filter(apt => apt.status === "Pending").map(apt => <AppointmentCard key={apt.id} appointment={apt} deletable={false} />)}
				</View>
			)}

		</ScrollView>
	)
}

export default AdminDashboard