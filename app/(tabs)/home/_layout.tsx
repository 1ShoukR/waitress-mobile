import React, { useEffect, useState } from 'react';
import { Stack, router } from 'expo-router';
import { TouchableOpacity, View, Platform } from 'react-native';
import { COLORS } from '../../../constants';
import { faChevronLeft, faArrowLeft, faChevronDown, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { ExpoRouter } from 'expo-router/types/expo-router';
import { setPlaceOrderScreenHeaderIcon } from 'redux/miscSlice';



const HomeLayout = (): React.JSX.Element => {
    const globalDarkmode = useAppSelector((state) => state.auth.darkMode);
    const dispatch = useAppDispatch();
    const icon = useAppSelector((state) => state.misc.PlaceOrderScreenHeaderIcon);
	const handleIconChange = async () => {
		console.log('icon', icon);
		await dispatch(setPlaceOrderScreenHeaderIcon(faChevronDown));
		router.back();
	};

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
					<Stack.Screen name="FavoriteScreen" options={{ 
                        headerStyle: {
                            backgroundColor: COLORS.primary
                            }, 
                            headerTitleStyle: {
                                color: globalDarkmode ? COLORS.lightModeText : COLORS.black
                                },
                            headerShown: true, title: 'Favorites', 
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
                                <TouchableOpacity onPress={handleIconChange}>
                                    <FontAwesomeIcon icon={icon} size={25}/>
                                </TouchableOpacity>
                            )
                        }
                        }} />
				</Stack>
			</>
		);
} 

export default HomeLayout