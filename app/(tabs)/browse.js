import { SafeAreaProvider } from "react-native-safe-area-context"
import {Text, View} from 'react-native'

const BrowseIndex = () => {
    return (
        <SafeAreaProvider>
            <View>
                <Text>Hello</Text>
            </View>
        </SafeAreaProvider>
    )
}

export default BrowseIndex