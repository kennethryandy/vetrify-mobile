import { useContext } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';
import { Avatar, Text, useTheme } from 'react-native-paper';
import AuthContext from '../context/AuthContext'

const Profile = () => {
	const { colors } = useTheme();
	const { user, loading } = useContext(AuthContext);

	return (
		<SafeAreaView style={styles.container}>
			<Spinner visible={loading} />
			<ScrollView>
				<View style={[styles.profileHeader, { backgroundColor: colors.tertiary }]} >
					{user.photoURL ? (
						<Avatar.Image style={{ alignSelf: "center", marginTop: 50 }} size={100} source={{ uri: user.photoURL }} />
					) : (
						<Avatar.Text label={user.firstname.charAt(0) + user.lastname.charAt(0)} size={100} style={{ alignSelf: "center", marginTop: 50 }} />
					)}
					<Text variant="headlineMedium" style={{ alignSelf: "center", marginTop: 10, fontWeight: 'bold' }}>{`${user.firstname} ${user.lastname}`}</Text>
					<Text variant="labelMedium" style={{ alignSelf: "center", marginBottom: 8 }}>{user.email}</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default Profile

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	profileHeader: {
		flex: 1,
		paddingVertical: 20,
		justifyContent: "center"
	},
});
