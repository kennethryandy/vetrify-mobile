import _ from 'lodash';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { Appbar, Avatar, Button, Chip, Divider, HelperText, SegmentedButtons, Text, TextInput, TouchableRipple, useTheme } from 'react-native-paper'
import { petsType, petsWithBreeds } from '../_mock/_animals';
import { useNavigation } from '@react-navigation/native'
import { serverTimestamp } from 'firebase/firestore'
import Spinner from 'react-native-loading-spinner-overlay';
import SingleSelect from '../components/SingleSelect';
import * as ImagePicker from 'expo-image-picker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import moment from 'moment';

const petBreeds = petsWithBreeds.reduce((acc, curr) => {
	if (curr.type in acc) {
		acc[curr.type].push({
			_id: curr.id,
			value: curr.breed
		});
	} else {
		acc[curr.type] = [{
			_id: curr.id,
			value: curr.breed
		}];
	}
	return acc;
}, {});

const AddPets = () => {
	const { user, loading } = useContext(AuthContext);
	const { colors } = useTheme();
	const navigation = useNavigation();

	const [image, setImage] = useState("");
	const [date, setDate] = useState(moment().subtract(1, "day").toDate());
	const [petNickname, setPetNickname] = useState('');
	const [animalType, setAnimalType] = useState('dog');
	const [breed, setBreed] = useState({});
	const [animalGender, setAnimalGender] = useState('Male');
	const [weight, setWeight] = useState("");
	const [description, setDescription] = useState('');
	const [error, setError] = useState(false);
	const [errorWeight, setErrorWeight] = useState(false);

	const handleTextChange = (text) => {
		if (error) {
			setError(false);
		}
		setPetNickname(text);
	}

	const handleWeightChange = (text) => {
		if (errorWeight) {
			setErrorWeight(false);
		}
		setWeight(text.replace(/[^0-9]/g, ''));
	}

	const handleDescriptionChange = (text) => {
		setDescription(text);
	}

	const onBreedSelect = (value) => setBreed(value);

	// When the avatar or change avatar button is clicked, open the gallery.
	const handleImageChange = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: false,
			aspect: [4, 3],
			quality: 0.5,
			base64: true
		});

		if (!result.cancelled) {
			// if they select an image and not close the gallery, save the image in the "image" state or variable
			setImage(`data:image/jpg;base64,${result.base64}`);
		}
	}

	const onChange = (_event, selectedDate) => {
		const currentDate = selectedDate;
		setDate(currentDate);
	};

	const showDatepicker = () => {
		DateTimePickerAndroid.open({
			value: date,
			onChange,
			mode: "date",
			is24Hour: true,
			maximumDate: moment().subtract(1, "day").toDate()
		});
	};

	// When save icon is clicked
	const handleSubmit = async () => {
		if (petNickname === '') {
			// Set error if pet nickname is empty
			setError(true);
		} else if (weight === "") {
			setErrorWeight(true);
		} else {
			// Add pet to the firebase database
			const petDetailsToBeAdded = {
				nickname: _.capitalize(petNickname),
				petProfilePic: image,
				ownerId: user.uid,
				animalType,
				breed: breed?.text ? _.capitalize(breed?.text) : "other",
				description,
				gender: animalGender,
				weight,
				birthDate: date,
				status: "Not Checked",
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
		<View style={{ flex: 1, marginBottom: 24 }}>
			<Appbar.Header mode="center-aligned" style={{ backgroundColor: "transparent" }}>
				<Appbar.BackAction onPress={navigation.goBack} />
				<Appbar.Content title="Add a Pet" titleStyle={{ fontWeight: 'bold' }} />
				<Appbar.Action icon="login" onPress={handleSubmit} color={colors.success} />
			</Appbar.Header>
			<ScrollView style={{ flex: 1 }}>
				<View style={[styles.profileHeader, { backgroundColor: colors.tertiary }]} >
					<View style={{ width: 100, height: 100, alignItems: 'center', justifyContent: 'center', marginTop: 24 }}>
						<TouchableRipple rippleColor={colors.tertiary} onPress={handleImageChange} style={styles.editProfilePic}>
							<View>
								{image ? (
									<Avatar.Image style={{ alignSelf: "center" }} size={100} source={{ uri: image }} />
								) : (
									<Avatar.Icon icon="paw" size={100} style={{ alignSelf: "center" }} />
								)}
							</View>
						</TouchableRipple>
					</View>
					<Button onPress={handleImageChange} mode="contained" style={{ marginTop: 8, marginBottom: 16, backgroundColor: "#6eab4d" }}>Change Avatar</Button>
				</View>

				<View style={styles.scrollContainer}>

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
						{petsType.map(pet => (
							<Chip
								key={pet.id}
								style={styles.animalTypeBtn}
								onPress={() => {
									setAnimalType(pet.type);
									setBreed({});
								}}
								mode="outlined"
								showSelectedOverlay
								selected={animalType === pet.type}
								textStyle={{ textTransform: "capitalize" }}
							>
								{pet.type}
							</Chip>
						))}
					</View>
					<Divider style={{ marginVertical: 8 }} bold />
					{animalType && (
						<>
							<SingleSelect
								value={breed}
								list={petBreeds[animalType]}
								onSelect={onBreedSelect}
								label="Select Pet Breed"
							/>
							<Divider style={{ marginVertical: 8 }} bold />
						</>
					)}
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
					<Text style={{ marginBottom: 4 }} variant="labelLarge">Birth Date</Text>
					<Button onPress={showDatepicker}>{moment(date).format("LL")}</Button>
					<Divider style={{ marginVertical: 8 }} bold />
					<View style={{ marginTop: 8 }}>
						<Text style={{ marginBottom: 4 }} variant="labelLarge">Pet's weight</Text>
						<TextInput error={errorWeight} mode="outlined" value={weight} label="Weight" placeholder="Weight" onChangeText={handleWeightChange} />
						{errorWeight && (
							<HelperText type="error">
								Please provide pet's weight.
							</HelperText>
						)}
					</View>
					<Divider style={{ marginVertical: 8 }} bold />
					<Text style={{ marginBottom: 4 }} variant="labelLarge">Pet's description</Text>
					<TextInput mode="outlined" multiline value={description} label="Description (Optional)" placeholder="Enter description of your pet." onChangeText={handleDescriptionChange} />
				</View>
			</ScrollView>
		</View>
	)
}

export default AddPets

const styles = StyleSheet.create({
	profileHeader: {
		flex: 1,
		paddingVertical: 20,
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
	},
	editProfilePic: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	animalTypeBtns: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		width: "100%"
	},
	animalTypeBtn: {
		margin: 4,
		minWidth: 80
	},
	scrollContainer: {
		paddingHorizontal: 16,
		flex: 1
	}
})