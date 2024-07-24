import React, { memo, useMemo, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { COLORS } from "../constants";
import { useSelector } from "react-redux";

const OrderPageComponent = memo(() => {
  const placeholderImage = "https://via.placeholder.com/50";
  const currentOrder = useSelector((state) => state?.orders?.order);

  const calculateSubtotal = useCallback((items) => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, []);

  const calculateTax = useCallback((items) => {
    // 13% tax CAUSE THATS HOW WE DO IT IN THE 6IX
    return calculateSubtotal(items) * 0.13;
  }, [calculateSubtotal]);

  const calculateTotal = useCallback((items) => {
    return calculateSubtotal(items) + calculateTax(items) + 0.99;
  }, [calculateSubtotal, calculateTax]);

  const groupOrders = useCallback((currentOrder) => {
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
  }, []);

  const groupedOrders = useMemo(() => groupOrders(currentOrder), [currentOrder, groupOrders]);

  const renderedOrders = useMemo(() => {
    return Object.values(groupedOrders).map((group) => (
      <TouchableOpacity key={group.restaurant.RestaurantId}>
        <View style={styles.orderContainer}>
          {/* Restaurant header */}
          <View style={styles.orderHeader}>
            <Image
              source={{ uri: group.restaurant.ImageURL }}
              style={styles.restaurantImage}
            />
            <View style={{ marginHorizontal: 10 }}>
              <Text style={styles.orderName}>{group.restaurant.Name}</Text>
              <Text style={styles.storeAddress}>{group.restaurant.Address}</Text>
            </View>
          </View>

          {/* Order items */}
          <View style={styles.fullOrder}>
            {group.items.map((item, index) => (
              <View key={index} style={styles.orderDetails}>
                <View style={styles.orderItems}>
                  <Text style={styles.itemsText}>{item.itemName}</Text>
                  <Text style={{ fontWeight: "bold" }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Text>
                </View>
                <Image
                  source={{ uri: item.imageUrl || placeholderImage }}
                  style={styles.restaurantImage}
                />
              </View>
            ))}
          </View>

          {/* Order total */}
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

          {/* Order status */}
          <View style={styles.orderStatusContainer}>
            <Text style={styles.orderStatus}>
              Order Status: Your Table Is Ready!
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    ));
  }, [groupedOrders, calculateSubtotal, calculateTax, calculateTotal]);

  return (
    <ScrollView style={styles.container}>
      {renderedOrders}
    </ScrollView>
  );
});

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

export default OrderPageComponent;