import { signOut } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import moment from 'moment';
import { useContext, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Avatar, Button, List, Text, useTheme } from 'react-native-paper';
import AuthContext from '../context/AuthContext'
import { auth, fs } from '../firebaseConfig';
import PetCard from '../components/PetCard';

const Tab = createMaterialTopTabNavigator();

const Profile = ({ navigation }) => {
	const { colors } = useTheme();
	const { user: currUser, pets } = useContext(AuthContext);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(false);
	const [logoutLoading, setLogoutLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		setUser({ ...currUser, pets: pets.docs.map((pet) => ({ ...pet.data(), id: pet.id })) });
		setLoading(false);
	}, [currUser, pets]);


	const editProfileHandler = () => {
		navigation.navigate('EditProfile');
	}

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

	if (loading || user === null) {
		return <Spinner visible color={colors.primary} />;
	}

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<Spinner visible={loading || logoutLoading} color={colors.primary} />
				<View style={[styles.profileHeader, { backgroundColor: colors.tertiary }]} >
					{user?.photoURL ? (
						<Avatar.Image style={{ alignSelf: "center", marginTop: 50 }} size={100} source={{ uri: user?.photoURL }} />
					) : (
						<Avatar.Icon icon={user?.gender === "Female" ? "face-woman" : "face-man"} size={100} style={{ alignSelf: "center", marginTop: 50 }} />
					)}
					<Text variant="headlineMedium" style={{ alignSelf: "center", marginTop: 10, fontWeight: 'bold' }}>{`${user?.firstname} ${user?.lastname}`}</Text>
					<Text variant="labelMedium" style={{ alignSelf: "center", marginBottom: 8 }}>{user?.email}</Text>
					<Button mode='contained' style={{ width: 150, alignSelf: 'center', marginTop: 5, backgroundColor: "#6eab4d", marginBottom: 20 }} onPress={editProfileHandler}>Edit Profile</Button>
					<TouchableOpacity onPress={handleSignout} style={styles.logout}>
						<Text variant="labelLarge">Logout</Text>
					</TouchableOpacity>
				</View>
				<View style={{ flex: 1, borderRadius: 8 }}>
					{user && (
						<Tab.Navigator
							screenOptions={{
								lazy: true,
								tabBarActiveTintColor: 'black',
								tabBarIndicatorStyle: { backgroundColor: '#e74c3c' },
								tabBarLabelStyle: { fontSize: 12, textTransform: 'capitalize' },
							}}
							style={{ flex: 1, height: 650 }}
						>
							<Tab.Screen name="Basic Info" component={ProfileDetails} initialParams={{ user }} />
							{user?.role !== "admin" && (
								<Tab.Screen name="Pets" component={Pets} initialParams={{ pets: user?.pets }} />
							)}
						</Tab.Navigator>
					)}
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

const ProfileDetails = ({ route }) => {
	const { user } = route.params;
	return (
		<View>
			<List.Section>
				<List.Subheader>Profile Details</List.Subheader>
				<List.Item
					title="First name"
					left={() => <List.Icon icon="account" />}
					description={user?.firstname}
				/>
				<List.Item
					title="Last name"
					left={() => <List.Icon icon="account" />}
					description={user?.lastname}
				/>
				{user?.birthDate && (
					<>
						<List.Item
							title="Birth Date"
							left={() => <List.Icon icon="calendar" />}
							description={moment(user.birthDate).format("LL")}
						/>
						<List.Item
							title="Age"
							left={() => <List.Icon icon="calendar" />}
							description={moment().diff(user.birthDate, 'years', false)}
						/>
					</>
				)}
				<List.Item
					title="Gender"
					left={() => <List.Icon icon={user?.gender === "Female" ? "gender-female" : "gender-male"} />}
					description={user?.gender || "Male"}
				/>
				<List.Item
					title="Email"
					left={() => <List.Icon icon="email" />}
					description={user?.email}
				/>
				<List.Item
					title="Joined on"
					left={() => <List.Icon icon="calendar-account" />}
					description={moment(user?.createdAt).format("MMMM DD, YYYY")}
				/>
			</List.Section>
		</View>
	);
}

const Pets = ({ route }) => {
	const { pets } = route.params;

	return (
		pets.length > 0 ? (
			<View style={{ marginHorizontal: 12, marginTop: 8 }}>
				{pets.map(pet => (
					<PetCard pet={pet} key={pet.id} />
				))}
			</View>
		) : (
			<View style={{ marginTop: 8 }}>
				<Text style={{ textAlign: "center" }}>No pets</Text>
			</View>
		)
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
		justifyContent: "center",
		position: "relative",
	},
	logout: {
		padding: 4,
		position: "absolute",
		right: 24,
		top: 32
	}
});
