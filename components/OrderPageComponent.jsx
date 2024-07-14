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
import React, { useMemo, useCallback } from "react";
import { COLORS } from "../constants";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSelector } from "react-redux";
import { current } from "@reduxjs/toolkit";

const OrderPageComponenet = () => {
  const placeholderImage = "https://via.placeholder.com/50";

  const calculateSubtotal = (items) => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateTax = (items) => {
    return calculateSubtotal(items) * 0.13;
  };

  const calculateTotal = (items) => {
    return calculateSubtotal(items) + calculateTax(items) + 0.99;
  };

  const currentOrder = useSelector((state) => state?.orders?.order);

  const groupOrders = (currentOrder) => {
    return currentOrder.reduce((acc, item) => {
      const restaurantId = item.restaurant.RestaurantId;
      if (!acc[restaurantId]) {
        acc[restaurantId] = {
          restaurant: item.restaurant,
          items: [],
        };
      }
      acc[restaurantId].items.push(item);
      return acc;
    }, {});
  };

  const groupedOrders = useCallback(groupOrders(currentOrder), [currentOrder, groupOrders]);

  return (
    <ScrollView style={styles.container}>
      {Object.values(groupedOrders).map((group) => (
        <TouchableOpacity key={group.restaurant.RestaurantId}>
          {console.log(group.items)}
          <View style={styles.orderContainer}>
            <View style={styles.orderHeader}>
              <View>
                <Image
                  source={{ uri: group.restaurant.ImageURL }}
                  style={styles.restaurantImage}
                />
              </View>
              <View style={{ marginHorizontal: 10 }}>
                <Text style={styles.orderName}>{group.restaurant.Name}</Text>
                <Text style={styles.storeAddress}>
                  {group.restaurant.Address}
                </Text>
              </View>
            </View>

            <View style={styles.fullOrder}>
              {group.items.map((item, index) => (
                <View key={index} style={styles.orderDetails}>
                  <View style={styles.orderItems}>
                    <Text style={styles.itemsText}>{item.itemName}</Text>
                    {/* Add this part if the data returns potential add-ons like extra protien etc..
                    <Text style={{ fontSize: 10, marginLeft: 10 }}>
                      ${item.price.toFixed(2)}
                    </Text> */}
                    <Text style={{ fontWeight: "bold" }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Text>
                  </View>
                  <Image
                    source={{ uri: /*Maybe we need to add item.imageUrl?*/ item.imageUrl || placeholderImage }}
                    style={styles.restaurantImage}
                  />
                </View>
              ))}
            </View>

            <View style={styles.totalContainer}>
              <View>
                <Text style={styles.orderStatus}>Items Subtotal:</Text>
                <Text style={styles.orderStatus}>Other fees:</Text>
                <Text style={styles.orderStatus}>Tax:</Text>
                <Text style={styles.orderStatus}>Total:</Text>
              </View>
              <View>
              <Text>${calculateSubtotal(group.items).toFixed(2)}</Text>
            <Text>$0.99</Text>
            <Text>${calculateTax(group.items).toFixed(2)}</Text>
            <Text>${calculateTotal(group.items).toFixed(2)}</Text>
              </View>
            </View>

            <View style={styles.orderStatusContainer}>
              <Text style={styles.orderStatus}>
                Order Status: Your Table Is Ready!
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default OrderPageComponenet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  orderContainer: {
    flexDirection: "column",
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    backgroundColor: COLORS.gray100,
  },
  orderHeader: {
    borderBottomWidth: 1,
    marginBottom: 5,
    flexDirection: "row",
  },
  fullOrder: {
    borderBottomWidth: 1,
  },
  orderDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 7,
  },
  itemsText: {
    fontSize: 20,
  },
  restaurantImage: {
    width: 50,
    height: 50,
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
  },
  storeAddress: {
    marginBottom: 1,
  },
  orderItems: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "bold",
  },
  totalContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
});
