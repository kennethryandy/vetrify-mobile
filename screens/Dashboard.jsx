import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, useTheme } from 'react-native-paper';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase-config';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import AdminDashboard from '../components/AdminDashboard';
import UserDashboard from '../components/UserDashboard';
import Spinner from 'react-native-loading-spinner-overlay';

const Dashboard = () => {
	const { colors } = useTheme();
	const { user, loading } = useContext(AuthContext);
	const handleSignout = () => signOut(auth);

	if (loading) {
		return (
			<Spinner visible={loading} color={colors.primary} />
		)
	}

	return (
		<SafeAreaView>
			<View style={styles.header}>
				<Text variant="titleMedium">Home</Text>
				<TouchableOpacity onPress={handleSignout} style={styles.logout}><Text variant="labelLarge">Logout</Text></TouchableOpacity>
			</View>
			{!user.role === 'admin' ? (
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