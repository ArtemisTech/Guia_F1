import React, { useLayoutEffect, useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from "@react-navigation/native";

import {
    F1_Container,
    F1_CardImgEquipe,
    F1_ImgEquipe,
    F1_Gradient,
    F1_ContainerGradient,
    F1_NomeEquipe,
    F1_ContainerNome,
    F1_ImgLogo,
    F1_ContainerInfoEquipe,
    F1_Base,
    F1_NomePais,
    F1_CardPontos,
    F1_TextPontos,
    F1_ContainerPais,
    F1_ImgBandeira,
    F1_CardPosition,
    F1_ConteinerItem,
    F1_TextItemDestaque,
    F1_ConteinerTextTitulo,
    F1_TextCardTituloEsquerda,
    F1_TextCardTituloDireita,
    F1_ContainerDados,
    F1_CardDados,
    F1_ContainerDadosTitulo,
    F1_TextDadosTitulo,
    F1_ConteinerItemMultiple,
    F1_CardImgPiloto,
    F1_ImgPiloto,
    F1_ContainerCardsPilotos,
    F1_ContainerGradientPiloto,
    F1_ContainerNomePiloto,
    F1_NomePiloto,
    F1_ContainerCar,
    F1_ImageCar,
    F1_CarEquipeImg,
    F1_ContainerCarEquipe,
    F1_TextCarEquipe,
    F1_CardInfoExtra,
    F1_TextInfoExtra,
    F1_TextInfoExtraDestaque,
    F1_CardInfoExtraCar
} from './styles';

import api from "../../services/api_F1";
import TraduzirNacionalidade from "../../components/TraduzirNacionalidade";

export default function DetalhesEquipes() {
    const route = useRoute();
    const navigation = useNavigation();

    const [infoEquipe, setInfoEquipe] = useState([]);
    const [pilotosEquipe, setPilotosEquipe] = useState([]);
    const [piloto1, setPiloto1] = useState({});
    const [piloto2, setPiloto2] = useState({});
    const [constructorId, setConstructorId] = useState();
    const [worldChampion, setWorldChampion] = useState();

    const [vitoriasTempAtual, setVitoriasTempAtual] = useState([]);
    const [vitoriasTodasTemp, setVitoriasTodasTemp] = useState([]);
    const [polePositionsTempAtual, setPolePositionsTempAtual] = useState([]);
    const [polePositionsTodasTemp, setPolePositionsTodasTemp] = useState([]);
    const [voltaMaisRapidaTempAtual, setVoltaMaisRapidaTempAtual] = useState([]);
    const [voltaMaisRapidaTodasTemp, setVoltaMaisRapidaTodasTemp] = useState([]);

    const [name, setName] = useState();
    const [nationality, setNationality] = useState();
    const [points, setPoints] = useState();
    const [position, setPosition] = useState();

    const [infoExtra, setInfoExtra] = useState({});
    const [color, setColor] = useState();
    const [colorDadosTitulo, setColorDadosTitulo] = useState();

    const [loading, setLoading] = useState(false);
    const [source, setSource] = useState();
    const [sourceLogoEquipe, setSourceLogoEquipe] = useState();
    const [sourceImgFlag, setSourceImgFlag] = useState();
    const [sourcePiloto1, setSourcePiloto1] = useState();
    const [sourcePiloto2, setSourcePiloto2] = useState();
    const [sourceIconEquipe, setSourceIconEquipe] = useState();
    const [sourceImgCar, setSourceImgCar] = useState();

    const nacionalidadeEquipe = <TraduzirNacionalidade data={nationality} />;

    async function InfoConstructor() {
        const responseEquipe = await api.get(`api/f1/current/constructors/${route.params?.ConstructorId}/constructorStandings.json`);

        if (responseEquipe.data.MRData !== undefined) {
            const listaInfoEquipe = responseEquipe.data.MRData.StandingsTable.StandingsLists;
            setInfoEquipe(listaInfoEquipe);
            setLoading(false);
        } else {
            GetInfoEquipe(route.params?.ConstructorId);
            setLoading(false);
        }
    };

    async function PilotosEquipe() {
        const responsePilotosEquipe = await api.get(`api/f1/current/constructors/${route.params?.ConstructorId}/drivers.json`);

        if (responsePilotosEquipe.data.MRData !== undefined) {
            const listaPilotosEquipe = responsePilotosEquipe.data.MRData.DriverTable.Drivers;
            setPilotosEquipe(listaPilotosEquipe);

        } else {
            GetPilotosEquipe(route.params?.ConstructorId);
        }
    };

    async function VitoriasTempAtual() {
        const responseVitoriasTempAtual = await api.get(`api/f1/current/constructors/${route.params?.ConstructorId}/results/1.json`);

        if (responseVitoriasTempAtual.data.MRData !== undefined) {
            const qtdeVitoriasTempAtual = responseVitoriasTempAtual.data.MRData.total;
            setVitoriasTempAtual(qtdeVitoriasTempAtual);

        } else {
            GetVitoriasTempAtual(route.params?.ConstructorId);
        }
    };

    async function VitoriasTodasTemp() {
        const responseVitoriasTodasTemp = await api.get(`api/f1/constructors/${route.params?.ConstructorId}/results/1.json`);

        if (responseVitoriasTodasTemp.data.MRData !== undefined) {
            const qtdeVitoriasTodasTemp = responseVitoriasTodasTemp.data.MRData.total;
            setVitoriasTodasTemp(qtdeVitoriasTodasTemp);

        } else {
            GetVitoriasTodasTemp(route.params?.ConstructorId);
        }
    };

    async function PolePositionsTempAtual() {
        const responsePolePositionsTempAtual = await api.get(`api/f1/current/constructors/${route.params?.ConstructorId}/qualifying/1.json`);

        if (responsePolePositionsTempAtual.data.MRData !== undefined) {
            const qtdePolePositionsTempAtual = responsePolePositionsTempAtual.data.MRData.total;
            setPolePositionsTempAtual(qtdePolePositionsTempAtual);

        } else {
            GetPolePositionsTempAtual(route.params?.ConstructorId);
        }
    };

    async function PolePositionsTodasTemp() {
        const responsePolePositionsTodasTemp = await api.get(`api/f1/constructors/${route.params?.ConstructorId}/qualifying/1.json`);

        if (responsePolePositionsTodasTemp.data.MRData) {
            const qtdePolePositionsTodasTemp = responsePolePositionsTodasTemp.data.MRData.total;
            setPolePositionsTodasTemp(qtdePolePositionsTodasTemp);

        } else {
            GetPolePositionsTodasTemp(route.params?.ConstructorId);
        }
    };

    async function VoltaMaisRapidaTempAtual() {
        const responseVoltaMaisRapidaTempAtual = await api.get(`api/f1/current/constructors/${route.params?.ConstructorId}/fastest/1/results.json`);

        if (responseVoltaMaisRapidaTempAtual.data.MRData !== undefined) {
            const qtdeVoltaMaisRapidaTempAtual = responseVoltaMaisRapidaTempAtual.data.MRData.total;
            setVoltaMaisRapidaTempAtual(qtdeVoltaMaisRapidaTempAtual);

        } else {
            GetVoltaMaisRapidaTempAtual(route.params?.ConstructorId);
        }
    };

    async function VoltaMaisRapidaTodasTemp() {
        const responseVoltaMaisRapidaTodasTemp = await api.get(`api/f1/constructors/${route.params?.ConstructorId}/fastest/1/results.json`);

        if (responseVoltaMaisRapidaTodasTemp.data.MRData !== undefined) {
            const qtdeVoltaMaisRapidaTodasTemp = responseVoltaMaisRapidaTodasTemp.data.MRData.total;
            setVoltaMaisRapidaTodasTemp(qtdeVoltaMaisRapidaTodasTemp);

        } else {
            GetVoltaMaisRapidaTodasTemp(route.params?.ConstructorId);
        }
    };

    async function WorldChampion() {
        const responseChampion = await api.get(`api/f1/constructors/${route.params?.ConstructorId}/constructorStandings/1.json`);

        if (responseChampion.data.MRData !== undefined) {
            const champion = responseChampion.data.MRData.total;
            setWorldChampion(champion);

        } else {
            GetWorldChampion(route.params?.DriverId);
        }
    };

    function buscarInfoExtra(param) {
        switch (param) {
            case 'alfa':
                const objAlfa = {
                    chassis: "C43",
                    unidadePotencia: "Ferrari",
                    chefeEquipe: "Alessandro Alunni Bravi",
                    chefeTecnico: "Jan Monchaux",
                    base: "Hinwil",
                };
                return setInfoExtra(objAlfa);
                break;
            case 'alphatauri':
                const objAlphaTauri = {
                    chassis: "AT04",
                    unidadePotencia: "Honda RBPT",
                    chefeEquipe: "Franz Tost",
                    chefeTecnico: "Jody Egginton",
                    base: "Faenza",
                };
                return setInfoExtra(objAlphaTauri);
                break;
            case 'alpine':
                const objAlpine = {
                    chassis: "A523",
                    unidadePotencia: "Renault",
                    chefeEquipe: "Otmar Szafnauer",
                    chefeTecnico: "Pat Fry",
                    base: "Enstone",
                };
                return setInfoExtra(objAlpine);
                break;
            case 'aston_martin':
                const objAstonMartin = {
                    chassis: "AMR23",
                    unidadePotencia: "Mercedes",
                    chefeEquipe: "Mike Krack",
                    chefeTecnico: "Dan Fallows",
                    base: "Silverstone",
                };
                return setInfoExtra(objAstonMartin);
                break;
            case 'ferrari':
                const objFerrari = {
                    chassis: "SF-23",
                    unidadePotencia: "Ferrari",
                    chefeEquipe: "Frédéric Vasseur",
                    chefeTecnico: "Enrico Cardille / Enrico Gualtieri",
                    base: "Maranello",
                };
                return setInfoExtra(objFerrari);
                break;
            case 'haas':
                const objHaas = {
                    chassis: "VF-23",
                    unidadePotencia: "Ferrari",
                    chefeEquipe: "Guenther Steiner",
                    chefeTecnico: "Simone Resta",
                    base: "Kannapolis",
                };
                return setInfoExtra(objHaas);
                break;
            case 'mclaren':
                const objMcLaren = {
                    chassis: "MCL60",
                    unidadePotencia: "Mercedes",
                    chefeEquipe: "Andrea Stella",
                    chefeTecnico: "Peter Prodromou / Neil Houldey",
                    base: "Woking",
                };
                return setInfoExtra(objMcLaren);
                break;
            case 'mercedes':
                const objMercedes = {
                    chassis: "W14",
                    unidadePotencia: "Mercedes",
                    chefeEquipe: "Toto Wolff",
                    chefeTecnico: "James Allison",
                    base: "Brackley",
                };
                return setInfoExtra(objMercedes);
                break;
            case 'red_bull':
                const objRedBull = {
                    chassis: "RB19",
                    unidadePotencia: "Honda RBPT",
                    chefeEquipe: "Christian Horner",
                    chefeTecnico: "Pierre Waché",
                    base: "Milton Keynes",
                };
                return setInfoExtra(objRedBull);
                break;
            case 'williams':
                const objWilliams = {
                    chassis: "FW45",
                    unidadePotencia: "Mercedes",
                    chefeEquipe: "James Vowles",
                    chefeTecnico: "-",
                    base: "Grove",
                };
                return setInfoExtra(objWilliams);
                break;
            default:
                const objDefault = {
                    localNascimento: param,
                    bio: param
                }
                return setInfoExtra(objDefault);
        }
    };

    function getImgEquipes(constructorId) {
        switch (constructorId) {
            case "alfa":
                return setSource(require('../../assets/imgEquipes/alfa.png'));
                break;
            case "alphatauri":
                return setSource(require('../../assets/imgEquipes/alphatauri.png'));
                break;
            case "alpine":
                return setSource(require('../../assets/imgEquipes/alpine.png'));
                break;
            case "aston_martin":
                return setSource(require('../../assets/imgEquipes/aston_martin.png'));
                break;
            case "ferrari":
                return setSource(require('../../assets/imgEquipes/ferrari.png'));
                break;
            case "haas":
                return setSource(require('../../assets/imgEquipes/haas.png'));
                break;
            case "mclaren":
                return setSource(require('../../assets/imgEquipes/mclaren.png'));
                break;
            case "mercedes":
                return setSource(require('../../assets/imgEquipes/mercedes.png'));
                break;
            case "red_bull":
                return setSource(require('../../assets/imgEquipes/red_bull.png'));
                break;
            case "williams":
                return setSource(require('../../assets/imgEquipes/williams.png'));
                break;
            default:
                return setSource(require('../../assets/forbidden.png'));
                break;
        }
    };

    function getLogoEquipe(constructorId) {
        switch (constructorId) {
            case "alfa":
                return setSourceLogoEquipe(require('../../assets/logoEquipes/alfa.png'));
                break;
            case "alphatauri":
                return setSourceLogoEquipe(require('../../assets/logoEquipes/alphatauri.png'));
                break;
            case "alpine":
                return setSourceLogoEquipe(require('../../assets/logoEquipes/alpine.png'));
                break;
            case "aston_martin":
                return setSourceLogoEquipe(require('../../assets/logoEquipes/aston_martin.png'));
                break;
            case "ferrari":
                return setSourceLogoEquipe(require('../../assets/logoEquipes/ferrari.png'));
                break;
            case "haas":
                return setSourceLogoEquipe(require('../../assets/logoEquipes/haas.png'));
                break;
            case "mclaren":
                return setSourceLogoEquipe(require('../../assets/logoEquipes/mclaren.png'));
                break;
            case "mercedes":
                return setSourceLogoEquipe(require('../../assets/logoEquipes/mercedes.png'));
                break;
            case "red_bull":
                return setSourceLogoEquipe(require('../../assets/logoEquipes/red_bull.png'));
                break;
            case "williams":
                return setSourceLogoEquipe(require('../../assets/logoEquipes/williams.png'));
                break;
            default:
                return setSourceLogoEquipe(require('../../assets/forbidden.png'));
                break;
        }
    };

    function getImgCountry(nationality) {
        switch (nationality) {
            case "American":
                return setSourceImgFlag(require('../../assets/flags/USA.png'));
                break;
            case "Australian":
                return setSourceImgFlag(require('../../assets/flags/Australia.png'));
                break;
            case "Austrian":
                return setSourceImgFlag(require('../../assets/flags/Austria.png'));
                break;
            case "British":
                return setSourceImgFlag(require('../../assets/flags/UK.png'));
                break;
            case "Canadian":
                return setSourceImgFlag(require('../../assets/flags/Canada.png'));
                break;
            case "Chinese":
                return setSourceImgFlag(require('../../assets/flags/China.png'));
                break;
            case "Danish":
                return setSourceImgFlag(require('../../assets/flags/Denmark.png'));
                break;
            case "Dutch":
                return setSourceImgFlag(require('../../assets/flags/Netherlands.png'));
                break;
            case "Finnish":
                return setSourceImgFlag(require('../../assets/flags/Finland.png'));
                break;
            case "French":
                return setSourceImgFlag(require('../../assets/flags/France.png'));
                break;
            case "German":
                return setSourceImgFlag(require('../../assets/flags/Germany.png'));
                break;
            case "Italian":
                return setSourceImgFlag(require('../../assets/flags/Italy.png'));
                break;
            case "Japanese":
                return setSourceImgFlag(require('../../assets/flags/Japan.png'));
                break;
            case "Mexican":
                return setSourceImgFlag(require('../../assets/flags/Mexico.png'));
                break;
            case "Monegasque":
                return setSourceImgFlag(require('../../assets/flags/Monaco.png'));
                break;
            case "Spanish":
                return setSourceImgFlag(require('../../assets/flags/Spain.png'));
                break;
            case "Swiss":
                return setSourceImgFlag(require('../../assets/flags/Switzerland.png'));
                break;
            case "Thai":
                return setSourceImgFlag(require('../../assets/flags/Thailand.png'));
                break;
            default:
                return setSourceImgFlag(require('../../assets/forbidden.png'));
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
                return setColor('#041E42');
                break;
            default:
                return setColor('#E00600');
                break;
        }
    };

    function getColorDadosTitulo(constructorId) {
        switch (constructorId) {
            case "red_bull":
                return setColorDadosTitulo('#FFF');
                break;
            case "mercedes":
                return setColorDadosTitulo('#12121A');
                break;
            case "aston_martin":
                return setColorDadosTitulo('#FFF');
                break;
            case "ferrari":
                return setColorDadosTitulo('#FFF');
                break;
            case "mclaren":
                return setColorDadosTitulo('#FFF');
                break;
            case "alpine":
                return setColorDadosTitulo('#FFF');
                break;
            case "haas":
                return setColorDadosTitulo('#FFF');
                break;
            case "alfa":
                return setColorDadosTitulo('#FFF');
                break;
            case "alphatauri":
                return setColorDadosTitulo('#FFF');
                break;
            case "williams":
                return setColorDadosTitulo('#FFF');
                break;
            default:
                return setColorDadosTitulo('#FFF');
                break;
        }
    };

    function getImgPiloto1(driverId) {
        switch (driverId) {
            case "max_verstappen":
                return setSourcePiloto1(require('../../assets/imgPilotos/max_verstappen.png'));
                break;
            case "perez":
                return setSourcePiloto1(require('../../assets/imgPilotos/perez.png'));
                break;
            case "alonso":
                return setSourcePiloto1(require('../../assets/imgPilotos/alonso.png'));
                break;
            case "hamilton":
                return setSourcePiloto1(require('../../assets/imgPilotos/hamilton.png'));
                break;
            case "russell":
                return setSourcePiloto1(require('../../assets/imgPilotos/russell.png'));
                break;
            case "sainz":
                return setSourcePiloto1(require('../../assets/imgPilotos/sainz.png'));
                break;
            case "leclerc":
                return setSourcePiloto1(require('../../assets/imgPilotos/leclerc.png'));
                break;
            case "stroll":
                return setSourcePiloto1(require('../../assets/imgPilotos/stroll.png'));
                break;
            case "ocon":
                return setSourcePiloto1(require('../../assets/imgPilotos/ocon.png'));
                break;
            case "gasly":
                return setSourcePiloto1(require('../../assets/imgPilotos/gasly.png'));
                break;
            case "norris":
                return setSourcePiloto1(require('../../assets/imgPilotos/norris.png'));
                break;
            case "hulkenberg":
                return setSourcePiloto1(require('../../assets/imgPilotos/hulkenberg.png'));
                break;
            case "piastri":
                return setSourcePiloto1(require('../../assets/imgPilotos/piastri.png'));
                break;
            case "bottas":
                return setSourcePiloto1(require('../../assets/imgPilotos/bottas.png'));
                break;
            case "zhou":
                return setSourcePiloto1(require('../../assets/imgPilotos/zhou.png'));
                break;
            case "tsunoda":
                return setSourcePiloto1(require('../../assets/imgPilotos/tsunoda.png'));
                break;
            case "kevin_magnussen":
                return setSourcePiloto1(require('../../assets/imgPilotos/kevin_magnussen.png'));
                break;
            case "albon":
                return setSourcePiloto1(require('../../assets/imgPilotos/albon.png'));
                break;
            case "de_vries":
                return setSourcePiloto1(require('../../assets/imgPilotos/de_vries.png'));
                break;
            case "sargeant":
                return setSourcePiloto1(require('../../assets/imgPilotos/sargeant.png'));
                break;
            default:
                return setSourcePiloto1(require('../../assets/forbidden.png'));
                break;
        }
    };

    function getImgPiloto2(driverId) {
        switch (driverId) {
            case "max_verstappen":
                return setSourcePiloto2(require('../../assets/imgPilotos/max_verstappen.png'));
                break;
            case "perez":
                return setSourcePiloto2(require('../../assets/imgPilotos/perez.png'));
                break;
            case "alonso":
                return setSourcePiloto2(require('../../assets/imgPilotos/alonso.png'));
                break;
            case "hamilton":
                return setSourcePiloto2(require('../../assets/imgPilotos/hamilton.png'));
                break;
            case "russell":
                return setSourcePiloto2(require('../../assets/imgPilotos/russell.png'));
                break;
            case "sainz":
                return setSourcePiloto2(require('../../assets/imgPilotos/sainz.png'));
                break;
            case "leclerc":
                return setSourcePiloto2(require('../../assets/imgPilotos/leclerc.png'));
                break;
            case "stroll":
                return setSourcePiloto2(require('../../assets/imgPilotos/stroll.png'));
                break;
            case "ocon":
                return setSourcePiloto2(require('../../assets/imgPilotos/ocon.png'));
                break;
            case "gasly":
                return setSourcePiloto2(require('../../assets/imgPilotos/gasly.png'));
                break;
            case "norris":
                return setSourcePiloto2(require('../../assets/imgPilotos/norris.png'));
                break;
            case "hulkenberg":
                return setSourcePiloto2(require('../../assets/imgPilotos/hulkenberg.png'));
                break;
            case "piastri":
                return setSourcePiloto2(require('../../assets/imgPilotos/piastri.png'));
                break;
            case "bottas":
                return setSourcePiloto2(require('../../assets/imgPilotos/bottas.png'));
                break;
            case "zhou":
                return setSourcePiloto2(require('../../assets/imgPilotos/zhou.png'));
                break;
            case "tsunoda":
                return setSourcePiloto2(require('../../assets/imgPilotos/tsunoda.png'));
                break;
            case "kevin_magnussen":
                return setSourcePiloto2(require('../../assets/imgPilotos/kevin_magnussen.png'));
                break;
            case "albon":
                return setSourcePiloto2(require('../../assets/imgPilotos/albon.png'));
                break;
            case "de_vries":
                return setSourcePiloto2(require('../../assets/imgPilotos/de_vries.png'));
                break;
            case "sargeant":
                return setSourcePiloto2(require('../../assets/imgPilotos/sargeant.png'));
                break;
            default:
                return setSourcePiloto2(require('../../assets/forbidden.png'));
                break;
        }
    };

    function getImgIconEquipe(constructorId) {
        switch (constructorId) {
            case "alfa":
                return setSourceIconEquipe(require('../../assets/logoEquipesIcon/alfa.png'));
                break;
            case "alphatauri":
                return setSourceIconEquipe(require('../../assets/logoEquipesIcon/alphatauri.png'));
                break;
            case "alpine":
                return setSourceIconEquipe(require('../../assets/logoEquipesIcon/alpine.png'));
                break;
            case "aston_martin":
                return setSourceIconEquipe(require('../../assets/logoEquipesIcon/aston_martin.png'));
                break;
            case "ferrari":
                return setSourceIconEquipe(require('../../assets/logoEquipesIcon/ferrari.png'));
                break;
            case "haas":
                return setSourceIconEquipe(require('../../assets/logoEquipesIcon/haas.png'));
                break;
            case "mclaren":
                return setSourceIconEquipe(require('../../assets/logoEquipesIcon/mclaren.png'));
                break;
            case "mercedes":
                return setSourceIconEquipe(require('../../assets/logoEquipesIcon/mercedes.png'));
                break;
            case "red_bull":
                return setSourceIconEquipe(require('../../assets/logoEquipesIcon/red_bull.png'));
                break;
            case "williams":
                return setSourceIconEquipe(require('../../assets/logoEquipesIcon/williams.png'));
                break;
            default:
                return setSourceIconEquipe(require('../../assets/forbidden.png'));
                break;
        }
    };

    function getImgCar(constructorId) {
        switch (constructorId) {
            case "alfa":
                return setSourceImgCar(require('../../assets/cars/alfa.png'));
                break;
            case "alphatauri":
                return setSourceImgCar(require('../../assets/cars/alphatauri.png'));
                break;
            case "alpine":
                return setSourceImgCar(require('../../assets/cars/alpine.png'));
                break;
            case "aston_martin":
                return setSourceImgCar(require('../../assets/cars/aston_martin.png'));
                break;
            case "ferrari":
                return setSourceImgCar(require('../../assets/cars/ferrari.png'));
                break;
            case "haas":
                return setSourceImgCar(require('../../assets/cars/haas.png'));
                break;
            case "mclaren":
                return setSourceImgCar(require('../../assets/cars/mclaren.png'));
                break;
            case "mercedes":
                return setSourceImgCar(require('../../assets/cars/mercedes.png'));
                break;
            case "red_bull":
                return setSourceImgCar(require('../../assets/cars/red_bull.png'));
                break;
            case "williams":
                return setSourceImgCar(require('../../assets/cars/williams.png'));
                break;
            default:
                return setSourceImgCar(require('../../assets/forbidden.png'));
                break;
        }
    };

    // Funções caso a API fique offline
    function GetInfoEquipe(idEquipe) {
        let StandingsLists = '';

        switch (idEquipe) {
            case 'red_bull':
                StandingsLists = [
                    {
                        season: "2023",
                        round: "6",
                        ConstructorStandings: [
                            {
                                position: "1",
                                positionText: "1",
                                points: "249",
                                wins: "6",
                                Constructor: {
                                    constructorId: "red_bull",
                                    url: "http://en.wikipedia.org/wiki/Red_Bull_Racing",
                                    name: "Red Bull",
                                    nationality: "Austrian"
                                }
                            }
                        ]
                    }
                ]
                    ;
                return setInfoEquipe(StandingsLists);
                break;
            case 'aston_martin':
                StandingsLists = [
                    {
                        season: "2023",
                        round: "6",
                        ConstructorStandings: [
                            {
                                position: "2",
                                positionText: "2",
                                points: "120",
                                wins: "0",
                                Constructor: {
                                    constructorId: "aston_martin",
                                    url: "http://en.wikipedia.org/wiki/Aston_Martin_in_Formula_One",
                                    name: "Aston Martin",
                                    nationality: "British"
                                }
                            }
                        ]
                    }
                ]
                    ;
                return setInfoEquipe(StandingsLists);
                break;
            case 'mercedes':
                StandingsLists = [
                    {
                        season: "2023",
                        round: "6",
                        ConstructorStandings: [
                            {
                                position: "3",
                                positionText: "3",
                                points: "119",
                                wins: "0",
                                Constructor: {
                                    constructorId: "mercedes",
                                    url: "http://en.wikipedia.org/wiki/Mercedes-Benz_in_Formula_One",
                                    name: "Mercedes",
                                    nationality: "German"
                                }
                            }
                        ]
                    }
                ]
                    ;
                return setInfoEquipe(StandingsLists);
                break;
            case 'ferrari':
                StandingsLists = [
                    {
                        season: "2023",
                        round: "6",
                        ConstructorStandings: [
                            {
                                position: "4",
                                positionText: "4",
                                points: "90",
                                wins: "0",
                                Constructor: {
                                    constructorId: "ferrari",
                                    url: "http://en.wikipedia.org/wiki/Scuderia_Ferrari",
                                    name: "Ferrari",
                                    nationality: "Italian"
                                }
                            }
                        ]
                    }
                ]
                    ;
                return setInfoEquipe(StandingsLists);
                break;
            case 'alpine':
                StandingsLists = [
                    {
                        season: "2023",
                        round: "6",
                        ConstructorStandings: [
                            {
                                position: "5",
                                positionText: "5",
                                points: "35",
                                wins: "0",
                                Constructor: {
                                    constructorId: "alpine",
                                    url: "http://en.wikipedia.org/wiki/Alpine_F1_Team",
                                    name: "Alpine F1 Team",
                                    nationality: "French"
                                }
                            }
                        ]
                    }
                ]
                    ;
                return setInfoEquipe(StandingsLists);
                break;
            case 'mclaren':
                StandingsLists = [
                    {
                        season: "2023",
                        round: "6",
                        ConstructorStandings: [
                            {
                                position: "6",
                                positionText: "6",
                                points: "17",
                                wins: "0",
                                Constructor: {
                                    constructorId: "mclaren",
                                    url: "http://en.wikipedia.org/wiki/McLaren",
                                    name: "McLaren",
                                    nationality: "British"
                                }
                            }
                        ]
                    }
                ]
                    ;
                return setInfoEquipe(StandingsLists);
                break;
            case 'haas':
                StandingsLists = [
                    {
                        season: "2023",
                        round: "6",
                        ConstructorStandings: [
                            {
                                position: "7",
                                positionText: "7",
                                points: "8",
                                wins: "0",
                                Constructor: {
                                    constructorId: "haas",
                                    url: "http://en.wikipedia.org/wiki/Haas_F1_Team",
                                    name: "Haas F1 Team",
                                    nationality: "American"
                                }
                            }
                        ]
                    }
                ]
                    ;
                return setInfoEquipe(StandingsLists);
                break;
            case 'alfa':
                StandingsLists = [
                    {
                        season: "2023",
                        round: "6",
                        ConstructorStandings: [
                            {
                                position: "8",
                                positionText: "8",
                                points: "6",
                                wins: "0",
                                Constructor: {
                                    constructorId: "alfa",
                                    url: "http://en.wikipedia.org/wiki/Alfa_Romeo_in_Formula_One",
                                    name: "Alfa Romeo",
                                    nationality: "Swiss"
                                }
                            }
                        ]
                    }
                ]
                    ;
                return setInfoEquipe(StandingsLists);
                break;
            case 'alphatauri':
                StandingsLists = [
                    {
                        season: "2023",
                        round: "6",
                        ConstructorStandings: [
                            {
                                position: "9",
                                positionText: "9",
                                points: "2",
                                wins: "0",
                                Constructor: {
                                    constructorId: "alphatauri",
                                    url: "http://en.wikipedia.org/wiki/Scuderia_AlphaTauri",
                                    name: "AlphaTauri",
                                    nationality: "Italian"
                                }
                            }
                        ]
                    }
                ]
                    ;
                return setInfoEquipe(StandingsLists);
                break;
            case 'williams':
                StandingsLists = [
                    {
                        season: "2023",
                        round: "6",
                        ConstructorStandings: [
                            {
                                position: "10",
                                positionText: "10",
                                points: "1",
                                wins: "0",
                                Constructor: {
                                    constructorId: "williams",
                                    url: "http://en.wikipedia.org/wiki/Williams_Grand_Prix_Engineering",
                                    name: "Williams",
                                    nationality: "British"
                                }
                            }
                        ]
                    }
                ]
                    ;
                return setInfoEquipe(StandingsLists);
                break;
            default:
                return setInfoEquipe(StandingsLists);
        }
    };

    function GetPilotosEquipe(idEquipe) {
        let Drivers = '';

        switch (idEquipe) {
            case 'red_bull':
                Drivers = [
                    {
                        driverId: "perez",
                        permanentNumber: "11",
                        code: "PER",
                        url: "http://en.wikipedia.org/wiki/Sergio_P%C3%A9rez",
                        givenName: "Sergio",
                        familyName: "Pérez",
                        dateOfBirth: "1990-01-26",
                        nationality: "Mexican"
                    },
                    {
                        driverId: "max_verstappen",
                        permanentNumber: "33",
                        code: "VER",
                        url: "http://en.wikipedia.org/wiki/Max_Verstappen",
                        givenName: "Max",
                        familyName: "Verstappen",
                        dateOfBirth: "1997-09-30",
                        nationality: "Dutch"
                    }
                ]
                    ;
                return setPilotosEquipe(Drivers);
                break;
            case 'aston_martin':
                Drivers = [
                    {
                        driverId: "alonso",
                        permanentNumber: "14",
                        code: "ALO",
                        url: "http://en.wikipedia.org/wiki/Fernando_Alonso",
                        givenName: "Fernando",
                        familyName: "Alonso",
                        dateOfBirth: "1981-07-29",
                        nationality: "Spanish"
                    },
                    {
                        driverId: "stroll",
                        permanentNumber: "18",
                        code: "STR",
                        url: "http://en.wikipedia.org/wiki/Lance_Stroll",
                        givenName: "Lance",
                        familyName: "Stroll",
                        dateOfBirth: "1998-10-29",
                        nationality: "Canadian"
                    }
                ]
                    ;
                return setPilotosEquipe(Drivers);
                break;
            case 'mercedes':
                Drivers = [
                    {
                        driverId: "hamilton",
                        permanentNumber: "44",
                        code: "HAM",
                        url: "http://en.wikipedia.org/wiki/Lewis_Hamilton",
                        givenName: "Lewis",
                        familyName: "Hamilton",
                        dateOfBirth: "1985-01-07",
                        nationality: "British"
                    },
                    {
                        driverId: "russell",
                        permanentNumber: "63",
                        code: "RUS",
                        url: "http://en.wikipedia.org/wiki/George_Russell_%28racing_driver%29",
                        givenName: "George",
                        familyName: "Russell",
                        dateOfBirth: "1998-02-15",
                        nationality: "British"
                    }
                ]
                    ;
                return setPilotosEquipe(Drivers);
                break;
            case 'ferrari':
                Drivers = [
                    {
                        driverId: "leclerc",
                        permanentNumber: "16",
                        code: "LEC",
                        url: "http://en.wikipedia.org/wiki/Charles_Leclerc",
                        givenName: "Charles",
                        familyName: "Leclerc",
                        dateOfBirth: "1997-10-16",
                        nationality: "Monegasque"
                    },
                    {
                        driverId: "sainz",
                        permanentNumber: "55",
                        code: "SAI",
                        url: "http://en.wikipedia.org/wiki/Carlos_Sainz_Jr.",
                        givenName: "Carlos",
                        familyName: "Sainz",
                        dateOfBirth: "1994-09-01",
                        nationality: "Spanish"
                    }
                ]
                    ;
                return setPilotosEquipe(Drivers);
                break;
            case 'alpine':
                Drivers = [
                    {
                        driverId: "gasly",
                        permanentNumber: "10",
                        code: "GAS",
                        url: "http://en.wikipedia.org/wiki/Pierre_Gasly",
                        givenName: "Pierre",
                        familyName: "Gasly",
                        dateOfBirth: "1996-02-07",
                        nationality: "French"
                    },
                    {
                        driverId: "ocon",
                        permanentNumber: "31",
                        code: "OCO",
                        url: "http://en.wikipedia.org/wiki/Esteban_Ocon",
                        givenName: "Esteban",
                        familyName: "Ocon",
                        dateOfBirth: "1996-09-17",
                        nationality: "French"
                    }
                ]
                    ;
                return setPilotosEquipe(Drivers);
                break;
            case 'mclaren':
                Drivers = [
                    {
                        driverId: "norris",
                        permanentNumber: "4",
                        code: "NOR",
                        url: "http://en.wikipedia.org/wiki/Lando_Norris",
                        givenName: "Lando",
                        familyName: "Norris",
                        dateOfBirth: "1999-11-13",
                        nationality: "British"
                    },
                    {
                        driverId: "piastri",
                        permanentNumber: "81",
                        code: "PIA",
                        url: "http://en.wikipedia.org/wiki/Oscar_Piastri",
                        givenName: "Oscar",
                        familyName: "Piastri",
                        dateOfBirth: "2001-04-06",
                        nationality: "Australian"
                    }
                ]
                    ;
                return setPilotosEquipe(Drivers);
                break;
            case 'haas':
                Drivers = [
                    {
                        driverId: "hulkenberg",
                        permanentNumber: "27",
                        code: "HUL",
                        url: "http://en.wikipedia.org/wiki/Nico_H%C3%BClkenberg",
                        givenName: "Nico",
                        familyName: "Hülkenberg",
                        dateOfBirth: "1987-08-19",
                        nationality: "German"
                    },
                    {
                        driverId: "kevin_magnussen",
                        permanentNumber: "20",
                        code: "MAG",
                        url: "http://en.wikipedia.org/wiki/Kevin_Magnussen",
                        givenName: "Kevin",
                        familyName: "Magnussen",
                        dateOfBirth: "1992-10-05",
                        nationality: "Danish"
                    }
                ]
                    ;
                return setPilotosEquipe(Drivers);
                break;
            case 'alfa':
                Drivers = [
                    {
                        driverId: "bottas",
                        permanentNumber: "77",
                        code: "BOT",
                        url: "http://en.wikipedia.org/wiki/Valtteri_Bottas",
                        givenName: "Valtteri",
                        familyName: "Bottas",
                        dateOfBirth: "1989-08-28",
                        nationality: "Finnish"
                    },
                    {
                        driverId: "zhou",
                        permanentNumber: "24",
                        code: "ZHO",
                        url: "http://en.wikipedia.org/wiki/Guanyu_Zhou",
                        givenName: "Guanyu",
                        familyName: "Zhou",
                        dateOfBirth: "1999-05-30",
                        nationality: "Chinese"
                    }
                ]
                    ;
                return setPilotosEquipe(Drivers);
                break;
            case 'alphatauri':
                Drivers = [
                    {
                        driverId: "de_vries",
                        permanentNumber: "21",
                        code: "DEV",
                        url: "http://en.wikipedia.org/wiki/Nyck_de_Vries",
                        givenName: "Nyck",
                        familyName: "de Vries",
                        dateOfBirth: "1995-02-06",
                        nationality: "Dutch"
                    },
                    {
                        driverId: "tsunoda",
                        permanentNumber: "22",
                        code: "TSU",
                        url: "http://en.wikipedia.org/wiki/Yuki_Tsunoda",
                        givenName: "Yuki",
                        familyName: "Tsunoda",
                        dateOfBirth: "2000-05-11",
                        nationality: "Japanese"
                    }
                ]
                    ;
                return setPilotosEquipe(Drivers);
                break;
            case 'williams':
                Drivers = [
                    {
                        driverId: "albon",
                        permanentNumber: "23",
                        code: "ALB",
                        url: "http://en.wikipedia.org/wiki/Alexander_Albon",
                        givenName: "Alexander",
                        familyName: "Albon",
                        dateOfBirth: "1996-03-23",
                        nationality: "Thai"
                    },
                    {
                        driverId: "sargeant",
                        permanentNumber: "2",
                        code: "SAR",
                        url: "http://en.wikipedia.org/wiki/Logan_Sargeant",
                        givenName: "Logan",
                        familyName: "Sargeant",
                        dateOfBirth: "2000-12-31",
                        nationality: "American"
                    }
                ]
                    ;
                return setPilotosEquipe(Drivers);
                break;
            default:
                return setPilotosEquipe(Drivers);
        }
    };

    function GetVitoriasTempAtual(idEquipe) {

        switch (idEquipe) {
            case 'red_bull':
                return setVitoriasTempAtual('6');
                break;
            case 'aston_martin':
                return setVitoriasTempAtual('0');
                break;
            case 'mercedes':
                return setVitoriasTempAtual('0');
                break;
            case 'ferrari':
                return setVitoriasTempAtual('0');
                break;
            case 'alpine':
                return setVitoriasTempAtual('0');
                break;
            case 'mclaren':
                return setVitoriasTempAtual('0');
                break;
            case 'haas':
                return setVitoriasTempAtual('0');
                break;
            case 'alfa':
                return setVitoriasTempAtual('0');
                break;
            case 'alphatauri':
                return setVitoriasTempAtual('0');
                break;
            case 'williams':
                return setVitoriasTempAtual('0');
                break;
            default:
                return setVitoriasTempAtual('');
        }
    };

    function GetVitoriasTodasTemp(idEquipe) {

        switch (idEquipe) {
            case 'red_bull':
                return setVitoriasTodasTemp('98');
                break;
            case 'aston_martin':
                return setVitoriasTodasTemp('0');
                break;
            case 'mercedes':
                return setVitoriasTodasTemp('125');
                break;
            case 'ferrari':
                return setVitoriasTodasTemp('243');
                break;
            case 'alpine':
                return setVitoriasTodasTemp('1');
                break;
            case 'mclaren':
                return setVitoriasTodasTemp('179');
                break;
            case 'haas':
                return setVitoriasTodasTemp('0');
                break;
            case 'alfa':
                return setVitoriasTodasTemp('11');
                break;
            case 'alphatauri':
                return setVitoriasTodasTemp('1');
                break;
            case 'williams':
                return setVitoriasTodasTemp('0');
                break;
            default:
                return setVitoriasTodasTemp('114');
        }
    };

    function GetPolePositionsTempAtual(idEquipe) {

        switch (idEquipe) {
            case 'red_bull':
                return setPolePositionsTempAtual('5');
                break;
            case 'aston_martin':
                return setPolePositionsTempAtual('0');
                break;
            case 'mercedes':
                return setPolePositionsTempAtual('0');
                break;
            case 'ferrari':
                return setPolePositionsTempAtual('1');
                break;
            case 'alpine':
                return setPolePositionsTempAtual('0');
                break;
            case 'mclaren':
                return setPolePositionsTempAtual('0');
                break;
            case 'haas':
                return setPolePositionsTempAtual('0');
                break;
            case 'alfa':
                return setPolePositionsTempAtual('0');
                break;
            case 'alphatauri':
                return setPolePositionsTempAtual('0');
                break;
            case 'williams':
                return setPolePositionsTempAtual('0');
                break;
            default:
                return setPolePositionsTempAtual('');
        }
    };

    function GetPolePositionsTodasTemp(idEquipe) {

        switch (idEquipe) {
            case 'red_bull':
                return setPolePositionsTodasTemp('85');
                break;
            case 'aston_martin':
                return setPolePositionsTodasTemp('0');
                break;
            case 'mercedes':
                return setPolePositionsTodasTemp('131');
                break;
            case 'ferrari':
                return setPolePositionsTodasTemp('96');
                break;
            case 'alpine':
                return setPolePositionsTodasTemp('0');
                break;
            case 'mclaren':
                return setPolePositionsTodasTemp('56');
                break;
            case 'haas':
                return setPolePositionsTodasTemp('1');
                break;
            case 'alfa':
                return setPolePositionsTodasTemp('0');
                break;
            case 'alphatauri':
                return setPolePositionsTodasTemp('0');
                break;
            case 'williams':
                return setPolePositionsTodasTemp('38');
                break;
            default:
                return setPolePositionsTodasTemp('');
        }
    };

    function GetVoltaMaisRapidaTempAtual(idEquipe) {

        switch (idEquipe) {
            case 'red_bull':
                return setVoltaMaisRapidaTempAtual('3');
                break;
            case 'aston_martin':
                return setVoltaMaisRapidaTempAtual('0');
                break;
            case 'mercedes':
                return setVoltaMaisRapidaTempAtual('1');
                break;
            case 'ferrari':
                return setVoltaMaisRapidaTempAtual('0');
                break;
            case 'alpine':
                return setVoltaMaisRapidaTempAtual('0');
                break;
            case 'mclaren':
                return setVoltaMaisRapidaTempAtual('0');
                break;
            case 'haas':
                return setVoltaMaisRapidaTempAtual('0');
                break;
            case 'alfa':
                return setVoltaMaisRapidaTempAtual('1');
                break;
            case 'alphatauri':
                return setVoltaMaisRapidaTempAtual('0');
                break;
            case 'williams':
                return setVoltaMaisRapidaTempAtual('0');
                break;
            default:
                return setVoltaMaisRapidaTempAtual('');
        }
    };

    function GetVoltaMaisRapidaTodasTemp(idEquipe) {

        switch (idEquipe) {
            case 'red_bull':
                return setVoltaMaisRapidaTodasTemp('87');
                break;
            case 'aston_martin':
                return setVoltaMaisRapidaTodasTemp('0');
                break;
            case 'mercedes':
                return setVoltaMaisRapidaTodasTemp('93');
                break;
            case 'ferrari':
                return setVoltaMaisRapidaTodasTemp('92');
                break;
            case 'alpine':
                return setVoltaMaisRapidaTodasTemp('0');
                break;
            case 'mclaren':
                return setVoltaMaisRapidaTodasTemp('50');
                break;
            case 'haas':
                return setVoltaMaisRapidaTodasTemp('2');
                break;
            case 'alfa':
                return setVoltaMaisRapidaTodasTemp('2');
                break;
            case 'alphatauri':
                return setVoltaMaisRapidaTodasTemp('1');
                break;
            case 'williams':
                return setVoltaMaisRapidaTodasTemp('7');
                break;
            default:
                return setVoltaMaisRapidaTodasTemp('');
        }
    };

    function GetWorldChampion(constructorId) {

        switch (constructorId) {
            case 'mercedes':
                return setWorldChampion('8');
                break;
            case 'red_bull':
                return setWorldChampion('5');
                break;
            case 'ferrari':
                return setWorldChampion('16');
                break;
            case 'mclaren':
                return setWorldChampion('8');
                break;
            case 'alfa':
                return setWorldChampion('0');
                break;
            case 'alphatauri':
                return setWorldChampion('0');
                break;
            case 'alpine':
                return setWorldChampion('0');
                break;
            case 'aston_martin':
                return setWorldChampion('0');
                break;
            case 'haas':
                return setWorldChampion('0');
                break;
            case 'williams':
                return setWorldChampion('9');
                break;
            default:
                return setWorldChampion('');
        }
    };

    useEffect(() => {
        setLoading(true);
        async function carregarInfoEquipe() {
            // acessar dados da equipe
            InfoConstructor();

            // acessar pilotos atuais da equipe
            PilotosEquipe();

            // acessar quantidade de vitórias da temporada atual
            VitoriasTempAtual();

            // acessar quantidade de vitórias de todas as temporadas
            VitoriasTodasTemp();

            // acessar quantidade de pole positions na temporada atual
            PolePositionsTempAtual();

            // acessar quantidade de pole positions em todas as temporadas
            PolePositionsTodasTemp();

            // acessar quantidade de voltas mais rápidas na temporada atual
            VoltaMaisRapidaTempAtual();

            // acessar quantidade de voltas mais rápidas em todas as temporadas
            VoltaMaisRapidaTodasTemp();

            // quantidade de campeonatos de construtores
            WorldChampion();
        }
        carregarInfoEquipe();
    }, []);

    useEffect(() => {
        infoEquipe.map((standings) => {
            standings.ConstructorStandings.map((item) => {
                setName(item.Constructor.name);
                setNationality(item.Constructor.nationality);
                setPoints(item.points);
                setPosition(item.position);
                setConstructorId(item.Constructor.constructorId);
                getImgCountry(item.Constructor.nationality);
                getImgEquipes(item.Constructor.constructorId);
                getLogoEquipe(item.Constructor.constructorId);
                getColor(item.Constructor.constructorId);
                getColorDadosTitulo(item.Constructor.constructorId);
                getImgIconEquipe(item.Constructor.constructorId);
                getImgCar(item.Constructor.constructorId);
            });
        });
        buscarInfoExtra(route.params?.ConstructorId);

    }, [infoEquipe]);

    useEffect(() => {
        pilotosEquipe.map((piloto, index) => {
            if (index == 0) {
                const objPiloto1 = {
                    driverId: piloto.driverId,
                    givenName: piloto.givenName,
                    familyName: piloto.familyName
                }
                setPiloto1(objPiloto1);
                getImgPiloto1(piloto.driverId);
            }
            if (index == 1) {
                const objPiloto2 = {
                    driverId: piloto.driverId,
                    givenName: piloto.givenName,
                    familyName: piloto.familyName
                }
                setPiloto2(objPiloto2);
                getImgPiloto2(piloto.driverId);
            }

        });
    }, [pilotosEquipe]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Detalhes'
        })

    }, [navigation]);

    return (
        loading ? (
            <View style={{ flex: 1, backgroundColor: '#12121A', alignItems: 'center', justifyContent: 'center' }}>
                <View>
                    <ActivityIndicator size={30} color={'red'} />
                    <Text style={{ color: '#FFF' }}>Conectando ao servidor</Text>
                </View>
            </View>
        ) : (
            <ScrollView>
                <F1_Container>
                    {/* Imagem da equipe */}
                    <F1_CardImgEquipe>
                        {constructorId ?
                            <F1_ImgEquipe source={source}></F1_ImgEquipe>
                            :
                            <F1_ImgEquipe source={require('../../assets/forbidden.png')}></F1_ImgEquipe>
                        }
                        <F1_ContainerGradient>
                            <F1_Gradient></F1_Gradient>
                        </F1_ContainerGradient>
                    </F1_CardImgEquipe>
                    {/* Nome da equipe */}
                    <F1_ContainerNome>
                        {constructorId ?
                            <F1_ImgLogo source={sourceLogoEquipe}></F1_ImgLogo>
                            :
                            <F1_ImgLogo source={require('../../assets/forbidden.png')}></F1_ImgLogo>
                        }
                        <F1_NomeEquipe>
                            <Text style={{ fontFamily: 'Ubuntu-Medium' }}>{name}</Text>
                        </F1_NomeEquipe>
                    </F1_ContainerNome>
                    {/* Informações da equipe (base e pontos) */}
                    <F1_ContainerInfoEquipe>
                        <View>
                            <F1_Base>
                                <Text style={{ fontFamily: 'OpenSans-Regular' }}>Base</Text>
                            </F1_Base>
                            <F1_ContainerPais>
                                {nationality ?
                                    <F1_ImgBandeira source={sourceImgFlag}></F1_ImgBandeira>
                                    :
                                    <F1_ImgBandeira source={require('../../assets/forbidden.png')}></F1_ImgBandeira>
                                }
                                <F1_NomePais>
                                    <Text style={{ fontFamily: 'Ubuntu-Medium' }}>{infoExtra.base}</Text>
                                </F1_NomePais>
                            </F1_ContainerPais>
                        </View>
                        <F1_CardPontos>
                            <F1_TextPontos>
                                <Text style={{ fontFamily: 'Ubuntu-Medium' }}>{points} pts</Text>
                            </F1_TextPontos>
                        </F1_CardPontos>
                    </F1_ContainerInfoEquipe>
                    {/* Temporada atual e qtde de campeonatos de construtores */}
                    <F1_CardPosition>
                        <F1_ConteinerItem>
                            <F1_TextItemDestaque>
                                <Text style={{ fontFamily: 'Ubuntu-Bold' }}>{position}º</Text>
                            </F1_TextItemDestaque>
                            <F1_ConteinerTextTitulo>
                                <F1_TextCardTituloEsquerda>
                                    <Text style={{ fontFamily: 'OpenSans-Regular', textAlign: 'left' }}>Temporada atual</Text>
                                </F1_TextCardTituloEsquerda>
                            </F1_ConteinerTextTitulo>
                        </F1_ConteinerItem>
                        <F1_ConteinerItem>
                            <F1_ConteinerTextTitulo>
                                <F1_TextCardTituloDireita>
                                    <Text style={{ fontFamily: 'OpenSans-Regular', textAlign: "right" }}>Campeonato de construtores</Text>
                                </F1_TextCardTituloDireita>
                            </F1_ConteinerTextTitulo>
                            <F1_TextItemDestaque>
                                <Text style={{ fontFamily: 'Ubuntu-Bold' }}>{worldChampion}</Text>
                            </F1_TextItemDestaque>
                        </F1_ConteinerItem>
                    </F1_CardPosition>
                    {/* Cards de dados da temporada atual e de todos os tempos */}
                    <F1_ContainerDados>
                        <F1_CardDados>
                            <F1_ContainerDadosTitulo style={{ backgroundColor: color }}>
                                <F1_TextDadosTitulo>
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', color: colorDadosTitulo }}>2023</Text>
                                </F1_TextDadosTitulo>
                            </F1_ContainerDadosTitulo>
                            <F1_ConteinerItemMultiple>
                                <F1_TextItemDestaque>
                                    <Text style={{ fontFamily: 'Ubuntu-Bold' }}>{vitoriasTempAtual}</Text>
                                </F1_TextItemDestaque>
                                <F1_ConteinerTextTitulo>
                                    <F1_TextCardTituloEsquerda>
                                        <Text style={{ fontFamily: 'OpenSans-Regular', textAlign: 'left' }}>vitória(s)</Text>
                                    </F1_TextCardTituloEsquerda>
                                </F1_ConteinerTextTitulo>
                            </F1_ConteinerItemMultiple>
                            <F1_ConteinerItemMultiple>
                                <F1_TextItemDestaque>
                                    <Text style={{ fontFamily: 'Ubuntu-Bold' }}>{polePositionsTempAtual}</Text>
                                </F1_TextItemDestaque>
                                <F1_ConteinerTextTitulo>
                                    <F1_TextCardTituloEsquerda>
                                        <Text style={{ fontFamily: 'OpenSans-Regular', textAlign: 'left' }}>pole position</Text>
                                    </F1_TextCardTituloEsquerda>
                                </F1_ConteinerTextTitulo>
                            </F1_ConteinerItemMultiple>
                            <F1_ConteinerItemMultiple>
                                <F1_TextItemDestaque>
                                    <Text style={{ fontFamily: 'Ubuntu-Bold' }}>{voltaMaisRapidaTempAtual}</Text>
                                </F1_TextItemDestaque>
                                <F1_ConteinerTextTitulo>
                                    <F1_TextCardTituloEsquerda>
                                        <Text style={{ fontFamily: 'OpenSans-Regular', textAlign: 'left' }}>voltas + rápidas</Text>
                                    </F1_TextCardTituloEsquerda>
                                </F1_ConteinerTextTitulo>
                            </F1_ConteinerItemMultiple>
                        </F1_CardDados>
                        <F1_CardDados>
                            <F1_ContainerDadosTitulo style={{ backgroundColor: '#E00600' }}>
                                <F1_TextDadosTitulo>
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', color: '#FFF' }}>Todas as temporadas</Text>
                                </F1_TextDadosTitulo>
                            </F1_ContainerDadosTitulo>
                            <F1_ConteinerItemMultiple>
                                <F1_TextItemDestaque>
                                    <Text style={{ fontFamily: 'Ubuntu-Bold' }}>{vitoriasTodasTemp}</Text>
                                </F1_TextItemDestaque>
                                <F1_ConteinerTextTitulo>
                                    <F1_TextCardTituloEsquerda>
                                        <Text style={{ fontFamily: 'OpenSans-Regular', textAlign: 'left' }}>vitória(s)</Text>
                                    </F1_TextCardTituloEsquerda>
                                </F1_ConteinerTextTitulo>
                            </F1_ConteinerItemMultiple>
                            <F1_ConteinerItemMultiple>
                                <F1_TextItemDestaque>
                                    <Text style={{ fontFamily: 'Ubuntu-Bold' }}>{polePositionsTodasTemp}</Text>
                                </F1_TextItemDestaque>
                                <F1_ConteinerTextTitulo>
                                    <F1_TextCardTituloEsquerda>
                                        <Text style={{ fontFamily: 'OpenSans-Regular', textAlign: 'left' }}>pole position</Text>
                                    </F1_TextCardTituloEsquerda>
                                </F1_ConteinerTextTitulo>
                            </F1_ConteinerItemMultiple>
                            <F1_ConteinerItemMultiple>
                                <F1_TextItemDestaque>
                                    <Text style={{ fontFamily: 'Ubuntu-Bold' }}>{voltaMaisRapidaTodasTemp}</Text>
                                </F1_TextItemDestaque>
                                <F1_ConteinerTextTitulo>
                                    <F1_TextCardTituloEsquerda>
                                        <Text style={{ fontFamily: 'OpenSans-Regular', textAlign: 'left' }}>voltas + rápidas</Text>
                                    </F1_TextCardTituloEsquerda>
                                </F1_ConteinerTextTitulo>
                            </F1_ConteinerItemMultiple>
                        </F1_CardDados>
                    </F1_ContainerDados>
                    {/* Cards dos pilotos da equipe */}
                    <F1_ContainerCardsPilotos>
                        <F1_CardImgPiloto style={{ backgroundColor: color }} onPress={() => {
                            navigation.navigate('DetalhesPiloto', { DriverId: piloto1.driverId });
                        }}>
                            {piloto1.driverId ?
                                <F1_ImgPiloto source={sourcePiloto1}></F1_ImgPiloto>
                                :
                                <F1_ImgPiloto source={require('../../assets/forbidden.png')}></F1_ImgPiloto>
                            }
                            <F1_ContainerGradientPiloto>
                                <F1_Gradient></F1_Gradient>
                            </F1_ContainerGradientPiloto>
                            <F1_ContainerNomePiloto>
                                <F1_NomePiloto>
                                    <Text style={{ fontFamily: 'OpenSans-Regular' }}>{piloto1.givenName}</Text>
                                    <Text style={{ fontFamily: 'OpenSans-Bold' }}>&nbsp;{piloto1.familyName}</Text>
                                </F1_NomePiloto>
                            </F1_ContainerNomePiloto>
                        </F1_CardImgPiloto>
                        <F1_CardImgPiloto style={{ backgroundColor: color }} onPress={() => {
                            navigation.navigate('DetalhesPiloto', { DriverId: piloto2.driverId });
                        }}>
                            {piloto2.driverId ?
                                <F1_ImgPiloto source={sourcePiloto2}></F1_ImgPiloto>
                                :
                                <F1_ImgPiloto source={require('../../assets/forbidden.png')}></F1_ImgPiloto>
                            }
                            <F1_ContainerGradientPiloto>
                                <F1_Gradient></F1_Gradient>
                            </F1_ContainerGradientPiloto>
                            <F1_ContainerNomePiloto>
                                <F1_NomePiloto>
                                    <Text style={{ fontFamily: 'OpenSans-Regular' }}>{piloto2.givenName}</Text>
                                    <Text style={{ fontFamily: 'OpenSans-Bold' }}>&nbsp;{piloto2.familyName}</Text>
                                </F1_NomePiloto>
                            </F1_ContainerNomePiloto>
                        </F1_CardImgPiloto>
                    </F1_ContainerCardsPilotos>
                    {/* Imagem do carro da equipe */}
                    <F1_ContainerCar style={{ backgroundColor: color, elevation: 15 }}>
                        <F1_ContainerCarEquipe>
                            {constructorId ?
                                <F1_CarEquipeImg source={sourceIconEquipe}></F1_CarEquipeImg>
                                :
                                <F1_CarEquipeImg source={require('../../assets/forbidden.png')}></F1_CarEquipeImg>
                            }
                            <F1_TextCarEquipe style={{ color: colorDadosTitulo }}>
                                <Text style={{ fontFamily: 'OpenSans-SemiBold' }} >{name}</Text>
                            </F1_TextCarEquipe>
                        </F1_ContainerCarEquipe>
                        {constructorId ?
                            <F1_ImageCar source={sourceImgCar}></F1_ImageCar>
                            :
                            <F1_ImageCar source={require('../../assets/forbidden.png')}></F1_ImageCar>
                        }
                    </F1_ContainerCar>
                    {/* Informações extras da equipe */}
                    <F1_CardInfoExtraCar style={{ backgroundColor: '#37374E' }}>
                        <F1_TextInfoExtra>
                            <Text style={{ fontFamily: 'OpenSans-Regular' }}>Chassis</Text>
                        </F1_TextInfoExtra>
                        <F1_TextInfoExtraDestaque style={{ marginBottom: 18 }}>
                            <Text style={{ fontFamily: 'Ubuntu-Medium' }}>{infoExtra.chassis}</Text>
                        </F1_TextInfoExtraDestaque>
                        <F1_TextInfoExtra>
                            <Text style={{ fontFamily: 'OpenSans-Regular' }}>Unidade de potência</Text>
                        </F1_TextInfoExtra>
                        <F1_TextInfoExtraDestaque>
                            <Text style={{ fontFamily: 'Ubuntu-Medium' }}>{infoExtra.unidadePotencia}</Text>
                        </F1_TextInfoExtraDestaque>
                    </F1_CardInfoExtraCar>
                    {/* Informações extras da equipe */}
                    <F1_CardInfoExtra style={{ backgroundColor: '#37374E' }}>
                        <F1_TextInfoExtra>
                            <Text style={{ fontFamily: 'OpenSans-Regular' }}>Chefe de equipe</Text>
                        </F1_TextInfoExtra>
                        <F1_TextInfoExtraDestaque style={{ marginBottom: 18 }}>
                            <Text style={{ fontFamily: 'Ubuntu-Medium' }}>{infoExtra.chefeEquipe}</Text>
                        </F1_TextInfoExtraDestaque>
                        <F1_TextInfoExtra>
                            <Text style={{ fontFamily: 'OpenSans-Regular' }}>Chefe técnico</Text>
                        </F1_TextInfoExtra>
                        <F1_TextInfoExtraDestaque>
                            <Text style={{ fontFamily: 'Ubuntu-Medium' }}>{infoExtra.chefeTecnico}</Text>
                        </F1_TextInfoExtraDestaque>
                    </F1_CardInfoExtra>
                </F1_Container>
            </ScrollView>
        )
    )
}
