import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator, Text } from "react-native";
import { F1_Container } from './styles';

import { useNavigation } from "@react-navigation/native";
import PilotoCard from '../../components/PilotoCard';
import api from "../../services/api_F1";

import pilotos from './pilotos.json'

export default function Pilotos(){
  const navigation = useNavigation();
  const [piloto, setPiloto] = useState([]);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    setLoading(true);
    async function carregarClassificacao() {
      await api.get('api/f1/current/driverStandings.json')
      .then((res) => {
        if (res.data.MRData !== undefined) {
          const listaClassificacao = res.data.MRData.StandingsTable.StandingsLists;
          setPiloto(listaClassificacao);
          setLoading(false);
        }
        else {
          setPiloto(pilotos.StandingsLists);
          setLoading(false);
        }
      })
      .catch((err) => {
        setPiloto(pilotos.StandingsLists);
        setLoading(false);
      })
    }
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
        <FlatList data={piloto} renderItem={({ item }) => {
          return(
            <FlatList data={ item.DriverStandings } renderItem={({ item }) => <PilotoCard data={ item }/>}/>
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