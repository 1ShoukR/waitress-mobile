import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import React from 'react'
import { router, Stack } from 'expo-router'
import { COLORS } from '../../../../constants'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'



const SupportScreen = () => {
    return (
        <>
        <Stack.Screen 
        options={{
            headerTitle: 'Support',
            headerStyle: {
                backgroundColor: COLORS.primary
            },
            headerLeft: () => (
                <TouchableOpacity style={ Platform.OS == "android" ? {marginRight: 10} : {marginRight: 0}} onPress={() => router.back()}>
                    <FontAwesomeIcon size={24} icon={faArrowLeft} />
                </TouchableOpacity>
            )
        }}
        />
        <View style={styles.container}>
          <Text>Support Screen</Text>
        </View>
        </>
      )

}


export default SupportScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
    }
})