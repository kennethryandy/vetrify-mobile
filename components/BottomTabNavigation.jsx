import { View, Text } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Dashboard from '../screens/Dashboard';
import { useTheme } from 'react-native-paper';
import Profile from '../screens/Profile';

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
					} else if (route.name === 'Appointments') {
						iconName = focused ? 'view-grid' : 'view-grid-outline';
					} else if (route.name === 'Chat') {
						iconName = focused ? 'chat' : 'chat-outline';
					}
					return <MaterialCommunityIcons name={iconName} color={color} size={24} />
				}
			})}
		>
			<Tab.Screen name="Dashboard" component={Dashboard} />
			<Tab.Screen name="Appointments" component={DummyScreen} />
			<Tab.Screen name="Profile" component={Profile} />
			<Tab.Screen name="Chat" component={DummyScreen} />
		</Tab.Navigator>
	)
}

function DummyScreen () {
	return (
		<Text>Hello</Text>
	)
}

export default BottomTabNavigation