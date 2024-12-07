import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert, Image } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { useRoute, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'; 

//Sample Ride Info
const rideDetails = {
    "WAV-123": {
        driverName: "Lightning McQueen",
        assistantName: "Sir Mater",
        carModel: "Honda Odyssey EX-L",
        licensePlate: "K4CH0W-1",
        driverImage: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        assistantImage: "https://images.unsplash.com/photo-1642978278103-a46ee0181634?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        carImage: "https://vehicle-images.dealerinspire.com/stock-images/thumbnails/large/chrome/8c15fdc7b180777484de86efe10bf7c7.png"
    },
    "WAV-L-456": {
        driverName: "Jerry Mouse",
        assistantName: "Thomas J. Cat Sr.",
        carModel: "Peugeot Boxer Utah",
        licensePlate: "C4TCH-M3",
        driverImage: "https://images.unsplash.com/photo-1484684096794-03e03b5e713e?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        assistantImage: "https://images.unsplash.com/photo-1627199219038-e8263f729e3d?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        carImage: "https://cdn.gmmobility.co.uk/wp-content/uploads/2024/05/Peugeot_Boxed_Utah-iron-grey-removebg-preview-1.png"
    },
    "WAV-Lux-789": {
        driverName: "Audie Fox",
        assistantName: "Hopkins Thumper",
        carModel: "Mercedes-Benz Metris",
        licensePlate: "T0M-N00K",
        driverImage: "https://images.unsplash.com/photo-1729786681695-11edc05a1972?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzkwfHxwZXJzb24lMjBzbWlsaW5nfGVufDB8fDB8fHwy",
        assistantImage: "https://images.unsplash.com/photo-1520248033529-d05cd1981e6f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        carImage: "https://inv.assets.ansira.net/ChromeColorMatch/us/TRANSPARENT_cc_2023MBV060014_01_1280_040.png"
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
        <SafeAreaView style={tw`bg-white flex-grow`}>
            <View style={tw`p-5`}>
                <Text style={[tw`text-center font-bold text-[37px]`, { paddingVertical: 2 }]}>
                    Ride Confirmed! <Ionicons 
                        name="checkmark-circle" 
                        size={36} 
                        color="green" 
                        style={{ top: 10 }}
                    />
                </Text>
               

                <View style={tw`mt-5 flex-row justify-between mx-4`}>

                    <View style={tw`flex items-center`}>
                        <Image
                            source={{ uri: rideInfo.driverImage }}
                            style={tw`w-29 h-29 rounded-full mb-2 border border-gray-400`} 
                        />
                        <Text style={tw`text-xl text-center`} numberOfLines={2} ellipsizeMode="tail" maxWidth={100} accessibilityLabel="Driver Name">
                            {rideInfo.driverName}
                        </Text>
                        <Text style={tw`text-lg text-center text-blue-600`}>Driver</Text>
                    </View>

                    <View style={tw`flex items-center`}>
                        <Image
                            source={{ uri: rideInfo.assistantImage }}
                            style={tw`w-29 h-29 rounded-full mb-2 border border-gray-400`} 
                        />
                        <Text style={tw`text-xl text-center`} numberOfLines={2} ellipsizeMode="tail" maxWidth={100} accessibilityLabel="Care Assistant Name">
                            {rideInfo.assistantName}
                        </Text>
                        <Text style={tw`text-lg text-center text-green-600`}>Care Assistant</Text>
                    </View>
                </View>

                <View style={tw`mt-5 flex items-center`}>
                    <Text style={tw`text-xl`} accessibilityLabel="Car Model">
                        Car Model: {rideInfo.carModel}
                    </Text>
                    <Image
                        source={{ uri: rideInfo.carImage }}
                        style={tw`w-66 h-38 rounded-lg mb-5 mt-2 border border-gray-400`}
                        accessibilityLabel={`Image of ${rideInfo.carModel}`}
                    />
                    <Text style={tw`text-xl`} accessibilityLabel="License Plate">
                        License Plate: {rideInfo.licensePlate}
                    </Text>
                </View>
            </View>

            <View style={tw`mt-auto border-t border-gray-200`}>
                <TouchableOpacity
                    style={tw`bg-black py-3 m-3`}
                    onPress={() => navigation.navigate("HomeScreen")}
                    accessible={true}
                    accessibilityLabel="Go back to home screen"
                >
                    <Text style={tw`text-center text-white text-[18px]`}>Done</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default ConfirmationScreen;
