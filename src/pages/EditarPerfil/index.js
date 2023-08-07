import React, { useContext, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, KeyboardAvoidingView } from "react-native";
import { F1_BtnPrincipal, F1_TextBtnPrincipal, F1_UploadBtn, F1_UploadText, F1_Avatar, F1_InputText, F1_ModalPassword, F1_TextModalPassword, F1_BtnCancelar, F1_InputTextPassword } from './styles';

import { AuthContext } from '../../contexts/auth';
import { useNavigation } from "@react-navigation/native";
import { launchImageLibrary } from 'react-native-image-picker';

import firestore from '@react-native-firebase/firestore';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

import ModalAviso from '../../components/Modal';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function EditarPerfil() {
    const navigation = useNavigation();
    const { signOut, user, setUser, storageUser } = useContext(AuthContext);

    const [nome, setNome] = useState(user?.nome);
    const [email, setEmail] = useState(user?.email);
    const [oldPassword, setOldPassword] = useState();
    const [password, setPassword] = useState('');
    const [url, setUrl] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalPasswordVisible, setModalPasswordVisible] = useState(false);

    async function updateProfile() {
        if (nome === '') {
            return;
        }

        await firestore().collection('usuarios').doc(user?.uid).update({
            nome: nome
        });

        if (oldPassword === '' || oldPassword === null || oldPassword === undefined) {
            return;
        } else {
            let usuario = auth().currentUser;
            let credential = auth.EmailAuthProvider.credential(usuario.email, oldPassword);
            console.log(credential);
            await auth().currentUser.reauthenticateWithCredential(credential).then(() => {
                auth().currentUser.updateEmail(email);
            });
        }

        if (password !== '') {
            await auth().currentUser.reauthenticateWithCredential(credential).then(() => {
                console.log(password);
                auth().currentUser.updatePassword(password);
            });
        }

        let data = {
            uid: user.uid,
            nome: nome,
            email: email
        }

        setUser(data);
        storageUser(data);
        setModalVisible(true);
    };

    const uploadFile = () => {
        const options = {
            noData: true,
            mediaType: 'photo'
        };

        launchImageLibrary(options, response => {
            if (response.didCancel) {
                // Não precisa colocar aviso aqui - ao voltar ele já fecha a tela para o usuário
                console.log("Cancelou!");
            } else if (response.error) {
                // Fazer um aviso aqui tbm
                console.log("Ops, parece que deu algum erro.");
            } else {
                // Subir para o Firebase
                console.log("Enviar para o Firebase");
                uploadFileFirebase(response)
                    .then(() => {
                        uploadAvatarClassificacao()
                    })

                setUrl(response.assets[0].uri)
            }
        })
    };

    const getFileLocalePath = (response) => {
        // Extrair e retornar a url da foto
        return response.assets[0].uri;
    };

    const uploadFileFirebase = async (response) => {
        const fileSource = getFileLocalePath(response);
        console.log(fileSource);
        const storageRef = storage().ref('usuarios').child(user?.uid);

        return await storageRef.putFile(fileSource);
    };

    const uploadAvatarClassificacao = async () => {
        const storageRef = storage().ref('usuarios').child(user?.uid);
        const url = await storageRef.getDownloadURL()
            .then(async (image) => {
                console.log('URL RECEBIDA ', image);
                // Atualizar imagem da classificação deste usuário
                const docs = await firestore().collection('usuarios').doc(user?.uid).update({
                    avatarUrl: image
                })

            })
            .catch((error) => {
                console.log('Erro ao atualizar foto da classificação ', error);
            })
    }

    function fecharModal() {
        setModalVisible(false);
        setModalPasswordVisible(false);
        navigation.navigate('Perfil');
    };

    useEffect(() => {
        async function loadAvatar() {
            try {
                let response = await storage().ref('usuarios').child(user?.uid).getDownloadURL();
                setUrl(response);
            } catch (err) {
                console.log("Não encontramos nenhuma foto");
            }
        }

        loadAvatar();

        return () => loadAvatar();
    }, []);

    return (
        <View style={{ backgroundColor: '#12121A', flex: 1 }}>
            <KeyboardAvoidingView behavior="position" contentContainerStyle={{ alignItems: 'center', backgroundColor: '#12121A', height: '100%' }} enabled>
                <Modal animationType="fade" visible={modalVisible}>
                    <ModalAviso fechar={fecharModal} titulo={"Alterações realizadas com sucesso!"} subtitulo={""} btnText={"Fechar"} type={"success"} />
                </Modal>

                <Modal animationType="fade" visible={modalPasswordVisible}>
                    <View style={{ flex: 1, backgroundColor: '#12121A' }}>
                        <F1_ModalPassword>
                            <F1_TextModalPassword>
                                <Text style={{ fontFamily: 'OpenSans-Regular' }}>Por favor, insira sua senha atual para confirmar as mudanças.</Text>
                            </F1_TextModalPassword>
                            <F1_InputTextPassword style={{ fontFamily: 'OpenSans-Bold', color: '#6D6D84' }} placeholder="Senha atual" value={oldPassword} onChangeText={(text) => setOldPassword(text)} secureTextEntry={true} />
                            <F1_BtnPrincipal onPress={updateProfile}>
                                <F1_TextBtnPrincipal>
                                    <Text style={{ fontFamily: 'OpenSans-Bold' }}>Confirmar</Text>
                                </F1_TextBtnPrincipal>
                            </F1_BtnPrincipal>
                            <F1_BtnCancelar onPress={fecharModal}>
                                <F1_TextBtnPrincipal>
                                    <Text style={{ fontFamily: 'OpenSans-Bold' }}>Cancelar</Text>
                                </F1_TextBtnPrincipal>
                            </F1_BtnCancelar>
                        </F1_ModalPassword>
                    </View>
                </Modal>

                {url ? (
                    <F1_UploadBtn onPress={() => uploadFile()}>
                        <F1_UploadText>
                            <Text style={{ fontFamily: 'Ubuntu-Medium' }}>+</Text>
                        </F1_UploadText>
                        <F1_Avatar source={{ uri: url }} />
                    </F1_UploadBtn>
                ) : (
                    <F1_UploadBtn onPress={() => uploadFile()}>
                        <F1_UploadText>
                            <Text style={{ fontFamily: 'Ubuntu-Medium' }}>+</Text>
                        </F1_UploadText>
                        <MaterialIcons name="sports-motorsports" color={'#FFF'} size={70} style={styles.iconeAvatar} />
                    </F1_UploadBtn>
                )}

                <F1_InputText style={{ fontFamily: 'OpenSans-Bold', color: '#FFF' }} placeholder={user?.nome} value={nome} onChangeText={(text) => setNome(text)} />
                <F1_InputText style={{ fontFamily: 'OpenSans-Bold', color: '#FFF' }} placeholder={user?.email} value={email} onChangeText={(text) => setEmail(text)} />
                <F1_InputText style={{ fontFamily: 'OpenSans-Bold', color: '#FFF' }} placeholder="Nova senha" value={password} onChangeText={(text) => setPassword(text)} secureTextEntry={true} />

                <F1_BtnPrincipal onPress={() => setModalPasswordVisible(true)}>
                    <F1_TextBtnPrincipal>
                        <Text style={{ fontFamily: 'OpenSans-Bold' }}>Salvar</Text>
                    </F1_TextBtnPrincipal>
                </F1_BtnPrincipal>
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    iconeAvatar: {
        alignSelf: 'center',
        top: '25%'
    }
});