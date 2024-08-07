import { Stack } from "expo-router";
import React from "react";

const AccountLayout = () => {
    return (
			<>
				<Stack>
					<Stack.Screen
						name="AccountTab"
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="EditAccount"
						options={{
							title: "Edit Account",
							headerShown: false,
						}}
					/>
				</Stack>
			</>
		);
}

export default AccountLayout