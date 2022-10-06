import { Image, SafeAreaView, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { Text, useTheme } from 'react-native-paper'
import { useNavigation, useRoute } from '@react-navigation/native';
import { addDoc, collection } from 'firebase/firestore';
import { fs } from '../firebase-config';

const AddPetLoading = () => {
	const { colors } = useTheme();
	const { params } = useRoute();
	const navigation = useNavigation();

	const petsColRef = collection(fs, 'pets');

	useEffect(() => {
		addDoc(petsColRef, params)
			.then(() => {
				navigation.navigate('Pets');
			}).catch(() => {
				navigation.navigate('Pets');
			});
	}, []);

	return (
		<SafeAreaView style={[styles.container, { backgroundColor: colors.primary }]}>
			<Text variant="titleLarge">Adding a pet...</Text>
			{/* <Image style={styles.loader} source={require('../assets/hamster-loader.gif')} /> */}
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