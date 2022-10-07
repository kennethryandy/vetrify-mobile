import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import AuthContext from '../context/AuthContext'
import { collection } from 'firebase/firestore';
import { fs } from '../firebase-config';
import Spinner from 'react-native-loading-spinner-overlay';
import { Appbar, useTheme } from 'react-native-paper';
import { useCollection } from 'react-firebase-hooks/firestore';

const ChatList = () => {
	const { colors } = useTheme();
	const { user, loading } = useContext(AuthContext);

	const usersRef = collection(fs, "users");
	const [users, userLoading] = useCollection(usersRef);

	if (loading || userLoading || !user) {
		return <Spinner visible={loading} color={colors.primary} />;
	}

	console.log(users.docs);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Appbar.Header mode="center-aligned" style={{ backgroundColor: "transparent" }}>
				<Appbar.BackAction onPress={navigation.goBack} />
				<Appbar.Content title="Chats" titleStyle={{ fontWeight: 'bold' }} />
			</Appbar.Header>
		</SafeAreaView>
	)
}

export default ChatList

const styles = StyleSheet.create({})