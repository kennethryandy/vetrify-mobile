import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Linking, Platform } from 'react-native';

export const useNotifications = () => {

	const registerForPushNotificationsAsync = async () => {
		let token = null;
		if (Device.isDevice) {
			const { status: existingStatus } = await Notifications.getPermissionsAsync();
			let finalStatus = existingStatus;
			if (existingStatus !== 'granted') {
				const { status } = await Notifications.requestPermissionsAsync();
				finalStatus = status;
			}
			if (finalStatus !== 'granted') {
				alert('Failed to get push token for push notification!');
				return;
			}
			token = (await Notifications.getExpoPushTokenAsync()).data;
		} else {
			alert('Must use physical device for Push Notifications');
		}

		if (Platform.OS === 'android') {
			Notifications.setNotificationChannelAsync('default', {
				name: 'default',
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [0, 250, 250, 250],
				lightColor: '#FF231F7C',
			});
		}
		return token;
	};

	// This listener is fired whenever a notification is received while the app is foregrounded
	const handleNotification = (notification) => {
		// could be useful if you want to display your own toast message
		// could also make a server call to refresh data in other part of the app
	};

	// This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
	const handleNotificationResponse = (response) => {
		const data = response.notification.request.content.data;
		console.log(data);
		if (data?.url) Linking.openURL(data.url);
	};

	// const handleScheduleNotification = async ({ content }) => {
	// 	await Notifications.scheduleNotificationAsync();
	// }

	return {
		registerForPushNotificationsAsync,
		handleNotification,
		handleNotificationResponse,
	};
}