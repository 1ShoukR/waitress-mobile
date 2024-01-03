import { View, Text, ScrollView, FlatList, Animated } from 'react-native';
import React from 'react';
import { Searchbar, Divider } from 'react-native-paper';
import SearchListComponent from './SearchListComponent';

const HomePageComponent = () => {
	const [searchQuery, setSearchQuery] = React.useState('');
	const [locationQuery, setLocationQuery] = React.useState('');
	const [isSearchFocused, setIsSearchFocused] = React.useState(false);
	const [displayData, setDisplayData] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(false);
	const fadeAnim = new Animated.Value(1); // Initial opacity value

	const foodCategories = ['Italian', 'Chinese', 'Indian', 'Mexican', 'Thai'];
	const topRestaurants = ['Restaurant A', 'Restaurant B', 'Restaurant C'];
	const localRestaurants = ['Local Diner', 'Hometown Cafe', 'Neighborhood Grill'];

	React.useEffect(() => {
		if (searchQuery === '') {
			setDisplayData(foodCategories);
		} else {
			// Filter both categories and restaurants based on search query
			const filteredData = [
				...foodCategories.filter((category) => category.toLowerCase().includes(searchQuery.toLowerCase())),
				...topRestaurants.filter((restaurant) => restaurant.toLowerCase().includes(searchQuery.toLowerCase())),
			];
			setDisplayData(filteredData);
		}
	}, [searchQuery]);

	const onChangeSearch = (query) => setSearchQuery(query);
	const onChangeLocation = (query) => setLocationQuery(query);

	return (
		<View style={{ flex: 1, padding: 10 }}>
			<View
				style={{
					flexDirection: 'row',
					backgroundColor: 'white',
					borderRadius: 10,
					borderWidth: 1,
					padding: 2,
					borderColor: '#ddd',
					shadowColor: '#000',
					shadowOffset: { width: 0, height: 2 },
					shadowOpacity: 0.25,
					shadowRadius: 3.84,
					elevation: 5,
					marginBottom: 20, // Space between search section and list section
				}}>
				<Searchbar
					onFocus={() => setIsSearchFocused(true)}
					onBlur={() => setIsSearchFocused(false)}
					placeholder="Search"
					onChangeText={onChangeSearch}
					value={searchQuery}
					style={{ flex: 1, elevation: 0, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}
				/>
				{isSearchFocused? (
					<FlatList 
                    data={displayData} 
                    keyExtractor={(item, index) => index.toString()} 
                    renderItem={({ item }) => <SearchListComponent listItem={item} />} />
				): null}
				<Divider style={{ marginRight: 12, height: '100%', width: 1 }} />
				<Searchbar
					placeholder="Location"
					onChangeText={onChangeSearch}
					value={searchQuery}
					icon="map-marker"
					style={{ flex: 1, elevation: 0, borderTopRightRadius: 10, borderBottomRightRadius: 10 }}
				/>
			</View>

			<View style={{ marginBottom: 20 }}>
				<Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Category</Text>

				<ScrollView horizontal={true} style={{ flex: 1 }}>
					<View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
						{foodCategories.map((category, index) => (
							<Text key={index} style={{ margin: 5, padding: 5, backgroundColor: '#eee', borderRadius: 5 }}>
								{category}
							</Text>
						))}
					</View>
				</ScrollView>
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
				{localRestaurants.map((restaurant, index) => (
					<Text key={index} style={{ marginVertical: 5, padding: 10, backgroundColor: '#f0f0f0', borderRadius: 5 }}>
						{restaurant}
					</Text>
				))}
			</View>
		</View>
	);
};

export default HomePageComponent;
