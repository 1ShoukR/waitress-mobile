import { View, Text,  StyleSheet } from 'react-native';
import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories, getLocalRestaurants, getTopRestaurants } from '../redux/thunk';
import HomepageButtons from './HomepageButtons';
import CategoriesComponent from './CategoriesComponent';
import TopRestaurantsComponent from './TopRestaurantsComponent';
import LocalRestaurantsComponent from './LocalRestaurantsComponent';
import { COLORS } from '../constants';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

const HomePageComponent = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const dispatch = useAppDispatch()
	const user = useAppSelector((state) => state?.auth);
	const localRestaurants = useAppSelector((state) => state?.restaurant)
	const topRestaurants = useAppSelector((state) => state?.restaurant?.topRestaurants)
	const apiToken = useAppSelector((state) => state?.auth?.apiToken);
	const foodCategories = useAppSelector((state) => state?.restaurant?.categories);


	React.useEffect((): ( () => void ) => {
		let isMounted: boolean = true;
		const fetchData = async (): Promise<void> => {
			setIsLoading(true);
			try {
				const promises = [
							dispatch(getLocalRestaurants({ latitude: user.latitude!, longitude: user.longitude!, apiToken: user.apiToken! })),
							dispatch(getTopRestaurants({ apiToken: user.apiToken! })),
							dispatch(getAllCategories({ apiToken: user.apiToken! })),
						] as const;
						await Promise.all(promises);
			} catch (error: unknown) {
				console.error('Error fetching data:', error);
			} finally {
				if (isMounted) {
					setIsLoading(false);
				}
			}
		};
		fetchData();
		return (): void => {
			isMounted = false;
		};
	}, [user.latitude, user.longitude, useAppDispatch, apiToken]);
	const categories = useAppSelector((state) => state?.restaurant?.categories);

	return (
		<View style={styles.container}>
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 20, marginTop: -30 }}>
				<Text style={{ fontSize: 25, fontWeight: 'bold', color: COLORS.black }}>Waitress</Text>
			</View>
			<HomepageButtons />
			<CategoriesComponent foodCategories={foodCategories} />
			<TopRestaurantsComponent isLoading={isLoading} topRestaurants={topRestaurants} />
			<LocalRestaurantsComponent isLoading={isLoading} localRestaurants={localRestaurants} />
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
