import styled from 'styled-components/native';

export const F1_Card = styled.View`
    background-color: #6D6D84;
    width: 100%;
    height: 51px;
    flex-direction: row;
    justify-content: space-between;
    border-radius: 15px;
    margin-bottom: 15px;
`;

export const F1_CardPosition = styled.View`
    background-color: #E00600;
    width: 18%;
    align-items: center;
    justify-content: center;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
`;

export const F1_TextPosition = styled.Text`
    color: #FFF;
    font-size: 24px;
`;

export const F1_InfoUser = styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: 80%;
    padding-left: 2%;
    padding-right: 5%;
`;

export const F1_User = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const F1_Img = styled.Image`
    width: 38px;
    height: 38px;
    border-radius: 20px;
    border-width: 2px;
    border-color: #37374E;
`;

export const F1_UserNome = styled.Text`
    color: #FFF;
    font-size: 12px;
    margin-left: 10px;
`;

export const F1_CardPontuacao = styled.View`
    flex-direction: row;
    align-items: center;
    margin-left: 10px;
    margin-right: 10px;
`;

export const F1_TextPontuacao = styled.Text`
    color: #FFF;
    font-size: 16px;
`;