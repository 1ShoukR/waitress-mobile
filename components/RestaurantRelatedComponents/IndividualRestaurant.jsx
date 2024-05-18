import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { getSingleRestaurant } from '../../redux/thunk'

const IndividualRestaurant = ({restaurantId}) => {
  const dispatch = useDispatch()
  const handleRestaurant = async () => {
    dispatch(getSingleRestaurant({restaurantId}))
  }
  return (
    <View>
      <TouchableOpacity onPress={handleRestaurant} style={{padding: 20}}>
        <Text>Get Restaurant</Text>
      </TouchableOpacity>
    </View>
  )
}

export default IndividualRestaurant

const styles = StyleSheet.create({})