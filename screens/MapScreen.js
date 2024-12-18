import { StyleSheet, Text, View, Alert } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import Map from '../components/Map';
import MapView from 'react-native-maps';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigateCard from '../components/NavigateCard';
import RideOptionsCard from '../components/RideOptionsCard';
import { Icon } from '@rneui/themed';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MapScreen = () => {
    const Stack = createNativeStackNavigator();
    const navigation = useNavigation();

    // Handle error and navigate to previous screen
    const handleRouteError = (errorMessage) => {
        Alert.alert("Route Error", errorMessage, [
            { 
                text: "OK", 
                onPress: () => {
                    console.log("User acknowledged error.");
                    navigation.navigate("HomeScreen"); // Go back to the Home Screen when OK is pressed
                } 
            }
        ]);
    };


  return (
    <View>
        
        <TouchableOpacity 
            style={tw`bg-gray-100 absolute top-12 left-4 z-50 p-3 rounded-full shadow-lg`}
            onPress = {() => navigation.navigate("HomeScreen")}>
                <Icon name="menu"/>
        </TouchableOpacity>

        <View style={tw `h-[37%]`}>
            <Map onRouteError={handleRouteError} />
        </View>  

        <View style={tw `h-[63%]`}>
            <Stack.Navigator>
                <Stack.Screen
                    name="NavigateCard"
                    component={NavigateCard}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="RideOptionsCard"
                    component={RideOptionsCard}
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack.Navigator>
        </View>

    </View>
  )
}

export default MapScreen;

const styles = StyleSheet.create({})