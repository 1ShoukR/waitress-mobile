import { StyleSheet, Text, View, Animated, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { COLORS } from '../../constants';

const ViewOrderButton = () => {
	const order = useSelector((state) => state?.orders?.order);
	const fadeAnim = useRef(new Animated.Value(0)).current;
	const slideAnim = useRef(new Animated.Value(100)).current; // Initial position below the screen
	useEffect(() => {
		if (order.length > 0) {
			Animated.timing(slideAnim, {
				toValue: 0,
				duration: 300,
				useNativeDriver: true,
			}).start();
		} else {
			Animated.timing(slideAnim, {
				toValue: 100, // Slide back down
				duration: 300,
				useNativeDriver: true,
			}).start();
		}
	}, [order]);
	return (
		<Animated.View style={[styles.addToBagContainer, { transform: [{ translateY: slideAnim }] }]}>
			<TouchableOpacity onPress={console.log('bag')}>
				<View style={styles.addToBagButton}>
					<Text style={styles.addToBagText}>View Order ({`${order.length}`})</Text>
				</View>
			</TouchableOpacity>
		</Animated.View>
	);
};

export default ViewOrderButton;

const styles = StyleSheet.create({
	addToBagContainer: {
		position: 'absolute',
		bottom: 5, 
		left: 20, 
		right: 20, 
		alignItems: 'center',
		padding: 20,
		borderRadius: 10, 
		elevation: 5, 
	},
	addToBagButton: {
		backgroundColor: COLORS.secondary,
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 5,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '80%',
	},
	addToBagText: {
		color: COLORS.white,
		fontSize: 18,
		fontWeight: 'bold',
	},
});
