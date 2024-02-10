import { View, Text, ScrollView, FlatList, Animated, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { Searchbar, Divider } from 'react-native-paper';
import SearchListComponent from './SearchListComponent';
import { useDispatch, useSelector } from 'react-redux';
import { getLocalRestaurants } from '../redux/thunk';
import HomepageButtons from './HomepageButtons';
import CategoriesComponent from './CategoriesComponent';

const HomePageComponent = () => {
	const [searchQuery, setSearchQuery] = React.useState('');
	const [locationQuery, setLocationQuery] = React.useState('');
	const [isSearchFocused, setIsSearchFocused] = React.useState(false);
	const [displayData, setDisplayData] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(false);
	const fadeAnim = new Animated.Value(1); // Initial opacity value
	const user = useSelector((state) => state?.auth);
	const dispatch = useDispatch()
	console.log('user', user);
	const localRestaurants = useSelector((state) => state?.restaurant)
	console.log('local restaurant', localRestaurants?.localRestaurants?.data);

	const foodCategories = ['Italian', 'Chinese', 'Indian', 'Mexican', 'Thai'];
	const topRestaurants = ['Restaurant A', 'Restaurant B', 'Restaurant C'];

	const filteredData = React.useMemo(() => {
		if (searchQuery === '') {
			return foodCategories;
		} else {
			return [
				...foodCategories.filter((category) => category.toLowerCase().includes(searchQuery.toLowerCase())),
				...topRestaurants.filter((restaurant) => restaurant.toLowerCase().includes(searchQuery.toLowerCase())),
			];
		}
	}, [searchQuery, foodCategories, topRestaurants]);

	React.useEffect(() => {
		dispatch(getLocalRestaurants({ latitude: user.latitude, longitude: user.longitude }));
	}, [user.latitude, user.longitude, dispatch]);

	const onChangeSearch = (query) => setSearchQuery(query);
	const onChangeLocation = (query) => setLocationQuery(query);

	return (
		<View style={styles.container}>
			<HomepageButtons />
			<View style={styles.categoryContainer}>
				<CategoriesComponent foodCategories={foodCategories} />
			</View>

			<View style={{ marginBottom: 20 }}>
				<Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Restaurants</Text>
				{topRestaurants.map((restaurant, index) => (
					<Text key={index} style={{ marginVertical: 5, padding: 10, backgroundColor: '#f0f0f0', borderRadius: 5 }}>
						{restaurant}
					</Text>
				))}
			</View>

			<View>
				<Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Local Restaurants</Text>
				{localRestaurants?.localRestaurants?.data?.map((restaurant, index) => (
					<Text key={index} style={{ marginVertical: 5, padding: 10, backgroundColor: '#f0f0f0', borderRadius: 5 }}>
						{restaurant?.name}
					</Text>
				))}
			</View>
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
