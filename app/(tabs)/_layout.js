import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, View } from 'react-native';
import { Tabs, useRouter } from 'expo-router';
import { IconButton, Menu } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
// import { prepareReload } from '../../redux/horsesSlice';
import { COLORS } from '../../constants';

const TabLayout = () => {
	const router = useRouter();
	const dispatch = useDispatch();

	const authType = useSelector((state) => state.auth.authType);
	const [isAdmin, setIsAdmind] = useState(authType === 'admin' || authType === 'manager' || authType === 'owner' ? true : false);
	const [visible, setVisible] = useState(false);
	const openMenu = () => setVisible(true);
	const closeMenu = () => setVisible(false);


	// const onLogout = () => {
	// 	router.push('/');
	// 	dispatch(prepareReload());
	// };

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: COLORS.primary,
				tabBarInactiveTintColor: COLORS.dark,
				// headerLeft: () => (
				// 	<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
				// 		{/* <Menu visible={visible} onDismiss={closeMenu} anchor={<IconButton icon="account-circle" iconColor={COLORS.gray800} size={32} onPress={openMenu} />}>
				//             <Menu.Item style={{ backgroundColor: COLORS.primaryLight }} onPress={onLogout} leadingIcon="logout" title="Log out" disabled={false}/>
				//         </Menu> */}
				// 		<IconButton icon="logout" iconColor={COLORS.gray800} size={32} onPress={onLogout} />
				// 	</View>
				// ),
			}}>
			<Tabs.Screen
				name="home"
				options={{
					tabBarLabel: ({ focused, color }) => <Text style={{ fontSize: 12, color: color, marginTop: -8, fontWeight: focused ? 'bold' : 'regular' }}>Home</Text>,
					tabBarIcon: ({ focused, color, size }) => <MaterialCommunityIcons color={color} size={28} name={focused ? 'home' : 'home-outline'} />,
				}}
			/>
			<Tabs.Screen
				name="browse"
				options={{
					title: '',
					tabBarLabel: ({ focused, color }) => <Text style={{ fontSize: 12, color: color, marginTop: -8, fontWeight: focused ? 'bold' : 'regular' }}>Browse</Text>,
					tabBarIcon: ({ focused, color, size }) => <MaterialCommunityIcons color={color} size={28} name={focused ? 'store-search' : 'store-search-outline'} />,
				}}
			/>
			{/* {isAdmin ? (
				<Tabs.Screen
					name="breezes"
					options={{
						title: 'Breezes',
						tabBarLabel: ({ focused, color }) => <Text style={{ fontSize: 12, color: color, marginTop: -8, fontWeight: focused ? 'bold' : 'regular' }}>{t('common:breezes')}</Text>,
						tabBarIcon: ({ focused, color, size }) => <MaterialCommunityIcons color={color} size={28} name={focused ? 'timer' : 'timer-outline'} />,
					}}
				/>
			) : (
				<Tabs.Screen
					name="breezes"
					options={{
						href: null,
					}}
				/>
			)} */}
		</Tabs>
	);
};

export default TabLayout;
