import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'

const AdminDashboard = ({ admin }) => {
	return (
		<View>
			<Text variant='titleLarge'>
				Welcome back <Text style={{ color: colors.primary }}>{admin.lastname}</Text>
			</Text>
		</View>
	)
}

export default AdminDashboard

const styles = StyleSheet.create({})