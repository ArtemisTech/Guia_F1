import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Equipes from "../pages/Equipes";
import DetalhesEquipes from "../pages/DetalhesEquipes";
import DetalhesPiloto from "../pages/DetalhesPiloto";

const Stack = createNativeStackNavigator();

export default function StackEquipes() {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Equipes" component={Equipes} options={{
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
                headerTitle: 'Piloto'
            }}/>
        </Stack.Navigator>
    )
}