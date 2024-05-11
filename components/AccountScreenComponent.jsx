import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS } from '../constants';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const AccountScreenComponent = () => {
	const Divider = () => <View style={styles.divider} />; // New Divider component

	const Section = ({ title, onPress, rightComponent }) => (
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

	const [memberSince, setMemberSince] = React.useState('');
	React.useEffect(() => {
		if (user) {
			setMemberSince(timeSinceCreatedAt(user.createdAt));
		}
	}, [user]);

	const timeSinceCreatedAt = (createdAt) => {
		const createdAtDate = new Date(createdAt);
		const now = new Date();
		const diff = now - createdAtDate;
		const seconds = Math.floor(diff / 1000);
		const minutes = Math.floor(seconds / 60);
		const hours = Math.floor(minutes / 60);
		const days = Math.floor(hours / 24);

		return days > 0 ? `${days} days ago` : hours > 0 ? `${hours} hours ago` : minutes > 0 ? `${minutes} minutes ago` : `${seconds} seconds ago`;
	};

	const user = useSelector((state) => state.auth);
	console.log('user', user);

	return (
		<View style={styles.container}>
			<View style={styles.userInfoContainer}>
				<TouchableOpacity onPress={() => console.log('Create future Image Upload Screen')}>
					<Image source={{ uri: 'https://avatar.iran.liara.run/public/8' }} style={styles.userImage} />
				</TouchableOpacity>
				<Text style={styles.userName}>
					{user?.firstName} {user?.lastName}
				</Text>
				<Text style={styles.memberSince}>Member Since {memberSince}</Text>
			</View>
			<Divider />
			<Section title="Edit Account" onPress={() => console.log('Navigate to Edit Account')} rightComponent={<FontAwesomeIcon color={COLORS.white} icon={faArrowRight} />} />
			<Section title="Payment" onPress={() => console.log('Navigate to Payment')} rightComponent={<FontAwesomeIcon color={COLORS.white} icon={faArrowRight} />} />
			<Section title="Waitress+" onPress={() => console.log('Navigate to Waitress+')} rightComponent={<FontAwesomeIcon color={COLORS.white} icon={faArrowRight} />} />
			<Section title="Gift Cards" onPress={() => console.log('Navigate to Gift Cards')} rightComponent={<FontAwesomeIcon color={COLORS.white} icon={faArrowRight} />} />
			<Section title="Push Notifications" onPress={() => console.log('Navigate to Push Notifications')} rightComponent={<FontAwesomeIcon color={COLORS.white} icon={faArrowRight} />} />
			<Section title="Linked Accounts" onPress={() => console.log('Navigate to Linked Accounts')} rightComponent={<FontAwesomeIcon color={COLORS.white} icon={faArrowRight} />} />
			<Section title="Support" onPress={() => console.log('Navigate to Support')} rightComponent={<FontAwesomeIcon color={COLORS.white} icon={faArrowRight} />} />
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
		color: COLORS.white,
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
		color: COLORS.white,
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
