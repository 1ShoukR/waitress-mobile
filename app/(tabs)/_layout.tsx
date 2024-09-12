import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Animated } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from 'react-native';
import { Tabs, useRouter } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { setLastTab } from '../../redux/authSlice';
import { COLORS } from '../../constants';
import { setShowAccountTabBackButton, setShowAdminTabBackButton } from '../../redux/routesSlice';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useAppSelector } from 'redux/hooks';

const TabLayout = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const globalDarkmode = useAppSelector((state) => state.auth.darkMode);
	const authType = useAppSelector((state) => state.auth.authType);
	const [isAdmin, setIsAdmin] = useState<boolean>(authType === 'admin' || authType === 'manager' || authType === 'owner' || authType === 'dev');
	const [fadeAnim] = useState<Animated.Value>(new Animated.Value(0));
	const setTabHeaderButtonAccountScreen = useAppSelector((state) => state?.routes?.showAccountTabBackButton);
	const setAdminTabHeaderButton = useAppSelector((state) => state?.routes?.showAdminTabBackButton);

	useEffect(() => {
		if (setTabHeaderButtonAccountScreen) {
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 500,
				useNativeDriver: true,
			}).start();
		} else {
			fadeAnim.setValue(0);
		}
	}, [setTabHeaderButtonAccountScreen]);

	useEffect(() => {
		if (setAdminTabHeaderButton) {
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 500,
				useNativeDriver: true,
			}).start();
		} else {
			fadeAnim.setValue(0);
		}
	}, [setAdminTabHeaderButton]);

	return (
		<Tabs
			screenOptions={{
				tabBarStyle: {
					backgroundColor: '#121212',
				},
				tabBarActiveTintColor: COLORS.secondary,
				tabBarInactiveTintColor: COLORS.primary,
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
					tabBarIcon: ({ focused, color }) => <MaterialCommunityIcons color={color} size={28} name={focused ? 'home' : 'home-outline'} />,
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
					tabBarIcon: ({ focused, color }) => <MaterialCommunityIcons color={color} size={28} name={focused ? 'store-search' : 'store-search-outline'} />,
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
						color: globalDarkmode ? COLORS.lightModeText : COLORS.black,
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
										<FontAwesomeIcon style={{ marginLeft: 15, padding: 10 }} size={29} color={globalDarkmode ? COLORS.lightModeText : COLORS.black} icon={faArrowLeft} />
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
					tabBarIcon: ({ focused, color }) => <MaterialCommunityIcons color={color} size={28} name={focused ? 'account' : 'account-outline'} />,
				}}
			/>
			{isAdmin && (
				<Tabs.Screen
					name="admin"
					options={{
						headerStyle: {
							backgroundColor: COLORS.primary,
						},
						title: 'Admin Dashboard',
						headerTitleStyle: {
							color: globalDarkmode ? COLORS.lightModeText : COLORS.black,
						},
						headerLeft: () => {
							if (setAdminTabHeaderButton) {
								return (
									<Animated.View style={{ opacity: fadeAnim }}>
										<TouchableOpacity
											onPress={() => {
												dispatch(setShowAdminTabBackButton(false));
												router.back();
											}}>
											<FontAwesomeIcon style={{ marginLeft: 15, padding: 10 }} size={29} color={globalDarkmode ? COLORS.lightModeText : COLORS.black} icon={faArrowLeft} />
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
								Admin
							</Text>
						),
						tabBarIcon: ({ focused, color }) => <MaterialCommunityIcons color={color} size={28} name={focused ? 'account' : 'account-outline'} />,
					}}
				/>
			)}
		</Tabs>
	);
};

export default TabLayout;
