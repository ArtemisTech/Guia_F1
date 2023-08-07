import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { F1_Equipe, F1_LogoEquipe, F1_NomeEquipe } from './styles';

export default function TextoEquipePiloto({ data }){
    const [source, setSource] = useState();
    const [constructorId, setConstructorId] = useState();

    function getSourceImg(constructorId) {
        switch (constructorId) {
            case "alfa":
                return setSource(require('../../assets/logoEquipesIcon/alfa.png'));
                break;
            case "alphatauri":
                return setSource(require('../../assets/logoEquipesIcon/alphatauri.png'));
                break;
            case "alpine":
                return setSource(require('../../assets/logoEquipesIcon/alpine.png'));
                break;
            case "aston_martin":
                return setSource(require('../../assets/logoEquipesIcon/aston_martin.png'));
                break;
            case "ferrari":
                return setSource(require('../../assets/logoEquipesIcon/ferrari.png'));
                break;
            case "haas":
                return setSource(require('../../assets/logoEquipesIcon/haas.png'));
                break;
            case "mclaren":
                return setSource(require('../../assets/logoEquipesIcon/mclaren.png'));
                break;
            case "mercedes":
                return setSource(require('../../assets/logoEquipesIcon/mercedes.png'));
                break;
            case "red_bull":
                return setSource(require('../../assets/logoEquipesIcon/red_bull.png'));
                break;
            case "williams":
                return setSource(require('../../assets/logoEquipesIcon/williams.png'));
                break;
            default:
                return setSource(require('../../assets/forbidden.png'));
                break;
        }
    };

    useEffect(() => {
        setConstructorId(data.constructorId);
        getSourceImg(data.constructorId);
    }, []);

    return(
        <F1_Equipe>
            <F1_NomeEquipe>
                <Text style={{fontFamily: 'OpenSans-Regular'}}>{data.name}</Text>
            </F1_NomeEquipe>
            { constructorId ? 
                <F1_LogoEquipe source={source}></F1_LogoEquipe>
            :
                <F1_LogoEquipe source={require('../../assets/forbidden.png')}></F1_LogoEquipe>
            }
        </F1_Equipe>
    );
}