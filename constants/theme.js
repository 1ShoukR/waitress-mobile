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
	primaryDark: '#2A2C3B', // DarkMode  (Dark Blue)
	primary: '#F0EAD6', // Eggshell White
	secondary: '#FF6F61', // Warm Coral

	primaryLight1: '#EF7874', // Lighter Shade of Secondary
	primaryLight2: '#F2918F', // Even Lighter Shade of Secondary
	primaryLight3: '#F5AAAA', // Much Lighter Shade of Secondary
	primaryLight4: '#F8C3C5', // Very Light Pink of Secondary
	primaryLight5: '#FBDDE0', // Near-White Pink of Secondary

	success: '#6B8E23', // Subdued Olive Green
	info: '#3B83BD', // Moderate Blue
	danger: '#C73E37', // Deeper Shade of Secondary
	warning: '#CC704D', // Burnt Orange

	gray100: '#F5F3EF', // Light Cream Beige
	gray200: '#E8E0DA', // Warm Light Gray
	gray300: '#D0C8BF', // Warm Gray
	gray400: '#B8B0A6', // Medium Warm Gray
	gray500: '#A0988E', // Darker Warm Gray
	gray600: '#888077', // Dark Warm Gray
	gray700: '#706A61', // Darker Warm Gray
	gray800: '#58524A', // Almost Black Warm Gray
	gray900: '#403C34', // Very Dark Warm Gray

	status1: '#6B8E23', // Subdued Olive Green
	status2: '#3B83BD', // Moderate Blue
	status3: '#EC5E5B', // Vibrant Pinkish Red
	status4: '#CC704D', // Burnt Orange
	status5: '#C73E37', // Deeper Shade of Secondary
	status6: '#669999', // Muted Teal
	tags: '#A0988E', // Equal to gray500

	// Convenient aliases for theme colors
	tertiary: '#888077', // Equal to gray600
	black: '#000000', // Black
	lightModeText: '#2A2C3B', // DarkMode  (Dark Blue)
	white: '#FFFFFF', // White
	lightWhite: '#F5F3EF', // Light Cream Beige
	lightGray: '#E8E0DA', // Equal to gray200
	gray2: '#D0C8BF', // Equal to gray300
	gray: '#B8B0A6', // Equal to gray400

	// Convenient definitions for commonly used variations of theme colors
	primaryDark: '#BF4E49', // Darker Shade of Secondary
	primaryLight: '#FFE5E2', // Light Pink (already existing)
	secondaryDark: '#507070', // Dark Muted Teal
	secondaryBackground: '#66999933', // Light Muted Teal
	successDark: '#597017', // Dark Subdued Olive
	successBackground: '#6B8E2333', // Light Subdued Olive
	successBadgeDark: '#4D621A', // Darker Subdued Olive
	successBadgeBackground: '#6B8E2326', // Lighter Subdued Olive
	infoDark: '#3271A6', // Dark Moderate Blue
	infoBackground: '#3B83BD33', // Light Moderate Blue
	dangerDark: '#A6332A', // Darker Deeper Shade of Secondary
	dangerBackground: '#C73E3733', // Light Deeper Shade of Secondary
	warningDark: '#A65A3B', // Darker Burnt Orange
	warningBackground: '#CC704D33', // Light Burnt Orange
	draggableHoverBackground: '#FFE5E2', // Equal to primaryLight
	draggableHoverIcon: '#BF4E49', // Equal to primaryDark
	linkText: '#3B83BD', // Equal to info
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
