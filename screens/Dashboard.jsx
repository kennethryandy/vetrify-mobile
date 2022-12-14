import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Divider, Text, useTheme } from 'react-native-paper';
import { signOut } from 'firebase/auth';
import { auth, fs } from '../firebaseConfig';
import { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import AdminDashboard from '../components/AdminDashboard';
import UserDashboard from '../components/UserDashboard';
import Spinner from 'react-native-loading-spinner-overlay';
import { doc, updateDoc } from 'firebase/firestore';

const Dashboard = () => {
	const { colors } = useTheme();
	const { user, loading } = useContext(AuthContext);

	const [logoutLoading, setLogoutLoading] = useState(false);

	// update the online column of the user to offline and sign out the user.
	const handleSignout = async () => {
		setLogoutLoading(true);
		await updateDoc(doc(fs, "users", user.uid), {
			online: false,
			pushToken: null,
		});
		await signOut(auth);
		setLogoutLoading(false);
	};

	if (loading || logoutLoading || !user) {
		return (
			<Spinner visible={loading || logoutLoading || !user} color={colors.primary} />
		)
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.header}>
				<Text variant="titleMedium">Home</Text>
				<TouchableOpacity onPress={handleSignout} style={styles.logout}><Text variant="labelLarge">Logout</Text></TouchableOpacity>
			</View>
			<Divider />
			{user.role === 'admin' ? (
				// If user is admin display the admin dashboard
				<AdminDashboard admin={user} />
			) : (
				<UserDashboard />
			)}
		</SafeAreaView>
	)
}

export default Dashboard

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		paddingVertical: 12
	},
	logout: {
		padding: 4,
	}
});