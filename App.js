import Spinner from 'react-native-loading-spinner-overlay';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { auth } from './firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import BottomTabNavigation from './components/BottomTabNavigation';
import Signup from './screens/Signup';
import Profile from './screens/Profile';
import { AuthProvider } from './context/AuthContext';

const Stack = createStackNavigator();

const paperTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: "#2563EB",
		secondary: "#51DACF",
		tertiary: "#E8FFC1",
		lightgray: "#FEFAEC"
	}
}

export default function App () {
	const [user, loading] = useAuthState(auth);


	if (loading) {
		return <Spinner visible={loading} color={DefaultTheme.colors.primary} />;
	}

	return (
		<PaperProvider theme={paperTheme}>
			<NavigationContainer>
				{!user && !loading ? (
					<Stack.Navigator>
						<Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
						<Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
					</Stack.Navigator>
				) : (
					<AuthProvider authUser={user}>
						<Stack.Navigator>
							<Stack.Screen name="BottomTabNavigation" component={BottomTabNavigation} options={{ headerShown: false }} />
							<Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
							<Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
						</Stack.Navigator>
					</AuthProvider>
				)}
			</NavigationContainer>
		</PaperProvider>
	);
}
