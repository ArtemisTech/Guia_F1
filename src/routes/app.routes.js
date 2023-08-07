import React from 'react';

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import StackEventos from './stackEventos';
import StackPilotos from './stackPilotos';
import StackEquipes from './stackEquipes';
import StackPerfil from './stackPerfil';

import FontAwesome from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import TopTabPalpitometro from './TopTabPalpitometro';

const Tab = createBottomTabNavigator();

export default function AppRoutes() {

  return (
    <Tab.Navigator initialRouteName="EventosStack" screenOptions={{
      tabBarActiveTintColor: '#E00600',
      tabBarInactiveTintColor: '#6D6D84',
      tabBarStyle: {
        backgroundColor: '#37374E',
        borderTopWidth: 0,
        paddingBottom: 10,
        paddingTop: 10,
        height: 70
      }
    }} >
      <Tab.Screen name='EquipesStack' component={StackEquipes} options={{
        tabBarIcon: ({ color, size }) => {
          return <MaterialIcons name="bar-chart" color={color} size={40} />
        },
        headerShown: false,
        tabBarLabel: "Equipes"
      }} />
      <Tab.Screen name='PilotosStack' component={StackPilotos} options={{
        tabBarIcon: ({ color, size }) => {
          return <MaterialIcons name="sports-motorsports" color={color} size={35} />
        },
        headerShown: false,
        tabBarLabel: "Pilotos"
      }} />
      <Tab.Screen name='EventosStack' component={StackEventos} options={{
        tabBarIcon: ({ color, size }) => {
          return <FontAwesome name="flag-checkered" color={color} size={27} />
        },
        headerShown: false,
        tabBarLabel: "Eventos"
      }} />
      <Tab.Screen name='PlayPredictor' component={TopTabPalpitometro} options={{
        tabBarIcon: ({ color, size }) => {
          return <FontAwesome name="gamepad" color={color} size={28} />
        },
        title: 'Palpitômetro',
        tabBarLabel: "Palpitômetro",
        headerStyle: {
          backgroundColor: '#E00600',
        },
        headerTintColor: '#FFF',
        headerTitleStyle: {
          fontFamily: 'Ubuntu-Medium',
          fontSize: 24,
        },
        headerTitleAlign: 'center',
      }} />
      <Tab.Screen name='PerfilStack' component={StackPerfil} options={{
        tabBarIcon: ({ color, size }) => {
          return <MaterialIcons name="account-circle" color={color} size={33} />
        },
        tabBarLabel: 'Perfil',
        headerShown: false
      }} />
    </Tab.Navigator>

  );
}