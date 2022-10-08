import { ScrollView, StyleSheet, View } from 'react-native'
import { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { Appbar, Chip, Divider, HelperText, SegmentedButtons, Text, TextInput, useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { serverTimestamp } from 'firebase/firestore'
import Spinner from 'react-native-loading-spinner-overlay/lib';

const AddPets = () => {
	const { user, loading } = useContext(AuthContext);
	const { colors } = useTheme();
	const navigation = useNavigation();

	const [petNickname, setPetNickname] = useState('');
	const [animalType, setAnimalType] = useState('Dog');
	const [animalStatus, setAnimalStatus] = useState('Sick');
	const [animalGender, setAnimalGender] = useState('Male');
	const [description, setDescription] = useState('');
	const [error, setError] = useState(false);

	const handleTextChange = (text) => {
		if (error) {
			setError(false);
		}
		setPetNickname(text);
	}

	const handleDescriptionChange = (text) => {
		setDescription(text);
	}

	// When save icon is clicked
	const handleSubmit = async () => {
		if (petNickname === '') {
			// Set error if pet nickname is empty
			setError(true);
		} else {
			// Add pet to the firebase database
			const petDetailsToBeAdded = {
				nickname: petNickname,
				ownerId: user.uid,
				animalType,
				animalStatus,
				description,
				createdAt: serverTimestamp()
			};
			// Navigate to AddPetLoading and insert the pet.
			navigation.navigate('AddPetLoading', petDetailsToBeAdded);
		}
	}

	if (loading) {
		return <Spinner visible={loading} color={colors.primary} />
	}

	return (
		<View style={{ flex: 1 }}>
			<Appbar.Header mode="center-aligned" style={{ backgroundColor: "transparent" }}>
				<Appbar.BackAction onPress={navigation.goBack} />
				<Appbar.Content title="Add a Pet" titleStyle={{ fontWeight: 'bold' }} />
				<Appbar.Action icon="login" onPress={handleSubmit} color={colors.success} />
			</Appbar.Header>
			<ScrollView style={styles.scrollContainer}>
				<View style={{ marginTop: 8 }}>
					<TextInput error={error} mode="outlined" value={petNickname} label="Nickname" placeholder="Enter you pet's nickname" onChangeText={handleTextChange} />
					{error && (
						<HelperText type="error">
							Please enter your pet's nickname.
						</HelperText>
					)}
				</View>
				<Divider style={{ marginVertical: 8 }} bold />
				<Text style={{ marginBottom: 4 }} variant="labelLarge">Select the type of your Pet</Text>
				<View style={styles.animalTypeBtns}>
					<Chip
						style={styles.animalTypeBtn}
						onPress={() => setAnimalType("Dog")}
						mode="outlined"
						showSelectedOverlay
						selected={animalType === "Dog"}
					>
						Dog
					</Chip>
					<Chip
						style={styles.animalTypeBtn}
						onPress={() => setAnimalType("Cat")}
						mode="outlined"
						showSelectedOverlay
						selected={animalType === "Cat"}
					>
						Cat
					</Chip>
					<Chip
						style={styles.animalTypeBtn}
						onPress={() => setAnimalType("Bird")}
						mode="outlined"
						showSelectedOverlay
						selected={animalType === "Bird"}
					>
						Bird
					</Chip>
					<Chip
						style={styles.animalTypeBtn}
						onPress={() => setAnimalType("Lizard")}
						mode="outlined"
						showSelectedOverlay
						selected={animalType === "Lizard"}
					>
						Lizard
					</Chip>
				</View>
				<Divider style={{ marginVertical: 8 }} bold />
				<Text style={{ marginBottom: 4 }} variant="labelLarge">Select the gender of your pet</Text>
				<View>
					<SegmentedButtons
						value={animalGender}
						onValueChange={setAnimalGender}
						buttons={[
							{
								value: 'Male',
								label: 'Male',
								style: { backgroundColor: animalGender === "Male" ? colors.secondary : "transparent" }
							},
							{
								value: 'Female',
								label: 'Female',
								style: { backgroundColor: animalGender === "Female" ? colors.secondary : "transparent" }
							},
							{
								value: 'Not sure',
								label: 'Not sure',
								style: { backgroundColor: animalGender === "Not sure" ? colors.secondary : "transparent" }
							},
						]}
						style={styles.group}
					/>
				</View>
				<Divider style={{ marginVertical: 8 }} bold />
				<Text style={{ marginBottom: 4 }} variant="labelLarge">Select your current Pet status</Text>
				<View>
					<SegmentedButtons
						value={animalStatus}
						onValueChange={setAnimalStatus}
						buttons={[
							{
								value: 'Sick',
								label: 'Sick',
								style: { backgroundColor: animalStatus === "Sick" ? colors.secondary : "transparent" }
							},
							{
								value: 'Healthy',
								label: 'Healthy',
								style: { backgroundColor: animalStatus === "Healthy" ? colors.secondary : "transparent" }
							},
							{
								value: 'Not sure',
								label: 'Not sure',
								style: { backgroundColor: animalStatus === "Not sure" ? colors.secondary : "transparent" }
							},
						]}
						style={styles.group}
					/>
				</View>
				<Divider style={{ marginVertical: 8 }} bold />
				<Text style={{ marginBottom: 4 }} variant="labelLarge">Pet's description</Text>
				<TextInput mode="outlined" multiline value={description} label="Description (Optional)" placeholder="Enter description of your pet." onChangeText={handleDescriptionChange} />
			</ScrollView>
		</View>
	)
}

export default AddPets

const styles = StyleSheet.create({
	animalTypeBtns: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
	},
	animalTypeBtn: {
		marginHorizontal: 4
	},
	scrollContainer: {
		paddingHorizontal: 16,
		flex: 1
	}
})