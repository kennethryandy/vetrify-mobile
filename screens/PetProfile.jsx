import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import _ from 'lodash'
import Spinner from 'react-native-loading-spinner-overlay';
import { Appbar, Avatar, Button, List, Text, useTheme } from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { fs } from '../firebase-config';
import { collection, orderBy, query, where } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

const Tab = createMaterialTopTabNavigator();

const PetProfile = ({ route, navigation }) => {
	const { pet } = route.params;
	const { colors } = useTheme();

	const medRecordRef = collection(fs, 'medicalRecords');
	const medRecordQuery = query(medRecordRef, where("petId", "==", pet.id), orderBy('createdAt', 'desc'));
	const [medicalRecords, loadingRecords] = useCollection(medRecordQuery);

	const editProfileHandler = () => {
		navigation.navigate('EditPetProfile', { pet });
	}

	if (loadingRecords) {
		return <Spinner visible={true} color={colors.primary} />
	}

	return (
		<SafeAreaView style={styles.container}>
			<Appbar.Header mode="small">
				<Appbar.BackAction onPress={navigation.goBack} />
			</Appbar.Header>
			<View style={[styles.profileHeader, { backgroundColor: colors.tertiary }]} >
				{pet?.petProfilePic ? (
					<Avatar.Image style={{ alignSelf: "center", marginTop: 50 }} size={100} source={{ uri: pet?.petProfilePic }} />
				) : (
					<Avatar.Icon icon="paw" size={100} style={{ alignSelf: "center", marginTop: 50 }} />
				)}
				<Text variant="headlineMedium" style={{ alignSelf: "center", marginTop: 10, fontWeight: 'bold' }}>{_.capitalize(pet?.nickname)}</Text>
				<Text variant="labelMedium" style={{ alignSelf: "center", marginBottom: 8 }}>{pet?.breed} - {_.capitalize(pet?.animalType)}</Text>
				<Button mode='contained' style={{ width: 150, alignSelf: 'center', marginTop: 5, backgroundColor: "#6eab4d", marginBottom: 20 }} onPress={editProfileHandler}>Edit Pet</Button>
			</View>
			<View style={{ flex: 1.8, borderRadius: 8 }}>
				<Tab.Navigator
					screenOptions={{
						lazy: true,
						tabBarActiveTintColor: 'black',
						tabBarIndicatorStyle: { backgroundColor: '#e74c3c' },
						tabBarLabelStyle: { fontSize: 12, textTransform: 'capitalize' },
					}}
					style={{ flex: 1, height: 650 }}
				>
					<Tab.Screen name="Basic Info" component={PetDetails} initialParams={{ pet }} />
					<Tab.Screen name="Records" component={Records} initialParams={{ medicalRecords }} />
				</Tab.Navigator>
			</View>
		</SafeAreaView>
	)
}

export default PetProfile;

function PetDetails ({ route }) {
	const { pet } = route.params;
	return (
		<ScrollView style={{ flex: 1 }}>
			<View>
				<List.Section>
					<List.Subheader>Pet Details</List.Subheader>
					<List.Item
						title="Nickname"
						left={() => <List.Icon icon="paw" />}
						description={pet?.nickname}
					/>
					<List.Item
						title="Type"
						left={() => <List.Icon icon="paw" />}
						description={_.capitalize(pet?.animalType)}
					/>
					<List.Item
						title="Breed"
						left={() => <List.Icon icon="paw" />}
						description={pet?.breed}
						descriptionStyle={{ textTransform: "capitalize" }}
					/>
					<List.Item
						title="Gender"
						left={() => <List.Icon icon={pet?.gender === "Female" ? "gender-female" : "gender-male"} />}
						description={pet?.gender || "Male"}
					/>
					<List.Item
						title="Status"
						left={() => <List.Icon icon="information" />}
						description={pet?.status}
					/>
				</List.Section>
			</View>
		</ScrollView>
	)
}

function Records ({ route }) {
	const { medicalRecords } = route.params;
	return (
		medicalRecords?.empty || !medicalRecords ? (
			<View style={{ marginVertical: 16 }}>
				<Text style={{ textAlign: "center" }}>No Medical Records.</Text>
			</View>
		) : (
			<View></View>
		)
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	profileHeader: {
		flex: 1,
		paddingVertical: 20,
		justifyContent: "center",
	},
});
