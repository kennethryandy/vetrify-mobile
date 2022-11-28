import { StyleSheet, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { Avatar, Caption, Card, IconButton, MD3Colors, Paragraph, Text, Title, useTheme } from 'react-native-paper';
import moment from 'moment';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import AdminContext from '../context/AdminContext';

const AppointmentCard = ({ appointment, handleDeleteIconCick, deletable = true }) => {
	const { pets: userPets } = useContext(AuthContext);
	const adminCtx = useContext(AdminContext);
	const { colors } = useTheme();

	// Loops through the pets and display

	let statusColor = colors.success;
	switch (appointment?.status) {
		case "Cancelled":
			statusColor = colors.error;
			break;
		case "Pending":
			statusColor = colors.info;
	}

	const appPets = appointment.petIds.map(pId => {
		if (adminCtx) {
			const pet = adminCtx.pets.find(p => p.id === pId);
			if (pet) {
				return pet.nickname;
			}
			return ""
		} else {
			const pet = userPets.docs.find(p => p.id === pId);
			return pet.data().nickname;
		}
	}).join(", ");


	return (
		<Card elevation={2} style={{ marginVertical: 6, padding: 6, position: "relative" }}>
			<Card.Title
				title={<Title style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{appointment?.fullname}</Title>}
				subtitle={
					<View style={{ alignItems: "center", flexDirection: 'row' }}>
						<MaterialIcons name="stop-circle" size={16} style={{ marginRight: 4 }} color={statusColor} />
						<Text variant="labelSmall">{appointment?.status}</Text>
					</View>
				}
				left={(props) => (
					appointment?.photoURL ? (
						<Avatar.Image {...props} source={{ uri: appointment?.photoURL }} />
					) : (
						<Avatar.Icon icon={appointment?.gender === "Female" ? "face-woman" : "face-man"} {...props} />
					)
				)}
			/>
			{deletable && (
				<View style={styles.deleteBtn}>
					<IconButton
						icon="delete"
						iconColor={MD3Colors.error50}
						onPress={() => handleDeleteIconCick(appointment.id)}
					/>
				</View>
			)}
			<Card.Content>
				<View style={{ marginBottom: 8 }}>
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<Text variant="labelMedium">Date: </Text>
						<Caption style={{ fontWeight: "bold", color: "#5C797C" }}>{moment(appointment?.day).format("ll")}</Caption>
					</View>
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<Text variant="labelMedium">Time: </Text>
						<Caption style={{ fontWeight: "bold", color: "#5C797C" }}>{appointment?.time}</Caption>
					</View>
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<Text variant="labelMedium">Purpose: </Text>
						<Caption style={{ fontWeight: "bold", color: "#5C797C" }}>{appointment?.purpose}</Caption>
					</View>
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<Text variant="labelMedium">Pets: </Text>
						<Caption style={{ fontWeight: "bold", color: "#5C797C" }}>{appPets}</Caption>
					</View>
				</View>
				{appointment?.description?.trim() !== "" && (
					<View>
						<Text variant="labelMedium">Description:</Text>
						<Paragraph>{appointment.description}</Paragraph>
					</View>
				)}
			</Card.Content>
		</Card>
	)
}

export default AppointmentCard

const styles = StyleSheet.create({
	deleteBtn: {
		position: "absolute",
		right: 0
	}
});