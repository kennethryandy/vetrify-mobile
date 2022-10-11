import { useNavigation } from '@react-navigation/native';
import { collection, orderBy, query, where } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { FlatList, View } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';
import { MaterialIcons } from '@expo/vector-icons';
import { Appbar, Avatar, Caption, Card, Paragraph, Text, Title, useTheme } from 'react-native-paper';
import { auth, fs } from '../firebase-config';

const Appointment = () => {
	const { colors } = useTheme();
	const navigation = useNavigation();

	const appointmentsColRef = collection(fs, 'appointments');
	const appointmentsQuery = query(appointmentsColRef, where("userId", "==", auth.currentUser.uid), where("status", "!=", "Deleted"), orderBy('status'), orderBy('createdAt'));
	const [appointments, loading, err] = useCollection(appointmentsQuery);

	const navigateToAddAppointments = () => {
		navigation.navigate("SetAppointments");
	}

	const appointmentsKeyExtractor = (item) => item.id;

	// Loops through the pets and display
	const appointmentsRenderItem = ({ item }) => {
		let statusColor = colors.success;
		switch (item.data().status) {
			case "Cancelled":
				statusColor = colors.error;
				break;
			case "Pending":
				statusColor = colors.info;
		}

		return (
			<Card elevation={2} style={{ marginVertical: 6, padding: 6 }}>
				<Card.Title
					title={<Title style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{item.data().fullname}</Title>}
					subtitle={
						<View style={{ alignItems: "center", flexDirection: 'row' }}>
							<MaterialIcons name="stop-circle" size={16} style={{ marginRight: 4 }} color={statusColor} />
							<Text variant="labelSmall">{item.data().status}</Text>
						</View>
					}
					left={(props) => (
						item.photoURL ? (
							<Avatar.Image {...props} source={{ uril: item.photoURL }} />
						) : (
							<Avatar.Icon icon="account" {...props} />
						)
					)}
				/>
				<Card.Content>
					<View style={{ marginBottom: 8 }}>
						<View style={{ flexDirection: "row", alignItems: "center" }}>
							<Text variant="labelMedium">Date: </Text>
							<Caption style={{ fontWeight: "bold", color: "#5C797C" }}>{item.data().day}</Caption>
						</View>
						<View style={{ flexDirection: "row", alignItems: "center" }}>
							<Text variant="labelMedium">Time: </Text>
							<Caption style={{ fontWeight: "bold", color: "#5C797C" }}>{item.data().time}</Caption>
						</View>
					</View>
					{item.data().description && (
						<View>
							<Text variant="labelMedium">Description:</Text>
							<Paragraph>{item.data().description}</Paragraph>
						</View>
					)}
				</Card.Content>
			</Card>
		)
	}

	return (
		<View style={{ flex: 1 }}>
			<Spinner visible={loading} color={colors.primary} />
			<Appbar.Header mode="center-aligned" style={{ backgroundColor: "transparent" }}>
				<Appbar.BackAction onPress={navigation.goBack} />
				<Appbar.Content title="Appointments" titleStyle={{ fontWeight: 'bold' }} />
				<Appbar.Action icon="plus" onPress={navigateToAddAppointments} />
			</Appbar.Header>
			{appointments?.docs.length > 0 && !loading ? (
				<View style={{ paddingHorizontal: 16, marginBottom: 16, flex: 1 }}>
					<FlatList
						showsVerticalScrollIndicator={false}
						data={appointments.docs}
						keyExtractor={appointmentsKeyExtractor}
						renderItem={appointmentsRenderItem}
					/>
				</View>
			) : (
				!loading && <View>
					<Text style={{ textAlign: 'center', marginVertical: 8 }} variant="labelLarge">You currently have no pets.</Text>
				</View>
			)}
		</View>
	)
}

export default Appointment;