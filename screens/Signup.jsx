import { StyleSheet, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { auth, fs } from '../firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, serverTimestamp, doc } from 'firebase/firestore';
import Spinner from 'react-native-loading-spinner-overlay';

const Signup = () => {
	const navigation = useNavigation();
	const { colors } = useTheme();
	const [showPw, setShowPw] = useState(false);
	const [showConfirmpw, setShowConfirmpw] = useState(false);
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmpassword, setConfirmassword] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async () => {
		if (password !== confirmpassword) return;
		setLoading(true);
		if (email.trim() !== '' && password.trim() !== '' && firstname.trim() !== '' && lastname.trim() !== '') {
			const { user } = await createUserWithEmailAndPassword(auth, email, password);
			if (user) {
				await setDoc(doc(fs, "users", user.uid), {
					firstname,
					lastname,
					email,
					role: 'user',
					createdAt: serverTimestamp(),
					updatedAt: serverTimestamp()
				});
			}
		}
		setLoading(false);
	}

	const redirectLogin = () => {
		navigation.navigate("Login");
	}

	const handleEmailChange = (text) => setEmail(text);
	const handlePasswordChange = (text) => setPassword(text);
	const handleConfirmpasswordChange = (text) => setConfirmassword(text);
	const handleFirstnameChange = (text) => setFirstname(text);
	const handleLastnameChange = (text) => setLastname(text);

	return (
		<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
			<Spinner visible={loading} />
			<View style={styles.logoContainer}>
				<Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
			</View>
			<View>
				<Text variant="bodyLarge" style={{ marginBottom: 8, color: colors.primary }}>Create an account</Text>
			</View>

			<View>
				<TextInput
					label="First Name"
					placeholder="Enter your first name"
					mode="outlined"
					value={firstname}
					onChangeText={handleFirstnameChange}
				/>
				<TextInput
					label="Last Name"
					placeholder="Enter your last name"
					mode="outlined"
					value={lastname}
					onChangeText={handleLastnameChange}
				/>
				<TextInput
					label="Email"
					placeholder="Enter your email"
					mode="outlined"
					value={email}
					onChangeText={handleEmailChange}
				/>
				<TextInput
					label="Password"
					placeholder="Enter your password"
					mode="outlined"
					value={password}
					onChangeText={handlePasswordChange}
					secureTextEntry={!showPw}
					right={<TextInput.Icon icon={showPw ? "eye-off" : "eye"} onPress={() => setShowPw(pw => !pw)} />}
				/>
				<TextInput
					label="Confirm Password"
					placeholder="Enter your confirm password"
					mode="outlined"
					value={confirmpassword}
					onChangeText={handleConfirmpasswordChange}
					secureTextEntry={!showConfirmpw}
					right={<TextInput.Icon icon={showConfirmpw ? "eye-off" : "eye"} onPress={() => setShowConfirmpw(pw => !pw)} />}
				/>
			</View>
			<View style={styles.btnContainer}>
				<Button style={styles.btn} mode="contained" disabled={loading} onPress={handleSubmit} icon="login" >Sign Up</Button>
			</View>
			<View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
				<Text>Already have an account? </Text>
				<TouchableOpacity disabled={loading} onPress={redirectLogin}>
					<Text style={{ color: colors.primary }}>Login</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	)
}

export default Signup

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 24,
		marginTop: 64
	},
	logoContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 40,
		marginBottom: 16
	},
	logo: {
		width: 180,
		height: 90,
		marginBottom: 16
	},
	btnContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 8,
	},
	btn: {
		width: "100%",
		borderRadius: 5
	},
})