import React, { useState, useContext, useEffect, useMemo } from "react";
import { View, Text, ActivityIndicator, StyleSheet, FlatList, ScrollView } from "react-native";
import {
    F1_View,
    F1_TopCard,
    F1_TopCardText,
    F1_CardLista,
    F1_CardTotal,
    F1_Total
} from './styles';

import { useNavigation } from "@react-navigation/native";
import { AuthContext } from '../../contexts/auth';
import firestore from '@react-native-firebase/firestore';

import UsuariosClassificacao from "../../components/UsuariosClassificacao";

export default function Classificacao() {
    const navigation = useNavigation();
    const { user } = useContext(AuthContext);

    const [classificacao, setClassificacao] = useState([]);
    const [loading, setLoading] = useState(false);
    const [load, setLoad] = useState(true);
    const [qtdeJogadores, setQtdeJogadores] = useState();

    let arrayClassificacao = [];

    // Buscar todos todos os documentos da coleção JogoPrevisao
    async function GetDocs() {
        await firestore().collection('JogoPrevisao').get()
            .then((res) => {
                //console.log(res.docs);
                GetInfoUsers(res.docs);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // Pegar o valor do campo PontosTotais
    // Buscar na tabela usuarios os dados do usuário pelo id (o id do documento da tabela usuarios é o uid do usuario)
    function GetInfoUsers(arrayDocs) {
        //console.log(arrayDocs);
        arrayDocs.map((doc) => {
            //console.log(doc);
            firestore().collection('usuarios').get()
                .then((usuarios) => {
                    //console.log(usuarios.docs);

                    usuarios.docs.map((usuario) => {
                        if (doc.data().user === usuario.id) {
                            let data = {
                                nome: usuario.data().nome,
                                pontosTotais: doc.data().PontosTotais,
                                avatarUrl: usuario.data().avatarUrl
                            }
                            // console.log("Pontos totais: ", doc.data().PontosTotais);
                            // console.log("Usuario: ", usuario.data().nome);
                            arrayClassificacao.push(data);
                        }
                    });

                });
        });

        setTimeout(() => {
            // Enviando para useState classificacao o array ordenado
            setClassificacao(arrayClassificacao.sort((a, b) => parseInt(b.pontosTotais) - parseInt(a.pontosTotais)));

            setLoading(false);
        }, 600)

    };

    useEffect(() => {
        setLoading(true);
        navigation.addListener('focus', () => setLoad(!load));
        GetDocs();
        setQtdeJogadores(classificacao.length);
    }, [load]);

    return (
        <F1_View>
            {loading ? (
                <View style={{ backgroundColor: '#12121A', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size={30} color={'red'} />
                    <Text style={{ color: '#FFF' }}>Conectando ao servidor</Text>
                </View>
            ) : (
                <View style={{ paddingBottom: '45%' }}>
                    <F1_CardLista>
                        <F1_TopCard>
                            <F1_TopCardText>
                                <Text style={{ fontFamily: 'OpenSans-Regular' }}>Pos.</Text>
                            </F1_TopCardText>
                            <F1_TopCardText>
                                <Text style={{ fontFamily: 'OpenSans-Regular' }}>Nome</Text>
                            </F1_TopCardText>
                            <F1_TopCardText>
                                <Text style={{ fontFamily: 'OpenSans-Regular' }}>Pontos</Text>
                            </F1_TopCardText>
                        </F1_TopCard>
                        <FlatList data={classificacao} renderItem={({ item, index }) => <UsuariosClassificacao data={item} index={index} />} />
                    </F1_CardLista>
                    <F1_CardTotal>
                        <F1_Total>
                            <Text style={{ fontFamily: 'OpenSans-Regular' }}>Total de {classificacao?.length} jogadores</Text>
                        </F1_Total>
                    </F1_CardTotal>
                </View>
            )}
        </F1_View>
    )
}