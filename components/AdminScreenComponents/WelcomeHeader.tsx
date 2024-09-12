import React from 'react';
import { Text, View } from 'react-native';
import { useAppSelector } from 'redux/hooks';
import { COLORS } from '../../constants';

export const WelcomeHeader = ({ isRefreshing }: {isRefreshing: boolean}): React.JSX.Element => {
    const firstName = useAppSelector((state) => state?.auth?.firstName);
    
    const cards = [
        { title: 'Total Revenue', value: '$10,000' },
        { title: 'Total Orders', value: '150' },
        { title: 'Total Staff', value: '25' },
    ];

    return (
        <View style={{ padding: 10 }}>
            <View style={{
                alignItems: 'flex-start',
                gap: 5,
                marginBottom: 15,
            }}>
                <Text style={{fontSize: 24, fontWeight: 'bold'}}>Welcome, {firstName}</Text>
                <Text style={{fontSize: 15, fontWeight: 'bold', color: 'gray'}}>Here is your daily overview &#8226; Busy day ahead!</Text>
            </View>
            
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10,
            }}>
                {cards.map((card, index) => (
                    <View key={index} style={{
                        backgroundColor: COLORS.tertiary,
                        borderRadius: 8,
                        borderWidth: 1,
                        borderColor: '#e0e0e0',
                        padding: 10,
                        flex: 1,
                        marginHorizontal: 5,
                        elevation: 3, // for Android
                        shadowColor: '#000', // for iOS
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                    }}>
                        <View style={{
                            borderBottomWidth: 1,
                            borderBottomColor: '#e0e0e0',
                            paddingBottom: 5,
                            marginBottom: 5,
                        }}>
                            <Text style={{fontSize: 14, fontWeight: 'bold', textAlign: 'center'}}>{card.title}</Text>
                        </View>
                        <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>{card.value}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}