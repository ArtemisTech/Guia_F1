import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { F1_Card, F1_CardTitle, F1_DataDia, F1_DataMes, F1_Box, F1_CardSubtitle, F1_Image } from './styles';

import TraduzirPais from "../TraduzirPais";
import ConverterMes from "../ConverterMes";
import NomeCompletoEvento from "../NomeCompletoEvento";

export default function Corridas({ data }) {
    const navigation = useNavigation();

    // Verificar o nome do circuito (na api vem outro nome, sem o nome do patrocinador)
    const paisTraduzido = <TraduzirPais data={data.Circuit.Location.country} />;
    const eventoNomeCompleto = <NomeCompletoEvento data={data.Circuit.circuitId} />;
    const mesCorridaConvertido = <ConverterMes data={data} />;
    const dataSplit = data.date.split('-');
    const dataDia = dataSplit[2];
    const dataFP1Split = data.FirstPractice.date.split('-');
    const dataFP1Dia = dataFP1Split[2];

    const [circuitId, setCircuitId] = useState();
    const [source, setSource] = useState();

    function getSourceImg(circuitId) {
        switch (circuitId) {
            case "albert_park":
                return setSource(require('../../assets/imgCircuitos/albert_park.jpg'));
                break;
            case "americas":
                return setSource(require('../../assets/imgCircuitos/americas.jpg'));
                break;
            case "bahrain":
                return setSource(require('../../assets/imgCircuitos/bahrain.jpg'));
                break;
            case "baku":
                return setSource(require('../../assets/imgCircuitos/baku.jpg'));
                break;
            case "catalunya":
                return setSource(require('../../assets/imgCircuitos/catalunya.jpg'));
                break;
            case "hungaroring":
                return setSource(require('../../assets/imgCircuitos/hungaroring.jpg'));
                break;
            case "imola":
                return setSource(require('../../assets/imgCircuitos/imola.jpg'));
                break;
            case "interlagos":
                return setSource(require('../../assets/imgCircuitos/interlagos.jpg'));
                break;
            case "jeddah":
                return setSource(require('../../assets/imgCircuitos/jeddah.jpg'));
                break;
            case "losail":
                return setSource(require('../../assets/imgCircuitos/losail.jpg'));
                break;
            case "marina_bay":
                return setSource(require('../../assets/imgCircuitos/marina_bay.jpg'));
                break;
            case "miami":
                return setSource(require('../../assets/imgCircuitos/miami.jpg'));
                break;
            case "monaco":
                return setSource(require('../../assets/imgCircuitos/monaco.jpg'));
                break;
            case "monza":
                return setSource(require('../../assets/imgCircuitos/monza.jpg'));
                break;
            case "red_bull_ring":
                return setSource(require('../../assets/imgCircuitos/red_bull_ring.jpg'));
                break;
            case "rodriguez":
                return setSource(require('../../assets/imgCircuitos/rodriguez.jpg'));
                break;
            case "silverstone":
                return setSource(require('../../assets/imgCircuitos/silverstone.jpg'));
                break;
            case "spa":
                return setSource(require('../../assets/imgCircuitos/spa.jpg'));
                break;
            case "suzuka":
                return setSource(require('../../assets/imgCircuitos/suzuka.jpg'));
                break;
            case "vegas":
                return setSource(require('../../assets/imgCircuitos/vegas.jpg'));
                break;
            case "villeneuve":
                return setSource(require('../../assets/imgCircuitos/villeneuve.jpg'));
                break;
            case "yas_marina":
                return setSource(require('../../assets/imgCircuitos/yas_marina.jpg'));
                break;
            case "zandvoort":
                return setSource(require('../../assets/imgCircuitos/zandvoort.jpg'));
                break;
            default:
                return setSource(require('../../assets/forbidden.png'));
                break;
        }
    };

    useEffect(() => {
        setCircuitId(data.Circuit.circuitId);
        getSourceImg(data.Circuit.circuitId);
    }, []);

    return (
        <F1_Card style={{ zIndex: 99 }} onPress={() => {
            navigation.navigate('DetalhesEvento', data);
        }}>
            {circuitId ?
                <F1_Image source={source} />
                :
                <F1_Image source={require('../../assets/forbidden.png')} />
            }
            <F1_Box>
                <View>
                    <F1_DataDia>
                        <Text style={{ fontFamily: 'Ubuntu-Medium' }}>{dataFP1Dia}-{dataDia}</Text>
                    </F1_DataDia>
                    <F1_DataMes>
                        <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>{mesCorridaConvertido}</Text>
                    </F1_DataMes>
                </View>
                <View>
                    <F1_CardTitle>
                        <Text style={{ fontFamily: 'Ubuntu-Medium' }}>{paisTraduzido}</Text>
                    </F1_CardTitle>
                    <F1_CardSubtitle>
                        <Text style={{ fontFamily: 'OpenSans-Regular', color: '#FFF' }}>{eventoNomeCompleto}</Text>
                    </F1_CardSubtitle>

                </View>
            </F1_Box>

        </F1_Card>
    );
}