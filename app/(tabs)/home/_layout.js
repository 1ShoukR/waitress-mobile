import { Stack, router } from 'expo-router';
import { TouchableOpacity, View, Text } from 'react-native';
import { COLORS } from '../../../constants';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';



const HomeLayout = () => {
    return (
			<>
				<Stack>
					<Stack.Screen name="BookingScreen" options={{ 
                        headerStyle: {
                            backgroundColor: COLORS.primary
                            }, 
                            headerTitleStyle: {
                                color: COLORS.white
                                },
                            headerShown: true, title: 'Reserve ', 
                            headerLeft: () => {
                                return (
                                    <TouchableOpacity>
                                        <View>
                                            <FontAwesomeIcon icon={faArrowLeft} color={COLORS.white} />
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
                                color: COLORS.white
                                },
                            headerShown: true, title: 'Put Restaurant Name here', 
                            headerLeft: () => {
                                return (
                                    <TouchableOpacity  onPress={() => {
                                        router.back();
                                    }}>
                                        <View>
                                            <FontAwesomeIcon style={{ padding: 10 }} size={25} color={COLORS.white} icon={faArrowLeft} />
                                        </View>
                                    </TouchableOpacity>
                                )
                            }
                            }} />
				</Stack>
			</>
		);
} 

export default HomeLayout