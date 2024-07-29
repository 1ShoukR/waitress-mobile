import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRight, faMoon } from '@fortawesome/free-solid-svg-icons';
import { router } from 'expo-router';
import { setShowAccountTabBackButton } from '../redux/routesSlice';
import { setDarkMode } from '../redux/thunk';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

const AccountScreenComponent = (): React.JSX.Element => {
	const dispatch = useAppDispatch()
	const user = useAppSelector((state) => state.auth);
	const isDev = useAppSelector((state) => state.auth.authType);
	const [memberSince, setMemberSince] = React.useState<string | null>('');
	const [darkModeLocal, setDarkModeLocal] = React.useState<boolean>(false);
	const handleTabScreenHeaderButton = () => {
		dispatch(setShowAccountTabBackButton(true))

	}
	React.useEffect(() => {
		if (user) {
			setMemberSince(timeSinceCreatedAt(user?.createdAt!));
		}
	}, [user]);
	const Divider = () => <View style={styles.divider} />; // New Divider component
	const globalDarkMode = useAppSelector((state) => state.auth.darkMode);
	const Section = ({ title, onPress, rightComponent }: {title: string, onPress: () => void, rightComponent: React.JSX.Element}) => (
        <>
		<TouchableOpacity style={styles.sectionContainer} onPress={onPress}>
			<View style={styles.leftContainer}>
				<Text style={styles.sectionTitle}>{title}</Text>
			</View>
			<View style={styles.rightContainer}>{rightComponent}</View>
		</TouchableOpacity>
			<Divider />
        
        </>
	);


	const timeSinceCreatedAt = (createdAt: string): string => {
		const createdAtDate = new Date(createdAt).getTime();
		const now = new Date().getTime();
		const diff = now - createdAtDate;
		const seconds = Math.floor(diff / 1000);
		const minutes = Math.floor(seconds / 60);
		const hours = Math.floor(minutes / 60);
		const days = Math.floor(hours / 24);

		return days > 0 ? `${days} days ago` : hours > 0 ? `${hours} hours ago` : minutes > 0 ? `${minutes} minutes ago` : `${seconds} seconds ago`;
	};


	return (
		<View style={styles.container}>
			<View style={styles.userInfoContainer}>
				<TouchableOpacity onPress={(): void => console.log('Create future Image Upload Screen')}>
					<Image source={{ uri: 'https://avatar.iran.liara.run/public/8' }} style={styles.userImage} />
				</TouchableOpacity>
				<Text style={styles.userName}>
					{user?.firstName} {user?.lastName}
				</Text>
				<Text style={styles.memberSince}>Member Since {memberSince}</Text>
			</View>
			<Divider />
			<Section title="Edit Account" onPress={() => {
				handleTabScreenHeaderButton()
				router.push('/account/EditAccount');
			}} rightComponent={<FontAwesomeIcon color={globalDarkMode ? COLORS.lightModeText : COLORS.black } icon={faArrowRight} />} />
			<Section title="Payment" onPress={() => console.log('Navigate to Payment')} rightComponent={<FontAwesomeIcon color={ globalDarkMode ? COLORS.lightModeText : COLORS.black } icon={faArrowRight} />} />
			<Section title="Waitress+" onPress={() => console.log('Navigate to Waitress+')} rightComponent={<FontAwesomeIcon color={ globalDarkMode ? COLORS.lightModeText : COLORS.black } icon={faArrowRight} />} />
			<Section title="Gift Cards" onPress={() => console.log('Navigate to Gift Cards')} rightComponent={<FontAwesomeIcon color={ globalDarkMode ? COLORS.lightModeText : COLORS.black } icon={faArrowRight} />} />
			<Section title="Notifications" onPress={() => console.log('Navigate to Notifications')} rightComponent={<FontAwesomeIcon color={ globalDarkMode ? COLORS.lightModeText : COLORS.black } icon={faArrowRight} />} />
			<Section title="Linked Accounts" onPress={() => console.log('Navigate to Linked Accounts')} rightComponent={<FontAwesomeIcon color={ globalDarkMode ? COLORS.lightModeText : COLORS.black } icon={faArrowRight} />} />
			<Section title="Support" onPress={() => console.log('Navigate to Support')} rightComponent={<FontAwesomeIcon color={ globalDarkMode ? COLORS.lightModeText : COLORS.black } icon={faArrowRight} />} />
			{isDev === 'dev' && (
			<Section title="Dark Mode ( in development ) " onPress={() => {
				console.log('Toggle Dark Mode');
				const newDarkMode = !darkModeLocal;
				setDarkModeLocal(newDarkMode);
				dispatch(setDarkMode(newDarkMode));
			}} rightComponent={<FontAwesomeIcon color={globalDarkMode ? COLORS.lightModeText : COLORS.black} icon={faMoon} />} />
			)}
		</View>
	);
};

export default AccountScreenComponent;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		alignItems: 'center',
		padding: 20,
	},
	userInfoContainer: {
		alignItems: 'center',
		paddingBottom: 10,
		width: '110%',
	},
	leftContainer: {
		alignItems: 'center',
	},
	userImage: {
		width: 60,
		height: 60,
		borderRadius: 25,
		marginBottom: 10,
	},
	userName: {
		fontSize: 16,
		fontWeight: 'bold',
		color: COLORS.lightModeText, // chage to globalDarkMode ? COLORS.lightModeText : COLORS.lightModeText
	},
	memberSince: {
		fontSize: 14,
		color: 'gray',
		fontStyle: 'italic',
	},
	sectionContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '110%',
		padding: 25,
	},
	divider: {
		backgroundColor: 'gray',
		height: 1,
		width: '120%',
	},
	sectionTitle: {
		fontSize: 16,
		fontWeight: 'bold',
		color: COLORS.lightModeText, // chage to globalDarkMode ? COLORS.lightModeText : COLORS.lightModeText
	},
	rightText: {
		fontSize: 14,
		color: 'gray',
		fontStyle: 'italic',
	},
	rightContainer: {
		// Additional styles for the right container
	},
});
