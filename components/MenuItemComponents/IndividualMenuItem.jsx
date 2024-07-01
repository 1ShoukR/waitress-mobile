import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const IndividualMenuItem = ({menuItem}) => {
  return (
		<View>
			<Text>{menuItem.NameOfItem}</Text>
		</View>
	);
}

export default IndividualMenuItem

const styles = StyleSheet.create({})