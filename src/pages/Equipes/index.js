import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator, Text } from "react-native";
import { F1_Container } from "./styles";

import { useNavigation } from "@react-navigation/native";
import api from "../../services/api_F1";
import EquipeCard from "../../components/EquipeCard";

import equipes from './equipes.json'

export default function Equipes(){
    const navigation = useNavigation();
    const [construtor, setConstrutor] = useState([]);
    const [loading, setLoading] = useState(false);
    const [load, setLoad] = useState(true);

    useEffect(() => {
        setLoading(true);
        async function carregarClassificacao() {
            await api.get('api/f1/current/constructorStandings.json')
            .then((res) => {
                if (res.data.MRData !== undefined) {
                    const listaClassificacao = res.data.MRData.StandingsTable.StandingsLists;
                    setConstrutor(listaClassificacao);
                    setLoading(false);
                } else {
                    setConstrutor(equipes.StandingsLists);
                    setLoading(false);
                }
            })
            .catch((err) => {
                setConstrutor(equipes.StandingsLists);
                console.log(err);
                setLoading(false);
            })
        };
        navigation.addListener('focus', () => setLoad(!load));
        carregarClassificacao();
    }, [load]);

    return(
        <F1_Container>
            { loading ? (
                <View style={styles.loading}>
                    <ActivityIndicator size={30} color={'red'} />
                    <Text style={{ color: '#FFF' }}>Conectando ao servidor</Text>
                </View>
            ) : (
                <FlatList data={construtor} renderItem={({ item }) => {
                    return(
                        <FlatList data={ item.ConstructorStandings } renderItem={({ item }) => <EquipeCard data={ item }/>}/>
                    )
                }}/>
            )}
        </F1_Container>
    )
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});