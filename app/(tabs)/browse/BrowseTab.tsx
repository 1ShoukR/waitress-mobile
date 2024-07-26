import { SafeAreaProvider } from "react-native-safe-area-context"
import {Text, View} from 'react-native'
import React, {useEffect} from "react"
import { useDispatch } from "react-redux";
import { setLastTab } from "../../../redux/authSlice"; 

const BrowseIndex = (): React.JSX.Element => {
    const dispatch = useDispatch()
    const handleTabChange = (tabName: string) => {
        dispatch(setLastTab(tabName));
    };
    useEffect(() => {
        let tabName = 'BrowsTab';
        handleTabChange(tabName);
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