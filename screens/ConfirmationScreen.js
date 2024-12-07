import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { useRoute, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons for icons

// Sample Ride Details
const rideDetails = {
    "WAV-123": {
        driverName: "Lightning McQueen",
        assistantName: "Sir Mater",
        carModel: "Honda Odyssey EX-L",
        licensePlate: "K4CH0W-1",
    },
    "WAV-L-456": {
        driverName: "Jerry Mouse",
        assistantName: "Thomas J. Cat Sr.",
        carModel: "Peugeot Boxer Utah",
        licensePlate: "C4TCH-M3",
    },
    "WAV-Lux-789": {
        driverName: "Audie Fox",
        assistantName: "Hopkins Thumper",
        carModel: "Mercedes-Benz Metris",
        licensePlate: "T0M-N00K",
    },
};

const ConfirmationScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { rideId } = route.params || {}; // Safely retrieve rideId from route params

    const rideInfo = rideDetails[rideId];

    // Handle invalid or missing rideId
    if (!rideInfo) {
        Alert.alert(
            "Error",
            "Ride details not found.",
            [{ text: "Go Back", onPress: () => navigation.goBack() }]
        );
        return null; // Prevent rendering the component if no data
    }

    return (
        <SafeAreaView style={tw`bg-white flex-1`}>
            {/* Title and Confirmation */}
            <View style={tw`p-5`}>
                <Text style={tw`text-center text-xl font-bold`}>Ride Confirmed!</Text>
                <Ionicons
                    name="checkmark-circle"
                    size={60}
                    color="green"
                    style={tw`self-center mt-4`}
                />

                {/* Ride Details */}
                <View style={tw`mt-5`}>
                    <Text style={tw`text-lg font-semibold`}>Ride Details:</Text>
                    <Text style={tw`text-lg`} accessibilityLabel="Driver Name">
                        Driver: {rideInfo.driverName}
                    </Text>
                    <Text style={tw`text-lg`} accessibilityLabel="Care Assistant Name">
                        Care Assistant: {rideInfo.assistantName}
                    </Text>
                    <Text style={tw`text-lg`} accessibilityLabel="Car Model">
                        Car Model: {rideInfo.carModel}
                    </Text>
                    <Text style={tw`text-lg`} accessibilityLabel="License Plate">
                        License Plate: {rideInfo.licensePlate}
                    </Text>
                </View>
            </View>

            {/* Navigation Button */}
            <TouchableOpacity
                style={tw`bg-black py-3 mx-3 mt-auto`}
                onPress={() => navigation.navigate("HomeScreen")}
                accessible={true}
                accessibilityLabel="Go back to home screen"
            >
                <Text style={tw`text-center text-white text-lg`}>Done</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({});