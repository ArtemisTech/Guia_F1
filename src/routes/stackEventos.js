import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DetalhesEvento from "../pages/DetalhesEvento";
import Eventos from "../pages/Eventos";

const Stack = createNativeStackNavigator();

export default function StackEventos() {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Eventos" component={Eventos} options={{
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
            <Stack.Screen name="DetalhesEvento" component={DetalhesEvento} options={{ 
                title: 'Detalhes',
                headerStyle: {
                    backgroundColor: '#E00600',
                    alignItems: 'center',
                },
                headerTintColor: '#FFF',
                headerTitleStyle: {
                    fontFamily: 'Ubuntu-Medium',
                    fontSize: 24,
                },
                headerTitleAlign: 'center',}}/>
        </Stack.Navigator>
    )
}