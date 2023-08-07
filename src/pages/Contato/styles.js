import styled from 'styled-components/native';

export const F1_Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background-color: #12121A;
`;

export const F1_Titulo = styled.Text`
    font-size: 22px;
    margin-bottom: 15px;
    color: #E00600;
`;

export const F1_Texto = styled.Text`
    font-size: 16px;
    text-align: center;
    color: #FFF;
`;

export const F1_Email = styled.Text`
    font-size: 18px;
    margin-top: 25px;
    background-color: #37374E;
    color: #FFF;
    padding: 10px;
    border-radius: 15px;
    width: 65%;
    text-align: center;
`;

export const F1_LogoGF1 = styled.Image.attrs({
    resizeMode: 'contain'
})`
    width: 170px;
    margin-top: -20%;
    margin-bottom: -20px;
`;