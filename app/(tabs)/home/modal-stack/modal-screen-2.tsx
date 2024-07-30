import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ModalScreen2 = () => {
	const navigation = useNavigation();
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Modal screen 2</Text>
			<Button title="Close modal" onPress={() => navigation.goBack()} />
		</View>
	);
};

export default ModalScreen2;
