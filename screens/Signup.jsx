import { StyleSheet, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { Button, HelperText, Paragraph, RadioButton, Text, TextInput, useTheme } from 'react-native-paper';
import _ from 'lodash';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { auth, fs } from '../firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, serverTimestamp, doc } from 'firebase/firestore';
import Spinner from 'react-native-loading-spinner-overlay';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import moment from 'moment/moment';

// Email regular expression for validating email address
const EMAIL_REGEX =
	/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const Signup = () => {
	const navigation = useNavigation();
	const { colors } = useTheme();
	const [showPw, setShowPw] = useState(false);
	const [showConfirmpw, setShowConfirmpw] = useState(false);
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [email, setEmail] = useState("");
	const [gender, setGender] = useState("Male");
	const [password, setPassword] = useState("");
	const [confirmpassword, setConfirmassword] = useState("");
	const [date, setDate] = useState(null);
	const [loading, setLoading] = useState(false);

	// Error states
	const [errorPasswordNotMatch, setErrorPasswordNotMatch] = useState(false);
	const [emailError, setEmailError] = useState(false);

	// When signup button is clicked
	const handleSubmit = async () => {
		// If password and confirm password does not match, set errorPasswordNotMatch to be true and exit.
		if (password !== confirmpassword) {
			setErrorPasswordNotMatch(true);
			return;
		};
		// If email is not a valid email address, set emailError to be true and exit.
		if (!EMAIL_REGEX.test(email)) {
			setEmailError(true);
			return;
		};

		// If first name and last name are not empty, save the user to firebase and update online column to true and role to "user".
		setLoading(true);
		if (firstname.trim() !== '' && lastname.trim() !== '') {
			createUserWithEmailAndPassword(auth, email, password)
				.then(async ({ user }) => {
					if (user) {
						const newUser = {
							firstname: _.capitalize(firstname),
							lastname: _.capitalize(lastname),
							email,
							role: 'user',
							photoURL: "",
							online: true,
							gender,
							birthDate: date,
							createdAt: serverTimestamp(),
							updatedAt: serverTimestamp()
						}
						await setDoc(doc(fs, "users", user.uid), newUser);
						setLoading(false);
					}
				}).catch((err) => {
					console.log(err);
					setEmailError(true);
					setLoading(false);
				});
		}
		setLoading(false);
	}

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate;
		setDate(currentDate);
	};

	const showDatepicker = () => {
		DateTimePickerAndroid.open({
			value: date ? date : new Date(moment().subtract(9, 'years').format()),
			onChange,
			mode: "date",
			is24Hour: true,
			maximumDate: new Date(moment().subtract(9, 'years').format()),

		});
	};

	// Redirect to login screen
	const redirectLogin = () => {
		navigation.navigate("Login");
	}

	const handleEmailChange = (text) => {
		if (emailError) {
			setEmailError(false);
		}
		setEmail(text);
	}
	const handlePasswordChange = (text) => {
		if (errorPasswordNotMatch) {
			setErrorPasswordNotMatch(false);
		}
		setPassword(text);
	}
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
					error={emailError}
				/>
				{emailError && (
					<HelperText type="error">
						Invalid email address.
					</HelperText>
				)}
				<TextInput
					label="Password"
					placeholder="Enter your password"
					mode="outlined"
					value={password}
					onChangeText={handlePasswordChange}
					secureTextEntry={!showPw}
					right={<TextInput.Icon icon={showPw ? "eye-off" : "eye"} onPress={() => setShowPw(pw => !pw)} />}
					error={errorPasswordNotMatch}
				/>
				<TextInput
					label="Confirm Password"
					placeholder="Enter your confirm password"
					mode="outlined"
					value={confirmpassword}
					onChangeText={handleConfirmpasswordChange}
					secureTextEntry={!showConfirmpw}
					right={<TextInput.Icon icon={showConfirmpw ? "eye-off" : "eye"} onPress={() => setShowConfirmpw(pw => !pw)} />}
					error={errorPasswordNotMatch}
				/>
				{errorPasswordNotMatch && (
					<HelperText type="error">
						Password and confirm password does not match.
					</HelperText>
				)}
				<View style={{ marginVertical: 8 }}>
					<Button icon="calendar" mode="text" onPress={showDatepicker}>
						{date ? moment(date).format("LL") : "Date of Birth"}
					</Button>
				</View>
				<View style={{ marginVertical: 8 }}>
					<Paragraph style={{ marginLeft: 8, marginVertical: 4 }}>Select Gender</Paragraph>
					<View style={{ flexDirection: "row" }}>
						<View style={{ flexDirection: "row", alignItems: "center" }}>
							<RadioButton
								value="Male"
								status={gender === 'Male' ? 'checked' : 'unchecked'}
								onPress={() => setGender('Male')}
							/>
							<Paragraph>Male</Paragraph>
						</View>
						<View style={{ flexDirection: "row", alignItems: "center" }}>
							<RadioButton
								value="Female"
								status={gender === 'Female' ? 'checked' : 'unchecked'}
								onPress={() => setGender('Female')}
							/>
							<Paragraph>Female</Paragraph>
						</View>
					</View>
				</View>
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