import React from 'react';
import { View, StyleSheet } from 'react-native';

export const Divider = ({ width = 1, orientation = 'horizontal', color = '#DFE4EA', dividerStyle }) => {
	const isHorizontal = orientation === 'horizontal';
	const dividerStyles = [
		styles.divider,
		{
			width: isHorizontal ? '100%' : width,
			height: isHorizontal ? width : '100%',
			backgroundColor: color,
		},
		dividerStyle,
	];

	return <View style={dividerStyles} />;
};

const styles = StyleSheet.create({
	divider: {
		marginVertical: 8,
        
	},
});
