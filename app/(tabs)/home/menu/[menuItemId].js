import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { client } from '../../../../api/client';
import IndividualMenuItem from '../../../../components/MenuItemComponents/IndividualMenuItem';
import { COLORS } from '../../../../constants'

const MenuItemDetails = () => {
	const { menuItemId } = useLocalSearchParams();
	const [menuItem, setMenuItem] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchMenuItem() {
			try {
				const response = await client.post(`/api/restaurant/menu/${menuItemId}/get`, null, {
					headers: { redirect: 'follow', referrerPolicy: 'no-referrer' },
				});
        console.log('response', response)
				setMenuItem(response.MenuItem);
			} catch (error) {
				console.error('Error fetching menu item:', error);
			} finally {
				setIsLoading(false);
			}
		}
		fetchMenuItem();
	}, [menuItemId]);

	if (isLoading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color={COLORS.black} />
			</View>
		);
	}

	if (!menuItem) {
		return (
			<View style={styles.container}>
				<Text>No menu item found.</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
      		<IndividualMenuItem menuItem={menuItem} />
		</View>
	);
};

export default MenuItemDetails;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
