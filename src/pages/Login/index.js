import React, { useState, useContext } from "react";
import { View, Text, ActivityIndicator } from "react-native";

import { F1_Container, F1_Title, F1_InputText, F1_BtnPrincipal, F1_SignUpButton, F1_SignUpText, F1_Subtitle, F1_Cabecalho, F1_LogoGF1, F1_TextBtnPrincipal, F1_ContainerInput, F1_Rodape, F1_SignUpSecundary, F1_CabecalhoEditar } from "./styles";

import { AuthContext } from '../../contexts/auth'

export default function Login(){
    const [login, setLogin] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signUp, signIn, loadingAuth } = useContext(AuthContext)

    function toggleLogin(){
        setLogin(!login);
        setName('');
        setEmail('');
        setPassword('');
    }

    async function fazerLogin(){
        if (email === '' || password === '') {
            console.log("PREENCHA TODOS OS CAMPOS");
            return;
        }
        // Fazer o login do usuário
        await signIn(email, password);
    }

    async function cadastrarUsuario(){
        if (name === '' || email === '' || password === '') {
            console.log("PREENCHA TODOS OS CAMPOS PARA CADASTRAR");
            return;
        }
        // Cadastrar o usuário na aplicação
        await signUp(email, password, name);
    }

    //Renderização condicional, se clicar em 'Criar uma conta', vai para a página de cadastro e vice versa
    if (login) {
        return(
            //Todas essas tags estão sendo criadas para personalizar via styled-components
            <F1_Container>
                <F1_Cabecalho>
                    <F1_LogoGF1 source={ require('../../assets/logoGF1/logoGF1.png') }></F1_LogoGF1>
                    <F1_Title style={{fontFamily: 'Ubuntu-Medium'}}>Bem-vindo!</F1_Title>
                    <F1_Subtitle style={{fontFamily: 'OpenSans-Regular'}}>Por favor, entre com suas credenciais</F1_Subtitle>
                </F1_Cabecalho>
                <F1_ContainerInput>
                    <F1_InputText style={{fontFamily: 'OpenSans-Bold', color: '#FFF'}} placeholder="E-mail" value={email} onChangeText={ (text) => setEmail(text) }/>
                    <F1_InputText style={{fontFamily: 'OpenSans-Bold', color: '#FFF'}} placeholder="Senha" value={password} secureTextEntry={true} onChangeText={ (text) => setPassword(text) }/>
                </F1_ContainerInput>
                <F1_Rodape>
                    <F1_BtnPrincipal onPress={fazerLogin}>
                        { loadingAuth ? (
                            <ActivityIndicator size={20} color="#FFF"/>
                        ) : (
                            <F1_TextBtnPrincipal style={{fontFamily: 'OpenSans-Bold'}}>Acessar</F1_TextBtnPrincipal>
                        )}
                    </F1_BtnPrincipal>
                    <F1_SignUpButton onPress={toggleLogin}>
                        <F1_SignUpSecundary style={{fontFamily: 'OpenSans-Bold'}}>Ainda não possui uma conta?  </F1_SignUpSecundary><F1_SignUpText style={{fontFamily: 'OpenSans-Bold'}}>Clique aqui</F1_SignUpText>
                    </F1_SignUpButton>
                </F1_Rodape>
            </F1_Container>
        )
    }

    return(
        //Todas essas tags estão sendo criadas para personalizar via styled-components
        <F1_Container>
            <F1_CabecalhoEditar>
                <F1_Title style={{fontFamily: 'Ubuntu-Medium'}}>Bem-vindo!</F1_Title>
                <F1_Subtitle style={{fontFamily: 'OpenSans-Regular'}}>Por favor, preencha o formulário abaixo</F1_Subtitle>
            </F1_CabecalhoEditar>
            <F1_ContainerInput>
                <F1_InputText style={{fontFamily: 'OpenSans-Bold', color: '#FFF'}} placeholder="Nome completo" value={name} onChangeText={ (text) => setName(text) }/>
                <F1_InputText style={{fontFamily: 'OpenSans-Bold', color: '#FFF'}} placeholder="E-mail" value={email} onChangeText={ (text) => setEmail(text) }/>
                <F1_InputText style={{fontFamily: 'OpenSans-Bold', color: '#FFF'}} placeholder="Senha" value={password} secureTextEntry={true} onChangeText={ (text) => setPassword(text)}/>
            </F1_ContainerInput>
            <F1_Rodape>
                <F1_BtnPrincipal onPress={cadastrarUsuario}>
                { loadingAuth ? (
                    <ActivityIndicator size={20} color="#FFF"/>
                ) : (
                    <F1_TextBtnPrincipal style={{fontFamily: 'OpenSans-Bold'}}>Cadastrar</F1_TextBtnPrincipal>
                )}
                </F1_BtnPrincipal>
                <F1_SignUpButton onPress={toggleLogin}>
                <F1_SignUpSecundary style={{fontFamily: 'OpenSans-Bold'}}>Já possui uma conta?  </F1_SignUpSecundary><F1_SignUpText style={{fontFamily: 'OpenSans-Bold'}}>Faça login</F1_SignUpText>
                </F1_SignUpButton>
            </F1_Rodape>
        </F1_Container>
    )
}