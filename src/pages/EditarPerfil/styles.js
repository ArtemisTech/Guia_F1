import styled from 'styled-components/native';

export const F1_BtnPrincipal = styled.TouchableOpacity`
    background-color: #E00600;
    align-items: center;
    padding: 15px 0 15px 0;
    margin: 10px 20px 15px 20px;
    border-radius: 15px;
    width: 80%;
`;

export const F1_TextBtnPrincipal = styled.Text`
    font-size: 14px;
    color: #fff;
`;

export const F1_UploadBtn = styled.TouchableOpacity`
    margin-top: 30px;
    background-color: #37374E;
    width: 165px;
    height: 165px;
    border-radius: 90px;
    z-index: 8;
    margin-bottom: 50px;
`;

export const F1_UploadText = styled.Text`
    font-size: 28px;
    position: absolute;
    color: #FFF;
    z-index: 99;
    background-color: #E00600;
    padding: 0 11.5px 5px 11.5px;
    border-radius: 60px;
    left: 70%;
    top: 78%;
`;

export const F1_Avatar = styled.Image`
    top: 4px;
    left: 3.5px;
    width: 158px;
    height: 158px;
    border-radius: 80px;
`;

export const F1_InputText = styled.TextInput.attrs({
    placeholderTextColor: '#6D6D84'
})`
    background-color: #37374E;
    margin: 0 0 18px 0;
    border-radius: 15px;
    width: 80%;
    height: 70px;
    padding: 15px 0 15px 15px;
`;

export const F1_ModalPassword = styled.View.attrs({
    elevation: 20,
})`
    top: 25%;
    align-self: center;
    align-items: center;
    justify-content: center;
    width: 340px;
    height: 350px;
    background-color: #37374E;
    border-radius: 15px;
    z-index: 10;
`;

export const F1_TextModalPassword = styled.Text`
    color: #FFF;
    font-size: 16px;
    width: 270px;
`;

export const F1_BtnCancelar = styled.TouchableOpacity`
    background-color: #6D6D84;
    align-items: center;
    margin: 0 20px 10px 20px;
    padding: 15px 0 15px 0;
    width: 80%;
    border-radius: 15px;
`;

export const F1_InputTextPassword = styled.TextInput.attrs({
    placeholderTextColor: '#6D6D84'
})`
    background-color: #FFF;
    margin: 15px 0 18px 0;
    border-radius: 15px;
    width: 80%;
    height: 70px;
    padding: 15px 0 15px 15px;
`;
