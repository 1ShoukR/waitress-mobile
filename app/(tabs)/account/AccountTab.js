import React from 'react';
import { RefreshControl, SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../../constants';
import { Tabs } from 'expo-router';
import AccountScreenComponent from '../../../components/AccountScreenComponent';

const AccountScreen = () => {
	return (
		<SafeAreaView style={styles.safeArea}>
			<ScrollView style={styles.scrollView} refreshControl={<RefreshControl refreshing={false} onRefresh={() => console.log('Refreshed!')} />}>
				<AccountScreenComponent />
				<TouchableOpacity>
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
