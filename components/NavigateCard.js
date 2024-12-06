import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from 'react-redux';
import { setDestination } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import NavFavorites from './NavFavorites';
import { Icon } from '@rneui/themed';
import RideOptionsCard from './RideOptionsCard';

const NavigateCard = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    //White background, Text is centered, Padding (vertically) - 5, Extra large text
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl`}>
        Good Morning, Friend! &#x2600;
      </Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
          <GooglePlacesAutocomplete
            placeholder="Where to?"
            styles={toInputBoxStyles}
            fetchDetails={true}
            minLength={2}
            onPress={(data, details = null) => {
              dispatch(setDestination({
                location: details.geometry.location, //Helps set the travel destination when you press the option on Google Places AutoComplete
                description: data.description
                })
              );
              navigation.navigate('RideOptionsCard');
            }}
            returnKeyType={"search"}
            enablePoweredByContainer={false}
            query={{
              key:GOOGLE_MAPS_APIKEY,
              language:"en",
            }}
            nearbyPlacesAPI='GooglePlacesSearch'
            debounce={400}
          />
        </View>

        <NavFavorites />

        <View
          style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}  
        >
          <TouchableOpacity 
              style={tw`flex flex-row bg-black w-24 px-4 py-2 rounded-full justify-between items-center`}
              onPress={() => navigation.navigate("RideOptionsCard")}
          >
              <Icon name="car" type="font-awesome" color="white" size={16}/>
                <Text style={tw`text-white text-center`}>Rides</Text>
          </TouchableOpacity>

          <TouchableOpacity 
              style={tw`flex flex-row bg-black w-27 px-4 py-2 rounded-full justify-between items-center`}
              onPress={() => navigation.navigate("TrustedContacts")}>
              <Icon name="heart-circle-outline" type="ionicon" color="white" size={16}/>
                <Text style={tw`text-white text-center`}>Trusted Contacts</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  )
}

export default NavigateCard

const toInputBoxStyles = StyleSheet.create({
  container: {
      backgroundColor: "white",
      paddingTop: 20,
      flex: 0,
  },
  textInput: {
      backgroundColor: "#DDDDDF",
      borderRadius: 0,
      fontSize: 18,
  },
  textInputContainer: {
      paddingHorizontal: 20,
      paddingBottom: 0,
  },
});