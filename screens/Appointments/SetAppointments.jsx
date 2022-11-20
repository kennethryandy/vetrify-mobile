import { Appbar } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler';
import UserCalendar from '../../components/UserCalendar';
import { useNavigation } from '@react-navigation/native';

const SetAppointments = () => {
	const navigation = useNavigation();

	return (
		<ScrollView style={{ flex: 1 }}>
			<Appbar.Header mode="center-aligned" style={{ backgroundColor: "transparent" }}>
				<Appbar.BackAction onPress={navigation.goBack} />
				<Appbar.Content title="Set an Appointments" titleStyle={{ fontWeight: 'bold' }} />
			</Appbar.Header>
			<UserCalendar />
		</ScrollView>
	)
}

export default SetAppointments;