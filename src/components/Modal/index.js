import React from 'react'
import { View, Text, Button, StyleSheet } from "react-native";
import {
    F1_container,
    F1_TituloModal,
    F1_SubtituloModal,
    F1_BtnModal,
    F1_TextBtn
} from './styles';

import FontAwesome from "react-native-vector-icons/FontAwesome5";

export default function Modal(props) {
    return (
        <F1_container>
            { props.type === "success" ?
                <FontAwesome name="check-circle" color={'#00FFA3'} size={150} />
                : props.type === "danger" ?
                <FontAwesome name="times-circle" color={'#E00600'} size={150} />
                :
                <FontAwesome name="exclamation-circle" color={'#F6E837'} size={150} />
            }
            <F1_TituloModal>
                <Text style={{ fontFamily: 'Ubuntu-Medium' }}>{props.titulo}</Text>
            </F1_TituloModal>
            <F1_SubtituloModal>
                <Text style={{ fontFamily: 'OpenSans-Regular' }}>{props.subtitulo}</Text>
            </F1_SubtituloModal>
            <F1_BtnModal onPress={props.fechar}>
                <F1_TextBtn>
                    <Text style={{ fontFamily: 'OpenSans-Bold' }}>{props.btnText}</Text>
                </F1_TextBtn>
            </F1_BtnModal>
        </F1_container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center'
    }
})