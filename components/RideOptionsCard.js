import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import NavigateCard from './NavigateCard';
import { useSelector } from 'react-redux';
import { selectTravelTimeInformation } from '../slices/navSlice';

const data = [
  {
      id:"WAV-123",
      title:"Standard Wheelchair-Accessible Vehicle (WAV)",
      multiplier: 1,
      image:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Wheelchair_symbol.svg/673px-Wheelchair_symbol.svg.png"
  },
  {
      id:"WAV-L-456",
      title:"Large Wheelchair-Accessible Vehicle (WAV)",
      multiplier: 1,
      image:"https://icons.iconarchive.com/icons/fa-team/fontawesome/256/FontAwesome-Wheelchair-Move-icon.png"
  },
  {
    id:"WAV-Lux-789",
    title:"Luxury Wheelchair-Accessible Vehicle (WAV)",
    multiplier: 1.2,
    image:"https://icons.veryicon.com/png/o/application/font-awesome/diamond-29.png"
  },
];

const RideOptionsCard = () => {

  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity //Go back to the previous screen
          onPress={() => navigation.navigate("NavigateCard")}
          style={tw`absolute top-3 left-5 p-3 z-50 rounded-full`}
        >
          <Icon name="chevron-left" type="fontawesome"/>
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl`}>Select a Ride - {travelTimeInformation?.distance.text}</Text>
      </View>

      <FlatList data={data}
        keyExtractor={ (item) => item.id}
        renderItem={({item: {id, title, multiplier, image}, item}) => (
          <TouchableOpacity 
            onPress={() => setSelected(item)}
            style={tw`flex-row justify-between items-center px-8 mb-1 ${ id === selected?.id && "bg-gray-200"}`}
          >
            <Image
              style={{
                width: 40,
                height: 70,
                resizeMode: "contain",
              }}
              source={{ uri: image }}
            />
            <View style={tw`ml-4`}> 
              <Text style={tw`text-[18px] font-semibold`}>
                {title} 
              </Text>
              <Text>
                {travelTimeInformation?.duration.text} Travel Time
              </Text>
              <Text style={tw`text-xl`}>
                {new Intl.NumberFormat("en-us", {
                  style:"currency",
                  currency:"USD",
                }).format(
                  (travelTimeInformation?.duration.value * multiplier) /100
                )
                }
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <View
        style={tw`mt-auto border-t border-gray-200`}>
        <TouchableOpacity 
          disabled={!selected}
          style={tw`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`}
        >
          <Text style={tw`text-center text-white text-[18px]`}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default RideOptionsCard

const styles = StyleSheet.create({})