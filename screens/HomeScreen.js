import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import React from 'react';
import tw from 'twrnc';

const HomeScreen = () => {
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
        <Text>UwU</Text>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})