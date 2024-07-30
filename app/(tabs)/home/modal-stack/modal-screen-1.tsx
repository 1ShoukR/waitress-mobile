// Make a very basic modal screen
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const ModalScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Modal screen</Text>
      <Button title="Close modal" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default ModalScreen;
