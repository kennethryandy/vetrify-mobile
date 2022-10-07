import { View, Text } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons, MaterialIcons } from 'react-native-vector-icons';
import Dashboard from '../screens/Dashboard';
import { useTheme } from 'react-native-paper';
import Profile from '../screens/Profile';
import Pets from '../screens/Pets';
import Chat from '../screens/Chat';
import ChatList from '../screens/ChatList';

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigation = () => {
	const { colors } = useTheme();

	return (
		<Tab.Navigator
			activeColor={colors.primary}
			inactiveColor={colors.secondary}
			barStyle={{ backgroundColor: colors.lightgray }}
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color }) => {
					let iconName;
					if (route.name === 'Dashboard') {
						iconName = focused ? 'home-circle' : 'home-circle-outline';
					} else if (route.name === 'Profile') {
						iconName = focused ? 'account-circle' : 'account-circle-outline';
					} else if (route.name === 'Appointment') {
						iconName = focused ? 'view-grid' : 'view-grid-outline';
					} else if (route.name === 'ChatList') {
						iconName = focused ? 'chat' : 'chat-outline';
					} else if (route.name === 'Pets') {
						return <MaterialIcons name="pets" size={24} color={color} />
					}
					return <MaterialCommunityIcons name={iconName} color={color} size={24} />
				}
			})}
		>
			<Tab.Screen name="Dashboard" component={Dashboard} />
			<Tab.Screen name="Appointment" component={DummyScreen} />
			<Tab.Screen name="Pets" component={Pets} />
			<Tab.Screen name="Profile" component={Profile} />
			{/* <Tab.Screen name="ChatList" component={ChatList} /> */}
			{/* <Tab.Screen name="ChatList" component={Chat} /> */}
		</Tab.Navigator>
	)
}

function DummyScreen () {
	return (
		<Text>Hello</Text>
	)
}

export default BottomTabNavigation