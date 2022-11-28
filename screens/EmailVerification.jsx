import { sendEmailVerification, signOut } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Image, SafeAreaView, StyleSheet, View } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';
import { Button, Text, TouchableRipple, useTheme } from 'react-native-paper'
import { auth, fs } from '../firebaseConfig';
import * as Updates from "expo-updates";

const EmailVerification = () => {
	const [user, loading] = useAuthState(auth);
	const [loadingSignout, setLoadingSignout] = useState(false);
	const { colors } = useTheme();

	useEffect(() => {
		if (!auth.currentUser.emailVerified) {
			sendEmailVerification(auth.currentUser).then((res) => {
				console.log({ res });
			}).catch(err => console.log(err));
		}
	}, []);

	const handleSignOut = async () => {
		setLoadingSignout(true);
		await updateDoc(doc(fs, "users", user.uid), {
			online: false,
			pushToken: null,
		});
		setLoadingSignout(false);
		await signOut(auth);
	}

	if (loading) {
		return <Spinner visible color={colors.primary} />
	}

	return (
		<SafeAreaView style={styles.container}>
			<TouchableRipple style={styles.signout} onPress={handleSignOut}>
				<Text variant="labelMedium">Sign out</Text>
			</TouchableRipple>
			<Spinner visible={loadingSignout} color={colors.primary} />
			<View style={styles.logoContainer}>
				<Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
			</View>
			<View>
				<Text variant="titleLarge" style={{ marginBottom: 4, fontWeight: "bold" }}>Verify Your Email</Text>
				<Text variant="titleMedium" style={{ fontWeight: "600", color: "#7B858D" }}>
					Hi {user?.displayName}! We have sent code to your email:
				</Text>
				<Text variant="titleMedium" style={{ fontWeight: "600", color: "#7B858D" }}>{user?.email}</Text>
			</View>
			<View style={styles.btnContainer}>
				<Button mode="contained" style={styles.btn} onPress={async () => { await Updates.reloadAsync() }}>Verify Account or Send again</Button>
				<View>
					<Text variant="labelSmall" style={{ fontWeight: "600", color: "#7B858D" }}>
						Click the button after you verify your account to continue
					</Text>
					<Text variant="labelSmall" style={{ fontWeight: "600", color: "#7B858D" }}>
						or send another verification email.
					</Text>
				</View>
			</View>
		</SafeAreaView>
	)
}

export default EmailVerification

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 24,
		marginTop: 64,
		position: "relative"
	},
	signout: {
		right: 24,
		position: "absolute",
		padding: 8
	},
	logoContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 40,
		marginBottom: 24
	},
	logo: {
		width: 180,
		height: 90,
		marginBottom: 16
	},
	btnContainer: {
		marginTop: 24,
	},
	btn: {
		width: "100%",
		borderRadius: 5,
		marginBottom: 8
	},
})