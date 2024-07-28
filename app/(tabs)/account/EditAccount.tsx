import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import EditAccountComponent from '../../../components/EditAccount/EditAccountComponent'

const EditAccount = (): React.JSX.Element => {
  return (
    <>
      <EditAccountComponent />
    </>
  )
}

export default EditAccount

const styles = StyleSheet.create({})