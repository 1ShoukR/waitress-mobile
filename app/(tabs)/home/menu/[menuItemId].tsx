import { StyleSheet, Text, View, ActivityIndicator, Pressable, SafeAreaView, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { client } from '../../../../api/client';
import IndividualMenuItem from '../../../../components/MenuItemComponents/IndividualMenuItem';
import { COLORS } from '../../../../constants'
import { useAppSelector } from 'redux/hooks';
import { MenuItem, MenuItemResponse } from 'types/types';

const MenuItemDetails = (): React.JSX.Element => {
	const { menuItemId } = useLocalSearchParams();
	const [menuItem, setMenuItem] = useState<MenuItemResponse["MenuItem"]>();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const token =  useAppSelector((state) => state.auth.token);
	useEffect(() => {
		async function fetchMenuItem(): Promise<void> {
			try {
				const headers = { redirect: 'follow', referrerPolicy: 'no-referrer' };
				const response = await client.post<MenuItemResponse>(`/api/restaurant/menu/${menuItemId}/get`, null, token, { headers }
				);
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
			<>
				<Stack.Screen
					options={{
						title: `${menuItem?.NameOfItem ? menuItem.NameOfItem : 'Loading'}`,
						headerStyle: {
							backgroundColor: COLORS.primary,
						},
						headerLeft: () => (
							<Pressable
								style={({ pressed }) => [
									{
										backgroundColor: COLORS.primary,
										// padding: 10,
									},
								]}
								onPress={() => router.back()}>
								{/* <FontAwesomeIcon color={globalDarkmode ? COLORS.white : COLORS.black} icon={faArrowLeft} /> */}
								<FontAwesomeIcon size={25} color={COLORS.black} icon={faArrowLeft} />
							</Pressable>
						),
					}}
				/>
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" color={COLORS.black} />
				</View>
			</>
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
		<>
		<Stack.Screen  options={{
			title: `${menuItem.NameOfItem}`,
			headerStyle: {
				backgroundColor: COLORS.primary,
			},
			headerLeft: () => (
				<Pressable
					style={({ pressed }) => [
						{
							backgroundColor: COLORS.primary,
							// padding: 10,
						},
					]}
					onPress={() => router.back()}>
					{/* <FontAwesomeIcon color={globalDarkmode ? COLORS.white : COLORS.black} icon={faArrowLeft} /> */}
					<FontAwesomeIcon color={ COLORS.black } size={25}  icon={faArrowLeft} />
				</Pressable>
			),
		}} />

			<SafeAreaView style={{flex: 1, backgroundColor: COLORS.primary}}>
				<IndividualMenuItem menuItem={menuItem} />
			</SafeAreaView>
		</>
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
		backgroundColor: COLORS.primary,
	},
});
