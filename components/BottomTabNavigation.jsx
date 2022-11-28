import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons, MaterialIcons } from 'react-native-vector-icons';
import Dashboard from '../screens/Dashboard';
import { useTheme } from 'react-native-paper';
import Profile from '../screens/Profile';
import Pets from '../screens/Pets';
import ChatList from '../screens/ChatList';
import AppointmentScreen from '../screens/Appointments/AppointmentScreen';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import Users from '../screens/Admin/Users';
import Spinner from 'react-native-loading-spinner-overlay';

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigation = () => {
	const { user, loading } = useContext(AuthContext);
	const { colors } = useTheme();

	if (loading) {
		return <Spinner visible color={colors.primary} />
	}

	return (
		// Bottom tab bar navigation screens
		<Tab.Navigator
			activeColor={colors.primary}
			inactiveColor={colors.secondary}
			barStyle={{ backgroundColor: colors.lightgray }}
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color }) => {
					let iconName;
					if (route.name === 'Home') {
						return <MaterialIcons name="pets" size={24} color={color} />
					} else if (route.name === 'Profile') {
						iconName = focused ? 'account-circle' : 'account-circle-outline';
					} else if (route.name === 'Appointment') {
						iconName = focused ? 'view-grid' : 'view-grid-outline';
					} else if (route.name === 'ChatList') {
						iconName = focused ? 'chat' : 'chat-outline';
					} else if (route.name === 'Pets') {
						iconName = focused ? 'dog' : 'dog';
					} else if (route.name === 'Users') {
						iconName = focused ? 'account-supervisor' : 'account-supervisor-outline';
					}
					return <MaterialCommunityIcons name={iconName} color={color} size={24} />
				}
			})}
		>
			<Tab.Screen name="Appointment" component={AppointmentScreen} />
			{user?.role === "admin" ? (
				<Tab.Screen name="Users" component={Users} />
			) : (
				<Tab.Screen name="Pets" component={Pets} />
			)}
			<Tab.Screen name="Home" component={Dashboard} />
			<Tab.Screen name="Profile" component={Profile} initialParams={null} />
			<Tab.Screen name="ChatList" component={ChatList} />
		</Tab.Navigator>
	)
}

export default BottomTabNavigation