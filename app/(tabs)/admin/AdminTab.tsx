import client from "api/client";
import React, { useEffect } from "react";
import {View, Text, TouchableOpacity} from "react-native";
import { useAppSelector } from "redux/hooks";


const AdminTab = (): React.JSX.Element => {
    const token = useAppSelector((state) => state?.auth?.apiToken);
    console.log('token', token)
    const fetchData = async () => {
        try {
            const data = await client.post('/api/users/get-admin-data', token);
            console.log('data', data);
        } catch (error) {
            console.log('error', error);
        }
    }
    return ( 
			<View>
				<Text>Admin Tab</Text>
				<TouchableOpacity onPress={fetchData}>
					<Text>Fetch Data</Text>
				</TouchableOpacity>
			</View>
		);
}

export default AdminTab;