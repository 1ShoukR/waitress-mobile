import { SafeAreaProvider } from "react-native-safe-area-context"
import {Text, View} from 'react-native'
import React, {useEffect} from "react"
import { useDispatch } from "react-redux";
import { setLastTab } from "../../../redux/authSlice"; 

const BrowseIndex = () => {
    const dispatch = useDispatch()
    const handleTabChange = (tabName) => {
        dispatch(setLastTab(tabName));
        };
    useEffect(() => {
        handleTabChange(tabName = 'BrowsTab')
    })
    return (
        <SafeAreaProvider>
            <View>
                <Text>Hello</Text>
            </View>
        </SafeAreaProvider>
    )
}

export default BrowseIndex