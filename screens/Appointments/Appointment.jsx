import { useNavigation } from '@react-navigation/native';
import { deleteDoc, doc } from 'firebase/firestore';
import { FlatList, StyleSheet, View } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';
import { Appbar, Text, useTheme } from 'react-native-paper';
import { fs } from '../../firebase-config';
import { useContext, useState } from 'react';
import DialogAlert from '../../components/DialogAlert';
import AuthContext from '../../context/AuthContext';
import AppointmentCard from '../../components/AppointmentCard';

const Appointment = () => {
	const { appointments, loadingAppointment } = useContext(AuthContext);
	const [loadingDelete, setLoading] = useState(false);
	const [deleteDataId, setDeleteDataId] = useState(null);
	const [openDelete, setOpenDelete] = useState(false);
	const { colors } = useTheme();
	const navigation = useNavigation();

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

	const appointmentsRenderItem = ({ item }) => <AppointmentCard appointment={item.data()} handleDeleteIconCick={handleDeleteIconCick} />

	return (
		<>
			<View style={{ flex: 1 }}>
				<Spinner visible={loadingAppointment} color={colors.primary} />
				<Appbar.Header mode="center-aligned" style={{ backgroundColor: "transparent" }}>
					<Appbar.Content title="Appointments" titleStyle={{ fontWeight: 'bold' }} />
					<Appbar.Action icon="plus" onPress={navigateToAddAppointments} />
				</Appbar.Header>
				{appointments?.docs.length > 0 && !loadingAppointment ? (
					<View style={{ paddingHorizontal: 16, marginBottom: 16, flex: 1 }}>
						<FlatList
							showsVerticalScrollIndicator={false}
							data={appointments.docs}
							keyExtractor={appointmentsKeyExtractor}
							renderItem={appointmentsRenderItem}
						/>
					</View>
				) : (
					!loadingAppointment && <View>
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