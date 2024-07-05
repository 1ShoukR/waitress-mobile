import { Stack, router } from 'expo-router';
import { TouchableOpacity, View, Text } from 'react-native';
import { COLORS } from '../../../constants';
import { faArrowDown, faArrowLeft, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useSelector } from 'react-redux';



const HomeLayout = () => {
    const globalDarkmode = useSelector((state) => state.auth.darkmode);
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
                            headerShown: true, title: 'Reserve ', 
                            headerLeft: () => {
                                return (
                                    <TouchableOpacity>
                                        <View>
                                            <FontAwesomeIcon icon={faArrowLeft} color={globalDarkmode ? COLORS.lightModeText : COLORS.black} />
                                        </View>
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
                    <Stack.Screen name="restaurant/ViewOrderScreen" 
                    options={{
                        presentation: 'modal',
                        title: 'Checkout',
                        headerStyle: {
                            backgroundColor: COLORS.primary,
                        },
                        contentStyle: {
                            borderTopColor: COLORS.black,
                            borderTopWidth: 1,
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