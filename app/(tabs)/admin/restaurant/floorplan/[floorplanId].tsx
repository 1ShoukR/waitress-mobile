import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'


const AdminIndividualFloorplanView = () => {
    const {id} = useLocalSearchParams()
    console.log('AdminIndividualFloorplanView id:', id)

  return (
    <View>
      <Text style={styles.container}>[AdminIndividualFloorplanView ]</Text>
    </View>
  )
}

export default AdminIndividualFloorplanView 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})