import { FlatList, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Appbar, Avatar, Caption, Card, Paragraph, Text, Title, TouchableRipple, useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import Spinner from 'react-native-loading-spinner-overlay'
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Pets = () => {
	const { pets, loadingPets } = useContext(AuthContext);
	const { colors } = useTheme();
	const navigation = useNavigation();

	// If add icon is clicked, redirect to addPets screen
	const navigateToAddPets = () => {
		navigation.navigate('AddPets');
	}

	const petsKeyExtractor = (item) => item.id;

	// Loops through the pets and display
	const petsRenderItem = ({ item }) => {
		let genderIcon = "gender-male-female";
		switch (item.data()?.gender) {
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
				<TouchableRipple onPress={() => navigation.navigate("PetProfile", { pet: { ...item.data(), id: item.id } })} style={{ padding: 6 }}>
					<View>
						<Card.Title
							title={
								<View style={{ flexDirection: "row", alignItems: "center" }}>
									<Text variant="titleMedium" style={{ fontWeight: 'bold', textTransform: 'capitalize', marginRight: 4, marginBottom: -8 }}>{item.data().nickname}</Text>
									<MaterialCommunityIcons name={genderIcon} size={16} color={colors.primary} />
								</View>
							}
							subtitle={
								<Caption style={{ fontWeight: "bold", color: "#5C797C", textTransform: "capitalize" }}>{item.data().breed} - {item.data().animalType}</Caption>
							}
							left={(props) => (
								item.data().petProfilePic ? (
									<Avatar.Image {...props} source={{ uri: item.data().petProfilePic }} />
								) : (
									<Avatar.Icon {...props} icon="paw" />
								)
							)}
							right={() => (
								<View style={{ alignItems: "center", marginRight: 8 }}>
									<Caption style={{ fontWeight: "bold" }}>Status</Caption>
									<Text variant="labelSmall">{item.data().status}</Text>
								</View>
							)}
						/>
						{item.data()?.description && (
							<Card.Content>
								<View>
									<Text variant="labelMedium">Pet description:</Text>
									<Paragraph>{item.data().description}</Paragraph>
								</View>
							</Card.Content>
						)}
					</View>
				</TouchableRipple>
			</Card>
		)
	}

	if (loadingPets) {
		return <Spinner visible={true} color={colors.primary} />
	}

	return (
		<View style={{ flex: 1 }}>
			<Appbar.Header mode='center-aligned' style={{ backgroundColor: "transparent", marginBottom: 16 }}>
				<Appbar.BackAction onPress={navigation.goBack} />
				<Appbar.Content title="Pets" titleStyle={{ fontWeight: 'bold' }} />
				<Appbar.Action icon="plus" onPress={navigateToAddPets} />
			</Appbar.Header>
			{pets.docs.length > 0 ? (
				<View style={{ paddingHorizontal: 16, flex: 1 }}>
					<FlatList
						data={pets.docs}
						keyExtractor={petsKeyExtractor}
						renderItem={petsRenderItem}
					/>
				</View>
			) : (
				<View>
					<Text style={{ textAlign: 'center', marginVertical: 8 }} variant="labelLarge">You currently have no pets.</Text>
				</View>
			)}
		</View>
	)
}

export default Pets;