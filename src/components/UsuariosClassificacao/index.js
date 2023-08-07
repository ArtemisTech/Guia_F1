import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {
    F1_Card,
    F1_CardPosition,
    F1_TextPosition,
    F1_InfoUser,
    F1_User,
    F1_Img,
    F1_UserNome,
    F1_CardPontuacao,
    F1_TextPontuacao
} from './styles';

export default function UsuariosClassificacao({ data, index }) {

    return (
        <F1_Card>
            <F1_CardPosition>
                <F1_TextPosition>
                    <Text style={{ fontFamily: 'Ubuntu-Medium' }}>{index + 1}</Text>
                </F1_TextPosition>
            </F1_CardPosition>
            <F1_InfoUser>
                <F1_User>
                    {data.avatarUrl !== null ?
                        <F1_Img source={{ uri: data.avatarUrl }} />
                        :
                        <F1_Img source={require('../../assets/avatar.png')} />
                    }
                    <F1_UserNome>
                        <Text style={{ fontFamily: 'OpenSans-Regular' }}>{data.nome}</Text>
                    </F1_UserNome>
                </F1_User>
                <F1_CardPontuacao>
                    <F1_TextPontuacao>
                        <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>{data.pontosTotais}</Text>
                    </F1_TextPontuacao>
                </F1_CardPontuacao>
            </F1_InfoUser>
        </F1_Card>

    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFF',
        marginLeft: 15,
        marginRight: 15,
        marginTop: 15,
        elevation: 2,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cardTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: 15
    },
    cardPosition: {
        backgroundColor: 'red',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        width: '20%'
    },
    textPosition: {
        color: '#FFF',
        fontSize: 25,
        fontWeight: 'bold'
    },
    img: {
        width: 35,
        height: 35
    },
    user: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardPontuacao: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 5
    },
    textPontuacao: {
        fontWeight: 'bold',
        fontSize: 18
    },
    infoUser: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        paddingHorizontal: 20
    }
});