import { FlatList, View } from 'react-native'
import { Appbar, Text, useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import Spinner from 'react-native-loading-spinner-overlay'
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import PetCard from '../components/PetCard';
import AdminPetsScreen from './Admin/AdminPetsScreen';

const Pets = () => {
	const { pets, loadingPets, user } = useContext(AuthContext);
	const { colors } = useTheme();
	const navigation = useNavigation();

	// If add icon is clicked, redirect to addPets screen
	const navigateToAddPets = () => {
		navigation.navigate('AddPets');
	}

	const petsKeyExtractor = (_, idx) => idx;

	// Loops through the pets and display
	const petsRenderItem = ({ item }) => <PetCard pet={item} />

	if (loadingPets) {
		return <Spinner visible={true} color={colors.primary} />
	}

	return (
		<View style={{ flex: 1 }}>
			<Appbar.Header mode='center-aligned' style={{ backgroundColor: "transparent", marginBottom: 16 }}>
				<Appbar.Content title="Pets" titleStyle={{ fontWeight: 'bold' }} />
				{user.role !== "admin" && (
					<Appbar.Action icon="plus" onPress={navigateToAddPets} />
				)}
			</Appbar.Header>
			{user.role === "admin" ? (
				<AdminPetsScreen />
			) : (pets.docs.length > 0 ? (
				<View style={{ paddingHorizontal: 16, flex: 1 }}>
					<FlatList
						data={pets.docs.map(pet => pet.data())}
						keyExtractor={petsKeyExtractor}
						renderItem={petsRenderItem}
					/>
				</View>
			) : (
				<View>
					<Text style={{ textAlign: 'center', marginVertical: 8 }} variant="labelLarge">You currently have no pets.</Text>
				</View>
			))}
		</View>
	)
}

export default Pets;