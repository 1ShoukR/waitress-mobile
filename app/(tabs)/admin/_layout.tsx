import React from 'react';
import { Stack, router } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';
import {COLORS} from '../../../constants';
import { useAppSelector } from 'redux/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';



const AdminLayout = (): React.JSX.Element => {
    const globalDarkmode = useAppSelector((state) => state.auth.darkMode);
    return (
        <>
            <Stack>
                <Stack.Screen name='AdminScreen' options={{
                    headerShown: false
                }} />
                <Stack.Screen name="restaurant/[restaurantId]" options={{ 
                        headerShown: false, 
                        headerLeft: () => {
                            return (
                                <TouchableOpacity  onPress={() => {
                                    router.back();
                                }}>
                                    <View>
                                        <FontAwesomeIcon style={{ padding: 10 }} size={25} color={globalDarkmode ? COLORS.lightModeText : COLORS.black} icon={faArrowLeft} />
                                    </View>
                                </TouchableOpacity>
                            )
                        }
                        }} />
                <Stack.Screen name="restaurant/floorplan/NewFloorplan" options={{ 
                        title: 'New Floorplan',
                        headerShown: false,
                        headerStyle: {
                            backgroundColor: globalDarkmode ? COLORS.black : COLORS.white
                        },
                        headerTintColor: globalDarkmode ? COLORS.lightModeText : COLORS.black
                    }} />
                <Stack.Screen name="restaurant/floorplan/[floorplanId]" options={{ 
                        title: 'New Floorplan',
                        headerStyle: {
                            backgroundColor: globalDarkmode ? COLORS.black : COLORS.white
                        },
                        headerTintColor: globalDarkmode ? COLORS.lightModeText : COLORS.black
                    }} />
            </Stack>
        </>
    )
}

export default AdminLayout;