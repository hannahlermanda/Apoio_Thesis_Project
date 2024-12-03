import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

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
        destination:"Super Nintendo World @Universal Studios Hollywood, Universal City, Los Angeles, CA, USA"
    },
];

const NavFavorites = () => {
  return (<FlatList 
        data={data} 
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
            <TouchableOpacity>
                <Text>Heehee</Text>
            </TouchableOpacity>
        )} 
          />
    );
};

export default NavFavorites

const styles = StyleSheet.create({})