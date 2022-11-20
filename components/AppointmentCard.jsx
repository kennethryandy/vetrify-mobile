import { FlatList, StyleSheet, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { Avatar, Caption, Card, IconButton, MD3Colors, Paragraph, Text, Title, useTheme } from 'react-native-paper';
import moment from 'moment';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const AppointmentCard = ({ appointments, handleDeleteIconCick, deletable = true }) => {
	const { user, pets } = useContext(AuthContext)
	const { colors } = useTheme();

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

		const appPets = item.data().petIds.map(pId => {
			const pet = pets.docs.find(p => p.id === pId);
			return pet.data().nickname;
		}).join(", ");
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
							<Avatar.Image {...props} source={{ uri: user?.photoURL }} />
						) : (
							<Avatar.Icon icon={user?.gender === "Female" ? "face-woman" : "face-man"} {...props} />
						)
					)}
				/>
				{deletable && (
					<View style={styles.deleteBtn}>
						<IconButton
							icon="delete"
							iconColor={MD3Colors.error50}
							onPress={() => handleDeleteIconCick(item.id)}
						/>
					</View>
				)}
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
						<View style={{ flexDirection: "row", alignItems: "center" }}>
							<Text variant="labelMedium">Purpose: </Text>
							<Caption style={{ fontWeight: "bold", color: "#5C797C" }}>{item.data().purpose}</Caption>
						</View>
						<View style={{ flexDirection: "row", alignItems: "center" }}>
							<Text variant="labelMedium">Pets: </Text>
							<Caption style={{ fontWeight: "bold", color: "#5C797C" }}>{appPets}</Caption>
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
		<View style={{ paddingHorizontal: 16, marginBottom: 16, flex: 1 }}>
			<FlatList
				showsVerticalScrollIndicator={false}
				data={appointments}
				keyExtractor={appointmentsKeyExtractor}
				renderItem={appointmentsRenderItem}
			/>
		</View>
	)
}

export default AppointmentCard

const styles = StyleSheet.create({
	deleteBtn: {
		position: "absolute",
		right: 0
	}
});