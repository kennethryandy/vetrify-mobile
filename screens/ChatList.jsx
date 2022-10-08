import { useContext, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { collection, documentId, onSnapshot, query, where } from 'firebase/firestore';
import Spinner from 'react-native-loading-spinner-overlay';
import { Appbar, Avatar, Divider, List, Searchbar, Text, TouchableRipple, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../context/AuthContext';
import { fs } from '../firebase-config';
import { FlatList } from 'react-native-gesture-handler';

const ChatList = () => {
	const { colors } = useTheme();
	const { user, loading } = useContext(AuthContext);
	const [loadingUsers, setLoadingUsers] = useState(true);
	const [users, setUsers] = useState([]);
	const [data, setData] = useState([]);
	const navigation = useNavigation();
	const usersRef = collection(fs, "users");

	useEffect(() => {
		let queryUser;
		if (user) {
			// Check if user is admin or not, and change the query
			if (user.role === "admin") {
				// Query all users
				queryUser = query(usersRef, where(documentId(), "!=", user.uid));
			} else {
				// Query only admins
				queryUser = query(usersRef, where(documentId(), "!=", user.uid), where("role", "==", "admin"));
			}

			onSnapshot(queryUser, (snapshot) => {
				let usersTmp = [];
				snapshot.forEach((doc) => {
					const userDetails = {
						...doc.data(),
						uid: doc.id
					};
					usersTmp.push(userDetails);
				});
				setUsers(usersTmp);
				setData(usersTmp);
			});
		}
		setLoadingUsers(false);
	}, [user]);

	const onChangeSearch = (text) => {
		if (text !== '') {
			const searchedUser = users.filter(usr => {
				const fullname = usr.firstname + " " + usr.lastname;
				return fullname.toLowerCase().includes(text.toLowerCase());
			});
			setData(searchedUser);
		} else {
			setData(users);
		}
	}

	const usersKeyExtractor = (item) => item.uid;

	const usersRenderItem = ({ item }) => (
		<TouchableRipple onPress={() =>
			navigation.navigate("Chat", { currentUser: user, selectedUser: item })}
		>
			<View>
				<List.Item
					title={`${item.firstname} ${item.lastname}`}
					titleStyle={{ textTransform: 'capitalize' }}
					style={{ flexDirection: 'column' }}
					left={(props) => (
						item.photoURL ? <Avatar.Image {...props} source={{ uri: item.photoURL }} size={40} /> : <Avatar.Icon {...props} icon="account" color="#fff" size={40} />
					)}
					right={(props) => <MaterialCommunityIcons {...props} name="checkbox-blank-circle" size={12} color={item.online ? colors.success : "#9fa1a4"} />}
				/>
				<Divider bold />
			</View>
		</TouchableRipple>
	);


	if (loading || !user) {
		return <Spinner visible={loading || !user} color={colors.primary} />;
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Appbar.Header mode="center-aligned" style={{ backgroundColor: "transparent" }}>
				<Appbar.BackAction onPress={navigation.goBack} />
				<Appbar.Content title="Chats" titleStyle={{ fontWeight: 'bold' }} />
				<TouchableRipple onPress={() => navigation.navigate("Profile")} style={{ marginRight: 16 }}>
					{user.photoURL ? (
						<Avatar.Image source={{ uri: user.photoURL }} size={40} />
					) : (
						<Avatar.Icon icon="account" size={40} />
					)}
				</TouchableRipple>
			</Appbar.Header>
			<View style={styles.listContainer}>
				<Searchbar placeholder="Search" onChangeText={onChangeSearch} style={{ marginBottom: 8 }} />
				{loadingUsers ? (
					<View style={styles.loadingChatList}>
						<Text variant="labelMedium">Loading...</Text>
					</View>
				) : (
					<FlatList
						data={data}
						keyExtractor={usersKeyExtractor}
						renderItem={usersRenderItem}
						style={{ marginTop: 12 }}
					/>
				)}
			</View>
		</SafeAreaView>
	)
}

export default ChatList

const styles = StyleSheet.create({
	listContainer: {
		padding: 12,
	},
	loadingChatList: {
		alignItems: 'center',
		marginTop: 32
	}
});