import { useNavigation } from '@react-navigation/native';
import { useContext, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';
import { Appbar, Avatar, Button, HelperText, IconButton, TextInput, TouchableRipple, useTheme } from 'react-native-paper';
import AuthContext from '../context/AuthContext'
import * as ImagePicker from 'expo-image-picker';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { fs } from '../firebase-config';

const EditProfile = () => {
	const navigation = useNavigation();
	const { colors } = useTheme();
	const { user, loading, updateUser } = useContext(AuthContext);

	const [image, setImage] = useState(user.photoURL || "");
	const [firstname, setFirstname] = useState(user.firstname);
	const [lastname, setLastname] = useState(user.lastname);

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

	// When save icon is clicked
	const handleSubmit = async () => {
		if (firstname !== "" || lastname !== "") {
			// If first name and last name is not empty
			// Save the updated user details to the firebase database base on the user id
			const newUserDetails = {
				...user,
				photoURL: image,
				firstname,
				lastname,
				updatedAt: serverTimestamp()
			};
			await setDoc(doc(fs, "users", user.uid), newUserDetails);
			updateUser(newUserDetails);
		}
	}

	return (
		<SafeAreaView style={styles.container}>
			<Spinner visible={loading} />
			<Appbar.Header>
				<Appbar.BackAction onPress={navigation.goBack} />
				<Appbar.Content title="Edit Profile" />
				<Appbar.Action icon="content-save-outline" onPress={handleSubmit} iconColor={colors.success} />
			</Appbar.Header>
			<ScrollView>
				<View style={[styles.profileHeader, { backgroundColor: colors.tertiary }]} >
					<View style={{ width: 100, height: 100, alignItems: 'center', justifyContent: 'center', marginTop: 24 }}>
						<TouchableRipple rippleColor={colors.tertiary} onPress={handleImageChange} style={styles.editProfilePic}>
							<View>
								{image ? (
									<Avatar.Image style={{ alignSelf: "center" }} size={100} source={{ uri: image }} />
								) : (
									<Avatar.Icon icon="account" size={100} style={{ alignSelf: "center" }} />
								)}
							</View>
						</TouchableRipple>
					</View>
					<Button onPress={handleImageChange} mode="contained" style={{ marginTop: 8, marginBottom: 16, backgroundColor: "#6eab4d" }}>Change Avatar</Button>
				</View>
				<View style={{ marginTop: 16, paddingHorizontal: 16 }}>
					<View style={{ marginVertical: 4 }}>
						<TextInput
							label="Firstname"
							mode="outlined"
							value={firstname}
							onChangeText={(text) => setFirstname(text)}
							error={!firstname}
						/>
						{!firstname && (
							<HelperText type="error" visible={!firstname}>
								First name must not be empty.
							</HelperText>
						)}
					</View>
					<View style={{ marginVertical: 4 }}>
						<TextInput
							label="Lastname"
							mode="outlined"
							value={lastname}
							onChangeText={(text) => setLastname(text)}
							error={!lastname}
						/>
						{!lastname && (
							<HelperText type="error" visible={!lastname}>
								Last name must not be empty.
							</HelperText>
						)}
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default EditProfile

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
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
	}
});