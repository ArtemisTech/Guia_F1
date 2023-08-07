import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { F1_Card, F1_CardPrincipal, F1_CardTitle, F1_CardTitlePrincipal, F1_ImgEquipe, F1_ContainerEquipe, F1_CardPositionText, F1_CardPoints, F1_Infos, F1_Infos2, F1_ContainerImg, F1_ContainerTitle, F1_ContainerPoints, F1_CardPointsPrincipal } from './styles';

export default function EquipeCard({ data }){
    const navigation = useNavigation();

    const [source, setSource] = useState();
    const [constructorId, setConstructorId] = useState();
    const [color, setColor] = useState();

    function getSourceImg(constructorId) {
        switch (constructorId) {
            case "alfa":
                return setSource(require('../../assets/logoEquipes/alfa.png'));
                break;
            case "alphatauri":
                return setSource(require('../../assets/logoEquipes/alphatauri.png'));
                break;
            case "alpine":
                return setSource(require('../../assets/logoEquipes/alpine.png'));
                break;
            case "aston_martin":
                return setSource(require('../../assets/logoEquipes/aston_martin.png'));
                break;
            case "ferrari":
                return setSource(require('../../assets/logoEquipes/ferrari.png'));
                break;
            case "haas":
                return setSource(require('../../assets/logoEquipes/haas.png'));
                break;
            case "mclaren":
                return setSource(require('../../assets/logoEquipes/mclaren.png'));
                break;
            case "mercedes":
                return setSource(require('../../assets/logoEquipes/mercedes.png'));
                break;
            case "red_bull":
                return setSource(require('../../assets/logoEquipes/red_bull.png'));
                break;
            case "williams":
                return setSource(require('../../assets/logoEquipes/williams.png'));
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
        setConstructorId(data.Constructor.constructorId);
        getSourceImg(data.Constructor.constructorId);
        getColor(data.Constructor.constructorId);
    }, []);

    return(
        <View>
            {data.positionText === '1' ?
                <F1_CardPrincipal>
                    <TouchableOpacity onPress={ () => { 
                        navigation.navigate('DetalhesEquipes', { ConstructorId: data.Constructor.constructorId });
                    } }>
                        <F1_ContainerEquipe>
                            <F1_Infos>
                                <F1_ContainerPoints>
                                    <F1_CardPointsPrincipal>{data.points} pts</F1_CardPointsPrincipal>
                                </F1_ContainerPoints>
                            </F1_Infos>
                            <F1_ContainerImg>
                                { constructorId ? 
                                    <F1_ImgEquipe source={source}></F1_ImgEquipe>
                                :
                                    <F1_ImgEquipe source={require('../../assets/forbidden.png')}></F1_ImgEquipe>
                                }
                                <F1_ContainerTitle>
                                    <F1_CardTitlePrincipal>
                                        <Text style={{fontFamily: 'Ubuntu-Medium'}}>{data.Constructor.name}</Text>
                                    </F1_CardTitlePrincipal>
                                </F1_ContainerTitle>
                            </F1_ContainerImg>
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
                        </F1_ContainerEquipe>
                    </TouchableOpacity>
                </F1_CardPrincipal>
            : 
                <F1_Card>
                    <TouchableOpacity onPress={ () => { 
                        navigation.navigate('DetalhesEquipes', { ConstructorId: data.Constructor.constructorId });
                    } }>
                        <F1_ContainerEquipe>
                            <F1_CardPoints>{data.points} pts</F1_CardPoints>
                            <F1_Infos2>
                                <F1_CardTitle>
                                    <Text style={{fontFamily: 'Ubuntu-Medium'}}>{data.Constructor.name}</Text>
                                </F1_CardTitle>
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
                        </F1_ContainerEquipe>
                    </TouchableOpacity>
                </F1_Card>
            }
        </View>
    );
}