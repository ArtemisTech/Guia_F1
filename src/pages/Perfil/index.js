import React, { useContext, useState, useEffect } from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet, Image } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { F1_Container, F1_BtnPrincipal, F1_TextBtnPrincipal, F1_BtnSecondary, F1_TextBtnSecondary, F1_NomePerfil, F1_EmailPerfil, F1_UploadBtn, F1_Avatar } from './styles';

import storage from '@react-native-firebase/storage';

import { AuthContext } from '../../contexts/auth';
import { useNavigation } from "@react-navigation/native";

export default function Perfil() {
    const navigation = useNavigation();

    const { signOut, user } = useContext(AuthContext);

    const [nome, setNome] = useState(user?.nome);
    const [url, setUrl] = useState(null);
    const [load, setLoad] = useState(true);

    useEffect(() => {
        async function loadAvatar() {
            try {
                let response = await storage().ref('usuarios').child(user?.uid).getDownloadURL();
                setUrl(response);
            } catch (err) {
                console.log("Não encontramos nenhuma foto");
            }
        }
        navigation.addListener('focus', () => setLoad(!load));
        loadAvatar();

        return () => loadAvatar();
    }, [load]);

    async function fazerLogout() {
        await signOut();
    };

    return (
        <F1_Container>
            {url ? (
                <F1_UploadBtn>
                    <F1_Avatar source={{ uri: url }} />
                </F1_UploadBtn>
            ) : (
                <F1_UploadBtn>
                    <MaterialIcons name="sports-motorsports" color={'#FFF'} size={70} />
                </F1_UploadBtn>
            )}
            <F1_NomePerfil>
                <Text style={{ fontFamily: 'Ubuntu-Medium' }}>{user?.nome}</Text>
            </F1_NomePerfil>
            <F1_EmailPerfil>
                <Text style={{ fontFamily: 'OpenSans-Regular' }}>{user?.email}</Text>
            </F1_EmailPerfil>

            <F1_BtnSecondary onPress={() => {
                navigation.navigate('EditarPerfil');
            }}>
                <F1_TextBtnSecondary>
                    <Text style={{ fontFamily: 'Ubuntu-Medium' }}>Editar perfil</Text>
                </F1_TextBtnSecondary>
            </F1_BtnSecondary>
            <F1_BtnSecondary onPress={() => {
                navigation.navigate('Contato');
            }}>
                <F1_TextBtnSecondary>
                    <Text style={{ fontFamily: 'Ubuntu-Medium' }}>Entre em contato conosco</Text>
                </F1_TextBtnSecondary>
            </F1_BtnSecondary>
            <F1_BtnSecondary onPress={() => {
                navigation.navigate('PoliticaPrivacidade');
            }}>
                <F1_TextBtnSecondary>
                    <Text style={{ fontFamily: 'Ubuntu-Medium' }}>Política de Privacidade</Text>
                </F1_TextBtnSecondary>
            </F1_BtnSecondary>
            <F1_BtnPrincipal onPress={fazerLogout}>
                <F1_TextBtnPrincipal>
                    <Text style={{ fontFamily: 'OpenSans-Bold' }}>Sair</Text>
                </F1_TextBtnPrincipal>
            </F1_BtnPrincipal>
        </F1_Container>
    )
}