import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { COLORS } from "../../../../constants";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { getSingleRestaurant } from "redux/thunk";
import { StaffManagement } from "@components/AdminScreenComponents/StaffManagement";

const IndividualRestaurantAdminScreen = () => {
  const token = useAppSelector((state) => state.auth.apiToken);
  const restaurant = useAppSelector((state) => state.restaurant.singleRestaurant);
  const { restaurantId } = useLocalSearchParams();
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (restaurantId) {
        dispatch(getSingleRestaurant({ restaurantId: restaurantId, apiToken: token }));
    }
  }, [restaurantId]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>{restaurant.Name}</Text>
      <StaffManagement restaurant={restaurant} />
      {/*
      <ReservationManagement restaurant={restaurant} />
      <FloorPlanManagement restaurant={restaurant} />
      <MenuManagement restaurant={restaurant} />
      <FinancialOverview restaurant={restaurant} />
      <AnalyticsOverview restaurant={restaurant} /> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    color: COLORS.black,
  },
});

export default IndividualRestaurantAdminScreen;