import { FlatList, Touchable, TouchableOpacity, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { Appbar, Avatar, Caption, Card, Paragraph, Text, Title, useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { collection, orderBy, query } from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'
import { fs } from '../firebase-config'
import Spinner from 'react-native-loading-spinner-overlay'

const Pets = () => {
	const { colors } = useTheme();
	const navigation = useNavigation();

	const petsRef = collection(fs, 'pets');
	const petsQuery = query(petsRef, orderBy('createdAt'));

	const [pets, loading] = useCollection(petsQuery);

	const navigateToAddPets = () => {
		navigation.navigate('AddPets');
	}

	const petsKeyExtractor = (item) => item.id;

	const petsRenderItem = ({ item }) => {
		let statusColor = colors.success;
		switch (item.data().animalStatus) {
			case "Sick":
				statusColor = colors.error;
				break;
			case "Not sure":
				statusColor = colors.info;
		}
		return (
			<Card elevation={2} style={{ marginVertical: 6, padding: 6 }}>
				<Card.Title
					title={<Title style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{item.data().nickname}</Title>}
					subtitle={<Caption style={{ fontWeight: "bold", color: "#5C797C" }}>{item.data().animalType}</Caption>}
					left={(props) => <Avatar.Icon {...props} icon="paw" />}
					right={(props) => (
						<View style={{ alignItems: "center", marginRight: 8 }}>
							<Caption style={{ fontWeight: "bold" }}>Status</Caption>
							<MaterialIcons name="stop-circle" {...props} size={16} color={statusColor} />
							<Text variant="labelSmall">{item.data().animalStatus}</Text>
						</View>
					)}
				/>
				{item.data()?.description && (
					<Card.Content>
						<View>
							<Text variant="labelMedium">Pet description:</Text>
							<Paragraph>{item.data().description}</Paragraph>
						</View>
					</Card.Content>
				)}
			</Card>
		)
	}

	if (loading) {
		return <Spinner visible={loading} color={colors.primary} />
	}

	return (
		<View>
			<Appbar.Header mode='center-aligned' style={{ backgroundColor: "transparent", marginBottom: 16 }}>
				<Appbar.BackAction onPress={navigation.goBack} />
				<Appbar.Content title="Pets" titleStyle={{ fontWeight: 'bold' }} />
				<Appbar.Action icon="plus" onPress={navigateToAddPets} />
			</Appbar.Header>
			{pets.docs.length > 0 ? (
				<View style={{ paddingHorizontal: 16 }}>
					<FlatList
						data={pets.docs}
						keyExtractor={petsKeyExtractor}
						renderItem={petsRenderItem}
					/>
				</View>
			) : (
				<View>
					<Text style={{ textAlign: 'center', marginVertical: 8 }} variant="labelLarge">You currently have no pets.</Text>
				</View>
			)}
		</View>
	)
}

export default Pets;