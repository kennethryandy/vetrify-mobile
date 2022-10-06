import { useNavigation } from '@react-navigation/native';
import { useContext, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';
import { Appbar, Avatar, TextInput, TouchableRipple, useTheme } from 'react-native-paper';
import AuthContext from '../context/AuthContext'
import * as ImagePicker from 'expo-image-picker';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { fs } from '../firebase-config';

const EditProfile = () => {
	const navigation = useNavigation();
	const { colors } = useTheme();
	const { user, loading, setUser } = useContext(AuthContext);

	const [saving, setSaving] = useState(false);
	const [image, setImage] = useState(user.photoURL || "");
	const [firstname, setFirstname] = useState(user.firstname);
	const [lastname, setLastname] = useState(user.lastname);

	const handleImageChange = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: false,
			aspect: [4, 3],
			quality: 0.5,
			base64: true
		});

		if (!result.cancelled) {
			setImage(`data:image/jpg;base64,${result.base64}`);
		}
	}

	const handleSubmit = async () => {
		setSaving(true);
		console.log(image);
		const newUserDetails = {
			...user,
			photoURL: image,
			firstname,
			lastname,
			updatedAt: serverTimestamp()
		};
		await setDoc(doc(fs, "users", user.uid), newUserDetails);
		setUser(newUserDetails);
		setSaving(false);
	}

	return (
		<SafeAreaView style={styles.container}>
			<Spinner visible={loading || saving} />
			<Appbar.Header>
				<Appbar.BackAction onPress={navigation.goBack} />
				<Appbar.Content title="Edit Profile" />
				<Appbar.Action icon="content-save-outline" onPress={handleSubmit} iconColor={colors.primary} />
			</Appbar.Header>
			<ScrollView>
				<View style={[styles.profileHeader, { backgroundColor: colors.tertiary }]} >
					<View style={{ width: 100, height: 100, alignItems: 'center', justifyContent: 'center', marginVertical: 25 }}>
						<TouchableRipple rippleColor={colors.tertiary} onPress={handleImageChange} style={{ alignItems: 'center', justifyContent: 'center' }}>
							{image ? (
								<Avatar.Image style={{ alignSelf: "center" }} size={100} source={{ uri: image }} />
							) : (
								<Avatar.Icon icon="account" size={100} style={{ alignSelf: "center" }} />
							)}
						</TouchableRipple>
					</View>
				</View>
				<View style={{ marginTop: 16, paddingHorizontal: 16 }}>
					<TextInput
						label="Firstname"
						mode="outlined"
						value={firstname}
						onChangeText={(text) => setFirstname(text)}
						style={{ marginVertical: 4 }}
					/>
					<TextInput
						label="Lastname"
						mode="outlined"
						value={lastname}
						onChangeText={(text) => setLastname(text)}
						style={{ marginVertical: 4 }}
					/>
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
});