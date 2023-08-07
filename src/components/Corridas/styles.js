import styled from 'styled-components/native'

export const F1_Card = styled.TouchableOpacity`
    background-color: #37374E;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 15px;
    margin-bottom: -5px;
    padding: 20px;
    border-radius: 15px;
    height: 110px;
    width: auto;
    justify-content: center;
    align-content: space-between;
`;

export const F1_CardTitle = styled.Text`
    font-family: 'Ubuntu Medium';
    color: #FFF;
    font-weight: bold;
    font-size: 32px;
    text-align: right;
`;

export const F1_DataDia = styled.Text`
    color: #FFF;
    font-size: 20px;
`;

export const F1_DataMes = styled.Text`
    color: #FFF;
    background-color: #990400;
    font-size: 16px;
    padding-left: 8px;
    padding-right: 8px;
    padding-top: 0px;
    padding-bottom: 3px;
    border-radius: 6px;
    width: 52px;
    text-align: center;
`;

export const F1_Box = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const F1_CardSubtitle = styled.Text`
    flex-direction: row;
    width: 242px;
    color: #FFF;
    font-size: 12px;
    text-align: right;
`;

export const F1_Image = styled.Image`
    position: absolute;
    width: 112%;
    height: 110px; 
    z-index: 1;
    align-self: center;
    opacity: 0.15;
    border-radius: 15px;
    z-index: 0;
`;