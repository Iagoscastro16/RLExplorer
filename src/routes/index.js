import React from "react";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen"
import DetailsScreen from "../screens/DetailsScreen"

const Stack = createNativeStackNavigator();

export default function Routes(){
    return(
        <NavigationContainer>
            <Stack.Navigator
            screenOptions={{
                headerStyle:{backgroundColor: "#0A0A0F"},
                headerTintColor: "#00D4FF",
                headerTitleStyle: {
                    fontWeight:'bold',
                    fontSize:18,
                    color:"#FFFFFF"
                },
                headerShadowVisible: false,
            }}
            >
                <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{title:"\u{1F680}RLExplore"}}
                />
                <Stack.Screen
                name="Details"
                component={DetailsScreen}
                options={{title: "Detalhes do item" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}