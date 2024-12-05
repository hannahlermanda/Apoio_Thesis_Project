import { StyleSheet, Text, View, Alert } from 'react-native';
import React, { useEffect, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import tw from 'twrnc';
import { useDispatch, useSelector } from 'react-redux';
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../slices/navSlice';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from "@env";

const Map = ({ onRouteError }) => { // Accept the onRouteError callback prop
    
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const mapRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!origin || !destination) return;

        // Calculate the midpoint and fit the map
        const latitude = (origin.location.lat + destination.location.lat) / 2;
        const longitude = (origin.location.lng + destination.location.lng) / 2;
        const latitudeDelta = Math.abs(origin.location.lat - destination.location.lat) * 1.5;
        const longitudeDelta = Math.abs(origin.location.lng - destination.location.lng) * 1.5;

        mapRef.current.animateToRegion({
            latitude,
            longitude,
            latitudeDelta,
            longitudeDelta,
        }, 1000);
    }, [origin, destination]);

    useEffect(() => {
        if (!origin || !destination) return;

        const getTravelTime = async() => {
            fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`).then((res) => res.json())
            .then(data => { 
                dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
            });
        };

        getTravelTime();

    }, [origin, destination, GOOGLE_MAPS_APIKEY]);

    return (
        <MapView
            ref={mapRef}
            style={tw`flex-1`}
            mapType="mutedStandard"
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
                    optimizeWaypoints={true}
                    onError={(error) => {
                        if (error.includes("ZERO_RESULTS")) {
                            console.warn("No driving route available between your selected points.");
                            if (onRouteError) {
                                onRouteError("No driving route available between your selected points.");
                            }
                        } else {
                            console.warn("MapViewDirections error:", error);
                        }
                    }}
                />
            )}

            {origin?.location && (
                <Marker
                    coordinate={{
                        latitude: origin.location.lat,
                        longitude: origin.location.lng,
                    }}
                    title="Starting Point"
                    description={origin.description}
                    identifier="origin"
                />
            )}

            {destination?.location && (
                <Marker
                    coordinate={{
                        latitude: destination.location.lat,
                        longitude: destination.location.lng,
                    }}
                    title="Destination"
                    description={destination.description}
                    identifier="destination"
                />
            )}
        </MapView>
    );
}

export default Map;