import styled from 'styled-components/native';

export const F1_Card = styled.View`
    background-color: #37374E;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 15px;
    margin-bottom: -5px;
    padding: 20px;
    border-radius: 15px;
    height: 70px;
    width: auto;
    justify-content: center;
`;

export const F1_CardPrincipal = styled.View`
    background-color: #37374E;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 15px;
    margin-bottom: -5px;
    padding: 20px;
    border-radius: 15px;
    height: 135px;
    width: auto;
    justify-content: center;
    align-content: space-between;
`;

export const F1_CardTitle = styled.Text`
    color: #FFF;
    font-size: 20px;
    text-align: right;
    margin-right: 15px;
`;

export const F1_GivenName = styled.Text`
    color: #fff;
    font-size: 16px;
    text-align: right;
    margin-bottom: -5px;
    margin-right: 15px;
`;

export const F1_FamilyName = styled.Text`
    color: #FFF;
    font-size: 24px;
    text-align: right;
    margin-right: 15px;
    width: auto;
`;

export const F1_ContainerImg = styled.View`
    
    justify-content: flex-end;
    z-index: 10;
    width: 40%;
`;

export const F1_ImgPiloto = styled.Image`
    height: 127px;
    width: auto;
    margin-top: 18px;
`;

export const F1_ContainerPiloto = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-left: -5px;
`;

export const F1_CardPositionText = styled.Text`
    font-size: 32px;
    color: #FFF;
`;

export const F1_ContainerPoints = styled.View`
    flex: 1;
    justify-content: flex-end;
`;

export const F1_CardPoints = styled.Text`
    background-color: #E6E6FF;
    color: #37374E;
    font-weight: bold;
    width: 60px;
    height: 30px;
    padding: 5px;
    text-align: center;
    border-radius: 6px;
`;

export const F1_CardPointsPrincipal = styled(F1_CardPoints)`
    margin-bottom: 15px;
`;

export const F1_Infos = styled.View`
    align-items: flex-end;
    justify-content: flex-end;
    z-index: 99;
    width: 86.5%;
    position: absolute;
`;

export const F1_Infos2 = styled(F1_Infos)`
    width: 86.5%;
`;