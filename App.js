import React from 'react';
import { Text, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Provider } from "react-redux";
import { store } from './store';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-get-random-values';
import TrustedContacts from './screens/TrustedContacts';
import ConfirmationScreen from './screens/ConfirmationScreen';


export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
            <KeyboardAvoidingView 
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={{ flex: 1}}
              keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
            >
              <Stack.Navigator>
                <Stack.Screen 
                  name="HomeScreen" 
                  component={HomeScreen} 
                  options= {{
                    headerShown: false,
                  }}
                />
                <Stack.Screen 
                  name="MapScreen" 
                  component={MapScreen} 
                  options= {{
                    headerShown: false,
                  }}
                />
                <Stack.Screen 
                  name="TrustedContacts" 
                  component={TrustedContacts} 
                  options= {{
                    headerShown: false,
                  }}
                />
                <Stack.Screen 
                  name="ConfirmationScreen" 
                  component={ConfirmationScreen} 
                  options= {{
                    headerShown: false,
                  }}
                />
              </Stack.Navigator>
            </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}

