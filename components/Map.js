import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import tw from 'twrnc';
import { useSelector } from 'react-redux';
import { selectOrigin } from '../slices/navSlice';

const Map = () => {
    
    const origin = useSelector(selectOrigin);
  
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
    </MapView>
  )
}

export default Map

const styles = StyleSheet.create({})