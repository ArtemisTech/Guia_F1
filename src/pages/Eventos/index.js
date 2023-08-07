import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator, Text } from "react-native";
import { F1_Container } from './styles';

import { useNavigation } from "@react-navigation/native";
import Corridas from '../../components/Corridas';
import api from "../../services/api_F1";

import races from './races.json'

export default function Eventos(){
  const navigation = useNavigation();
  const [calendario, setCalendario] = useState([]);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    setLoading(true);
    async function carregarCalendario() {
      await api.get('api/f1/current.json')
      .then((response) => {
        if (response.data.MRData !== undefined) {
          const listaCorridas = response.data.MRData.RaceTable.Races;
          setCalendario(listaCorridas);
          setLoading(false);
        }
        else {
          setCalendario(races.Races);
          setLoading(false);
        }
      })
      .catch((err) => {
        setCalendario(races.Races);
        setLoading(false);
      })
    }
    navigation.addListener('focus', () => setLoad(!load));
    carregarCalendario();
  }, [load]);

  return(
      <F1_Container>
        { loading ? ( 
          <View style={styles.loading}>
            <ActivityIndicator size={30} color={'red'} />
            <Text style={{ color: '#FFF' }}>Conectando ao servidor</Text>
          </View>
          ) : (
            <FlatList data={calendario} renderItem={({ item }) => <Corridas data={ item }/>}/>
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