import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Animated } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from 'react-native';
import { Tabs, useRouter, Stack, useNavigation } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { setLastTab } from '../../redux/authSlice';
import { COLORS } from '../../constants';
import { setShowAccountTabBackButton } from '../../redux/routesSlice';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const TabLayout = () => {
	const router = useRouter();
	const dispatch = useDispatch();

	const authType = useSelector((state) => state.auth.authType);
	const [isAdmin, setIsAdmin] = useState(authType === 'admin' || authType === 'manager' || authType === 'owner' || authType === 'dev' ? true : false);
	const [visible, setVisible] = useState(false);
	const openMenu = () => setVisible(true);
	const closeMenu = () => setVisible(false);
	const setTabHeaderButtonAccountScreen = useSelector((state) => state?.routes?.showAccountTabBackButton);

	const handleTabChange = (tabName) => {
		dispatch(setLastTab(tabName));
	};

	// Animated value for fading
	const [fadeAnim] = useState(new Animated.Value(0));

	useEffect(() => {
		if (setTabHeaderButtonAccountScreen) {
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 500, // Duration of the fade-in
				useNativeDriver: true,
			}).start();
		} else {
			fadeAnim.setValue(0); // Reset the animation value when not showing
		}
	}, [setTabHeaderButtonAccountScreen]);

	return (
		<Tabs
			screenOptions={{
				tabBarStyle: {
					backgroundColor: '#121212',
				},
				tabBarActiveTintColor: COLORS.primary,
				tabBarInactiveTintColor: COLORS.white,
			}}>
			<Tabs.Screen
				name="home"
				options={{
					headerShown: false,
					tabBarLabel: ({ focused, color }) => (
						<Text
							style={{
								fontSize: 12,
								color: color,
								marginTop: -8,
								fontWeight: focused ? 'bold' : 'regular',
							}}>
							Home
						</Text>
					),
					tabBarIcon: ({ focused, color, size }) => <MaterialCommunityIcons color={color} size={28} name={focused ? 'home' : 'home-outline'} />,
				}}
			/>
			<Tabs.Screen
				name="browse"
				options={{
					title: '',
					tabBarLabel: ({ focused, color }) => (
						<Text
							style={{
								fontSize: 12,
								color: color,
								marginTop: -8,
								fontWeight: focused ? 'bold' : 'regular',
							}}>
							Browse
						</Text>
					),
					tabBarIcon: ({ focused, color, size }) => <MaterialCommunityIcons color={color} size={28} name={focused ? 'store-search' : 'store-search-outline'} />,
				}}
			/>
			<Tabs.Screen
				name="account"
				options={{
					headerStyle: {
						backgroundColor: COLORS.primary,
					},
					title: 'Account',
					headerShown: true,
					headerTitleStyle: {
						color: COLORS.white,
					},
					headerLeft: () => {
						if (setTabHeaderButtonAccountScreen) {
							return (
								<Animated.View style={{ opacity: fadeAnim }}>
									<TouchableOpacity
										onPress={() => {
											dispatch(setShowAccountTabBackButton(false));
											router.back();
										}}>
										<FontAwesomeIcon style={{ marginLeft: 15, padding: 10 }} size={29} color={COLORS.white} icon={faArrowLeft} />
									</TouchableOpacity>
								</Animated.View>
							);
						} else {
							return null;
						}
					},
					tabBarLabel: ({ focused, color }) => (
						<Text
							style={{
								fontSize: 12,
								color: color,
								marginTop: -8,
								fontWeight: focused ? 'bold' : 'regular',
							}}>
							Account
						</Text>
					),
					tabBarIcon: ({ focused, color, size }) => <MaterialCommunityIcons color={color} size={28} name={focused ? 'account' : 'account-outline'} />,
				}}
			/>
			{isAdmin ? (
				<Tabs.Screen
					name="admin/AdminTab"
					options={{
						headerStyle: {
							backgroundColor: COLORS.primary,
						},
						title: 'Admin',
						headerTitleStyle: {
							color: COLORS.white,
						},
						tabBarLabel: ({ focused, color }) => (
							<Text
								style={{
									fontSize: 12,
									color: color,
									marginTop: -8,
									fontWeight: focused ? 'bold' : 'regular',
								}}>
								Admin
							</Text>
						),
						tabBarIcon: ({ focused, color, size }) => <MaterialCommunityIcons color={color} size={28} name={focused ? 'account' : 'account-outline'} />,
					}}
				/>
			) : null}
		</Tabs>
	);
};

export default TabLayout;
