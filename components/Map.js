import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import tw from 'twrnc';
import { useSelector } from 'react-redux';
import { selectDestination, selectOrigin } from '../slices/navSlice';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from "@env";

const Map = () => {
    
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
  
    return (
    <MapView
        style={tw`flex-1`}
        mapType="mutedStandard" //Strips down map to more basic components (Reduces clutter)
        initialRegion={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        }}
    >

        {origin && destination && (
            <MapViewDirections
                origin={origin.description}
                destination={destination.description}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={3}
                strokeColor='black'
            />
        )}

        {origin?.location && (
            <Marker //Creates a Marker (like a pin) on the Map
                coordinate={{
                    latitude: origin.location.lat,
                    longitude: origin.location.lng, 
                }}

                title="Starting Point"
                description={origin.description}
                identifier="origin"
                //Can also put live location if you follow the documentation (may try later)
            />
        )} 

    </MapView>
  )
}

export default Map

const styles = StyleSheet.create({})