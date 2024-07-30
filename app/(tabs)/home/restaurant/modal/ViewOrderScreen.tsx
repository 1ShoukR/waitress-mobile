import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ViewOrderComponent from '../../../../../components/RestaurantRelatedComponents/ViewOrderComponent'
import { COLORS } from '../../../../../constants'

const ViewOrderScreen = (): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <ViewOrderComponent />
    </View>
  )
}

export default ViewOrderScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'flex-start',
    backgroundColor: COLORS.primary
  }
})