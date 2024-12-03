import { StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from 'react-redux';
import { setDestination } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';

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