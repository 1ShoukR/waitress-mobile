import { StyleSheet } from 'react-native';
import { COLORS, FONT, SIZES, SHADOWS } from '../../constants';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		paddingTop: 96,
		width: 400,
	},
	branding: {
		color: COLORS.lightModeText,
		fontFamily: FONT.branding,
		fontSize: 36,
		marginBottom: SIZES.xxLarge,
		paddingTop: 0,
		textAlign: 'center',
		top: 5,
	},
	headerContainer: {
		flexDirection: 'row', // Aligns children side by side
		alignItems: 'center', // Vertically centers the items
		justifyContent: 'flex-start', // Aligns items to the start of the container
		marginBottom: SIZES.xxLarge,
		marginLeft: 90,
	},
	brandingContainer: {
		justifyContent: 'center', // Centers the title vertically
		marginRight: 20,
		paddingRight: 20,
		paddingLeft: 5,
		paddingBottom: 10,
	},
	title: {
		color: COLORS.primary,
		fontSize: SIZES.xLarge,
		fontWeight: 600,
		marginBottom: SIZES.medium,
	},
	inputContainer: {
		marginBottom: SIZES.medium,
	},
	input: {
		//color: COLORS.gray800,
		marginBottom: SIZES.small,
		//outlineColor: COLORS.primary,
		overflow: 'hidden',
		backgroundColor: COLORS.lightModeText,
	},
	button: {
		marginBottom: 16,
		paddingVertical: 8,
	},
});

export default styles;
