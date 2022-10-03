import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';
import { app } from './firebase-config';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

const auth = getAuth();

export default function App () {
	const [user, loading] = useAuthState(auth);

	return (
		<PaperProvider theme={DefaultTheme}>
			<Spinner visible={loading} color={DefaultTheme.colors.primary} />
			<View style={styles.container}>
				<Text>Open up App.js to start working on your app!</Text>
				<StatusBar style="auto" />
			</View>
		</PaperProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
