import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { useContext, useEffect, useState } from 'react'
import AdminContext from '../../context/AdminContext'
import { Appbar, Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import UserCard from '../../components/UserCard';

const Users = () => {
	const navigation = useNavigation();
	const { users, loadingUsers } = useContext(AdminContext);
	const [data, setData] = useState([]);

	useEffect(() => {
		setData(users);
	}, [users]);

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

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Appbar.Header mode="center-aligned" style={{ backgroundColor: "transparent" }}>
				<Appbar.Content title="Users" titleStyle={{ fontWeight: 'bold' }} />
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
						keyExtractor={(item) => item.uid}
						renderItem={({ item }) => <UserCard user={item} />}
					/>
				)}
			</View>
		</SafeAreaView>
	)
}

export default Users

const styles = StyleSheet.create({
	listContainer: {
		padding: 12,
		flex: 1,
	},
	loadingChatList: {
		alignItems: 'center',
		marginTop: 32
	}
});