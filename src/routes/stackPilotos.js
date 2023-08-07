import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Pilotos from "../pages/Pilotos";
import DetalhesPiloto from "../pages/DetalhesPiloto";
import DetalhesEquipes from "../pages/DetalhesEquipes";

const Stack = createNativeStackNavigator();

export default function StackPilotos() {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Pilotos" component={Pilotos} options={{
                headerStyle: {
                    backgroundColor: '#E00600',
                    alignItems: 'center',
                },
                headerTintColor: '#FFF',
                headerTitleStyle: {
                    fontFamily: 'Ubuntu-Medium',
                    fontSize: 24,
                },
                headerTitleAlign: 'center',
            }}/>
            <Stack.Screen name="DetalhesPiloto" component={DetalhesPiloto} options={{
                headerStyle: {
                    backgroundColor: '#E00600',
                    alignItems: 'center',
                },
                headerTintColor: '#FFF',
                headerTitleStyle: {
                    fontFamily: 'Ubuntu-Medium',
                    fontSize: 24,
                },
                headerTitleAlign: 'center',
            }}/>
            <Stack.Screen name="DetalhesEquipes" component={DetalhesEquipes} options={{
                headerStyle: {
                    backgroundColor: '#E00600',
                    alignItems: 'center',
                },
                headerTintColor: '#FFF',
                headerTitleStyle: {
                    fontFamily: 'Ubuntu-Medium',
                    fontSize: 24,
                },
                headerTitleAlign: 'center',
            }}/>
        </Stack.Navigator>
    )
}