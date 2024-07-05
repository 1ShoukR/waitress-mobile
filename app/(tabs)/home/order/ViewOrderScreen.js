import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react'
import { router, Stack } from 'expo-router'
import { COLORS } from '../../../../constants'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux';

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
                <FontAwesomeIcon size={24} icon={faArrowLeft} />
            </TouchableOpacity>
        )
    }}
    />
    <View>
      <Text>ViewOrderScreen</Text>
    </View>
    </>
  )
}

export default ViewOrderScreen

const styles = StyleSheet.create({})