import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Avatar, Caption, Card, Text, TouchableRipple } from 'react-native-paper'
import moment from 'moment'
import { useNavigation } from '@react-navigation/native'

const UserCard = ({ user }) => {
	const navigation = useNavigation();
	const pendingAppointments = user.appointments.filter(apt => apt !== "Pending");

	const handleNavigateProfile = () => {
		navigation.navigate("UserProfile", user);
	}

	return (
		<Card elevation={2} style={{ marginVertical: 6, }}>
			<TouchableRipple onPress={handleNavigateProfile} style={{ padding: 6 }}>
				<View>
					<Card.Title
						title={
							<View style={{ flexDirection: "row", alignItems: "center" }}>
								<Text variant="titleMedium" style={{ fontWeight: 'bold', textTransform: 'capitalize', marginRight: 4, marginBottom: -8 }}>{user.firstname} {user.lastname}</Text>
							</View>
						}
						subtitle={
							<Caption style={{ fontWeight: "bold", color: "#5C797C", textTransform: "capitalize" }}>Pets: {user.pets.length}</Caption>
						}
						left={(props) => (
							user.photoURL ? (
								<Avatar.Image {...props} source={{ uri: user.photoURL }} />
							) : (
								<Avatar.Icon {...props} icon={user.gender === "Female" ? "face-woman" : "face-man"} />
							)
						)}
					/>
					<Card.Content>
						<Text variant="labelMedium">Date Joined: {moment(user.createdAt).format("LL")}</Text>
						{user.appointments.length > 0 && (
							<View style={{ marginTop: 4 }}>
								<Text variant="labelMedium">Pending Appointments:</Text>
								{pendingAppointments.map(apt => (
									<Text variant="labelMedium" key={apt.id} style={{ marginLeft: 8 }}>{apt.day} - {apt.time}</Text>
								))}
							</View>
						)}
					</Card.Content>
				</View>
			</TouchableRipple>
		</Card>
	)
}

export default UserCard

const styles = StyleSheet.create({})