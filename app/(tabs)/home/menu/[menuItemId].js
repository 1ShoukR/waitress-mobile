import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';

const menuItemId = () => {
    const { menuItemId } = useLocalSearchParams();
    console.log('menuItemId', menuItemId);
  return (
    <View>
      <Text>[menuItemId]</Text>
    </View>
  )
}

export default menuItemId

const styles = StyleSheet.create({})