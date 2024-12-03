import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';

const HomeScreen = () => {

    const dispatch = useDispatch();

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
      <Image 
            style={{
                width: 150,
                height: 115,
                resizeMode: "contain",
            }}
            source={{
                uri: "https://i.imgur.com/VaQPP1l.png"
            }}
            accessibilityLabel="Apoio logo"
        />

        <GooglePlacesAutocomplete 
            placeholder='Where From?'
            styles={{
                container: {
                    flex: 0, //Have the component pop up
                },
                textInput:{
                    fontSize: 18,
                    backgroundColor: "#DDDDDF",
                },
            }}

            onPress={(data, details = null) => {
                dispatch(
                    setOrigin({
                        location: details.geometry.location, //Helps set the initial location when you press the option on Google Places AutoComplete
                        description: data.description
                })
            );

                dispatch(setDestination(null)) //Sets destination as null if you go back and forwards between the screens
            }}

            fetchDetails={true}

            returnKeyType={"search"} //When you click the 'Return' key, you search

            enablePoweredByContainer={false} //get rid of "Powered by Google"

            minLength={2} //Query must have a minimum length of two characters

            query={{
                key: GOOGLE_MAPS_APIKEY, //Import + Access Google Maps API Key
                language: 'en' //English
            }}

            nearbyPlacesAPI='GooglePlacesSearch'
            debounce={400} //Only after you finish typing for 400 ms, will the Google Places Search activate
        />


        <NavOptions/>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})