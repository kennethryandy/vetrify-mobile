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
import { StatusBar } from 'expo-status-bar';
import AddPets from './screens/AddPets';
import AddPetLoading from './components/AddPetLoading';
import EditProfile from './screens/EditProfile';

const Stack = createStackNavigator();

const paperTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: "#2563EB",
		secondary: "#51DACF",
		tertiary: "#E8FFC1",
		lightgray: "#FEFAEC",
		success: "#28a745",
		warning: "#ffc107",
		info: "#17a2b8"
	}
}

export default function App () {
	const [user, loading] = useAuthState(auth);

	if (loading) {
		return <Spinner visible={loading} color={DefaultTheme.colors.primary} />;
	}

	return (
		<PaperProvider theme={paperTheme}>
			<StatusBar />
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
							<Stack.Screen name="AddPets" component={AddPets} options={{ headerShown: false }} />
							<Stack.Screen name="AddPetLoading" component={AddPetLoading} options={{ headerShown: false }} />
							<Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
							<Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
						</Stack.Navigator>
					</AuthProvider>
				)}
			</NavigationContainer>
		</PaperProvider>
	);
}
