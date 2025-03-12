import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import { Floorplan } from 'types/types'

const MOCK_FLOORPLANS: Floorplan[] = [
    { floorplanId: 1, restaurantId: 1, floorplanName: 'Main Dining', tableCount: 10, tables: [] },
    { floorplanId: 2, restaurantId: 1, floorplanName: 'Outdoor Patio', tableCount: 5, tables: [] },

]




const AdminManageFloorplan = () => {
    const {restaurantId} = useLocalSearchParams()
    const [floorplans, setFloorplans] = useState<Floorplan[]>(MOCK_FLOORPLANS)

    console.log('AdminIndividualFloorplanView id:', restaurantId)


    return (
        /* 
        Here we are going to design the Manage Floorplans screen for the admin.
        */
        <>
            <Stack.Screen
                options ={{
                    headerShown: false
                }}
            />
            <View style={styles.container}>
                <Text>Hello</Text>
            </View>
        </>
  )
  
}
export default AdminManageFloorplan 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    }
})