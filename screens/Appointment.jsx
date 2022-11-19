import { useNavigation } from '@react-navigation/native';
import { collection, deleteDoc, doc, orderBy, query, where } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { FlatList, StyleSheet, View } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';
import { MaterialIcons } from '@expo/vector-icons';
import { Appbar, Avatar, Caption, Card, IconButton, MD3Colors, Paragraph, Text, Title, useTheme } from 'react-native-paper';
import { auth, fs } from '../firebase-config';
import moment from 'moment';
import { useContext, useState } from 'react';
import DialogAlert from '../components/DialogAlert';
import AuthContext from '../context/AuthContext';

const Appointment = () => {
	const { user } = useContext(AuthContext);
	const [loadingDelete, setLoading] = useState(false);
	const [deleteDataId, setDeleteDataId] = useState(null);
	const [openDelete, setOpenDelete] = useState(false);
	const { colors } = useTheme();
	const navigation = useNavigation();

	const appointmentsColRef = collection(fs, 'appointments');
	const appointmentsQuery = query(appointmentsColRef, where("userId", "==", auth.currentUser.uid), where("status", "!=", "Deleted"), orderBy('status'), orderBy('createdAt', 'desc'));
	const [appointments, loading, err] = useCollection(appointmentsQuery);

	const navigateToAddAppointments = () => {
		navigation.navigate("SetAppointments");
	}

	const handleDeleteIconCick = (id) => {
		setDeleteDataId(id);
		setOpenDelete(true);
	}
	const handleCloseDelete = () => {
		setOpenDelete(false);
		setDeleteDataId(null);
	}
	const handleDeleteData = () => {
		setLoading(true)
		const docRef = doc(fs, "appointments", deleteDataId);
		deleteDoc(docRef).then(() => {
			handleCloseDelete();
		}).catch(err => console.log(err))
			.finally(() => {
				setLoading(false);
			});
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
			<Card elevation={2} style={{ marginVertical: 6, padding: 6, position: "relative" }}>
				<Card.Title
					title={<Title style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{item.data().fullname}</Title>}
					subtitle={
						<View style={{ alignItems: "center", flexDirection: 'row' }}>
							<MaterialIcons name="stop-circle" size={16} style={{ marginRight: 4 }} color={statusColor} />
							<Text variant="labelSmall">{item.data().status}</Text>
						</View>
					}
					left={(props) => (
						user?.photoURL ? (
							<Avatar.Image {...props} source={{ uril: user?.photoURL }} />
						) : (
							<Avatar.Icon icon={user?.gender === "Female" ? "face-woman" : "face-man"} {...props} />
						)
					)}
				/>
				<View style={styles.deleteBtn}>
					<IconButton
						icon="delete"
						iconColor={MD3Colors.error50}
						onPress={() => handleDeleteIconCick(item.id)}
					/>
				</View>
				<Card.Content>
					<View style={{ marginBottom: 8 }}>
						<View style={{ flexDirection: "row", alignItems: "center" }}>
							<Text variant="labelMedium">Date: </Text>
							<Caption style={{ fontWeight: "bold", color: "#5C797C" }}>{moment(item.data().day).format("ll")}</Caption>
						</View>
						<View style={{ flexDirection: "row", alignItems: "center" }}>
							<Text variant="labelMedium">Time: </Text>
							<Caption style={{ fontWeight: "bold", color: "#5C797C" }}>{item.data().time}</Caption>
						</View>
					</View>
					{item.data().description?.trim() !== "" && (
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
		<>
			<View style={{ flex: 1 }}>
				<Spinner visible={loading} color={colors.primary} />
				<Appbar.Header mode="center-aligned" style={{ backgroundColor: "transparent" }}>
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
						<Text style={{ textAlign: 'center', marginVertical: 8 }} variant="labelLarge">You currently have no appointments.</Text>
					</View>
				)}
			</View>
			{openDelete && (
				<DialogAlert
					visible={openDelete}
					hideDialog={handleCloseDelete}
					content="Are you sure you want to delete this appointment?"
					accept={handleDeleteData}
					loading={loadingDelete}
				/>
			)}
		</>
	)
}

export default Appointment;

const styles = StyleSheet.create({
	deleteBtn: {
		position: "absolute",
		right: 0
	}
});