import React from 'react';
import { RefreshControl, SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../../constants';
import { Tabs } from 'expo-router';
import AccountScreenComponent from '../../../components/AccountScreenComponent';
import { useDispatch } from 'react-redux';
import { loggedOut } from '../../../redux/authSlice';
import { router } from 'expo-router';

const AccountScreen = () => {
	const dispatch = useDispatch();
	const handleLogout = () => {
		dispatch(loggedOut())
		router.push('/')
	}
	return (
		<SafeAreaView style={styles.safeArea}>
			<ScrollView style={styles.scrollView} refreshControl={<RefreshControl refreshing={false} onRefresh={() => console.log('Refreshed!')} />}>
				<AccountScreenComponent />
				<TouchableOpacity onPress={handleLogout}>
					<View style={styles.logoutButton}>
						<Text style={{fontWeight: 'bold'}}>Log Out</Text>
					</View>
				</TouchableOpacity>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: '#2A2C3B', 
	},
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
    logoutButton: {
        backgroundColor: COLORS.primary,
        padding: 20,
        borderRadius: 10,
        margin: 20,
        alignItems: 'center',
    }
});

export default AccountScreen;
