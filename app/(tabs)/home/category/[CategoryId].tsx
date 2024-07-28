import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect} from 'react'
import { useLocalSearchParams } from 'expo-router'

const CategoryScreen = (): React.JSX.Element => {
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