import { ScrollView, View } from 'react-native'
import { Button, Divider, Text, useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import AppointmentCard from './AppointmentCard';
import PetCard from './PetCard';

const UserDashboard = () => {
	const { pets, appointments } = useContext(AuthContext);
	const navigation = useNavigation();
	const { colors } = useTheme();

	const navigateToPets = () => {
		navigation.navigate('Pets');
	}

	const navigateToAppointments = () => {
		navigation.navigate('Appointment');
	}

	const navigateToSetAppointments = () => {
		navigation.navigate('SetAppointments');
	}

	return (
		<ScrollView style={{ flex: 1 }}>
			<View style={{ flex: 1, marginTop: 24, paddingHorizontal: 16, }}>
				<View style={{ marginBottom: 8 }}>
					<Text variant='headlineMedium'>
						Welcome to <Text style={{ color: colors.primary }}>Vetrify</Text>
					</Text>
					<Text variant='titleMedium'>
						An Online Information System for <Text style={{ color: '#008018' }}> Veterinary Clinic</Text>
					</Text>
				</View>

				<View style={{ marginVertical: 16 }}>
					<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
						<Text variant='titleMedium'>
							Recent Appointments
						</Text>
						{!appointments.empty && (
							<Button icon="chevron-right" contentStyle={{ flexDirection: "row-reverse" }} compact mode="text" labelStyle={{ paddingRight: 4 }} onPress={navigateToAppointments}>
								View All
							</Button>
						)}
					</View>
					<Divider bold style={{ marginTop: 4, marginBottom: 8 }} />
					{!appointments.empty ? (
						appointments.docs.slice(0, 3)?.map(apt => <AppointmentCard key={apt.id} appointment={apt.data()} deletable={false} />)
					) : (
						<View>
							<Text style={{ textAlign: 'center', marginVertical: 8 }} variant="labelLarge">You currently have no appointments.</Text>
							<Button contentStyle={{ flexDirection: "row-reverse" }} icon="send" compact mode="text" labelStyle={{ paddingRight: 4 }} onPress={navigateToSetAppointments}>
								Set an Appointment
							</Button>
						</View>
					)}
				</View>

				<View style={{ marginVertical: 16 }}>
					<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
						<Text variant='titleMedium'>
							Recent Pets
						</Text>
						{!pets.empty && (
							<Button icon="chevron-right" contentStyle={{ flexDirection: "row-reverse" }} compact mode="text" labelStyle={{ paddingRight: 4 }} onPress={navigateToPets}>
								View All
							</Button>
						)}
					</View>
					<Divider bold style={{ marginBottom: 8 }} />
					{!pets.empty ? (
						pets.docs.slice(0, 3).map(pet => <PetCard key={pet.id} pet={{ ...pet.data(), id: pet.id }} />)
					) : (
						<View>
							<Text style={{ textAlign: 'center', marginVertical: 8 }} variant="labelLarge">You currently have no pets.</Text>
							<Button contentStyle={{ flexDirection: "row-reverse" }} icon="send" compact mode="text" labelStyle={{ paddingRight: 4 }} onPress={() => navigation.navigate('AddPets')}>
								Add a new Pet
							</Button>
						</View>
					)}
				</View>
			</View>
		</ScrollView>
	)
}

export default UserDashboard