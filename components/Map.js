import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import tw from 'twrnc';
import { useDispatch, useSelector } from 'react-redux';
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../slices/navSlice';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from "@env";

const Map = () => {
    
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const mapRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!origin || !destination) return; //If there is no origin or no destination set, get out

            // Calculate the midpoint between origin and destination
            const latitude = (origin.location.lat + destination.location.lat) / 2;
            const longitude = (origin.location.lng + destination.location.lng) / 2;

            // Calculate the delta to fit both markers
            const latitudeDelta = Math.abs(origin.location.lat - destination.location.lat) * 1.5;  // Adjust 1.5 factor if needed
            const longitudeDelta = Math.abs(origin.location.lng - destination.location.lng) * 1.5; // Adjust 1.5 factor if needed

            // Animate the map to the new region
            mapRef.current.animateToRegion({
                latitude,
                longitude,
                latitudeDelta,
                longitudeDelta,
            }, 1000);  // Smooth transition to the new region
    }, [origin,destination]); //Will occur any time the origin or destination is changed

    useEffect(() => {
        if (!origin || !destination) return;

        const getTravelTime = async() => {
            fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`).then((res) => res.json())
            .then(data => { 
                dispatch(setTravelTimeInformation(data.rows[0].elements[0]))
            });
        };

        getTravelTime();

    }, [origin, destination, GOOGLE_MAPS_APIKEY])
  
    return (
    <MapView
        ref={mapRef}
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

        {destination?.location && (
                    <Marker //Creates a Marker (like a pin) on the Map
                        coordinate={{
                            latitude: destination.location.lat,
                            longitude: destination.location.lng, 
                        }}

                        title="Destination"
                        description={destination.description}
                        identifier="destination"
                        //Can also put live location if you follow the documentation (may try later)
                    />
                )
        } 

    </MapView>
  )
}

export default Map

const styles = StyleSheet.create({})