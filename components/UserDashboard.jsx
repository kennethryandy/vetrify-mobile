import { StyleSheet, View } from 'react-native'
import { Surface, Text, TouchableRipple, useTheme } from 'react-native-paper'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const UserDashboard = () => {
	const navigation = useNavigation();
	const { colors } = useTheme();

	const navigateToPets = () => {
		navigation.navigate('Pets');
	}

	const navigateToAppointments = () => {
		navigation.navigate('Appointments');
	}

	return (
		<View style={{ marginTop: 24, paddingHorizontal: 16 }}>
			<View style={{ marginBottom: 8 }}>
				<Text variant='titleLarge'>
					Welcome to <Text style={{ color: colors.primary }}>Vetrify</Text>
				</Text>
				<Text variant='titleSmall'>
					An Online Information System for <Text style={{ color: '#008018' }}> Veterinary Clinic</Text>
				</Text>
			</View>

			<View style={styles.cardNavigations}>
				<Surface style={styles.cardSurface}>
					<TouchableRipple onPress={navigateToPets}>
						<View style={styles.cardNav}>
							<MaterialIcons
								name="pets"
								size={28}
								color={colors.primary}
							/>
							<Text variant="titleMedium" style={styles.cardText}>View Pets</Text>
							<MaterialCommunityIcons
								name="chevron-right"
								size={28}
							/>
						</View>
					</TouchableRipple>
				</Surface>
				<Surface style={styles.cardSurface}>
					<TouchableRipple onPress={navigateToAppointments}>
						<View style={styles.cardNav}>
							<MaterialCommunityIcons
								name="calendar-multiple-check"
								size={28}
								color={colors.secondary}
							/>
							<Text variant="titleMedium" style={styles.cardText}>Set Appointments</Text>
							<MaterialCommunityIcons
								name="chevron-right"
								size={28}
							/>
						</View>
					</TouchableRipple>
				</Surface>
			</View>

		</View>
	)
}

export default UserDashboard

const styles = StyleSheet.create({
	cardNavigations: {
		width: '100%',
		marginVertical: 8
	},
	cardSurface: {
		borderRadius: 8,
		width: '100%',
		overflow: 'hidden',
		marginBottom: 8
	},
	cardNav: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 24,
		borderRadius: 8,
		width: '100%',
	},
	cardText: {
		marginLeft: 16,
		flex: 1
	}
})