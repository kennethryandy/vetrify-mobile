import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Avatar, Caption, Card, Paragraph, Text, TouchableRipple, useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const PetCard = ({ pet }) => {
	const { colors } = useTheme();
	const navigation = useNavigation();

	let genderIcon = "gender-male-female";
	switch (pet?.gender) {
		case "Male":
			genderIcon = "gender-male";
			break;
		case "Female":
			genderIcon = "gender-female";
		default:
			break;
	}

	return (
		<Card elevation={2} style={{ marginVertical: 6, }}>
			<TouchableRipple onPress={() => navigation.navigate("PetProfile", { pet: { ...pet, id: pet.id } })} style={{ padding: 6 }}>
				<View>
					<Card.Title
						title={
							<View style={{ flexDirection: "row", alignItems: "center" }}>
								<Text variant="titleMedium" style={{ fontWeight: 'bold', textTransform: 'capitalize', marginRight: 4, marginBottom: -8 }}>{pet?.nickname}</Text>
								<MaterialCommunityIcons name={genderIcon} size={16} color={colors.primary} />
							</View>
						}
						subtitle={
							<Caption style={{ fontWeight: "bold", color: "#5C797C", textTransform: "capitalize" }}>{pet?.breed} - {pet?.animalType}</Caption>
						}
						left={(props) => (
							pet?.petProfilePic ? (
								<Avatar.Image {...props} source={{ uri: pet?.petProfilePic }} />
							) : (
								<Avatar.Icon {...props} icon="paw" />
							)
						)}
						right={() => (
							<View style={{ alignItems: "center", marginRight: 8 }}>
								<Caption style={{ fontWeight: "bold" }}>Status</Caption>
								<Text variant="labelSmall">{pet?.status}</Text>
							</View>
						)}
					/>
					{pet?.description && (
						<Card.Content>
							<View>
								<Text variant="labelMedium">Pet description:</Text>
								<Paragraph>{pet?.description}</Paragraph>
							</View>
						</Card.Content>
					)}
				</View>
			</TouchableRipple>
		</Card>
	)
}

export default PetCard