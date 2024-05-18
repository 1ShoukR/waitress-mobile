import { View, Text, ScrollView, FlatList, Animated, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { Searchbar, Divider } from 'react-native-paper';
import SearchListComponent from './SearchListComponent';
import { useDispatch, useSelector } from 'react-redux';
import { getLocalRestaurants, getTopRestaurants } from '../redux/thunk';
import HomepageButtons from './HomepageButtons';
import CategoriesComponent from './CategoriesComponent';
import TopRestaurantsComponent from './TopRestaurantsComponent';
import LocalRestaurantsComponent from './LocalRestaurantsComponent';
import { COLORS } from '../constants';
import { client } from '../api/client';

const HomePageComponent = () => {
	const [isLoading, setIsLoading] = React.useState(false);
	const dispatch = useDispatch()
	const user = useSelector((state) => state?.auth);
	const localRestaurants = useSelector((state) => state?.restaurant)
	const topRestaurants = useSelector((state) => state?.restaurant?.topRestaurants)
	const apiToken = useSelector((state) => state?.auth?.apiToken);
	const foodCategories = ['Italian', 'Chinese', 'Indian', 'Mexican', 'Thai'];


	React.useEffect(() => {
		dispatch(getLocalRestaurants({ latitude: user.latitude, longitude: user.longitude, apiToken: apiToken }));
		dispatch(getTopRestaurants({ apiToken: apiToken }));
	}, [user.latitude, user.longitude, dispatch]);


	return (
		<View style={styles.container}>
			<View style={{flex: 1, justifyContent: 'center', alignItems: "center", marginBottom: 20, marginTop: -30}}>
				<Text style={{ fontSize: 25, fontWeight: 'bold', color: COLORS.primary, }}>Waitress</Text>
			</View>
			<HomepageButtons />
			<CategoriesComponent foodCategories={foodCategories} />
			<TopRestaurantsComponent topRestaurants={topRestaurants} />
			<LocalRestaurantsComponent localRestaurants={localRestaurants}/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 5,
	},
	categoryContainer: {
		flex: 1,
		marginBottom: 10,
	},
	columnsContainer: {
		flexDirection: 'row',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		gap: 4,
	},
	column: {
		flexDirection: 'column',
		// flex: 1,
		alignItems: 'center',
		justifyContent: 'space-around',
		gap: 2,
	},
	button: {
		padding: 15,
		backgroundColor: '#eee',
		borderRadius: 5,
		marginBottom: 0,
		width: 180,
		borderWidth: 1,
		borderColor: 'black',
	},
});



export default HomePageComponent;
