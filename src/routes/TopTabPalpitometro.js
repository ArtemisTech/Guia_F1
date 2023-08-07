import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"

import Perguntas from "../pages/Perguntas";
import Resultados from "../pages/Resultados";
import Classificacao from "../pages/Classificacao";

const TopTab = createMaterialTopTabNavigator();

export default function TopTabPalpitometro() {
    return(
        <TopTab.Navigator screenOptions={{ 
            tabBarStyle: { 
                backgroundColor: '#12121A', 
                shadowColor: 0,
            }, 
            tabBarIndicatorStyle: { 
                height: 48, 
                width: '28%', 
                marginStart: 10, 
                marginBottom: 10,
                borderRadius: 15, 
                backgroundColor: '#E00600'
            }, 
            tabBarActiveTintColor: '#FFF', 
            tabBarInactiveTintColor: '#FFF', 
            tabBarItemStyle: { 
                backgroundColor: 'transparent', 
                borderRadius: 15, 
                marginHorizontal: 10, 
                borderWidth: 2, 
                borderColor: '#6D6D84',
                marginBottom: 10,
                marginTop: 10
            }, 
            tabBarContentContainerStyle: { 
                backgroundColor: 'transparent'
            },
            tabBarLabelStyle: { 
                fontWeight: 'bold', 
                textTransform: 'none', 
                fontSize: 12
            },
            tabBarAllowFontScaling: true,
            swipeEnabled: false
        }}>
            <TopTab.Screen name="Perguntas" component={Perguntas}/>
            <TopTab.Screen name="Resultados" component={Resultados}/>
            <TopTab.Screen name="Classificacao" component={Classificacao} options={{
                title: 'Classificação'
            }}/>
        </TopTab.Navigator>
    )
}