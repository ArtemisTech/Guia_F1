import React , { useState, createContext, useEffect } from 'react'
import { Alert } from 'react-native'

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingAuth, setLoadingAuth] = useState(false);

    useEffect(() => {
        async function loadStorage(){
            const storageUser = await AsyncStorage.getItem('@f1app');

            if (storageUser) {
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }

            setLoading(false);
        }

        loadStorage();
    }, [])

    async function signUp(email, password, name){
        setLoadingAuth(true);

        await auth().createUserWithEmailAndPassword(email, password)
        .then(async (value) => {
            let uid = value.user.uid;
            await firestore().collection('usuarios')
            .doc(uid).set({
                nome: name,
                createdAt: new Date(),
                avatarUrl: null
            })
            .then(async () => {
                let data = {
                    uid: uid,
                    nome: name,
                    email: value.user.email
                }

                await firestore().collection('JogoPrevisao').add({
                    user: data.uid,
                    PontosTotais: 0,
                });

                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
            })
        })
        .catch((error) => {

            if (error.code == 'auth/email-already-in-use') {
                Alert.alert('E-mail cadastrado','Ops, este e-mail já está cadastrado em nosso sistema.');
            };
            
            setLoadingAuth(false);
        });
    }

    async function signIn(email, password){
        setLoadingAuth(true);

        await auth().signInWithEmailAndPassword(email, password)
        .then(async (value) => {
            let uid = value.user.uid;

            const userProfile = await firestore().collection('usuarios')
            .doc(uid).get();

            let data = {
                uid: uid,
                nome: userProfile.data().nome,
                email: value.user.email
            };

            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
        })
        .catch((error) => {
            console.log(error);
            setLoadingAuth(false);
        })
    }

    async function signOut(){
        await auth().signOut();
        await AsyncStorage.clear()
        .then(() => {
            setUser(null);
        })
    }

    async function storageUser(data){
        await AsyncStorage.setItem('@f1app', JSON.stringify(data))
    }

    return (
        // As duas exclamações convertem o valor da variável em boolean (!!)
        // Se tiver algo dentro da variável ele converte para true, se for vazio ou nulo converte para false
        <AuthContext.Provider value={{ signed: !!user, signUp, signIn, signOut, loadingAuth, loading, user, setUser, storageUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;