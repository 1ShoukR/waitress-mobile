import { Stack } from 'expo-router';
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
                            backgroundColor: '#2A2C3B'
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
				</Stack>
			</>
		);
} 

export default HomeLayout