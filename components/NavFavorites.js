import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icon } from '@rneui/themed';
import tw from 'twrnc';

const data = [
    {
        id:"123",
        icon:"home",
        location:"Home",
        destination:"CSUN, Nordhoff Street, Northridge, CA, USA"
    },
    {
        id:"456",
        icon:"briefcase",
        location:"Work",
        destination:"Bowser Jr: Shadow Showdown, Starway, North Hollywood, CA, USA"
    },
];

const NavFavorites = () => {
  return (<FlatList 
        data={data} 
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => (
            <View
                style={[tw`bg-gray-200`, {height: 0.5}]}
            />
        )}  
        renderItem={({item: { location, destination, icon }}) => (
            <TouchableOpacity style={tw`flex-row items-center p-3`}>
                <Icon
                    style={tw`mr-4 rounded-full bg-gray-300 p-3`}
                    name={icon}
                    type="ionicon"
                    color="white"
                    size={18}
                />
                <View>
                    <Text style={tw`font-semibold text-lg`}>{location}</Text>
                    <Text style={[tw`text-gray-500 text-[17px]`, { maxWidth: '97%' }]}>{destination}</Text>
                </View>
            </TouchableOpacity>
        )} 
          />
    );
};

//Can use OnPress to make the favorites the destination

export default NavFavorites

const styles = StyleSheet.create({})