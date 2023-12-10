import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { COLORS } from '../constants';

//TODO: Make button style more customizable
const PressableButton = ({ title, onPress, fontSize, status, icon, theme, appendIcon, disabled, loadingDelay, shadowStyle }) => {
	const [themeName, setThemeColor] = useState(COLORS[theme] ? theme : 'primary');
	const [color, setColor] = useState(disabled ? COLORS.gray200 : COLORS[themeName]);
	const [pressedColor, setPressedColor] = useState(disabled ? COLORS.gray200 : COLORS[themeName + 'Dark']);
	const [textColor, setTextColor] = useState(disabled ? COLORS.gray300 : COLORS.white);
	const [textSize, setTextSize] = useState(fontSize || 14);
	const [hasIcon, setHasIcon] = useState(icon ? true : false);
	const [isLoading, setIsLoading] = useState(null);
	const [delay, setDelay] = useState(loadingDelay || 0);
	const buttonStyle = {
			marginBottom: 16,
			...shadowStyle, // Apply the shadow style
		};

	useEffect(() => {
		setColor(disabled ? COLORS.gray200 : COLORS[themeName]);
		setPressedColor(disabled ? COLORS.gray200 : COLORS[themeName + 'Dark']);
		setTextColor(disabled ? COLORS.gray300 : COLORS.white);
	}, [disabled]);

	useEffect(() => {
		if (status === 'loading') {
			setIsLoading(true);
		} else if (status == 'succeeded') {
			setTimeout(() => {
				setIsLoading(false);
			}, delay);
		} else if (status === 'failed') {
			setIsLoading(false);
		}
	}, [status]);

	return (
		<Button
			mode="contained"
			buttonColor={color}
			textColor={textColor}
			uppercase={false}
			rippleColor={pressedColor}
			icon={hasIcon ? icon : null}
			loading={isLoading ? true : false}
			style={buttonStyle}
			contentStyle={{ height: 42 + textSize, flexDirection: appendIcon ? 'row-reverse' : 'row' }}
			labelStyle={{ fontSize: textSize, fontWeight: 'bold' }}
			onPress={onPress}
			disabled={disabled ? true : false}>
			{title}
		</Button>
	);

	// return (
	//     <Pressable
	//         style={({ pressed }) => [{ backgroundColor: pressed ? pressedColor : color, minHeight: 32 + textSize }, styles.button]}
	//         onPress={onPress}
	//         disabled={disabled ? true : false}
	//     >
	//         {isLoading ? (
	//             <ActivityIndicator size="small" color={COLORS.white} />
	//         ) : (
	//             <>
	//                 {hasIcon && !appendIcon && <FontAwesomeIcon icon={icon} color={textColor} size={textSize} />}
	//                 <Text style={{ color: textColor, fontSize: textSize, fontWeight: 'bold', textTransform: 'capitalize' }}>{title}</Text>
	//                 {hasIcon && appendIcon && <FontAwesomeIcon icon={icon} color={textColor} size={textSize} />}
	//             </>
	//         )}
	//     </Pressable>
	// );
};

const styles = StyleSheet.create({
	button: {
		borderRadius: 6,
		padding: 16,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 8,
		marginBottom: 16,
	},
});

export default PressableButton;
