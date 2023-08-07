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

export const F1_CardPrincipal = styled(F1_Card)`
    height: 135px;
    align-content: space-between;
`;

export const F1_CardTitle = styled.Text`
    color: #FFF;
    font-size: 20px;
    text-align: center;
    margin-right: 15px;
`;

export const F1_CardTitlePrincipal = styled(F1_CardTitle)`
    font-size: 24px;
    margin-right: 0;
`;

export const F1_ContainerImg = styled.View`
    flex: 1;
    justify-content: center;
    align-items: flex-end;
    margin-right: 15px;
`;

export const F1_ImgEquipe = styled.Image.attrs({
    resizeMode: 'contain'
})`
    height: 50px;
    width: 80px;
    margin-bottom: 5px;
`;

export const F1_ContainerTitle = styled.View`
    justify-content: center;
`;

export const F1_ContainerEquipe = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-left: -5px;
`;

export const F1_CardPositionText = styled.Text`
    color: #FFF;
    font-size: 32px;
`;

export const F1_ContainerPoints = styled.View`
    flex: 1;
    justify-content: flex-start;
`;

export const F1_CardPoints = styled.Text`
    background-color: #E6E6FF;
    color: #37374E;
    width: 60px;
    height: 30px;
    padding: 5px;
    text-align: center;
    border-radius: 6px;
    font-weight: bold;
`;

export const F1_CardPointsPrincipal = styled(F1_CardPoints)`
    margin-top: 15px;
`;

export const F1_Infos = styled.View`
    flex: 1;
    align-items: flex-start;
    justify-content: center;
`;

export const F1_Infos2 = styled(F1_Infos)`
    align-items: flex-end;
    width: 170px;
`;