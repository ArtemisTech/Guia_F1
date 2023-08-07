import React from "react";
import { View, Text, Image } from "react-native";
import { F1_Container, F1_BtnPrincipal, F1_Text, F1_ImgFundo, F1_ContainerImg, F1_ContainerTela, F1_ContainerTexto, F1_Gradient, F1_ContainerGradient, F1_Gradient2, F1_LogoGF1, F1_TextBtnPrincipal } from "./styles";

import { useNavigation } from "@react-navigation/native";

export default function BemVindo(){
    const navigation = useNavigation();

    return(
        <F1_Container>
            <F1_ContainerImg>
                <F1_ImgFundo source={ require('../../assets/bemVindo/bemvindo.jpg') }></F1_ImgFundo>
            </F1_ContainerImg>
            <F1_ContainerGradient>
                <F1_Gradient2></F1_Gradient2>
                <F1_Gradient></F1_Gradient>
            </F1_ContainerGradient>
            <F1_ContainerTela>
                <F1_ContainerTexto>
                    <F1_LogoGF1 source={ require('../../assets/logoGF1/logoGF1.png') }></F1_LogoGF1>
                    <F1_Text style={{fontFamily: 'OpenSans-Regular'}}>Seja bem-vindo ao Guia F1</F1_Text>
                </F1_ContainerTexto>
                <F1_BtnPrincipal onPress={ () => {
                        navigation.navigate('Login');
                    } }>
                        <F1_TextBtnPrincipal style={{fontFamily: 'OpenSans-Bold'}}>Comece agora</F1_TextBtnPrincipal>
                </F1_BtnPrincipal>
            </F1_ContainerTela>
        </F1_Container>
    )
}
