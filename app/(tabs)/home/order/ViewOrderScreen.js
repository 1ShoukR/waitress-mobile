import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import React from 'react'
import { router, Stack } from 'expo-router'
import { COLORS } from '../../../../constants'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux';
import OrderPageComponenet from '../../../../components/OrderPageComponent';

const ViewOrderScreen = () => {
    const currentOrder = useSelector((state) => state?.orders?.order);
    console.log('currentOrder', currentOrder)
  return (
    <>
    <Stack.Screen 
    options={{
        headerTitle: 'Your Order',
        headerStyle: {
            backgroundColor: COLORS.primary
        },
        headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
                <FontAwesomeIcon style={ Platform.OS == "android" ? {marginRight: 10} : {marginRight: 0}} size={24} icon={faArrowLeft} />
            </TouchableOpacity>
        )
    }}
    />
    <View style={styles.container}>
      <OrderPageComponenet />
    </View>
    </>
  )
}

export default ViewOrderScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
    }
})