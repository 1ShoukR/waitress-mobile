import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { Restaurant } from 'types/types';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAppDispatch } from 'redux/hooks';
import { setShowAdminTabBackButton } from 'redux/routesSlice';

export const RestaurantListComponent = ({ restaurant }: { restaurant: Restaurant }) => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const handleRestaurantPress = () => {
        dispatch(setShowAdminTabBackButton(true))
        console.log('restaurant CLICK', restaurant)
        router.push(`/admin/restaurant/${restaurant.RestaurantId}`)
    }
  return (
    <TouchableOpacity onPress={handleRestaurantPress} style={styles.card}>
      <Image source={{ uri: restaurant.ImageURL }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{restaurant.Name}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{restaurant?.AverageRating?.toFixed(1)}</Text>
        </View>
        <Text style={styles.address}>{restaurant.Address}</Text>
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Ionicons name="restaurant-outline" size={16} color="#666" />
            <Text style={styles.detailText}>{restaurant.NumberOfTables} tables</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="call-outline" size={16} color="#666" />
            <Text style={styles.detailText}>{restaurant.Phone}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 120,
    height: 120,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  infoContainer: {
    flex: 1,
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  rating: {
    marginLeft: 5,
    fontSize: 14,
    color: '#666',
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 5,
    fontSize: 12,
    color: '#666',
  },
});