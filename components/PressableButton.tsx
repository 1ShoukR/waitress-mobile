import React, { useEffect, useState } from 'react';
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Button } from 'react-native-paper';
import { COLORS, ColorTheme } from '../constants';

type ButtonProps = {
	title: string;
	onPress: () => void;
	fontSize?: number;
	status?: 'loading' | 'succeeded' | 'failed' | null;
	icon?: any;
	theme?: ColorTheme;
	appendIcon?: boolean;
	disabled?: boolean;
	loadingDelay?: number;
	shadowStyle?: ViewStyle;
};

function isColorKey(key: string): key is ColorTheme {
	return key in COLORS;
}


const PressableButton: React.FC<ButtonProps> = ({ title, onPress, fontSize, status, icon, theme = 'primary', appendIcon, disabled, loadingDelay, shadowStyle }) => {
	const [themeName, setThemeColor] = useState<ColorTheme>(theme);
	const [color, setColor] = useState<string>(disabled ? COLORS.gray200 : COLORS[themeName]);
	const [pressedColor, setPressedColor] = useState<string>(disabled ? COLORS.gray200 : isColorKey(themeName + 'Dark') ? COLORS[themeName] : COLORS.primaryDark);
	const [textColor, setTextColor] = useState<string>(disabled ? COLORS.gray300 : COLORS.lightModeText);
	const [textSize, setTextSize] = useState<number>(fontSize || 14);
	const [hasIcon, setHasIcon] = useState<boolean>(Boolean(icon));
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [delay, setDelay] = useState<number>(loadingDelay || 0);

	const buttonStyle: ViewStyle = {
		marginBottom: 16,
		...shadowStyle, // Apply the shadow style
	};

	useEffect(() => {
		setColor(disabled ? COLORS.gray200 : COLORS[themeName]);
		setPressedColor(disabled ? COLORS.gray200 : isColorKey(themeName + 'Dark') ? COLORS[themeName] : COLORS.primaryDark);
		setTextColor(disabled ? COLORS.gray300 : COLORS.lightModeText);
	}, [disabled, themeName]);

	useEffect(() => {
		if (status === 'loading') {
			setIsLoading(true);
		} else if (status === 'succeeded') {
			setTimeout(() => {
				setIsLoading(false);
			}, delay);
		} else if (status === 'failed') {
			setIsLoading(false);
		}
	}, [status, delay]);

	return (
		<Button
			mode="contained"
			buttonColor={color}
			textColor={textColor}
			uppercase={false}
			rippleColor={pressedColor}
			icon={hasIcon ? icon : null}
			loading={isLoading}
			style={buttonStyle}
			contentStyle={{ height: 42 + textSize, flexDirection: appendIcon ? 'row-reverse' : 'row' }}
			labelStyle={{ fontSize: textSize, fontWeight: 'bold' } as TextStyle}
			onPress={onPress}
			disabled={disabled}>
			{title}
		</Button>
	);
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
