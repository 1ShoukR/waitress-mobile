import { StyleSheet, ScrollView } from 'react-native'
import React, {useEffect} from 'react'
import { useLocalSearchParams } from 'expo-router'
import { RestaurantCategoryList } from '@components/CategoryScreenComponent/RestaurantCategoryList';
import client from 'api/client';
import { useAppSelector } from 'redux/hooks';
import { Restaurant } from 'types/types';

const CategoryScreen = (): React.JSX.Element => {
    const { CategoryId } = useLocalSearchParams();
    const [restaurants, setRestaurants] = React.useState<Restaurant[]>([]);
    const token = useAppSelector((state) => state.auth.token);
    console.log('CategoryId', CategoryId);
    useEffect(() => {
      async function fetchData() {
        const response = await client.post<Restaurant[]>(`/api/category/${CategoryId}/restaurants`, null, token);
        setRestaurants(response);
      }
      fetchData()
    },[])
    console.log('restaurants', restaurants);
  return (
    <ScrollView>
      <RestaurantCategoryList restaurants={restaurants} />
    </ScrollView>
  )
}

export default CategoryScreen

const styles = StyleSheet.create({})