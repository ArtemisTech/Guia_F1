import React from 'react'
import { View, Text, Button, StyleSheet, Image } from "react-native";
import { F1_Container, F1_Titulo, F1_Texto, F1_Email, F1_LogoGF1 } from './styles';

export default function Contato() {
    return (
        <F1_Container>
            <F1_LogoGF1 source={ require('../../assets/logoGF1/logoGF1.png') }></F1_LogoGF1>
            <F1_Titulo>
                <Text style={{fontFamily: 'Ubuntu-Medium'}}>Entre em contato conosco!</Text>
            </F1_Titulo>
            <F1_Texto>
                <Text style={{fontFamily: 'OpenSans-Regular'}}>Fique à vontade para nos avisar sobre erros, dar sugestões ou tratar de qualquer outro assunto enviando um e-mail para o endereço:</Text>
            </F1_Texto>
            <F1_Email style={{fontFamily: 'Ubuntu-Medium'}}>guiadaF1@gmail.com</F1_Email>
        </F1_Container>
    )
}