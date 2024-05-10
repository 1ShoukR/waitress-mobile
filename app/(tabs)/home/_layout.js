import { Stack } from 'expo-router';


const HomeLayout = () => {
    return (
			<>
				<Stack>
					<Stack.Screen name="BookingScreen" options={{ headerShown: true }} />
				</Stack>
			</>
		);
} 

export default HomeLayout