import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { F1_Card, F1_CardTitle, F1_CardPrincipal, F1_GivenName, F1_FamilyName, F1_ImgPiloto, F1_ContainerPiloto, F1_CardPositionText, F1_CardPoints, F1_CardPointsPrincipal, F1_Infos, F1_Infos2, F1_ContainerImg, F1_ContainerPoints } from './styles'; 

import TextoEquipePiloto from '../TextoEquipePiloto';

export default function PilotoCard({ data }){
    const navigation = useNavigation();

    const [driverId, setDriverId] = useState();
    const [source, setSource] = useState();
    const [color, setColor] = useState();
    const [constructorId, setConstructorId] = useState();

    function getSourceImg(driverId) {
        switch (driverId) {
            case "max_verstappen":
                return setSource(require('../../assets/imgPilotos/max_verstappen.png'));
                break;
            case "perez":
                return setSource(require('../../assets/imgPilotos/perez.png'));
                break;
            case "alonso":
                return setSource(require('../../assets/imgPilotos/alonso.png'));
                break;
            case "hamilton":
                return setSource(require('../../assets/imgPilotos/hamilton.png'));
                break;
            case "russell":
                return setSource(require('../../assets/imgPilotos/russell.png'));
                break;
            case "sainz":
                return setSource(require('../../assets/imgPilotos/sainz.png'));
                break;
            case "leclerc":
                return setSource(require('../../assets/imgPilotos/leclerc.png'));
                break;
            case "stroll":
                return setSource(require('../../assets/imgPilotos/stroll.png'));
                break;
            case "ocon":
                return setSource(require('../../assets/imgPilotos/ocon.png'));
                break;
            case "gasly":
                return setSource(require('../../assets/imgPilotos/gasly.png'));
                break;
            case "norris":
                return setSource(require('../../assets/imgPilotos/norris.png'));
                break;
            case "hulkenberg":
                return setSource(require('../../assets/imgPilotos/hulkenberg.png'));
                break;
            case "piastri":
                return setSource(require('../../assets/imgPilotos/piastri.png'));
                break;
            case "bottas":
                return setSource(require('../../assets/imgPilotos/bottas.png'));
                break;
            case "zhou":
                return setSource(require('../../assets/imgPilotos/zhou.png'));
                break;
            case "tsunoda":
                return setSource(require('../../assets/imgPilotos/tsunoda.png'));
                break;
            case "kevin_magnussen":
                return setSource(require('../../assets/imgPilotos/kevin_magnussen.png'));
                break;
            case "albon":
                return setSource(require('../../assets/imgPilotos/albon.png'));
                break;
            case "de_vries":
                return setSource(require('../../assets/imgPilotos/de_vries.png'));
                break;
            case "sargeant":
                return setSource(require('../../assets/imgPilotos/sargeant.png'));
                break;
            default:
                return setSource(require('../../assets/forbidden.png'));
                break;
        }
    };

    function getColor(constructorId) {
        switch (constructorId) {
            case "red_bull":
                return setColor('#001A30');
                break;
            case "mercedes":
                return setColor('#02F5D0');
                break;
            case "aston_martin":
                return setColor('#00665E');
                break;
            case "ferrari":
                return setColor('#D92A1C');
                break;
            case "mclaren":
                return setColor('#FF7300');
                break;
            case "alpine":
                return setColor('#0844FD');
                break;
            case "haas":
                return setColor('#8A8A99');
                break;
            case "alfa":
                return setColor('#A61D2F');
                break;
            case "alphatauri":
                return setColor('#08314C');
                break;
            case "williams":
                return setColor('#01A2E0');
                break;
            default:
                return setColor('#E00600');
                break;
        }
    };

    useEffect(() => {
        setDriverId(data.Driver.driverId);
        getSourceImg(data.Driver.driverId);
        setConstructorId(data.Constructors[0].constructorId);
        getColor(data.Constructors[0].constructorId);
    }, []);

    //console.log("Data");
    //console.log(data);
    //console.log(data.Driver.driverId);

    return(
        <View>
            {data.positionText === '1' ?
                <F1_CardPrincipal>
                    <TouchableOpacity onPress={ () => { 
                        navigation.navigate('DetalhesPiloto', {DriverId: data.Driver.driverId, Nome: data.Driver.givenName + ' ' + data.Driver.familyName});
                    } }>
                        <F1_ContainerPiloto>
                            <F1_ContainerImg>
                                { driverId ? 
                                    <F1_ImgPiloto source={source}></F1_ImgPiloto>
                                : 
                                    <F1_ImgPiloto source={require('../../assets/forbidden.png')}></F1_ImgPiloto>
                                }
                                <F1_ContainerPoints>
                                    <F1_CardPointsPrincipal>{data.points} pts</F1_CardPointsPrincipal>
                                </F1_ContainerPoints>
                            </F1_ContainerImg>
                            <F1_Infos>
                                <F1_GivenName>
                                    <Text style={{fontFamily: 'OpenSans-Regular'}}>{data.Driver.givenName}</Text>
                                </F1_GivenName>
                                <F1_FamilyName>
                                    <Text style={{fontFamily: 'Ubuntu-Medium'}}>{data.Driver.familyName}</Text>
                                </F1_FamilyName>
                                <FlatList data={ data.Constructors } renderItem={({ item }) => <TextoEquipePiloto data={ item }/>}/>
                            </F1_Infos>
                            <View style={{ 
                                backgroundColor: color,
                                width: 65,
                                height: 135,
                                marginRight: -20,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderTopRightRadius: 15,
                                borderBottomRightRadius: 15,
                            }}>
                                <F1_CardPositionText>
                                    <Text style={{fontFamily: 'Ubuntu-Medium'}}>{data.position}</Text>
                                </F1_CardPositionText>
                            </View>
                        </F1_ContainerPiloto>
                    </TouchableOpacity>
                </F1_CardPrincipal>
            : 
                <F1_Card>
                    <TouchableOpacity onPress={ () => { 
                        navigation.navigate('DetalhesPiloto', {DriverId: data.Driver.driverId, Nome: data.Driver.givenName + ' ' + data.Driver.familyName});
                    } }>
                        <F1_ContainerPiloto>
                            <F1_CardPoints>
                                {data.points} pts
                            </F1_CardPoints>
                            <F1_Infos2>
                                <F1_CardTitle>
                                    <Text style={{fontFamily: 'Ubuntu-Medium'}}>
                                        {data.Driver.givenName} {data.Driver.familyName}
                                    </Text>                                   
                                </F1_CardTitle>
                                <FlatList data={ data.Constructors } renderItem={({ item }) => <TextoEquipePiloto data={ item }/>}/>
                            </F1_Infos2>
                            <View style={{ 
                                backgroundColor: color,
                                width: 65,
                                height: 70,
                                marginRight: -20,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderTopRightRadius: 15,
                                borderBottomRightRadius: 15,
                            }}>
                                <F1_CardPositionText>
                                    <Text style={{fontFamily: 'Ubuntu-Medium'}}>{data.position}</Text>
                                </F1_CardPositionText>
                            </View>
                        </F1_ContainerPiloto>
                    </TouchableOpacity>
                </F1_Card>
            }
        </View>
    );
}