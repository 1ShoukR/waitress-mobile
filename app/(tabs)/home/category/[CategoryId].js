import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const CategoryScreen = () => {
    const { CategoryId } = useLocalSearchParams();
    console.log('CategoryId', CategoryId);
    useEffect(() => {
      console.log('fetch for all category items')
    },[])
  return (
    <View>
      <Text>CategoryScreen</Text>
    </View>
  )
}

export default CategoryScreen

const styles = StyleSheet.create({})