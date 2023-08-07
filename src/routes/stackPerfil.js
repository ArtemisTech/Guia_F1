import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Perfil from "../pages/Perfil";
import EditarPerfil from "../pages/EditarPerfil";
import Contato from "../pages/Contato";
import PoliticaPrivacidade from "../pages/PoliticaPrivacidade";

const Stack = createNativeStackNavigator();

export default function StackPerfil() {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Perfil" component={Perfil} options={{
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
            <Stack.Screen name="EditarPerfil" component={EditarPerfil} options={{
                title: 'Editar Perfil',
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
            <Stack.Screen name="Contato" component={Contato} options={{
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
            <Stack.Screen name="PoliticaPrivacidade" component={PoliticaPrivacidade} options={{
                title: 'Política de Privacidade',
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