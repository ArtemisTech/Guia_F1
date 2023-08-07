import styled from 'styled-components/native'

export const F1_Container = styled.View`
    flex: 1;
    background-color: #12121A;
    justify-content: space-between;
    align-items: center;
`;

export const F1_Title = styled.Text`
    color: #FFF;
    font-size: 20px;
`;

export const F1_Subtitle = styled.Text`
    color: #FFF;
    font-size: 16px;
`;

export const F1_Cabecalho = styled.View`
    align-items: center;
    margin-top: 10%;
`;

export const F1_CabecalhoEditar = styled(F1_Cabecalho)`
    margin-top: 30%;
`;

export const F1_LogoGF1 = styled.Image.attrs({
    resizeMode: 'contain'
})`
    width: 136px;
    margin-bottom: -25px;
`;

export const F1_ContainerInput = styled.View`
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export const F1_InputText = styled.TextInput.attrs({
    placeholderTextColor: '#6D6D84'
})`
    background-color: #37374E;
    margin: 0 0 18px 0;
    border-radius: 15px;
    width: 90%;
    height: 70px;
    padding: 15px 0 15px 15px;
`;

export const F1_Rodape = styled.View`
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    margin-bottom: 10%;
`;

export const F1_BtnPrincipal = styled.TouchableOpacity`
    background-color: #E00600;
    align-items: center;
    padding: 15px 0 15px 0;
    margin: 10px 20px 15px 20px;
    border-radius: 15px;
    width: 90%;
`;

export const F1_TextBtnPrincipal = styled.Text`
    font-size: 14px;
    color: #fff;
`;

export const F1_SignUpButton = styled.TouchableOpacity`
    width: 100%;
    margin-top: 10px;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`;

export const F1_SignUpText = styled.Text`
    color: #E00600;
    font-size: 14px;
`;

export const F1_SignUpSecundary = styled.Text`
    color: #6D6D84;
    font-size: 14px;
`;