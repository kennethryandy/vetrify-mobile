import { SafeAreaView, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { Button, HelperText, Text, TextInput, useTheme } from 'react-native-paper';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { auth, fs } from '../firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Spinner from 'react-native-loading-spinner-overlay';
import { doc, updateDoc } from 'firebase/firestore';

const Login = () => {
	const navigation = useNavigation();
	const { colors } = useTheme();
	const [error, setError] = useState(false);
	const [showPw, setShowPw] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	// When login button is clicked
	const handleSubmit = () => {
		setLoading(true);
		if (email.trim() !== '' && password.trim() !== '') {
			// If email and password are not empty login using firebase and update the user online column to true.
			signInWithEmailAndPassword(auth, email, password)
				.then(async ({ user }) => {
					await updateDoc(doc(fs, "users", user.uid), {
						online: true
					});
				}).catch((err) => {
					// If an error occurred
					setError(true);
					console.log(err);
				});

		}
		setLoading(false);
	}

	// Redirect to the signup screen
	const redirectSignUp = () => {
		navigation.navigate("Signup");
	}

	const handleEmailChange = (text) => setEmail(text);

	const handlePasswordChange = (text) => setPassword(text);

	return (
		<SafeAreaView style={styles.container}>
			<Spinner visible={loading} />
			<View style={styles.logoContainer}>
				<Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
			</View>
			<View>
				<Text variant="bodyLarge" style={{ marginBottom: 8, color: colors.primary }}>Please sign in</Text>
			</View>
			<View>
				{error && (
					<HelperText type="error">
						Invalid email or password
					</HelperText>
				)}
				<TextInput
					label="Email"
					placeholder="Enter your email"
					mode="outlined"
					value={email}
					onChangeText={handleEmailChange}
					error={error}
				/>
				<TextInput
					label="Password"
					placeholder="Enter your password"
					mode="outlined"
					value={password}
					onChangeText={handlePasswordChange}
					error={error}
					secureTextEntry={!showPw}
					right={<TextInput.Icon icon={showPw ? "eye-off" : "eye"} onPress={() => setShowPw(pw => !pw)} />}
				/>
			</View>
			<View style={styles.btnContainer}>
				<Button style={styles.btn} mode="contained" disabled={loading} onPress={handleSubmit} icon="login" >Sign in</Button>
			</View>
			<View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
				<Text>Don't have an account? </Text>
				<TouchableOpacity disabled={loading} onPress={redirectSignUp}>
					<Text style={{ color: colors.primary }}>Sign Up</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	)
}

export default Login

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