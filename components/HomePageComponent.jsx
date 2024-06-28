import { View, Text, ScrollView, FlatList, Animated, TouchableOpacity, StyleSheet } from 'react-native';
import React, {useState} from 'react';
import { Searchbar, Divider } from 'react-native-paper';
import SearchListComponent from './SearchListComponent';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories, getLocalRestaurants, getTopRestaurants } from '../redux/thunk';
import HomepageButtons from './HomepageButtons';
import CategoriesComponent from './CategoriesComponent';
import TopRestaurantsComponent from './TopRestaurantsComponent';
import LocalRestaurantsComponent from './LocalRestaurantsComponent';
import { COLORS } from '../constants';

const HomePageComponent = () => {
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch()
	const user = useSelector((state) => state?.auth);
	const localRestaurants = useSelector((state) => state?.restaurant)
	const topRestaurants = useSelector((state) => state?.restaurant?.topRestaurants)
	const apiToken = useSelector((state) => state?.auth?.apiToken);
	const foodCategories = useSelector((state) => state?.restaurant?.categories);


	React.useEffect(() => {
		let isMounted = true;
		const fetchData = async () => {
			setIsLoading(true);
			try {
				// For some reason, await here works to show and set the isLoading state
				// so please do not remove these await keywords until we find a better solution
				await dispatch(getLocalRestaurants({ latitude: user.latitude, longitude: user.longitude, apiToken }));
				await dispatch(getTopRestaurants({ apiToken }));
				await dispatch(getAllCategories({ apiToken: apiToken }));

			} catch (error) {
				console.error('Error fetching data:', error);
			} finally {
				if (isMounted) {
					setIsLoading(false);
				}
			}
		};
		fetchData();
		return () => {
			isMounted = false;
		};
	}, [user.latitude, user.longitude, dispatch, apiToken]);
	const categories = useSelector((state) => state?.restaurant?.categories);
	console.log('categories', categories);

	return (
		<View style={styles.container}>
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 20, marginTop: -30 }}>
				<Text style={{ fontSize: 25, fontWeight: 'bold', color: COLORS.black }}>Waitress</Text>
			</View>
			<HomepageButtons />
			<CategoriesComponent foodCategories={foodCategories} />
			<TopRestaurantsComponent setIsLoading={setIsLoading} isLoading={isLoading} topRestaurants={topRestaurants} />
			<LocalRestaurantsComponent localRestaurants={localRestaurants} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
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
