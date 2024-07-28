import React from 'react';
import { RefreshControl, SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../../constants';
import AccountScreenComponent from '../../../components/AccountScreenComponent';
import { loggedOut } from '../../../redux/authSlice';
import { router } from 'expo-router';
import { useAppDispatch } from 'redux/hooks';

const AccountScreen = (): React.JSX.Element => {
	const dispatch = useAppDispatch();
	const handleLogout = () => {
		dispatch(loggedOut())
		router.push('/')
	}
	return (
		<SafeAreaView style={styles.safeArea}>
			<ScrollView  refreshControl={<RefreshControl refreshing={false} onRefresh={() => console.log('Refreshed!')} />}>
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
		backgroundColor: COLORS.primary, 
	},
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
    logoutButton: {
        // backgroundColor: '#DCAE96',
        backgroundColor: COLORS.secondary,
        padding: 20,
        borderRadius: 10,
        margin: 20,
        alignItems: 'center',
    }
});

export default AccountScreen;
