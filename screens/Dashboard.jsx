import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, useTheme } from 'react-native-paper';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase-config';

const Dashboard = () => {
	const { colors } = useTheme();

	const handleSignout = () => signOut(auth);

	return (
		<SafeAreaView>
			<View style={styles.header}>
				<Text variant="titleMedium">Home</Text>
				<TouchableOpacity onPress={handleSignout} style={styles.logout}><Text variant="labelLarge">Logout</Text></TouchableOpacity>
			</View>
			<View style={{ marginTop: 24, paddingHorizontal: 16 }}>
				<Text variant='titleLarge'>
					Welcome to <Text style={{ color: colors.primary }}>Nasya</Text>
				</Text>
				<Text variant='titleSmall'>
					An Online Information System for <Text style={{ color: '#008018' }}> Veterinary Clinic</Text>
				</Text>
			</View>
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