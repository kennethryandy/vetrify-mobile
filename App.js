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
import Chat from './screens/Chat';
import SetAppointments from './screens/Appointments/SetAppointments';
import AddAppointmentLoading from './components/AddAppointmentLoading';
import ChatList from './screens/ChatList';
import PetProfile from './screens/PetProfile';
import EditPetProfile from './screens/EditPetProfile';
import UserProfile from './screens/Admin/UserProfile';

const Stack = createStackNavigator();

// react native paper theme para nindot ang UI, naa dre ang color palette
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
		info: "#17a2b8",
		muted: "#6c757d"
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
					// If no logged in user, only login and signup screen are available
					<Stack.Navigator>
						<Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
						<Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
					</Stack.Navigator>
				) : (
					// If user is logged in all the screens below will be available
					<AuthProvider authUser={user}>
						<Stack.Navigator>
							<Stack.Screen name="BottomTabNavigation" component={BottomTabNavigation} options={{ headerShown: false }} />
							<Stack.Screen name="Home" component={Dashboard} options={{ headerShown: false }} />
							<Stack.Screen name="AddPets" component={AddPets} options={{ headerShown: false }} />
							<Stack.Screen name="AddPetLoading" component={AddPetLoading} options={{ headerShown: false }} />
							<Stack.Screen name="PetProfile" component={PetProfile} options={{ headerShown: false }} />
							<Stack.Screen name="EditPetProfile" component={EditPetProfile} options={{ headerShown: false }} />
							<Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
							<Stack.Screen name="UserProfile" component={UserProfile} options={{ headerShown: false }} />
							<Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
							<Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
							<Stack.Screen name="ChatList" component={ChatList} options={{ headerShown: false }} />
							<Stack.Screen name="SetAppointments" component={SetAppointments} options={{ headerShown: false }} />
							<Stack.Screen name="AddAppointmentLoading" component={AddAppointmentLoading} options={{ headerShown: false }} />
						</Stack.Navigator>
					</AuthProvider>
				)}
			</NavigationContainer>
		</PaperProvider>
	);
}
