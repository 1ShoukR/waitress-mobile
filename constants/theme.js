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
	primary: '#4C4ADD',
	secondary: '#1B2D4B',
	success: '#37C674',
	info: '#6765E2',
	danger: '#FE5050',
	warning: '#FE9700',

	gray100: '#F9F9FB',
	gray200: '#E7E9EF',
	gray300: '#C2C7D6',
	gray400: '#919AB6',
	gray500: '#6C799D',
	gray600: '#525C7A',
	gray700: '#394056',
	gray800: '#212431',
	gray900: '#101218',

	status1: '#18BCD4',
	status2: '#FD3772',
	status3: '#91D54A',
	status4: '#818FFF',
	status5: '#18AAF2',
	status6: '#FE8412',
	tags: '#6C799D', // Equal to gray500

	/*
      Convenient aliases for theme colors
  */
	tertiary: '#525C7A', // Equal to gray600
	black: '#000000',
	white: '#FFFFFF',
	lightWhite: '#F9F9FB', // Equal to gray100
	lightGray: '#E7E9EF', // Equal to gray200
	gray2: '#C2C7D6', // Equal to gray300
	gray: '#919AB6', // Equal to gray400

	/*
      Convenient definitions for commonly used variations of theme colors 
  */
	primaryDark: '#2624BC',
	primaryLight: '#DBDBF8',
	secondaryDark: '#182943',
	secondaryBackground: '#1B2D4B33',
	successDark: '#31B268',
	successBackground: '#37C67433',
	successBadgeDark: '#268A51',
	successBadgeBackground: '#37C67426',
	infoDark: '#39378B',
	infoBackground: '#6765E233',
	dangerDark: '#FE2F2F',
	dangerBackground: '#FE505033',
	warningDark: '#E58800',
	warningBackground: '#FE970033',
	draggableHoverBackground: '#F6F6FE',
	draggableHoverIcon: '#2624BC', // Equal to primaryDark
	linkText: '#6765E2', // Equal to info
	mutedText: '#6C799D', // Equal to gray500
	inputPlaceholder: '#919AB6', // Equal to gray400
	cardBorder: '#E7E9EF', // Equal to gray200
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
