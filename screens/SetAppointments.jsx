import { StyleSheet, View } from 'react-native'
import { useContext, useState } from 'react'
import { Appbar, Avatar, Button, Card, Text, TextInput, TouchableRipple } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native';
import { CalendarList } from 'react-native-calendars';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { fs } from '../firebase-config';
import AuthContext from '../context/AuthContext';

const today = moment().format("YYYY-MM-DD");

const times = [
	"9:00 AM",
	"10:00 AM",
	"11:00 AM",
	"1:00 PM",
	"2:00 PM",
	"3:00 PM",
	"4:00 PM",
	"5:00 PM",
	"6:00 PM"
];

const SetAppointments = () => {
	const { user } = useContext(AuthContext);
	const [day, setDay] = useState(today);
	const [selectedTime, setSelectedTime] = useState(times[0]);
	const [description, setDescription] = useState("");
	const navigation = useNavigation();

	const handleDayPress = (day) => {
		setDay(day.dateString);
	}

	const handleDescriptionChange = (text) => {
		setDescription(text);
	}

	const handleSubmit = async () => {
		const data = {
			userId: user.uid,
			photoURL: user.photoURL,
			email: user.email,
			fullname: user.firstname + " " + user.lastname,
			day,
			time: selectedTime,
			description,
			createdAt: serverTimestamp(),
			status: 'Pending'
		};
		navigation.navigate("AddAppointmentLoading", data);
	}

	return (
		<ScrollView style={{ flex: 1 }}>
			<Appbar.Header mode="center-aligned" style={{ backgroundColor: "transparent" }}>
				<Appbar.BackAction onPress={navigation.goBack} />
				<Appbar.Content title="Set an Appointments" titleStyle={{ fontWeight: 'bold' }} />
			</Appbar.Header>
			<View style={styles.header}>
				<Text variant="titleLarge">Select Date</Text>
			</View>
			<CalendarList
				horizontal={true}
				pagingEnabled={true}
				minDate={today}
				onDayPress={handleDayPress}
				markedDates={{
					[day]: { selected: true, marked: true, dotColor: '#50cebb' }
				}}
			/>
			<View style={styles.header}>
				<Text variant="titleLarge">Select Time</Text>
			</View>
			<View style={styles.timeContainer}>
				{times.map((time, idx) => (
					<View style={styles.time} key={idx}>
						<TouchableRipple style={[styles.timeBtn, { backgroundColor: selectedTime === time ? "#50cebb" : "#fff" }]} onPress={() => setSelectedTime(time)}>
							<Text variant="titleSmall">{time}</Text>
						</TouchableRipple>
					</View>
				))}
			</View>
			<View style={styles.header}>
				<Text variant="titleLarge">Description</Text>
			</View>
			<View style={{ paddingHorizontal: 16 }}>
				<TextInput mode="outlined" multiline value={description} label="Description (Optional)" placeholder="Enter description of your appointment." onChangeText={handleDescriptionChange} numberOfLines={3} />
			</View>
			<View style={styles.submitBtn}>
				<Button onPress={handleSubmit} mode="contained">Set Appointment</Button>
			</View>
		</ScrollView>
	)
}

export default SetAppointments

const styles = StyleSheet.create({
	header: {
		alignItems: 'center',
		marginTop: 16,
		marginBottom: 4
	},
	timeContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'center',
	},
	timeBtn: {
		alignItems: 'center',
		paddingVertical: 8,
		margin: 4,
		borderWidth: 1,
		borderColor: '#fff',
		borderRadius: 4
	},
	time: {
		minWidth: 120
	},
	submitBtn: {
		paddingHorizontal: 16,
		marginVertical: 16
	}
});