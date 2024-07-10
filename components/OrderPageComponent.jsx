import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  FlatList,
  SafeAreaView,
} from "react-native";
import React, { memo } from "react";
import { COLORS } from "../constants";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";

const OrderPageComponenet = () => {
  const placeholderImage = "https://via.placeholder.com/150";

  return (
    // add for each order in case of multiple orders
    <SafeAreaView style={styles.container}>
      <TouchableOpacity>
        <View style={styles.orderContainer}>
          <View style={styles.orderContent}>
            <Text style={styles.orderName}>McDonalds</Text>
            <Text style={styles.storeAddress}>123 Mainstreet Ave.</Text>
            {/* Add a <Text> for each ordered item */}
            <Text style={styles.orderItems}>3x BigMac</Text>
            <Text style={styles.orderItems}>3x Large Fries</Text>
          </View>

          <View style={styles.imageContainer}>
            <Image
              source={{ uri: placeholderImage }}
              style={styles.restaurantImage}
            />
          </View>
        </View>
        <View style={styles.orderStatusContainer}>
          <Text style={styles.orderStatus}>
            Order Status: Your Table Is Ready!
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OrderPageComponenet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  orderContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    margin: 10,
  },
  orderContent: {
    flex: 1,
  },
  imageContainer: {
    marginLeft: 10,
  },
  restaurantImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  orderStatusContainer: {
    padding: 10,
    backgroundColor: "#CFCFCF",
    borderRadius: 10,
    marginHorizontal: 10,
  },
  orderStatus: {
    fontWeight: "bold",
  },
  orderName: {
    fontSize: 25,
    fontWeight: "bold",
    color: COLORS.yellow,
  },
  storeAddress: {
    color: '#61FFBF',
    fontSize: 11
  },
  orderItems: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: 'bold'
  }
});
