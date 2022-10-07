import { FlatList, Image, StyleSheet, View } from 'react-native'
import { addDoc, collection, getDocs, orderBy, query, serverTimestamp, where } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { fs } from '../firebase-config';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import { Avatar, Caption, Divider, Paragraph, Text, TextInput, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import moment from 'moment';
import * as ImagePicker from 'expo-image-picker';

const Chat = () => {
	const { colors } = useTheme();
	const { user, loading, admin } = useContext(AuthContext);

	const [sending, setSending] = useState(false);
	const [messageText, setMessageText] = useState("");

	const chatsRef = collection(fs, 'chats');
	const chatsQuery = query(chatsRef, where("senderId", "in", [user.uid, admin.uid]), orderBy("createdAt"));
	const [chats, chatLoading] = useCollection(chatsQuery);

	const handleTextChange = (text) => {
		setMessageText(text);
	}

	const handleSubmitChat = async () => {
		setSending(true);
		setMessageText("");
		const messageDetails = {
			senderId: user.uid,
			senderName: user.firstname + " " + user.lastname,
			senderPhotoURL: user.photoURL,
			recipientId: admin.uid,
			recipientName: admin.firstname + " " + admin.lastname,
			recipientPhotoURL: admin.photoURL,
			message: messageText,
			messageType: "text",
			createdAt: serverTimestamp()
		};
		await addDoc(chatsRef, messageDetails);
		setSending(false);
	}

	const handleImageSend = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: false,
			aspect: [4, 3],
			quality: 0.5,
			base64: true
		});

		if (!result.cancelled) {
			setSending(true);
			setMessageText("");
			const messageDetails = {
				senderId: user.uid,
				senderName: user.firstname + " " + user.lastname,
				senderPhotoURL: user.photoURL,
				recipientId: admin.uid,
				recipientName: admin.firstname + " " + admin.lastname,
				recipientPhotoURL: admin.photoURL,
				message: `data:image/jpg;base64,${result.base64}`,
				messageType: "image",
				createdAt: serverTimestamp()
			};
			await addDoc(chatsRef, messageDetails);
			setSending(false);
		}
	}

	const messagesKeyExtractor = (item) => item.id;

	const messagesRenderItem = ({ item }) => (
		item.data().senderId === user.uid ? (
			item.data().messageType === 'text' ? (
				<View style={{ width: '100%', marginVertical: 4 }}>
					<View style={{ alignSelf: "flex-end" }}>
						<View style={styles.chat}>
							<Paragraph style={{ textAlign: 'right' }}>{item.data().message}</Paragraph>
						</View>
					</View>
					<Caption style={{ textAlign: 'right', marginRight: 4 }}>{moment(item.data().createdAt?.toDate()).fromNow()}</Caption>
				</View>
			) : (
				<View style={{ alignSelf: 'flex-end', marginVertical: 4 }}>
					<View style={{ maxWidth: 280, maxHeight: 280, backgroundColor: "#E4E6EB" }}>
						<Image style={styles.chatImg} source={{ uri: item.data().message }} />
					</View>
					<Caption style={{ textAlign: 'right', marginRight: 4 }}>{moment(item.data().createdAt?.toDate()).fromNow()}</Caption>
				</View>
			)
		) : (
			item.data().messageType === 'text' ? (
				<View style={{ flexDirection: 'row', marginVertical: 4, alignItems: 'center' }}>
					{item.data().senderPhotoURL ? (
						<Avatar.Image source={{ uri: item.data().senderPhotoURL }} size={32} />
					) : (
						<Avatar.Icon icon="account" size={32} />
					)}
					<View style={{ marginLeft: 16, width: '100%' }}>
						<Text variant="labelMedium">
							{item.data().senderName}
						</Text>
						<View style={styles.chat}>
							<Paragraph>{item.data().message}</Paragraph>
						</View>
						<Caption>{moment(item.data().createdAt?.toDate()).fromNow()}</Caption>
					</View>
				</View>
			) : (
				<View style={{ marginVertical: 4 }}>
					<View style={{ maxWidth: 280, maxHeight: 280, backgroundColor: "#E4E6EB" }}>
						<Image style={styles.chatImg} source={{ uri: item.data().message }} />
					</View>
					<Caption>{moment(item.data().createdAt?.toDate()).fromNow()}</Caption>
				</View>
			)
		)
	)

	if (loading) {
		return <Spinner visible={loading} color={colors.primary} />
	}

	return (
		<SafeAreaView style={styles.container}>
			{admin && (
				<View style={styles.header}>
					{admin.photoURL ? (
						<Avatar.Image source={{ uri: admin.photoURL }} size={40} />
					) : (
						<Avatar.Icon icon="account" size={40} />
					)}
					<Text variant="labelLarge" style={{ marginLeft: 8 }}>Dr. {admin.firstname} {admin.lastname}</Text>
				</View>
			)}
			<Divider bold />
			<View style={styles.chatContainer}>
				{chatLoading ? (
					<View style={styles.loadingChat}>
						<Text variant="labelMedium">Fetching messages...</Text>
					</View>
				) : (
					<View style={styles.messagesContainer}>
						<FlatList
							data={chats?.docs || []}
							keyExtractor={messagesKeyExtractor}
							renderItem={messagesRenderItem}
							contentContainerStyle={{ justifyContent: 'flex-start', flexGrow: 1, flexDirection: 'column-reverse' }}
							style={{ flex: 1 }}
							automaticallyAdjustContentInsets
							inverted
						/>
					</View>
				)}
				<Divider bold />
				<TextInput
					style={styles.chatInput}
					placeholder="Enter a message..."
					onChangeText={handleTextChange}
					value={messageText}
					right={<TextInput.Icon disabled={sending} icon="send" size={24} onPress={handleSubmitChat} />}
					left={<TextInput.Icon icon="image-area" size={24} onPress={handleImageSend} />}
				/>
			</View>
		</SafeAreaView>
	)
}

export default Chat

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 16
	},
	chatContainer: {
		flex: 1,
		justifyContent: 'space-between',
		height: '100%',
	},
	loadingChat: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	messagesContainer: {
		flex: 1,
		padding: 16,
		height: '100%'
	},
	chat: {
		borderWidth: 1,
		borderColor: "#E4E6EB",
		backgroundColor: "#E4E6EB",
		alignSelf: "flex-start",
		borderRadius: 8,
		paddingVertical: 4,
		paddingHorizontal: 8
	},
	chatImg: {
		width: "100%",
		height: "100%",
		resizeMode: "contain",
		aspectRatio: 1,
	},
	chatInput: {
		backgroundColor: 'transparent',
		marginBottom: 4
	}
})