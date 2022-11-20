import React, { useContext } from 'react'
import Spinner from 'react-native-loading-spinner-overlay';
import { useTheme } from 'react-native-paper';
import AuthContext from '../../context/AuthContext';
import AdminAppointments from './AdminAppointments';
import Appointment from './Appointment'

const AppointmentScreen = () => {
	const { colors } = useTheme()
	const { user, loading } = useContext(AuthContext);

	if (loading) {
		return <Spinner visible={true} color={colors.primary} />
	}
	return (
		user?.role === "admin" ? (
			<AdminAppointments />
		) : (
			<Appointment />
		)
	)
}

export default AppointmentScreen