import React, { useEffect, useState, useContext, useMemo } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator, Modal, Button } from "react-native";
import {
    F1_Container,
    F1_CardNomeEvento,
    F1_TextNomeEvento,
    F1_TextNomeEventoDestaque,
    F1_CardPodio,
    F1_ContainerJaVotou,
    F1_ScrollView,
    F1_CardDataVotacao,
    F1_TextDataVotacao,
    F1_CardPergunta,
    F1_CardOpcao,
    F1_ImgPiloto,
    F1_ContainerGradient,
    F1_Gradient,
    F1_TextImgPiloto,
    F1_ContainerPergunta,
    F1_CardNumPergunta,
    F1_TextNumPergunta,
    F1_TextPergunta,
    F1_BtnEnviar,
    F1_TextBtnEnviar,
    F1_ViewErro,
    F1_TituloErro,
    F1_TextoErro
} from './styles';

import firestore from '@react-native-firebase/firestore';
import moment from "moment-timezone";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome5";

import { AuthContext } from '../../contexts/auth'
import api from "../../services/api_F1";
import pilotosJSON from './pilotos.json'
import nextEvent from './nextEvent.json'

import ModalAviso from "../../components/Modal";

export default function Perguntas() {
    const navigation = useNavigation();

    const { user } = useContext(AuthContext);

    const [pergunta1, setPergunta1] = useState([]);
    const [pergunta2, setPergunta2] = useState([]);
    const [pergunta3, setPergunta3] = useState([]);
    const [resposta1, setResposta1] = useState();
    const [resposta2, setResposta2] = useState();
    const [resposta3, setResposta3] = useState();
    const [pilotos, setPilotos] = useState([]);
    const [disabledBtn, setDisabledBtn] = useState(false);
    const [textBtn, setTextBtn] = useState('Enviar minhas respostas');
    const [nomeEvento, setNomeEvento] = useState();
    const [idCircuit, setIdCircuit] = useState();
    const [diaAnterior, setDiaAnterior] = useState();

    const [selected1, setSelected1] = useState(null);
    const [selected2, setSelected2] = useState(null);
    const [selected3, setSelected3] = useState(null);

    const [loading, setLoading] = useState(false);
    const [loadingBancoDados, setLoadingBancoDados] = useState(false);
    const [jaVotou, setjaVotou] = useState(false);
    const [respostasBanco, setRespostasBanco] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [eventoCarregado, setEventoCarregado] = useState(false);

    const [load, setLoad] = useState(true);
    const [sourcePiloto, setSourcePiloto] = useState();

    function OpcoesPergunta({ title, onPress, value, question, pilotoId }) {
        return (
            <F1_CardOpcao key={pilotoId} style={{ backgroundColor: value === pilotoId ? "#E00600" : "#6D6D84" }} onPress={() => onPress(question, pilotoId)}>
                <F1_ImgPiloto source={getImgPiloto(pilotoId)}></F1_ImgPiloto>
                <F1_ContainerGradient>
                    <F1_Gradient></F1_Gradient>
                </F1_ContainerGradient>
                <F1_TextImgPiloto>
                    <Text key={title} style={{ fontFamily: 'OpenSans-Regular' }}>{title.split(' ')[0]}<Text style={{ fontFamily: 'OpenSans-Bold' }}>{' ' + title.split(' ')[1]}</Text></Text>
                </F1_TextImgPiloto>
            </F1_CardOpcao>
        );
    };

    async function getPerguntas() {

        const pergunta1 = await firestore().collection('JogoPrevisaoPerguntas').where('Ordem', '==', 1).limit(1).get();
        const pergunta2 = await firestore().collection('JogoPrevisaoPerguntas').where('Ordem', '==', 2).limit(1).get();
        const pergunta3 = await firestore().collection('JogoPrevisaoPerguntas').where('Ordem', '==', 3).limit(1).get();

        setPergunta1(pergunta1.docs);
        setPergunta2(pergunta2.docs);
        setPergunta3(pergunta3.docs);

        setLoading(false);
    };

    async function carregarPilotos() {

        const response = await api.get('api/f1/current/driverStandings.json')
            .then(() => {
                if (response.data.MRData !== undefined) {
                    const listaClassificacao = response.data.MRData.StandingsTable.StandingsLists;
                    let drivers = [];

                    listaClassificacao.map((item) => {
                        item.DriverStandings.map((driverStandings) => {
                            drivers.push(driverStandings.Driver.driverId)
                        })
                    });

                    setPilotos(drivers);

                } else {
                    let lista = pilotosJSON.StandingsLists;
                    let drivers = [];

                    lista.map((item) => {
                        item.DriverStandings.map((driverStandings) => {
                            drivers.push(driverStandings.Driver.driverId)
                        })
                    });

                    setPilotos(drivers);
                }
            })
            .catch(() => {
                let lista = pilotosJSON.StandingsLists;
                let drivers = [];

                lista.map((item) => {
                    item.DriverStandings.map((driverStandings) => {
                        drivers.push(driverStandings.Driver.driverId)
                    })
                });

                setPilotos(drivers);
            });
    };

    // Não consegui fazer essa função usar then/catch -> passa sempre no catch.
    // Quando não usa, dá certo, mas caso a API fique off, não funciona
    // >> Fazer vídeo dessa parte << para caso eu não consiga resolver o problema em tempo
    async function carregarEvento() {

        const responseEvento = await api.get('api/f1/current/next.json')
        const listaEvento = responseEvento.data.MRData.RaceTable.Races;

        let nomeCircuito = buscarNomeCompletoEvento(listaEvento[0].Circuit.circuitId);
        let idCircuito = listaEvento[0].Circuit.circuitId;

        setIdCircuit(idCircuito);
        setNomeEvento(nomeCircuito);
        calcularDataVotacao(listaEvento[0]);

    };

    function selecionarOpcao(numPergunta, idResposta) {
        // envio a ordem para saber qual qual é a pergunta selecionada -> numPergunta
        // envio o id da resposta para saber qual resposta selecionada -> idResposta

        if (numPergunta == 1) {
            setSelected1(idResposta);
            setResposta1(idResposta);
        }

        if (numPergunta == 2) {
            setSelected2(idResposta);
            setResposta2(idResposta);
        }

        if (numPergunta == 3) {
            setSelected3(idResposta);
            setResposta3(idResposta);
        }
    };

    async function enviarRespostas() {
        if (resposta1 == undefined || resposta2 == undefined || resposta3 == undefined) {
            Alert.alert("Ops!", "Por favor, responda todas as perguntas");
        } else {
            setLoadingBancoDados(true);
            // Enviar dados para banco de dados
            await firestore().collection('JogoPrevisaoRespostas').add({
                EventoCorrida: idCircuit,
                Resposta1: resposta1,
                Resposta2: resposta2,
                Resposta3: resposta3,
                user: user.uid,
                Pontos: 0
            })
            .then(() => {
                // mostrar modal
                setModalVisible(true);
                setLoadingBancoDados(false);
                limparRespostas();
            })
            .catch((err) => {
                setLoadingBancoDados(false);
                console.log(err);
            })

        }
    };

    function calcularDataVotacao(evento) {

        let currentDate = moment().tz("America/Sao_Paulo").format();
        let dtHrFP1 = evento.FirstPractice.date + ' ' + evento.FirstPractice.time;
        let FP1Date = moment(dtHrFP1).tz("America/Sao_Paulo").format();
        let diaAnterior = moment(dtHrFP1).tz("America/Sao_Paulo").subtract(1, 'day').format();
        let diaAnteriorFormat = moment(dtHrFP1).tz("America/Sao_Paulo").subtract(1, 'day').format('DD/MM');

        setDiaAnterior(diaAnteriorFormat);

        // console.log('data hoje = ' + currentDate);
        // console.log('FP1Date = ' + FP1Date);
        // console.log('diaAnterior = ' + diaAnterior);

        // Assim que a API atualizar o próximo evento, os valores se alteram
        if (moment(currentDate).isBefore(diaAnterior)) {
            //console.log('hoje é antes do dia do treino livre = pode votar');
        } else {
            //console.log('já passou da data = não pode votar');
            setDisabledBtn(true);
            setTextBtn('Aguarde o próximo evento');
        }
    };

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

    function fecharModal() {
        setModalVisible(false);
        navigation.navigate('Eventos');
    };

    function limparRespostas() {
        setSelected1('');
        setSelected2('');
        setSelected3('');
    };

    let getNomeResposta = (driverId) => {
        switch (driverId) {
            case "max_verstappen":
                return "Max Verstappen";
                break;
            case "perez":
                return "Sergio Pérez";
                break;
            case "alonso":
                return "Fernando Alonso";
                break;
            case "hamilton":
                return "Lewis Hamilton";
                break;
            case "russell":
                return "George Russell";
                break;
            case "sainz":
                return "Carlos Sainz";
                break;
            case "leclerc":
                return "Charles Leclerc";
                break;
            case "stroll":
                return "Lance Stroll";
                break;
            case "ocon":
                return "Esteban Ocon";
                break;
            case "gasly":
                return "Pierre Gasly";
                break;
            case "norris":
                return "Lando Norris";
                break;
            case "hulkenberg":
                return "Nico Hulkenberg";
                break;
            case "piastri":
                return "Oscar Piastri";
                break;
            case "bottas":
                return "Valtteri Bottas";
                break;
            case "zhou":
                return "Guanyu Zhou";
                break;
            case "tsunoda":
                return "Yuki Tsunoda";
                break;
            case "kevin_magnussen":
                return "Kevin Magnussen";
                break;
            case "albon":
                return "Alexander Albon";
                break;
            case "de_vries":
                return "Nick De Vries";
                break;
            case "sargeant":
                return "Logan Sargeant";
                break;
            default:
                return "";
                break;
        }
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

    // Criar uma função para verificar se já existe resposta para esse evento
    // se existir -> jaVotou = true
    function existeResposta() {
        const respostas = firestore().collection('JogoPrevisaoRespostas').where('user', '==', user.uid).get();

        respostas.then((res) => {

            let respostaEncontrada = res.docs.filter(doc => doc.data().EventoCorrida == idCircuit);

            setRespostasBanco(respostaEncontrada);
        });
    };

    useEffect(() => {
        setLoading(true);

        carregarPilotos();
        getPerguntas();
        carregarEvento();

        limparRespostas();

        navigation.addListener('focus', () => setLoad(!load));
        existeResposta();

    }, [load, idCircuit]);

    // useMemo carrega apenas quando a dependência sofre alteração
    const respostasMemo = useMemo(() => {

        if (respostasBanco !== undefined) {
            if (respostasBanco.length === 0) {
                setjaVotou(false);

            } else {
                setjaVotou(true);
            }
        }

    }, [respostasBanco])

    const eventoMemo = useMemo(() => {

        // console.log(idCircuit);
        if (idCircuit == undefined) {
            setEventoCarregado(false);
        } else {
            setEventoCarregado(true);
        }

    }, [idCircuit])

    if (loading) {
        return (
            <View style={{ backgroundColor: '#12121A', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={30} color={'red'} />
                <Text style={{ color: '#FFF' }}>Conectando ao servidor</Text>
            </View>
        )
    } else {
        if (jaVotou) {
            // mostra as escolhas da pessoa
            return (
                <F1_ContainerJaVotou>
                    <F1_CardNomeEvento>
                        <F1_TextNomeEvento>
                            <Text style={{ fontFamily: 'OpenSans-Regular' }}>{nomeEvento.split('Prêmio')[0]}Prêmio</Text>
                        </F1_TextNomeEvento>
                        <F1_TextNomeEventoDestaque>
                            <Text style={{ fontFamily: 'Ubuntu-Medium' }}>{nomeEvento.split('Prêmio')[1]}</Text>
                        </F1_TextNomeEventoDestaque>
                    </F1_CardNomeEvento>
                    <F1_CardPodio>
                        <F1_TextNomeEventoDestaque>
                            <Text style={{ fontFamily: 'Ubuntu-Medium' }}>Você votou no seguinte pódio:</Text>
                        </F1_TextNomeEventoDestaque>
                        <F1_TextNomeEvento style={{ marginTop: 10 }}>
                            <Text style={{ fontFamily: 'OpenSans-Regular' }}>1º: {getNomeResposta(respostasBanco[0]._data.Resposta1)}</Text>
                        </F1_TextNomeEvento>
                        <F1_TextNomeEvento>
                            <Text style={{ fontFamily: 'OpenSans-Regular' }}>2º: {getNomeResposta(respostasBanco[0]._data.Resposta2)}</Text>
                        </F1_TextNomeEvento>
                        <F1_TextNomeEvento>
                            <Text style={{ fontFamily: 'OpenSans-Regular' }}>3º: {getNomeResposta(respostasBanco[0]._data.Resposta3)}</Text>
                        </F1_TextNomeEvento>
                    </F1_CardPodio>
                    <F1_TextNomeEvento style={{ margin: 10, textAlign: 'center' }}>
                        <Text style={{ fontFamily: 'OpenSans-Regular' }}>Volte ao final desta race week para acompanhar seu resultado!</Text>
                    </F1_TextNomeEvento>
                </F1_ContainerJaVotou>
            )
        } else {
            if (eventoCarregado) {
                return (
                    <F1_ScrollView>
                        <Modal animationType="fade" visible={modalVisible}>
                            <ModalAviso fechar={fecharModal} titulo={"Respostas submetidas com sucesso!"} subtitulo={"It's Race Week\nNão se esqueça de voltar para ver seus resultados."} type={"success"} btnText={"Voltar para os eventos"} />
                        </Modal>
                        {/* Nome do evento */}
                        <F1_CardNomeEvento>
                            <F1_TextNomeEvento>
                                <Text style={{ fontFamily: 'OpenSans-Regular' }}>{nomeEvento.split('Prêmio')[0]}Prêmio</Text>
                            </F1_TextNomeEvento>
                            <F1_TextNomeEventoDestaque>
                                <Text style={{ fontFamily: 'Ubuntu-Medium' }}>{nomeEvento.split('Prêmio')[1]}</Text>
                            </F1_TextNomeEventoDestaque>
                        </F1_CardNomeEvento>
                        {/* Card data votação */}
                        <F1_CardDataVotacao>
                            <FontAwesome name="clock" color={'white'} size={20} />
                            <F1_TextDataVotacao>
                                <Text style={{ fontFamily: 'OpenSans-Regular' }}>Você tem até
                                    {diaAnterior ?
                                        <Text style={{ fontSize: 16, fontFamily: 'OpenSans-Bold' }}> {diaAnterior} </Text>
                                        :
                                        <Text style={{ fontSize: 16, fontFamily: 'OpenSans-Bold' }}> 00/00 </Text>
                                    }
                                    para jogar!
                                </Text>
                            </F1_TextDataVotacao>
                        </F1_CardDataVotacao>
                        {/* Card pergunta 1 */}
                        <F1_CardPergunta>
                            {
                                pergunta1.map((pergunta) => {
                                    return (
                                        <F1_ContainerPergunta key={pergunta.data().Ordem}>
                                            <F1_CardNumPergunta>
                                                <F1_TextNumPergunta>
                                                    <Text style={{ fontFamily: 'Ubuntu-Medium' }}>1</Text>
                                                </F1_TextNumPergunta>
                                            </F1_CardNumPergunta>
                                            <F1_TextPergunta>
                                                <Text style={{ fontFamily: 'OpenSans-Regular' }} key={pergunta.data().Ordem}>{pergunta.data().Pergunta}</Text>
                                            </F1_TextPergunta>
                                        </F1_ContainerPergunta>
                                    )
                                })
                            }
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                {
                                    pilotos.map((pilotoId) => {
                                        return (
                                            <OpcoesPergunta key={pilotoId} title={getNomeResposta(pilotoId)} pilotoId={pilotoId} question={1} onPress={selecionarOpcao} value={selected1} />
                                        )
                                    })
                                }
                            </ScrollView>
                        </F1_CardPergunta>
                        {/* Card pergunta 2 */}
                        <F1_CardPergunta>
                            {
                                pergunta2.map((pergunta) => {
                                    return (
                                        <F1_ContainerPergunta key={pergunta.data().Ordem}>
                                            <F1_CardNumPergunta>
                                                <F1_TextNumPergunta>
                                                    <Text style={{ fontFamily: 'Ubuntu-Medium' }}>2</Text>
                                                </F1_TextNumPergunta>
                                            </F1_CardNumPergunta>
                                            <F1_TextPergunta>
                                                <Text style={{ fontFamily: 'OpenSans-Regular' }} key={pergunta.data().Ordem}>{pergunta.data().Pergunta}</Text>
                                            </F1_TextPergunta>
                                        </F1_ContainerPergunta>
                                    )
                                })
                            }
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                {
                                    pilotos.map((pilotoId) => {
                                        return (
                                            <OpcoesPergunta key={pilotoId} title={getNomeResposta(pilotoId)} pilotoId={pilotoId} question={2} onPress={selecionarOpcao} value={selected2} />
                                        )
                                    })
                                }
                            </ScrollView>
                        </F1_CardPergunta>
                        {/* Card pergunta 3 */}
                        <F1_CardPergunta>
                            {
                                pergunta3.map((pergunta) => {
                                    return (
                                        <F1_ContainerPergunta key={pergunta.data().Ordem}>
                                            <F1_CardNumPergunta>
                                                <F1_TextNumPergunta>
                                                    <Text style={{ fontFamily: 'Ubuntu-Medium' }}>3</Text>
                                                </F1_TextNumPergunta>
                                            </F1_CardNumPergunta>
                                            <F1_TextPergunta>
                                                <Text style={{ fontFamily: 'OpenSans-Regular' }} key={pergunta.data().Ordem}>{pergunta.data().Pergunta}</Text>
                                            </F1_TextPergunta>
                                        </F1_ContainerPergunta>
                                    )
                                })
                            }
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                {
                                    pilotos.map((pilotoId) => {
                                        return (
                                            <OpcoesPergunta key={pilotoId} title={getNomeResposta(pilotoId)} pilotoId={pilotoId} question={3} onPress={selecionarOpcao} value={selected3} />
                                        )
                                    })
                                }
                            </ScrollView>
                        </F1_CardPergunta>
                        {/* Botão enviar */}
                        <F1_BtnEnviar disabled={disabledBtn} onPress={enviarRespostas}>
                            {loadingBancoDados ?
                                <ActivityIndicator size={22} color="#FFF" />
                                :
                                <F1_TextBtnEnviar>
                                    <Text style={{ fontFamily: 'OpenSans-Bold' }}>{textBtn}</Text>
                                </F1_TextBtnEnviar>
                            }
                        </F1_BtnEnviar>
                    </F1_ScrollView>
                )
            } else {
                return (
                    <F1_ViewErro>
                        <FontAwesome name="times-circle" color={'#E00600'} size={150} />
                        <F1_TituloErro>
                            <Text style={{ fontFamily: 'Ubuntu-Medium' }}>Ops! Não foi possível carregar esta página</Text>
                        </F1_TituloErro>
                        <F1_TextoErro>
                            <Text style={{ fontFamily: 'OpenSans-Regular' }}>Erro ao acessar o servidor, por favor, tente mais tarde.</Text>
                        </F1_TextoErro>
                    </F1_ViewErro>
                )
            }
        }
    }
}