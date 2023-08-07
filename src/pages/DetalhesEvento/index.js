import React, { useLayoutEffect, useState, useEffect, useMemo } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { F1_Container, F1_CardImgCorrida, F1_ImgCorrida, F1_ContainerGradient, F1_Gradient, F1_ContainerNome, F1_Bandeira, F1_NomePais, F1_ContainerInfoEvento, F1_ContainerPais, F1_Nome, F1_NomeDestaque, F1_CardPosition, F1_CabecalhoProg, F1_TextItemDestaque, F1_TextItem, F1_CardEtapas, F1_CardData, F1_DadosCorrida, F1_EtapaText, F1_HorarioText, F1_DiaText, F1_MesText, F1_CardInfoExtra, F1_TextInfoExtra, F1_TextInfoExtraDestaque, F1_TextItemDestaqueMaior, F1_CardInfoExtraMenor, F1_Linha, F1_CardContainer, F1_ContainerVoltaRapida, F1_VoltaRapidaPiloto, F1_VoltaRapidaPilotoText } from './styles';

import { useRoute, useNavigation } from "@react-navigation/native";
import moment from "moment-timezone";

import TraduzirPais from "../../components/TraduzirPais";
import ConverterMes from "../../components/ConverterMes";

export default function DetalhesEvento() {
    const route = useRoute();
    const navigation = useNavigation();
    
    const fp2DataSplit = route.params?.SecondPractice.date.split('-');
    const fp2Dia = fp2DataSplit[2];
    const qualyDataSplit = route.params?.Qualifying.date.split('-');
    const qualyDia = qualyDataSplit[2];

    const [fp3Dia, setFp3Dia] = useState();
    const [sprintDia, setSprintDia] = useState();
    const [infoExtraCircuit, setInfoExtraCircuit] = useState({});
    
    const [loading, setLoading] = useState(false);
    const [nomeEvento, setNomeEvento] = useState();

    const paisTraduzido = <TraduzirPais data={route.params?.Circuit.Location.country} />;

    //Teste de data e fuso horário
    var currentDate = moment().tz("America/Sao_Paulo").format();
    var raceDate = new Date(Date.parse(route.params?.date + ' ' + route.params?.time));
    var firstPracticeDate = new Date(Date.parse(route.params?.FirstPractice.date + ' ' + route.params?.FirstPractice.time));
    var secondPracticeDate = route.params.SecondPractice !== undefined ? new Date(Date.parse(route.params?.SecondPractice.date + ' ' + route.params?.SecondPractice.time)) : '';
    var thirdPracticeDate = route.params.ThirdPractice !== undefined ? new Date(Date.parse(route.params?.ThirdPractice.date + ' ' + route.params?.ThirdPractice.time)) : '';
    var sprintDate = route.params.Sprint !== undefined ? new Date(Date.parse(route.params?.Sprint.date + ' ' + route.params?.Sprint.time)) : '';
    var qualifyingDate = route.params.Qualifying !== undefined ? new Date(Date.parse(route.params?.Qualifying.date + ' ' + route.params?.Qualifying.time)) : '';

    function converterDataHoraBR(param) {
        let dataConvertida = {
            data: moment(param).tz("America/Sao_Paulo").format('DD/MM/yyyy'),
            hora: moment(param).tz("America/Sao_Paulo").format('HH:mm')
        };
        return dataConvertida;
    };

    function converterMesData(param) {
        switch(param) {
            case '01':
                return 'jan';
                break;
            case '02':
                return 'fev';
                break;
            case '03':
                return 'mar';
                break;
            case '04':
                return 'abr';
                break;
            case '05':
                return 'mai';
                break;
            case '06':
                return 'jun';
                break;
            case '07':
                return 'jul';
                break;
            case '08':
                return 'ago';
                break;
            case '09':
                return 'set';
                break;
            case '10':
                return 'out';
                break;
            case '11':
                return 'nov';
                break;
            case '12':
                return 'dez';
                break;
            default:
                return '';
        }
    }

    function buscarInfoExtraCircuit(param) {
        switch (param) {
            case 'bahrain':
                const objBahrain = {
                    nomeCompletoEvento: "Fórmula 1 Gulf Air Grande Prêmio do Bahrein 2023",
                    autodromo: "Circuito Internacional do Bahrein",
                    tamanhoCircuito: "5.412",
                    nVoltas: "57",
                    primeiroGrandPrix: "2004",
                    distanciaCorrida: "308.238",
                    recordeTempoVolta: "1.31.447",
                    recordeTempoVoltaPiloto: "Pedro de la Rosa",
                    recordeTempoVoltaAno: "2005"
                };
                return setInfoExtraCircuit(objBahrain);
                break;
            case 'jeddah':
                const objJeddah = {
                    nomeCompletoEvento: "Fórmula 1 STC Grande Prêmio da Arábia Saudita 2023",
                    autodromo: "Circuito Corniche de Jeddah",
                    tamanhoCircuito: "6.174",
                    nVoltas: "50",
                    primeiroGrandPrix: "2021",
                    distanciaCorrida: "308.450",
                    recordeTempoVolta: "1.30.734",
                    recordeTempoVoltaPiloto: "Lewis Hamilton",
                    recordeTempoVoltaAno: "2021"
                };
                return setInfoExtraCircuit(objJeddah);
                break;
            case 'albert_park':
                const objAlbertPark = {
                    nomeCompletoEvento: "Fórmula 1 Rolex Grande Prêmio da Austrália 2023",
                    autodromo: "Circuito Albert Park",
                    tamanhoCircuito: "5.278",
                    nVoltas: "58",
                    primeiroGrandPrix: "1996",
                    distanciaCorrida: "306.124",
                    recordeTempoVolta: "1.20.235",
                    recordeTempoVoltaPiloto: "Sergio Perez",
                    recordeTempoVoltaAno: "2023"
                };
                return setInfoExtraCircuit(objAlbertPark);
                break;
            case 'baku':
                const objBaku = {
                    nomeCompletoEvento: "Fórmula 1 Grande Prêmio do Azerbaijão 2023",
                    autodromo: "Circuito da Cidade de Baku",
                    tamanhoCircuito: "6.003",
                    nVoltas: "51",
                    primeiroGrandPrix: "2016",
                    distanciaCorrida: "306.049",
                    recordeTempoVolta: "1.43.009",
                    recordeTempoVoltaPiloto: "Charles Leclerc",
                    recordeTempoVoltaAno: "2019"
                };
                return setInfoExtraCircuit(objBaku);
                break;
            case 'miami':
                const objMiami = {
                    nomeCompletoEvento: "Fórmula 1 Crypto.com Grande Prêmio de Miami 2023",
                    autodromo: "Internacional de Miami",
                    tamanhoCircuito: "5.412",
                    nVoltas: "57",
                    primeiroGrandPrix: "2022",
                    distanciaCorrida: "308.326",
                    recordeTempoVolta: "1.29.708",
                    recordeTempoVoltaPiloto: "Max Verstappen",
                    recordeTempoVoltaAno: "2023"
                };
                return setInfoExtraCircuit(objMiami);
                break;
            case 'imola':
                const objImola = {
                    nomeCompletoEvento: "Fórmula 1 Qatar Airways Grande Prêmio da Itália e Emilia-Romagna 2023",
                    autodromo: "Enzo e Dino Ferrari",
                    tamanhoCircuito: "4.909",
                    nVoltas: "63",
                    primeiroGrandPrix: "1980",
                    distanciaCorrida: "309.049",
                    recordeTempoVolta: "1.15.484",
                    recordeTempoVoltaPiloto: "Lewis Hamilton",
                    recordeTempoVoltaAno: "2020"
                };
                return setInfoExtraCircuit(objImola);
                break;
            case 'monaco':
                const objMonaco = {
                    nomeCompletoEvento: "Fórmula 1 Grande Prêmio de Mônaco 2023",
                    autodromo: "Circuito de Mônaco",
                    tamanhoCircuito: "3.337",
                    nVoltas: "78",
                    primeiroGrandPrix: "1950",
                    distanciaCorrida: "260.286",
                    recordeTempoVolta: "1.12.909",
                    recordeTempoVoltaPiloto: "Lewis Hamilton",
                    recordeTempoVoltaAno: "2021"
                };
                return setInfoExtraCircuit(objMonaco);
                break;
            case 'catalunya':
                const objCatalunya = {
                    nomeCompletoEvento: "Fórmula 1 AWS Grande Prêmio da Espanha 2023",
                    autodromo: "Circuito de Barcelona-Catalunha",
                    tamanhoCircuito: "4.657",
                    nVoltas: "66",
                    primeiroGrandPrix: "1991",
                    distanciaCorrida: "307.236",
                    recordeTempoVolta: "-",
                    recordeTempoVoltaPiloto: "Piloto",
                    recordeTempoVoltaAno: "-"
                };
                return setInfoExtraCircuit(objCatalunya);
                break;
            case 'villeneuve':
                const objVilleneuve = {
                    nomeCompletoEvento: "Fórmula 1 Pirelli Grande Prêmio do Canadá 2023",
                    autodromo: "Circuito Gilles-Villeneuve",
                    tamanhoCircuito: "4.361",
                    nVoltas: "70",
                    primeiroGrandPrix: "1978",
                    distanciaCorrida: "305.270",
                    recordeTempoVolta: "1.13.078",
                    recordeTempoVoltaPiloto: "Valtteri Bottas",
                    recordeTempoVoltaAno: "2019"
                };
                return setInfoExtraCircuit(objVilleneuve);
                break;
            case 'red_bull_ring':
                const objRedBullRing = {
                    nomeCompletoEvento: "Fórmula 1 Rolex Grande Prêmio Grosser Von Österreich 2023",
                    autodromo: "Red Bull Ring",
                    tamanhoCircuito: "4.318",
                    nVoltas: "71",
                    primeiroGrandPrix: "1970",
                    distanciaCorrida: "306.452",
                    recordeTempoVolta: "1.05.619",
                    recordeTempoVoltaPiloto: "Carlos Sainz",
                    recordeTempoVoltaAno: "2020"
                };
                return setInfoExtraCircuit(objRedBullRing);
                break;
            case 'silverstone':
                const objSilverstone = {
                    nomeCompletoEvento: "Fórmula 1 Aramco Grande Prêmio da Inglaterra 2023",
                    autodromo: "Circuito de Silverstone",
                    tamanhoCircuito: "5.891",
                    nVoltas: "52",
                    primeiroGrandPrix: "1950",
                    distanciaCorrida: "306.198",
                    recordeTempoVolta: "1.27.097",
                    recordeTempoVoltaPiloto: "Max Verstappen",
                    recordeTempoVoltaAno: "2020"
                };
                return setInfoExtraCircuit(objSilverstone);
                break;
            case 'hungaroring':
                const objHungaroring = {
                    nomeCompletoEvento: "Fórmula 1 Qatar Airways Grande Prêmio da Hungria 2023",
                    autodromo: "Hungaroring",
                    tamanhoCircuito: "4.381",
                    nVoltas: "70",
                    primeiroGrandPrix: "1986",
                    distanciaCorrida: "306.630",
                    recordeTempoVolta: "1.16.627",
                    recordeTempoVoltaPiloto: "Lewis Hamilton",
                    recordeTempoVoltaAno: "2020"
                };
                return setInfoExtraCircuit(objHungaroring);
                break;
            case 'spa':
                const objSpa = {
                    nomeCompletoEvento: "Fórmula 1 MSC Cruises Grande Prêmio da Bélgica 2023",
                    autodromo: "Circuito de Spa-Francorchamps",
                    tamanhoCircuito: "7.004",
                    nVoltas: "44",
                    primeiroGrandPrix: "1950",
                    distanciaCorrida: "308.052",
                    recordeTempoVolta: "1.46.286",
                    recordeTempoVoltaPiloto: "Valtteri Bottas",
                    recordeTempoVoltaAno: "2018"
                };
                return setInfoExtraCircuit(objSpa);
                break;
            case 'zandvoort':
                const objZandvoort = {
                    nomeCompletoEvento: "Fórmula 1 Heineken Grande Prêmio da Holanda 2023",
                    autodromo: "Circuito de Zandvoort",
                    tamanhoCircuito: "4.259",
                    nVoltas: "72",
                    primeiroGrandPrix: "1952",
                    distanciaCorrida: "306.587",
                    recordeTempoVolta: "1.11.097",
                    recordeTempoVoltaPiloto: "Lewis Hamilton",
                    recordeTempoVoltaAno: "2021"
                };
                return setInfoExtraCircuit(objZandvoort);
                break;
            case 'monza':
                const objMonza = {
                    nomeCompletoEvento: "Fórmula 1 Pirelli Grande Prêmio da Itália 2023",
                    autodromo: "Nacional de Monza",
                    tamanhoCircuito: "5.793",
                    nVoltas: "53",
                    primeiroGrandPrix: "1950",
                    distanciaCorrida: "306.720",
                    recordeTempoVolta: "1.21.046",
                    recordeTempoVoltaPiloto: "Rubens Barrichello",
                    recordeTempoVoltaAno: "2004"
                };
                return setInfoExtraCircuit(objMonza);
                break;
            case 'marina_bay':
                const objMarinaBay = {
                    nomeCompletoEvento: "Fórmula 1 Singapore Airlines Grande Prêmio de Singapura 2023",
                    autodromo: "Circuito de Rua Marina Bay",
                    tamanhoCircuito: "4.928",
                    nVoltas: "63",
                    primeiroGrandPrix: "2008",
                    distanciaCorrida: "310.464",
                    recordeTempoVolta: "1.41.905",
                    recordeTempoVoltaPiloto: "Kevin Magnussen",
                    recordeTempoVoltaAno: "2018"
                };
                return setInfoExtraCircuit(objMarinaBay);
                break;
            case 'suzuka':
                const objSuzuka = {
                    nomeCompletoEvento: "Fórmula 1 Lenovo Grande Prêmio do Japão 2023",
                    autodromo: "Circuito Internacional de Suzuka",
                    tamanhoCircuito: "5.807",
                    nVoltas: "53",
                    primeiroGrandPrix: "1987",
                    distanciaCorrida: "307.471",
                    recordeTempoVolta: "1.30.983",
                    recordeTempoVoltaPiloto: "Lewis Hamilton",
                    recordeTempoVoltaAno: "2019"
                };
                return setInfoExtraCircuit(objSuzuka);
                break;
            case 'losail':
                const objLosail = {
                    nomeCompletoEvento: "Fórmula 1 Qatar Airways Grande Prêmio do Catar 2023",
                    autodromo: "Circuito Internacional de Losail",
                    tamanhoCircuito: "5.418",
                    nVoltas: "57",
                    primeiroGrandPrix: "2021",
                    distanciaCorrida: "308.826",
                    recordeTempoVolta: "1.23.196",
                    recordeTempoVoltaPiloto: "Max Verstappen",
                    recordeTempoVoltaAno: "2021"
                };
                return setInfoExtraCircuit(objLosail);
                break;
            case 'americas':
                const objAmericas = {
                    nomeCompletoEvento: "Fórmula 1 Lenovo Grande Prêmio dos Estados Unidos 2023",
                    autodromo: "Circuito das Americas",
                    tamanhoCircuito: "5.513",
                    nVoltas: "56",
                    primeiroGrandPrix: "2012",
                    distanciaCorrida: "308.405",
                    recordeTempoVolta: "1.36.169",
                    recordeTempoVoltaPiloto: "Charles Leclerc",
                    recordeTempoVoltaAno: "2019"
                };
                return setInfoExtraCircuit(objAmericas);
                break;
            case 'rodriguez':
                const objRodriguez = {
                    nomeCompletoEvento: "Fórmula 1 Grande Prêmio da Cidade do México 2023",
                    autodromo: "Hermanos Rodríguez",
                    tamanhoCircuito: "4.304",
                    nVoltas: "71",
                    primeiroGrandPrix: "1963",
                    distanciaCorrida: "305.354",
                    recordeTempoVolta: "1.17.774",
                    recordeTempoVoltaPiloto: "Valtteri Bottas",
                    recordeTempoVoltaAno: "2021"
                };
                return setInfoExtraCircuit(objRodriguez);
                break;
            case 'interlagos':
                const objInterlagos = {
                    nomeCompletoEvento: "Fórmula 1 Rolex Grande Prêmio de São Paulo 2023",
                    autodromo: "José Carlos Pace",
                    tamanhoCircuito: "4.309",
                    nVoltas: "71",
                    primeiroGrandPrix: "1973",
                    distanciaCorrida: "305.879",
                    recordeTempoVolta: "1.10.540",
                    recordeTempoVoltaPiloto: "Valtteri Bottas",
                    recordeTempoVoltaAno: "2018"
                };
                return setInfoExtraCircuit(objInterlagos);
                break;
            case 'vegas':
                const objVegas = {
                    nomeCompletoEvento: "Fórmula 1 Heineken Silver Grande Prêmio de Las Vegas 2023",
                    autodromo: "Las Vegas",
                    tamanhoCircuito: "6.120",
                    nVoltas: "50",
                    primeiroGrandPrix: "2023",
                    distanciaCorrida: "305.880",
                    recordeTempoVolta: "-",
                    recordeTempoVoltaPiloto: "Piloto",
                    recordeTempoVoltaAno: "-"
                };
                return setInfoExtraCircuit(objVegas);
                break;
            case 'yas_marina':
                const objYasMarina = {
                    nomeCompletoEvento: "Fórmula 1 Etihad Airways Grande Prêmio de Abu Dhabi 2023",
                    autodromo: "Circuito de Yas Marina",
                    tamanhoCircuito: "5.281",
                    nVoltas: "58",
                    primeiroGrandPrix: "2009",
                    distanciaCorrida: "306.183",
                    recordeTempoVolta: "1.26.103",
                    recordeTempoVoltaPiloto: "Max Verstappen",
                    recordeTempoVoltaAno: "2021"
                };
                return setInfoExtraCircuit(objYasMarina);
                break;
            default:
                const objDefault = {
                    nomeCompletoEvento: "Não informado",
                    autodromo: "Não informado",
                    tamanhoCircuito: "Não informado",
                    nVoltas: "Não informado",
                    primeiroGrandPrix: "Não informado",
                    distanciaCorrida: "Não informado",
                    recordeTempoVolta: "Não informado",
                    recordeTempoVoltaPiloto: "Não informado"
                }
                return setInfoExtraCircuit(objDefault);
        }
    };

    const getImgCountry = (country) => {
        switch (country) {
            case "Bahrain":
                return require('../../assets/flags/Bahrain.png');
                break;
            case "Saudi Arabia":
                return require('../../assets/flags/Saudi_Arabia.png');
                break;
            case "Australia":
                return require('../../assets/flags/Australia.png');
                break;
            case "Azerbaijan":
                return require('../../assets/flags/Azerbaijan.png');
                break;
            case "USA":
                return require('../../assets/flags/USA.png');
                break;
            case "Monaco":
                return require('../../assets/flags/Monaco.png');
                break;
            case "Spain":
                return require('../../assets/flags/Spain.png');
                break;
            case "Canada":
                return require('../../assets/flags/Canada.png');
                break;
            case "Austria":
                return require('../../assets/flags/Austria.png');
                break;
            case "UK":
                return require('../../assets/flags/UK.png');
                break;
            case "Hungary":
                return require('../../assets/flags/Hungary.png');
                break;
            case "Belgium":
                return require('../../assets/flags/Belgium.png');
                break;
            case "Netherlands":
                return require('../../assets/flags/Netherlands.png');
                break;
            case "Italy":
                return require('../../assets/flags/Italy.png');
                break;
            case "Singapore":
                return require('../../assets/flags/Singapore.png');
                break;
            case "Japan":
                return require('../../assets/flags/Japan.png');
                break;
            case "Qatar":
                return require('../../assets/flags/Qatar.png');
                break;
            case "Mexico":
                return require('../../assets/flags/Mexico.png');
                break;
            case "Brazil":
                return require('../../assets/flags/Brazil.png');
                break;
            case "United States":
                return require('../../assets/flags/USA.png');
                break;
            case "UAE":
                return require('../../assets/flags/UAE.png');
                break;
            default:
                return require('../../assets/forbidden.png');
                break;
        }
    };

    const getImgPista = (circuitId) => {
        switch (circuitId) {
            case "albert_park":
                return require('../../assets/races/albert_park.png');
                break;
            case "americas":
                return require('../../assets/races/americas.png');
                break;
            case "bahrain":
                return require('../../assets/races/bahrain.png');
                break;
            case "baku":
                return require('../../assets/races/baku.png');
                break;
            case "catalunya":
                return require('../../assets/races/catalunya.png');
                break;
            case "hungaroring":
                return require('../../assets/races/hungaroring.png');
                break;
            case "imola":
                return require('../../assets/races/imola.png');
                break;
            case "interlagos":
                return require('../../assets/races/interlagos.png');
                break;
            case "jeddah":
                return require('../../assets/races/jeddah.png');
                break;
            case "losail":
                return require('../../assets/races/losail.png');
                break;
            case "marina_bay":
                return require('../../assets/races/marina_bay.png');
                break;
            case "miami":
                return require('../../assets/races/miami.png');
                break;
            case "monaco":
                return require('../../assets/races/monaco.png');
                break;
            case "monza":
                return require('../../assets/races/monza.png');
                break;
            case "red_bull_ring":
                return require('../../assets/races/red_bull_ring.png');
                break;
            case "rodriguez":
                return require('../../assets/races/rodriguez.png');
                break;
            case "silverstone":
                return require('../../assets/races/silverstone.png');
                break;
            case "spa":
                return require('../../assets/races/spa.png');
                break;
            case "suzuka":
                return require('../../assets/races/suzuka.png');
                break;
            case "vegas":
                return require('../../assets/races/vegas.png');
                break;
            case "villeneuve":
                return require('../../assets/races/villeneuve.png');
                break;
            case "yas_marina":
                return require('../../assets/races/yas_marina.png');
                break;
            case "zandvoort":
                return require('../../assets/races/zandvoort.png');
                break;
            default:
                return require('../../assets/forbidden.png');
                break;
        }
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            title: route.params?.raceName === '' ? 'Detalhes' : route.params?.raceName
        })
    }, [navigation]);

    useEffect(() => {
        setLoading(true);
        {
            route.params?.ThirdPractice !== undefined && (
                setFp3Dia(route.params?.ThirdPractice.date.split('-')[2])
            )
        }
        {
            route.params?.Sprint !== undefined && (
                setSprintDia(route.params?.Sprint.date.split('-')[2])
            )
        }
        buscarInfoExtraCircuit(route.params?.Circuit.circuitId);
        
    },[]);

    const nome = useMemo(() => {
        setLoading(false);
        setNomeEvento(infoExtraCircuit.nomeCompletoEvento);
    }, [infoExtraCircuit])

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
                    {/* Imagem da corrida */}
                    <F1_CardImgCorrida>
                        <F1_ImgCorrida source={getImgPista(route.params?.Circuit.circuitId)}></F1_ImgCorrida>
                        <F1_ContainerGradient>
                            <F1_Gradient></F1_Gradient>
                        </F1_ContainerGradient>
                    </F1_CardImgCorrida>
                    {/* Nome do país */}
                    <F1_ContainerNome>
                        {/*Conferir se tem a bandeira de todos os países*/}
                        {route.params?.Circuit ?
                            <F1_Bandeira source={getImgCountry(route.params?.Circuit.Location.country)}></F1_Bandeira>
                            :
                            <F1_Bandeira source={require('../../assets/forbidden.png')}></F1_Bandeira>
                        }
                        <F1_NomePais>
                            <Text style={{ fontFamily: 'Ubuntu-Medium' }}>{paisTraduzido}</Text>
                        </F1_NomePais>
                    </F1_ContainerNome>
                    {/* Nome completo do evento */}
                    <F1_ContainerInfoEvento>
                        <F1_ContainerPais>
                            {/* Tentar quebrar o nomeCompletoEvento para colocar apenas a cidade no F1_NomeDestaque */}
                            <F1_Nome style={{ fontFamily: 'OpenSans-Regular' }}>{nomeEvento ? nomeEvento.split('Prêmio')[0] + 'Prêmio' : ''}</F1_Nome>
                            <F1_NomeDestaque style={{ fontFamily: 'Ubuntu-Medium' }}>{nomeEvento ? nomeEvento.split('Prêmio')[1] : ''}</F1_NomeDestaque>
                        </F1_ContainerPais>
                    </F1_ContainerInfoEvento>
                    {/* Programacao */}
                    <F1_CardPosition>
                        <F1_CabecalhoProg>
                            <F1_TextItem>Programação do</F1_TextItem>
                            <F1_TextItemDestaque style={{ fontFamily: 'Ubuntu-Medium' }}>Final de Semana</F1_TextItemDestaque>
                        </F1_CabecalhoProg>
                        {/*Corrida*/}
                        <View>
                            <F1_CardEtapas>
                                <F1_CardData>
                                    <F1_DiaText style={{ fontFamily: 'Ubuntu-Medium' }}>{converterDataHoraBR(raceDate).data.split("/")[0]}</F1_DiaText>
                                    <F1_MesText style={{ fontFamily: 'OpenSans-SemiBold' }}>{converterMesData(converterDataHoraBR(raceDate).data.split("/")[1])}</F1_MesText>
                                </F1_CardData>
                                <F1_DadosCorrida>
                                    <F1_EtapaText style={{ fontFamily: 'Ubuntu-Medium' }}>Corrida</F1_EtapaText>
                                    <F1_HorarioText style={{ fontFamily: 'OpenSans-Regular' }}>{converterDataHoraBR(raceDate).hora}</F1_HorarioText>
                                </F1_DadosCorrida>
                            </F1_CardEtapas>

                        </View>
                        {
                            //Se fp2 for undefined, só pode ser a última opção -> FP1/QLF/SHO/SPR
                            route.params.SecondPractice === undefined ?
                                <View>
                                    <F1_CardEtapas>
                                        <F1_CardData>
                                            <F1_DiaText style={{ fontFamily: 'Ubuntu-Medium' }}>{converterDataHoraBR(sprintDate).data.split("/")[0]}</F1_DiaText>
                                            <F1_MesText style={{ fontFamily: 'OpenSans-SemiBold' }}>{converterMesData(converterDataHoraBR(sprintDate).data.split("/")[1])}</F1_MesText>
                                        </F1_CardData>
                                        <F1_DadosCorrida>
                                            <F1_EtapaText style={{ fontFamily: 'Ubuntu-Medium' }}>Sprint</F1_EtapaText>
                                            <F1_HorarioText style={{ fontFamily: 'OpenSans-Regular' }}>{converterDataHoraBR(sprintDate).hora}</F1_HorarioText>
                                        </F1_DadosCorrida>
                                    </F1_CardEtapas>
                                    {/* Sprint Shootout */}
                                    <F1_CardEtapas>
                                        <F1_CardData>
                                            <F1_DiaText style={{ fontFamily: 'Ubuntu-Medium' }}>{converterDataHoraBR(qualifyingDate).data.split("/")[0]}</F1_DiaText>
                                            <F1_MesText style={{ fontFamily: 'OpenSans-SemiBold' }}>{converterMesData(converterDataHoraBR(qualifyingDate).data.split("/")[1])}</F1_MesText>
                                        </F1_CardData>
                                        <F1_DadosCorrida>
                                            <F1_EtapaText style={{ fontFamily: 'Ubuntu-Medium' }}>Classificação</F1_EtapaText>
                                            <F1_HorarioText style={{ fontFamily: 'OpenSans-Regular' }}>{converterDataHoraBR(qualifyingDate).hora}</F1_HorarioText>
                                        </F1_DadosCorrida>
                                    </F1_CardEtapas>
                                </View>
                                // as possibilidades de acontecerem no mesmo dia são:
                                // Se FP3 e QLF forem no mesmo dia, a estrutura é: FP1/FP2/FP3/QLF
                                : fp3Dia === qualyDia ?
                                    <View>
                                        <F1_CardEtapas>
                                            <F1_CardData>
                                                <F1_DiaText style={{ fontFamily: 'Ubuntu-Medium' }}>{converterDataHoraBR(qualifyingDate).data.split("/")[0]}</F1_DiaText>
                                                <F1_MesText style={{ fontFamily: 'OpenSans-SemiBold' }}>{converterMesData(converterDataHoraBR(qualifyingDate).data.split("/")[1])}</F1_MesText>
                                            </F1_CardData>
                                            <F1_DadosCorrida>
                                                <F1_EtapaText style={{ fontFamily: 'Ubuntu-Medium' }}>Classificação</F1_EtapaText>
                                                <F1_HorarioText style={{ fontFamily: 'OpenSans-Regular' }}>{converterDataHoraBR(qualifyingDate).hora}</F1_HorarioText>
                                            </F1_DadosCorrida>
                                        </F1_CardEtapas>
                                        <F1_CardEtapas>
                                            <F1_CardData>
                                                <F1_DiaText style={{ fontFamily: 'Ubuntu-Medium' }}>{converterDataHoraBR(thirdPracticeDate).data.split("/")[0]}</F1_DiaText>
                                                <F1_MesText style={{ fontFamily: 'OpenSans-SemiBold' }}>{converterMesData(converterDataHoraBR(thirdPracticeDate).data.split("/")[1])}</F1_MesText>
                                            </F1_CardData>
                                            <F1_DadosCorrida>
                                                <F1_EtapaText style={{ fontFamily: 'Ubuntu-Medium' }}>Treino Livre 3</F1_EtapaText>
                                                <F1_HorarioText style={{ fontFamily: 'OpenSans-Regular' }}>{converterDataHoraBR(thirdPracticeDate).hora}</F1_HorarioText>
                                            </F1_DadosCorrida>
                                        </F1_CardEtapas>
                                        <F1_CardEtapas>
                                            <F1_CardData>
                                                <F1_DiaText style={{ fontFamily: 'Ubuntu-Medium' }}>{converterDataHoraBR(secondPracticeDate).data.split("/")[0]}</F1_DiaText>
                                                <F1_MesText style={{ fontFamily: 'OpenSans-SemiBold' }}>{converterMesData(converterDataHoraBR(secondPracticeDate).data.split("/")[1])}</F1_MesText>
                                            </F1_CardData>
                                            <F1_DadosCorrida>
                                                <F1_EtapaText style={{ fontFamily: 'Ubuntu-Medium' }}>Treino Livre 2</F1_EtapaText>
                                                <F1_HorarioText style={{ fontFamily: 'OpenSans-Regular' }}>{converterDataHoraBR(secondPracticeDate).hora}</F1_HorarioText>
                                            </F1_DadosCorrida>
                                        </F1_CardEtapas>
                                    </View>
                                    // Se FP2 e SPR forem no mesmo dia, a estrutura é: FP1/QLF/FP2/SPR
                                    : fp2Dia === sprintDia && (
                                        <View>
                                            <F1_CardEtapas>
                                                <F1_CardData>
                                                    <F1_DiaText style={{ fontFamily: 'Ubuntu-Medium' }}>{converterDataHoraBR(sprintDate).data.split("/")[0]}</F1_DiaText>
                                                    <F1_MesText style={{ fontFamily: 'OpenSans-SemiBold' }}>{converterMesData(converterDataHoraBR(sprintDate).data.split("/")[1])}</F1_MesText>
                                                </F1_CardData>
                                                <F1_DadosCorrida>
                                                    <F1_EtapaText style={{ fontFamily: 'Ubuntu-Medium' }}>Sprint</F1_EtapaText>
                                                    <F1_HorarioText style={{ fontFamily: 'OpenSans-Regular' }}>{converterDataHoraBR(sprintDate).hora}</F1_HorarioText>
                                                </F1_DadosCorrida>
                                            </F1_CardEtapas>
                                            <F1_CardEtapas>
                                                <F1_CardData>
                                                    <F1_DiaText style={{ fontFamily: 'Ubuntu-Medium' }}>{converterDataHoraBR(secondPracticeDate).data.split("/")[0]}</F1_DiaText>
                                                    <F1_MesText style={{ fontFamily: 'OpenSans-SemiBold' }}>{converterMesData(converterDataHoraBR(secondPracticeDate).data.split("/")[1])}</F1_MesText>
                                                </F1_CardData>
                                                <F1_DadosCorrida>
                                                    <F1_EtapaText style={{ fontFamily: 'Ubuntu-Medium' }}>Treino Livre 2</F1_EtapaText>
                                                    <F1_HorarioText style={{ fontFamily: 'OpenSans-Regular' }}>{converterDataHoraBR(secondPracticeDate).hora}</F1_HorarioText>
                                                </F1_DadosCorrida>
                                            </F1_CardEtapas>
                                            <F1_CardEtapas>
                                                <F1_CardData>
                                                    <F1_DiaText style={{ fontFamily: 'Ubuntu-Medium' }}>{converterDataHoraBR(qualifyingDate).data.split("/")[0]}</F1_DiaText>
                                                    <F1_MesText style={{ fontFamily: 'OpenSans-SemiBold' }}>{converterMesData(converterDataHoraBR(qualifyingDate).data.split("/")[1])}</F1_MesText>
                                                </F1_CardData>
                                                <F1_DadosCorrida>
                                                    <F1_EtapaText style={{ fontFamily: 'Ubuntu-Medium' }}>Classificação</F1_EtapaText>
                                                    <F1_HorarioText style={{ fontFamily: 'OpenSans-Regular' }}>{converterDataHoraBR(qualifyingDate).hora}</F1_HorarioText>
                                                </F1_DadosCorrida>
                                            </F1_CardEtapas>
                                        </View>
                                    )
                        }
                        {/* Sempre começa com FP1 */}
                        {route.params.FirstPractice !== undefined ?
                            <View>
                                <F1_CardEtapas>
                                    <F1_CardData>
                                        <F1_DiaText style={{ fontFamily: 'Ubuntu-Medium' }}>{converterDataHoraBR(firstPracticeDate).data.split("/")[0]}</F1_DiaText>
                                        <F1_MesText style={{ fontFamily: 'OpenSans-SemiBold' }}>{converterMesData(converterDataHoraBR(firstPracticeDate).data.split("/")[1])}</F1_MesText>
                                    </F1_CardData>
                                    <F1_DadosCorrida>
                                        <F1_EtapaText style={{ fontFamily: 'Ubuntu-Medium' }}>Treino Livre 1</F1_EtapaText>
                                        <F1_HorarioText style={{ fontFamily: 'OpenSans-Regular' }}>{converterDataHoraBR(firstPracticeDate).hora}</F1_HorarioText>
                                    </F1_DadosCorrida>
                                </F1_CardEtapas>
                            </View> : ''
                        }
                    </F1_CardPosition>
                    <F1_CardInfoExtraMenor>
                        <F1_TextInfoExtra style={{ fontFamily: 'OpenSans-Regular' }}>Autódromo</F1_TextInfoExtra>
                        <F1_TextInfoExtraDestaque style={{ fontFamily: 'Ubuntu-Medium' }}>{infoExtraCircuit.autodromo}</F1_TextInfoExtraDestaque>
                    </F1_CardInfoExtraMenor>
                    <F1_CardInfoExtra>
                        <F1_TextInfoExtra style={{ fontFamily: 'OpenSans-Regular' }}>Tamanho do circuito</F1_TextInfoExtra>
                        <F1_Linha>
                            <F1_TextItemDestaqueMaior style={{ fontFamily: 'Ubuntu-Bold' }}>{infoExtraCircuit.tamanhoCircuito}</F1_TextItemDestaqueMaior>
                            <F1_TextInfoExtra style={{ fontFamily: 'OpenSans-Regular', marginBottom: 5, marginLeft: 5 }}>km</F1_TextInfoExtra>
                        </F1_Linha>
                    </F1_CardInfoExtra>
                    <F1_CardContainer>
                        <F1_CardInfoExtra style={{ width: '48%' }}>
                            <F1_TextInfoExtra style={{ fontFamily: 'OpenSans-Regular' }}>Nº de voltas</F1_TextInfoExtra>
                            <F1_TextItemDestaqueMaior style={{ fontFamily: 'Ubuntu-Bold' }}>{infoExtraCircuit.nVoltas}</F1_TextItemDestaqueMaior>
                        </F1_CardInfoExtra>
                        <F1_CardInfoExtra style={{ width: '48%' }}>
                            <F1_TextInfoExtra style={{ fontFamily: 'OpenSans-Regular' }}>Primeiro Grand Prix</F1_TextInfoExtra>
                            <F1_TextItemDestaqueMaior style={{ fontFamily: 'Ubuntu-Bold' }}>{infoExtraCircuit.primeiroGrandPrix}</F1_TextItemDestaqueMaior>
                        </F1_CardInfoExtra>
                    </F1_CardContainer>
                    <F1_CardInfoExtra>
                        <F1_TextInfoExtra style={{ fontFamily: 'OpenSans-Regular' }}>Distância da corrida</F1_TextInfoExtra>
                        <F1_Linha>
                            <F1_TextItemDestaqueMaior style={{ fontFamily: 'Ubuntu-Bold' }}>{infoExtraCircuit.distanciaCorrida}</F1_TextItemDestaqueMaior>
                            <F1_TextInfoExtra style={{ fontFamily: 'OpenSans-Regular', marginBottom: 5, marginLeft: 5 }}>km</F1_TextInfoExtra>
                        </F1_Linha>
                    </F1_CardInfoExtra>
                    <F1_CardContainer>
                        <F1_CardInfoExtra>
                            <F1_TextInfoExtra style={{ fontFamily: 'OpenSans-Regular' }}>Recorde de tempo por volta</F1_TextInfoExtra>
                            <F1_Linha>
                                <F1_TextItemDestaqueMaior style={{ fontFamily: 'Ubuntu-Bold' }}>{infoExtraCircuit.recordeTempoVolta}</F1_TextItemDestaqueMaior>
                                <F1_TextInfoExtra style={{ fontFamily: 'OpenSans-Regular', marginBottom: 5, marginLeft: 5 }}>km</F1_TextInfoExtra>
                            </F1_Linha>
                            <F1_ContainerVoltaRapida>
                                <F1_VoltaRapidaPiloto>
                                    <F1_VoltaRapidaPilotoText style={{ fontFamily: 'OpenSans-Bold' }}>{infoExtraCircuit.recordeTempoVoltaPiloto}</F1_VoltaRapidaPilotoText>
                                    <F1_VoltaRapidaPilotoText style={{ fontFamily: 'OpenSans-Regular' }}>{infoExtraCircuit.recordeTempoVoltaAno}</F1_VoltaRapidaPilotoText>
                                </F1_VoltaRapidaPiloto>
                            </F1_ContainerVoltaRapida>
                        </F1_CardInfoExtra>
                    </F1_CardContainer>
                </F1_Container>
            </ScrollView>
        )
    )
}