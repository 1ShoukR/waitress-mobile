import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router';
import { COLORS } from '../../../../constants';
import IndividualRestaurant from '../../../../components/RestaurantRelatedComponents/IndividualRestaurant';

const restaurantId = () => {
    const { restaurantId } = useLocalSearchParams();
  return (
    <>
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.primary}}>
        <ScrollView>
            <IndividualRestaurant restaurantId={restaurantId} />
        </ScrollView>
    </SafeAreaView>
    </>
  )
}

export default restaurantId

const styles = StyleSheet.create({})