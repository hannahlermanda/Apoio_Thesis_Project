import { FlatList, Text, TouchableOpacity, View, Image} from 'react-native'
import React from 'react'
import tw from 'twrnc';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectOrigin } from '../slices/navSlice';

//Options on the Screen
const data = [
    {
        id: "123",
        title: "Request a Ride",
        image: "https://links.papareact.com/3pn",
        screen: "MapScreen",
    },
    {
        id: "456",
        title: "My Trusted Contacts",
        image: "https://i.pinimg.com/originals/8a/9f/f0/8a9ff09d16b89f217d87c7ce8af64f25.png",
        screen: "TrustedContacts", //Demo?
    },
];

const NavOptions = () => {

    const navigation = useNavigation();
    const origin = useSelector(selectOrigin);

    return (
        <FlatList 
            data={data}
            keyExtractor={(item) => item.id}
            horizontal
            renderItem={({ item }) => (
                <TouchableOpacity
                    onPress={() => navigation.navigate(item.screen)}
                    style={tw`p-2 pl-5 pb-3 pt-1 bg-blue-100 m-2 w-32`}    //Padding:2, Padding Left: 5, Padding Bottom: 3, Padding Top: 1, Background Color: Light Blue, Margin:2, Width: 32
                    disabled={!origin}
                >
                    <View style={tw`${!origin && "opacity-20"}`}>
                        <Image 
                            style={
                                {width: 100,
                                 height: 75,
                                 resizeMode: "contain"
                                }
                            }
                            //Where the images are from (the data)
                            source={
                                {uri:item.image}
                            }
                        />
                        <Text style={tw`mt-2 text-lg font-semibold`}> 
                            {item.title}
                        </Text>
                        <Icon 
                            style={tw`p-2 bg-black rounded-full w-10 mt-4`} //Padding: 2, Background color: Black, Rounded Full, Width: 10, Margin top: 4
                            type='antdesign'
                            color='white'
                            name='arrowright'
                        />
                    </View>
                </TouchableOpacity>
            )}
        />
      );
}

export default NavOptions
