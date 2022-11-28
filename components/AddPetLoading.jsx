import { Image, SafeAreaView, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { Text, useTheme } from 'react-native-paper'
import { useNavigation, useRoute } from '@react-navigation/native';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { fs } from '../firebaseConfig';

const AddPetLoading = () => {
	const { colors } = useTheme();
	const { params } = useRoute();
	const navigation = useNavigation();

	const petsColRef = collection(fs, 'pets');

	useEffect(() => {
		if (params?.addPet) {
			addDoc(petsColRef, params.pet)
				.then(() => {
					navigation.navigate('Pets');
				}).catch(() => {
					navigation.navigate('Pets');
				});
		} else if (params?.updatePet) {
			setDoc(doc(fs, "pets", params.pet.id), params.pet)
				.then(() => {
					navigation.navigate('Pets');
				}).catch(() => {
					navigation.navigate('Pets');
				});
		} else {
			navigation.navigate('Pets');
		}
	}, []);

	return (
		<SafeAreaView style={[styles.container, { backgroundColor: colors.primary }]}>
			<Text variant="titleLarge">{params.addPet ? "Adding a pet..." : "Updating pet..."}</Text>
			<Image style={styles.loader} source={require('../assets/paws.gif')} />
		</SafeAreaView>
	)
}

export default AddPetLoading

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	loader: {
		height: 280,
		width: 280,
	}
});