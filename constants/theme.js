/*
This file is for the theme of the project.
Currently, these are pre-defined colors, fonts, sizes and shadows
that are NOT revolved around the Equimanager brand and theme.
They are placehlder values that will be changed in the future,
and are only here for the purpose of having a theme to work with.
These need to be changed to the Equimanager theme, and emulate
the webapp style/color scheme.
*/

const COLORS = {
	primary: '#D23D2B', // Warm Red
	secondary: '#8C9A5E', // Olive Green
	success: '#4CAE50', // Fresh Green
	info: '#FFC107', // Golden Yellow
	danger: '#C62828', // Deep Red
	warning: '#FFA726', // Orange

	gray100: '#F5F3EF', // Light Cream Beige
	gray200: '#E8E0DA', // Warm Light Gray
	gray300: '#D0C8BF', // Warm Gray
	gray400: '#B8B0A6', // Medium Warm Gray
	gray500: '#A0988E', // Darker Warm Gray
	gray600: '#888077', // Dark Warm Gray
	gray700: '#706A61', // Darker Warm Gray
	gray800: '#58524A', // Almost Black Warm Gray
	gray900: '#403C34', // Very Dark Warm Gray

	status1: '#4CAE50', // Status Fresh Green
	status2: '#FFC107', // Status Golden Yellow
	status3: '#D23D2B', // Status Warm Red
	status4: '#FFA726', // Status Orange
	status5: '#C62828', // Status Deep Red
	status6: '#8C9A5E', // Status Olive Green
	tags: '#A0988E', // Equal to gray500

	// Convenient aliases for theme colors
	tertiary: '#888077', // Equal to gray600
	black: '#000000', // Black
	white: '#FFFFFF', // White
	lightWhite: '#F5F3EF', // Equal to gray100
	lightGray: '#E8E0DA', // Equal to gray200
	gray2: '#D0C8BF', // Equal to gray300
	gray: '#B8B0A6', // Equal to gray400

	// Convenient definitions for commonly used variations of theme colors
	primaryDark: '#A53020', // Darker Shade of Warm Red
	primaryLight: '#FFF5E5', // Light Cream
	secondaryDark: '#6B7B47', // Dark Olive
	secondaryBackground: '#8C9A5E33', // Light Olive Green
	successDark: '#3E8E41', // Dark Fresh Green
	successBackground: '#4CAE5033', // Fresh Green Light
	successBadgeDark: '#357A38', // Darker Fresh Green
	successBadgeBackground: '#4CAE5026', // Fresh Green Lighter
	infoDark: '#CC9A06', // Dark Golden Yellow
	infoBackground: '#FFC10733', // Light Golden Yellow
	dangerDark: '#B21F1F', // Darker Deep Red
	dangerBackground: '#C6282833', // Light Deep Red
	warningDark: '#CC7A25', // Darker Orange
	warningBackground: '#FFA72633', // Light Orange
	draggableHoverBackground: '#FFF5E5', // Equal to primaryLight
	draggableHoverIcon: '#A53020', // Equal to primaryDark
	linkText: '#FFC107', // Equal to info
	mutedText: '#A0988E', // Equal to gray500
	inputPlaceholder: '#B8B0A6', // Equal to gray400
	cardBorder: '#E8E0DA', // Equal to gray200
};

const FONT = {
	branding: 'BarlowSemiCondensed-Bold',
};

const SIZES = {
	xSmall: 10,
	small: 12,
	medium: 16,
	large: 20,
	xLarge: 24,
	xxLarge: 32,
};

const SHADOWS = {
	small: {
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 2,
	},
	medium: {
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 5.84,
		elevation: 5,
	},
};

export { COLORS, FONT, SIZES, SHADOWS };
