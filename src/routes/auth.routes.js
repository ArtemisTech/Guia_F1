import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../pages/Login";
import BemVindo from "../pages/BemVindo";

const Stack = createNativeStackNavigator();

export default function AuthRoutes(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="BemVindo" component={ BemVindo } options={{ headerShown: false, statusBarColor: '#12121A'}}/>
            <Stack.Screen name="Login" component={ Login } options={{
                headerStyle: {
                    backgroundColor: '#12121A',
                    alignItems: 'center',
                },
                headerTintColor: '#FFF',
                headerTitleStyle: {
                    fontFamily: 'Ubuntu-Medium',
                    fontSize: 24,
                },
                headerTitleAlign: 'center',
                title: '',
                statusBarColor: '#12121A',
            }}/>
        </Stack.Navigator>
    )
}