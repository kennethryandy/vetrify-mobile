import { useNavigation } from '@react-navigation/native';
import { deleteDoc, doc } from 'firebase/firestore';
import { FlatList, StyleSheet, View } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';
import { Appbar, Text, useTheme } from 'react-native-paper';
import { fs } from '../../firebaseConfig';
import { useContext, useEffect, useMemo, useState } from 'react';
import DialogAlert from '../../components/DialogAlert';
import AuthContext from '../../context/AuthContext';
import AppointmentCard from '../../components/AppointmentCard';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


const Tab = createMaterialTopTabNavigator();

const Appointment = () => {
	const [aptData, setAptData] = useState({
		pending: [],
		approved: [],
		completed: [],
		cancelled: []
	});
	const [loading, setLoading] = useState(true);
	const { appointments, loadingAppointment } = useContext(AuthContext);

	const { colors } = useTheme();
	const navigation = useNavigation();

	const navigateToAddAppointments = () => {
		navigation.navigate("SetAppointments");
	}

	useEffect(() => {
		const tmpData = appointments.docs.reduce((acc, curr) => {
			acc[curr.data().status.toLowerCase()].push({
				id: curr.id,
				...curr.data()
			});
			return acc;
		}, {
			pending: [],
			approved: [],
			completed: [],
			cancelled: []
		});
		setAptData(prevState => ({
			...prevState,
			...tmpData
		}));
		setLoading(false);
	}, [appointments]);

	if (loading) {
		return <Spinner visible color={colors.primary} />
	}

	return (
		<>
			<View style={{ flex: 1 }}>
				<Spinner visible={loadingAppointment} color={colors.primary} />
				<Appbar.Header mode="center-aligned" style={{ backgroundColor: "transparent" }}>
					<Appbar.Content title="Appointments" titleStyle={{ fontWeight: 'bold' }} />
					<Appbar.Action icon="plus" onPress={navigateToAddAppointments} />
				</Appbar.Header>
				<Tab.Navigator
					screenOptions={{
						lazy: true,
						tabBarActiveTintColor: 'black',
						tabBarIndicatorStyle: { backgroundColor: colors.primary },
						tabBarLabelStyle: { fontSize: 12, textTransform: 'capitalize' },
					}}
					style={{ flex: 1, height: 650 }}
				>
					<Tab.Screen
						name="Pending"
						component={AptScreen}
						initialParams={{ appointments: aptData?.pending, type: "pending" }}
					/>
					<Tab.Screen
						name="Approved"
						component={AptScreen}
						initialParams={{ appointments: aptData?.approved, type: "approved" }}
					/>
					<Tab.Screen
						name="Completed"
						component={AptScreen}
						initialParams={{ appointments: aptData?.completed, type: "completed" }}
					/>
					<Tab.Screen
						name="Cancelled"
						component={AptScreen}
						initialParams={{ appointments: aptData?.cancelled, type: "cancelled" }}
					/>
				</Tab.Navigator>

			</View>

		</>
	)
}




function AptScreen ({ route }) {
	const { appointments, type } = route.params;
	const [loadingDelete, setLoading] = useState(false);
	const [deleteDataId, setDeleteDataId] = useState(null);
	const [openDelete, setOpenDelete] = useState(false);

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

	const appointmentsRenderItem = ({ item }) => <AppointmentCard appointment={item} handleDeleteIconCick={handleDeleteIconCick} />

	return (
		<>
			<View style={styles.container}>
				{appointments.length > 0 ? (
					<View style={{ paddingHorizontal: 16, marginBottom: 16, flex: 1 }}>
						<FlatList
							showsVerticalScrollIndicator={false}
							data={appointments}
							keyExtractor={appointmentsKeyExtractor}
							renderItem={appointmentsRenderItem}
						/>
					</View>
				) : (
					<View>
						<Text style={{ textAlign: 'center', marginVertical: 8 }} variant="labelLarge">You have no {type} appointments.</Text>
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


const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 8
	}
});

export default Appointment;