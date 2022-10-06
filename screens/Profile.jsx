import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';
import { Avatar, Button, List, Text, useTheme } from 'react-native-paper';
import AuthContext from '../context/AuthContext'

const Profile = () => {
	const navigation = useNavigation();
	const { colors } = useTheme();
	const { user, loading } = useContext(AuthContext);

	const editProfileHandler = () => {
		navigation.navigate('EditProfile');
	}

	const renderAccountIcon = () => <List.Icon icon="account" />

	if (loading) {
		return <Spinner visible={loading} color={colors.primary} />;
	}

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<View style={[styles.profileHeader, { backgroundColor: colors.tertiary }]} >
					{user.photoURL ? (
						<Avatar.Image style={{ alignSelf: "center", marginTop: 50 }} size={100} source={{ uri: user.photoURL }} />
					) : (
						<Avatar.Icon icon="account" size={100} style={{ alignSelf: "center", marginTop: 50 }} />
					)}
					<Text variant="headlineMedium" style={{ alignSelf: "center", marginTop: 10, fontWeight: 'bold' }}>{`${user.firstname} ${user.lastname}`}</Text>
					<Text variant="labelMedium" style={{ alignSelf: "center", marginBottom: 8 }}>{user.email}</Text>
					<Button mode='contained' style={{ width: 150, alignSelf: 'center', marginTop: 5, backgroundColor: "#6eab4d", marginBottom: 20 }} onPress={editProfileHandler}>Edit Profile</Button>
				</View>
				<View>
					<List.Section>
						<List.Subheader>Profile Details</List.Subheader>
						<List.Item title="Firstname" left={renderAccountIcon} description={user.firstname} />
						<List.Item title="Lastname" left={renderAccountIcon} description={user.lastname} />
						<List.Item title="Email" left={() => <List.Icon icon="email" />} description={user.email} />
						<List.Item title="Date created" left={() => <List.Icon icon="calendar-account" />} description={user.createdAt.toDate().toLocaleDateString('en-US')} />
					</List.Section>
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
