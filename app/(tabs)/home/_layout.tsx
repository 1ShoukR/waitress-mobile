import React from 'react';
import { Stack, router } from 'expo-router';
import { TouchableOpacity, View, Text, Platform } from 'react-native';
import { COLORS } from '../../../constants';
import { faArrowDown, faArrowLeft, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useAppSelector } from 'redux/hooks';



const HomeLayout = (): React.JSX.Element => {
    const globalDarkmode = useAppSelector((state) => state.auth.darkMode);
    return (
			<>
				<Stack>
					<Stack.Screen name="BookingScreen" options={{ 
                        headerStyle: {
                            backgroundColor: COLORS.primary
                            }, 
                            headerTitleStyle: {
                                color: globalDarkmode ? COLORS.lightModeText : COLORS.black
                                },
                            headerShown: true, title: 'Reserve', 
                            headerLeft: () => {
                                return (
                                    <TouchableOpacity onPress={() => {
                                        router.back();
                                    }}>
                                            <FontAwesomeIcon style={ Platform.OS == "android" ? {marginRight: 10} : {marginRight: 0}} icon={faArrowLeft} color={globalDarkmode ? COLORS.lightModeText : COLORS.black} />
                                    </TouchableOpacity>
                                )
                            }
                            }} />
                    <Stack.Screen name="restaurant/[restaurantId]" options={{ 
                        headerStyle: {
                            backgroundColor: COLORS.primary
                            }, 
                            headerTitleStyle: {
                                color: globalDarkmode ? COLORS.lightModeText : COLORS.black
                                },
                            headerShown: true, 
                            title: 'Put Restaurant Name here', 
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
                    <Stack.Screen name="restaurant/modal" 
                    options={{
                        presentation: 'fullScreenModal',
                        title: 'Place Order',
                        headerStyle: {
                            backgroundColor: COLORS.primary,
                        },
                        headerLeft: () => {
                            return (
                                <TouchableOpacity onPress={() => router.back()}>
                                    <FontAwesomeIcon icon={faChevronDown} size={25}/>
                                </TouchableOpacity>
                            )
                        }
                        }} />
				</Stack>
			</>
		);
} 

export default HomeLayout