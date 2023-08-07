import React, { useContext, useState, useEffect, useMemo } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import {
    F1_ViewErro,
    F1_TituloErro,
    F1_TextoErro,
    F1_ScrollView,
    F1_CardNomeEvento,
    F1_TextNomeEvento,
    F1_TextNomeEventoDestaque,
    F1_CardPontos,
    F1_TextPontos,
    F1_CardPergunta,
    F1_ContainerPergunta,
    F1_CardNumPergunta,
    F1_TextNumPergunta,
    F1_TextPergunta,
    F1_ContainerTextoRespostas,
    F1_TextoRespostas,
    F1_ContainerImgRespostas,
    F1_CardOpcao,
    F1_ImgPiloto,
    F1_ContainerGradient,
    F1_Gradient,
    F1_TextImgPiloto,
    F1_ContainerMsg,
    F1_TextMsg,
    F1_CardMsgPontos,
    F1_MsgPontos,
    F1_BtnEnviar,
    F1_TextBtnEnviar
} from './styles';

import { useNavigation } from "@react-navigation/native";
import { AuthContext } from '../../contexts/auth'
import FontAwesome from "react-native-vector-icons/FontAwesome5";

import api from "../../services/api_F1";
import firestore from '@react-native-firebase/firestore';

export default function Resultados() {
    const navigation = useNavigation();

    const { user } = useContext(AuthContext);

    const [load, setLoad] = useState(true);
    const [loading, setLoading] = useState(false);
    const [nomeEvento, setNomeEvento] = useState();
    const [idCircuit, setIdCircuit] = useState();
    const [eventoCarregado, setEventoCarregado] = useState(false);

    const [respostasBanco, setRespostasBanco] = useState();
    const [userVotou, setUserVotou] = useState(false);
    const [idDocumentoRespostas, setIdDocumentoRespostas] = useState();

    const [podio, setPodio] = useState('');
    const [pontosRaceWeek, setPontosRaceWeek] = useState();
    const [nomeResposta1, setNomeResposta1] = useState();
    const [nomeResposta2, setNomeResposta2] = useState();
    const [nomeResposta3, setNomeResposta3] = useState();
    const [acertou1, setAcertou1] = useState(false);
    const [acertou2, setAcertou2] = useState(false);
    const [acertou3, setAcertou3] = useState(false);

    function buscarNomeCompletoEvento(param) {
        switch (param) {
            case 'bahrain':
                return "Fórmula 1 Gulf Air Grande Prêmio do Bahrein 2023"
                break;
            case 'jeddah':
                return "Fórmula 1 STC Grande Prêmio da Arábia Saudita 2023"
                break;
            case 'albert_park':
                return "Fórmula 1 Rolex Grande Prêmio da Austrália 2023"
                break;
            case 'baku':
                return "Fórmula 1 Grande Prêmio do Azerbaijão 2023"
                break;
            case 'miami':
                return "Fórmula 1 Crypto.com Grande Prêmio de Miami 2023"
                break;
            case 'imola':
                return "Fórmula 1 Qatar Airways Grande Prêmio da Itália e Emilia-Romagna 2023";
                break;
            case 'monaco':
                return "Fórmula 1 Grande Prêmio de Mônaco 2023"
                break;
            case 'catalunya':
                return "Fórmula 1 AWS Grande Prêmio da Espanha 2023"
                break;
            case 'villeneuve':
                return "Fórmula 1 Pirelli Grande Prêmio do Canadá 2023"
                break;
            case 'red_bull_ring':
                return "Fórmula 1 Rolex Grande Prêmio Grosser Von Österreich 2023"
                break;
            case 'silverstone':
                return "Fórmula 1 Aramco Grande Prêmio da Inglaterra 2023"
                break;
            case 'hungaroring':
                return "Fórmula 1 Qatar Airways Grande Prêmio da Hungria 2023"
                break;
            case 'spa':
                return "Fórmula 1 MSC Cruises Grande Prêmio da Bélgica 2023"
                break;
            case 'zandvoort':
                return "Fórmula 1 Heineken Grande Prêmio da Holanda 2023"
                break;
            case 'monza':
                return "Fórmula 1 Pirelli Grande Prêmio da Itália 2023"
                break;
            case 'marina_bay':
                return "Fórmula 1 Singapore Airlines Grande Prêmio de Singapura 2023"
                break;
            case 'suzuka':
                return "Fórmula 1 Lenovo Grande Prêmio do Japão 2023"
                break;
            case 'losail':
                return "Fórmula 1 Qatar Airways Grande Prêmio do Catar 2023"
                break;
            case 'americas':
                return "Fórmula 1 Lenovo Grande Prêmio dos Estados Unidos 2023"
                break;
            case 'rodriguez':
                return "Fórmula 1 Grande Prêmio da Cidade do México 2023"
                break;
            case 'interlagos':
                return "Fórmula 1 Rolex Grande Prêmio de São Paulo 2023"
                break;
            case 'vegas':
                return "Fórmula 1 Heineken Silver Grande Prêmio de Las Vegas 2023"
                break;
            case 'yas_marina':
                return "Fórmula 1 Etihad Airways Grande Prêmio de Abu Dhabi 2023"
                break;
            default:
                return param
        }
    };

    async function ResultadosUltimaCorrida() {
        const response = await api.get('api/f1/current/last/results.json');
        const listaEvento = response.data.MRData.RaceTable.Races;

        let nomeCircuito = buscarNomeCompletoEvento(listaEvento[0].Circuit.circuitId);
        let idCircuito = listaEvento[0].Circuit.circuitId;
        let resultados = listaEvento[0].Results;

        setIdCircuit(idCircuito);
        setNomeEvento(nomeCircuito);

        // Pegar o resultado do pódio
        setPodio(resultados.filter(pos => pos.position < 4));
        setLoading(false);
    };

    // Pegar respostas do usuário para este evento
    async function GetRespostas() {
        await firestore().collection('JogoPrevisaoRespostas').where('user', '==', user.uid).get()
            .then((res) => {
                let idDoc = '';
                let queryFiltrada = res.docs.filter((doc) => {
                    if (doc.data().EventoCorrida == idCircuit) {
                        idDoc = doc.id;
                        return doc;
                    }
                });

                setIdDocumentoRespostas(idDoc);
                setRespostasBanco(queryFiltrada);
            });
    };

    function PontosRaceWeek(resposta1, resposta2, resposta3) {
        let podio1 = podio[0].Driver.driverId;
        let podio2 = podio[1].Driver.driverId;
        let podio3 = podio[2].Driver.driverId;

        let pontosRaceWeek = 0;

        if (resposta1 == podio1) {
            pontosRaceWeek += 10;
            setAcertou1(true);
        }
        if (resposta2 == podio2) {
            pontosRaceWeek += 10;
            setAcertou2(true);
        }
        if (resposta3 == podio3) {
            pontosRaceWeek += 10;
            setAcertou3(true);
        }

        // Buscar nomes dos pilotos votados
        BuscarNomePilotos(resposta1, resposta2, resposta3);

        // Atualizar documento com a pontuação conquistada nessa race week
        AtualizarDocumentoBD(pontosRaceWeek);

        // Atualizar documento que tem a pontuação geral
        AtualizarPontuacaoGeral(pontosRaceWeek);

        // Retornar a pontuação dessa Race Week (return)
        return pontosRaceWeek;

    };

    async function AtualizarDocumentoBD(pontos) {
        await firestore().collection('JogoPrevisaoRespostas').doc(idDocumentoRespostas).update({ Pontos: pontos });
    };

    async function AtualizarPontuacaoGeral() {

        // Pegar todos os documentos de respostas do usuário JogoPrevisaoRespostas
        let pontosTotais = 0;
        firestore().collection('JogoPrevisaoRespostas').where('user', '==', user.uid).get()
            .then((documentos) => {

                // Somar todos os campos pontos
                documentos.docs.map((doc) => {
                    pontosTotais += doc.data().Pontos;
                });
            });

        // Encontrar documento do usuário JogoPrevisao
        const documento = await firestore().collection('JogoPrevisao').get();

        if (documento.docs.length > 0) {
            let idDocUsuario = '';

            documento.docs.map(doc => {
                if (doc.data().user == user.uid) {
                    idDocUsuario = doc.id;
                };
            });

            // Atualizar campo PontosTotais com a soma dos pontos
            firestore().collection('JogoPrevisao').doc(idDocUsuario).update({
                PontosTotais: pontosTotais
            });

        };
    };

    async function BuscarNomePilotos(resp1, resp2, resp3) {
        const piloto1 = await api.get(`api/f1/current/drivers/${resp1}.json`);
        let dadosPiloto1 = piloto1.data.MRData.DriverTable.Drivers[0];
        let nomePiloto1 = dadosPiloto1.givenName + ' ' + dadosPiloto1.familyName;

        const piloto2 = await api.get(`api/f1/current/drivers/${resp2}.json`);
        let dadosPiloto2 = piloto2.data.MRData.DriverTable.Drivers[0];
        let nomePiloto2 = dadosPiloto2.givenName + ' ' + dadosPiloto2.familyName;

        const piloto3 = await api.get(`api/f1/current/drivers/${resp3}.json`);
        let dadosPiloto3 = piloto3.data.MRData.DriverTable.Drivers[0];
        let nomePiloto3 = dadosPiloto3.givenName + ' ' + dadosPiloto3.familyName;

        setNomeResposta1(nomePiloto1);
        setNomeResposta2(nomePiloto2);
        setNomeResposta3(nomePiloto3);
    };

    let getImgPiloto = (driverId) => {
        switch (driverId) {
            case "max_verstappen":
                return require('../../assets/imgPilotos/max_verstappen.png');
                break;
            case "perez":
                return require('../../assets/imgPilotos/perez.png');
                break;
            case "alonso":
                return require('../../assets/imgPilotos/alonso.png');
                break;
            case "hamilton":
                return require('../../assets/imgPilotos/hamilton.png');
                break;
            case "russell":
                return require('../../assets/imgPilotos/russell.png');
                break;
            case "sainz":
                return require('../../assets/imgPilotos/sainz.png');
                break;
            case "leclerc":
                return require('../../assets/imgPilotos/leclerc.png');
                break;
            case "stroll":
                return require('../../assets/imgPilotos/stroll.png');
                break;
            case "ocon":
                return require('../../assets/imgPilotos/ocon.png');
                break;
            case "gasly":
                return require('../../assets/imgPilotos/gasly.png');
                break;
            case "norris":
                return require('../../assets/imgPilotos/norris.png');
                break;
            case "hulkenberg":
                return require('../../assets/imgPilotos/hulkenberg.png');
                break;
            case "piastri":
                return require('../../assets/imgPilotos/piastri.png');
                break;
            case "bottas":
                return require('../../assets/imgPilotos/bottas.png');
                break;
            case "zhou":
                return require('../../assets/imgPilotos/zhou.png');
                break;
            case "tsunoda":
                return require('../../assets/imgPilotos/tsunoda.png');
                break;
            case "kevin_magnussen":
                return require('../../assets/imgPilotos/kevin_magnussen.png');
                break;
            case "albon":
                return require('../../assets/imgPilotos/albon.png');
                break;
            case "de_vries":
                return require('../../assets/imgPilotos/de_vries.png');
                break;
            case "sargeant":
                return require('../../assets/imgPilotos/sargeant.png');
                break;
            default:
                return require('../../assets/forbidden.png');
                break;
        }
    };

    useEffect(() => {
        setLoading(true);

        navigation.addListener('focus', () => setLoad(!load));
        ResultadosUltimaCorrida();

    }, [load]);

    const carregou = useMemo(() => {

        if (idCircuit == undefined) {
            setEventoCarregado(false);
        } else {
            setEventoCarregado(true);
            // Chamar função das respostas do usuário aqui -> já vai ter carregado as informações da API
            GetRespostas();
        }

    }, [podio]);

    const respostasMemo = useMemo(() => {
        if (respostasBanco !== undefined) {
            if (respostasBanco.length === 0) {
                setUserVotou(false);
            } else {
                setUserVotou(true);
                // Chamar função que calcula os pontos
                const pontosConquistados = PontosRaceWeek(respostasBanco[0].data().Resposta1, respostasBanco[0].data().Resposta2, respostasBanco[0].data().Resposta3);
                setPontosRaceWeek(pontosConquistados);
            }

        } else {
            setUserVotou(false);
        }
    }, [respostasBanco]);

    if (loading) {
        return (
            <View style={{ backgroundColor: '#12121A', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={30} color={'red'} />
                <Text style={{ color: '#FFF' }}>Conectando ao servidor</Text>
            </View>
        )
    } else {
        if (eventoCarregado) {
            if (userVotou) {
                return (
                    <F1_ScrollView>
                        {/* Nome do evento */}
                        <F1_CardNomeEvento>
                            <F1_TextNomeEvento>
                                <Text style={{ fontFamily: 'OpenSans-Regular' }}>{nomeEvento.split('Prêmio')[0]}Prêmio</Text>
                            </F1_TextNomeEvento>
                            <F1_TextNomeEventoDestaque>
                                <Text style={{ fontFamily: 'Ubuntu-Medium' }}>{nomeEvento.split('Prêmio')[1]}</Text>
                            </F1_TextNomeEventoDestaque>
                        </F1_CardNomeEvento>
                        {/* Card pontos */}
                        <F1_CardPontos>
                            <F1_TextPontos>
                                <Text style={{ fontFamily: 'OpenSans-Regular' }}>Você marcou um total de</Text>
                            </F1_TextPontos>
                            <F1_TextPontos>
                                {pontosRaceWeek ?
                                    <Text style={{ fontSize: 40, fontFamily: 'OpenSans-Bold' }}> {pontosRaceWeek} </Text>
                                    :
                                    <Text style={{ fontSize: 40, fontFamily: 'OpenSans-Bold' }}> 0 </Text>
                                }
                            </F1_TextPontos>
                            <F1_TextPontos>
                                <Text style={{ fontFamily: 'OpenSans-Regular' }}>pontos!</Text>
                            </F1_TextPontos>
                        </F1_CardPontos>
                        {/* Card pergunta 1 e resultado */}
                        <F1_CardPergunta>
                            <F1_ContainerPergunta>
                                <F1_CardNumPergunta>
                                    <F1_TextNumPergunta>
                                        <Text style={{ fontFamily: 'Ubuntu-Medium' }}>1</Text>
                                    </F1_TextNumPergunta>
                                </F1_CardNumPergunta>
                                <F1_TextPergunta>
                                    <Text style={{ fontFamily: 'OpenSans-Regular' }}>Qual piloto terminará em 1º lugar?</Text>
                                </F1_TextPergunta>
                            </F1_ContainerPergunta>
                            <F1_ContainerImgRespostas>
                                <F1_CardOpcao style={{ backgroundColor: '#E00600' }}>
                                    <F1_TextoRespostas>
                                        <Text style={{ fontFamily: 'OpenSans-Regular' }}>O resultado foi:</Text>
                                    </F1_TextoRespostas>
                                    <F1_ImgPiloto source={getImgPiloto(podio[0].Driver.driverId)}></F1_ImgPiloto>
                                    <F1_ContainerGradient>
                                        <F1_Gradient></F1_Gradient>
                                    </F1_ContainerGradient>
                                    <F1_TextImgPiloto>
                                        <Text style={{ fontFamily: 'OpenSans-Regular' }}>{podio[0].Driver.givenName}<Text style={{ fontFamily: 'OpenSans-Bold' }}>{' ' + podio[0].Driver.familyName}</Text></Text>
                                    </F1_TextImgPiloto>
                                </F1_CardOpcao>
                                <F1_CardOpcao style={{ backgroundColor: '#6D6D84' }}>
                                    <F1_TextoRespostas>
                                        <Text style={{ fontFamily: 'OpenSans-Regular' }}>Você respondeu:</Text>
                                    </F1_TextoRespostas>
                                    <F1_ImgPiloto source={getImgPiloto(respostasBanco[0].data().Resposta1)}></F1_ImgPiloto>
                                    <F1_ContainerGradient>
                                        <F1_Gradient></F1_Gradient>
                                    </F1_ContainerGradient>
                                    <F1_TextImgPiloto>
                                        <Text style={{ fontFamily: 'OpenSans-Regular' }}>{nomeResposta1?.split(' ')[0]}<Text style={{ fontFamily: 'OpenSans-Bold' }}>{' ' + nomeResposta1?.split(' ')[1]}</Text></Text>
                                    </F1_TextImgPiloto>
                                </F1_CardOpcao>
                            </F1_ContainerImgRespostas>
                            <F1_ContainerMsg>
                                <F1_TextMsg>
                                    <Text style={{ fontFamily: 'OpenSans-Regular' }}>{acertou1 ? 'Incrível! Você acertou.' : 'Que pena, não foi dessa vez.'}</Text>
                                </F1_TextMsg>
                                <F1_CardMsgPontos>
                                    <F1_MsgPontos>
                                        <Text style={{ fontFamily: 'OpenSans-Bold' }}>{acertou1 ? '+ 10 pontos' : '+ 0 pontos'} </Text>
                                    </F1_MsgPontos>
                                </F1_CardMsgPontos>
                            </F1_ContainerMsg>
                        </F1_CardPergunta>
                        {/* Card pergunta 2 e resultado */}
                        <F1_CardPergunta>
                            <F1_ContainerPergunta>
                                <F1_CardNumPergunta>
                                    <F1_TextNumPergunta>
                                        <Text style={{ fontFamily: 'Ubuntu-Medium' }}>2</Text>
                                    </F1_TextNumPergunta>
                                </F1_CardNumPergunta>
                                <F1_TextPergunta>
                                    <Text style={{ fontFamily: 'OpenSans-Regular' }}>Qual piloto terminará em 2º lugar?</Text>
                                </F1_TextPergunta>
                            </F1_ContainerPergunta>
                            <F1_ContainerImgRespostas>
                                <F1_CardOpcao style={{ backgroundColor: '#E00600' }}>
                                    <F1_TextoRespostas>
                                        <Text style={{ fontFamily: 'OpenSans-Regular' }}>O resultado foi:</Text>
                                    </F1_TextoRespostas>
                                    <F1_ImgPiloto source={getImgPiloto(podio[1].Driver.driverId)}></F1_ImgPiloto>
                                    <F1_ContainerGradient>
                                        <F1_Gradient></F1_Gradient>
                                    </F1_ContainerGradient>
                                    <F1_TextImgPiloto>
                                        <Text style={{ fontFamily: 'OpenSans-Regular' }}>{podio[1].Driver.givenName}<Text style={{ fontFamily: 'OpenSans-Bold' }}>{' ' + podio[1].Driver.familyName}</Text></Text>
                                    </F1_TextImgPiloto>
                                </F1_CardOpcao>
                                <F1_CardOpcao style={{ backgroundColor: '#6D6D84' }}>
                                    <F1_TextoRespostas>
                                        <Text style={{ fontFamily: 'OpenSans-Regular' }}>Você respondeu:</Text>
                                    </F1_TextoRespostas>
                                    <F1_ImgPiloto source={getImgPiloto(respostasBanco[0].data().Resposta2)}></F1_ImgPiloto>
                                    <F1_ContainerGradient>
                                        <F1_Gradient></F1_Gradient>
                                    </F1_ContainerGradient>
                                    <F1_TextImgPiloto>
                                        <Text style={{ fontFamily: 'OpenSans-Regular' }}>{nomeResposta2?.split(' ')[0]}<Text style={{ fontFamily: 'OpenSans-Bold' }}>{' ' + nomeResposta2?.split(' ')[1]}</Text></Text>
                                    </F1_TextImgPiloto>
                                </F1_CardOpcao>
                            </F1_ContainerImgRespostas>
                            <F1_ContainerMsg>
                                <F1_TextMsg>
                                    <Text style={{ fontFamily: 'OpenSans-Regular' }}>{acertou2 ? 'Incrível! Você acertou.' : 'Que pena, não foi dessa vez.'}</Text>
                                </F1_TextMsg>
                                <F1_CardMsgPontos>
                                    <F1_MsgPontos>
                                        <Text style={{ fontFamily: 'OpenSans-Bold' }}>{acertou2 ? '+ 10 pontos' : '+ 0 pontos'} </Text>
                                    </F1_MsgPontos>
                                </F1_CardMsgPontos>
                            </F1_ContainerMsg>
                        </F1_CardPergunta>
                        {/* Card pergunta 3 e resultado */}
                        <F1_CardPergunta>
                            <F1_ContainerPergunta>
                                <F1_CardNumPergunta>
                                    <F1_TextNumPergunta>
                                        <Text style={{ fontFamily: 'Ubuntu-Medium' }}>3</Text>
                                    </F1_TextNumPergunta>
                                </F1_CardNumPergunta>
                                <F1_TextPergunta>
                                    <Text style={{ fontFamily: 'OpenSans-Regular' }}>Qual piloto terminará em 3º lugar?</Text>
                                </F1_TextPergunta>
                            </F1_ContainerPergunta>
                            <F1_ContainerImgRespostas>
                                <F1_CardOpcao style={{ backgroundColor: '#E00600' }}>
                                    <F1_TextoRespostas>
                                        <Text style={{ fontFamily: 'OpenSans-Regular' }}>O resultado foi:</Text>
                                    </F1_TextoRespostas>
                                    <F1_ImgPiloto source={getImgPiloto(podio[2].Driver.driverId)}></F1_ImgPiloto>
                                    <F1_ContainerGradient>
                                        <F1_Gradient></F1_Gradient>
                                    </F1_ContainerGradient>
                                    <F1_TextImgPiloto>
                                        <Text style={{ fontFamily: 'OpenSans-Regular' }}>{podio[2].Driver.givenName}<Text style={{ fontFamily: 'OpenSans-Bold' }}>{' ' + podio[2].Driver.familyName}</Text></Text>
                                    </F1_TextImgPiloto>
                                </F1_CardOpcao>
                                <F1_CardOpcao style={{ backgroundColor: '#6D6D84' }}>
                                    <F1_TextoRespostas>
                                        <Text style={{ fontFamily: 'OpenSans-Regular' }}>Você respondeu:</Text>
                                    </F1_TextoRespostas>
                                    <F1_ImgPiloto source={getImgPiloto(respostasBanco[0].data().Resposta3)}></F1_ImgPiloto>
                                    <F1_ContainerGradient>
                                        <F1_Gradient></F1_Gradient>
                                    </F1_ContainerGradient>
                                    <F1_TextImgPiloto>
                                        <Text style={{ fontFamily: 'OpenSans-Regular' }}>{nomeResposta3?.split(' ')[0]}<Text style={{ fontFamily: 'OpenSans-Bold' }}>{' ' + nomeResposta3?.split(' ')[1]}</Text></Text>
                                    </F1_TextImgPiloto>
                                </F1_CardOpcao>
                            </F1_ContainerImgRespostas>
                            <F1_ContainerMsg>
                                <F1_TextMsg>
                                    <Text style={{ fontFamily: 'OpenSans-Regular' }}>{acertou3 ? 'Incrível! Você acertou.' : 'Que pena, não foi dessa vez.'}</Text>
                                </F1_TextMsg>
                                <F1_CardMsgPontos>
                                    <F1_MsgPontos>
                                        <Text style={{ fontFamily: 'OpenSans-Bold' }}>{acertou3 ? '+ 10 pontos' : '+ 0 pontos'} </Text>
                                    </F1_MsgPontos>
                                </F1_CardMsgPontos>
                            </F1_ContainerMsg>
                        </F1_CardPergunta>
                        {/* Botão */}
                        <F1_BtnEnviar onPress={() => navigation.navigate('Classificacao')}>
                            <F1_TextBtnEnviar>
                                <Text style={{ fontFamily: 'OpenSans-Bold' }}>Ver a classificação</Text>
                            </F1_TextBtnEnviar>
                        </F1_BtnEnviar>
                    </F1_ScrollView>
                )
            } else {
                return (
                    <F1_ViewErro>
                        <FontAwesome name="exclamation-circle" color={'#F6E837'} size={150} />
                        <F1_TituloErro>
                            <Text style={{ fontFamily: 'Ubuntu-Medium' }}>Ops! Você não votou no {nomeEvento}.</Text>
                        </F1_TituloErro>
                        <F1_TextoErro>
                            <Text style={{ fontFamily: 'OpenSans-Regular' }}>Vá até a aba "Perguntas" e vote no próximo evento, assim que a race week finalizar, você poderá ver seus resultados aqui.</Text>
                        </F1_TextoErro>
                    </F1_ViewErro>
                )
            }
        } else {
            <F1_ViewErro>
                <FontAwesome name="times-circle" color={'#E00600'} size={150} />
                <F1_TituloErro>
                    <Text style={{ fontFamily: 'Ubuntu-Medium' }}>Ops! Não foi possível carregar esta página</Text>
                </F1_TituloErro>
                <F1_TextoErro>
                    <Text style={{ fontFamily: 'OpenSans-Regular' }}>Erro ao acessar o servidor, por favor, tente mais tarde.</Text>
                </F1_TextoErro>
            </F1_ViewErro>
        }
    }
}