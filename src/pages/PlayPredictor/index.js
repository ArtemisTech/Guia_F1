import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { useNavigation } from "@react-navigation/native";

export default function PlayPredictor(){
    const navigation = useNavigation();
    return(
        <View>
            <Text>PALPITÔMETRO</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    topBtn: {
        borderWidth: 2,
        borderColor: 'red',
        width: 90,
        marginTop: 15,
        padding: 5,
        alignItems: 'center'
    }
});