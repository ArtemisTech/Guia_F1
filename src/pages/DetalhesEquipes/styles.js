import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

export const F1_Container = styled.View`
    flex: 1;
    justify-content: center;
    background-color: #12121A;
    padding: 15px 10px 15px 10px;
    align-items: center;
`;

export const F1_CardImgEquipe = styled.View`
    height: 374px;
    width: 100%;
    justify-content: flex-end;
    border-radius: 15px;
    align-items: center;
`;

export const F1_ImgEquipe = styled.Image`
    height: 374px;
    width: 100%;
    border-radius: 15px;
`;

export const F1_ContainerGradient = styled.View`
    flex: 1;
    justify-content: flex-end;
    width: 100%;
`;

export const F1_Gradient = styled(LinearGradient).attrs({
    colors: ['#FFFFFF00', '#12121A'],
})`
    height: 163px;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
`;

export const F1_ContainerNome = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const F1_NomeEquipe = styled.Text`
    color: #FFF;
    text-align: center;
    font-size: 32px;
`;

export const F1_ImgLogo = styled.Image.attrs({
    resizeMode: 'contain'
})`
    width: 65px;
    height: 40px;
    margin-right: 10px;
    border-radius: 5px;
`;

export const F1_ContainerInfoEquipe = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    padding: 32px 20px 0px 20px;
`;

export const F1_Base = styled.Text`
    color: #FFF;
    font-size: 16px;
`;

export const F1_NomePais = styled.Text`
    color: #FFF;
    font-size: 20px;
`;

export const F1_CardPontos = styled.View`
    background-color: #E00600;
    height: 41px;
    width: auto;
    padding: 0px 10px;
    border-radius: 8px;
    align-items: center;
    justify-content: center;
`;

export const F1_TextPontos = styled.Text`
    color: #FFF;
    font-size: 20px;
`;

export const F1_ContainerPais = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const F1_ImgBandeira = styled.Image`
    width: 30px;
    height: 21px;
    margin-right: 10px;
    border-radius: 4px;
`;

export const F1_CardPosition = styled.View`
    background-color: #37374E;
    height: 86px;
    width: 100%;
    border-radius: 15px;
    margin-top: 30px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px 20px;
`;

export const F1_ConteinerItem = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const F1_TextItemDestaque = styled.Text`
    color: #FFF;
    font-size: 40px;
`;

export const F1_ConteinerTextTitulo = styled.View`
    width: 110px;
`;

export const F1_TextCardTituloDireita = styled.Text`
    color: #FFF;
    font-size: 12px;
    text-align: right;
    margin-right: 15px;
`;

export const F1_TextCardTituloEsquerda = styled(F1_TextCardTituloDireita)`
    text-align: left;
    margin-left: 15px;
`;

export const F1_ContainerDados = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const F1_CardDados = styled.View`
    background-color: #37374E;
    width: 48%;
    height: 260px;
    margin-top: 15px;
    border-radius: 15px;
`;

export const F1_ContainerDadosTitulo = styled.View`
    height: 60px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    justify-content: center;
    align-items: flex-start;
    padding-left: 20px;
`;

export const F1_TextDadosTitulo = styled.Text`
    font-size: 16px;
`;

export const F1_ConteinerItemMultiple = styled(F1_ConteinerItem)`
    margin-top: 14px;
    margin-left: 20px;
`;

export const F1_ContainerCardsPilotos = styled.View`
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    align-items: center;
`;

export const F1_CardImgPiloto = styled.TouchableOpacity`
    height: 215px;
    width: 48%;
    border-radius: 15px;
    margin-top: 15px;
`;

export const F1_ImgPiloto = styled.Image`
    height: 216px;
    width: 100%;
    border-radius: 15px;
`;

export const F1_ContainerGradientPiloto = styled.View`
    flex: 1;
    justify-content: flex-end;
    width: 100%;
`;

export const F1_ContainerNomePiloto = styled.View`
    width: 100%;
    position: absolute;
    top: 180px;
`;

export const F1_NomePiloto = styled.Text`
    color: #FFF;
    text-align: center;
    font-size: 16px;
`;

export const F1_ContainerCar = styled.View`
    align-items: center;
    height: 160px;
    width: 100%;
    margin-top: 15px;
    border-radius: 15px;
    z-index: 80;
`;

export const F1_ImageCar = styled.Image.attrs({
    resizeMode: 'contain'
})`
    width: 100%;
    margin-top: 25px
`;

export const F1_CarEquipeImg = styled.Image.attrs({
    resizeMode: 'contain'
})`
    height: 25px;
    width: 30px;
`;

export const F1_ContainerCarEquipe = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    position: absolute;
    margin-top: 15px;
`;

export const F1_TextCarEquipe = styled.Text`
    font-size: 16px;
    margin-left: 2%;
    margin-right: 20px;
`;

export const F1_CardInfoExtra = styled.View`
    width: 100%;
    height: 136px;
    margin-top: 15px;
    border-radius: 15px;
    padding: 15px;
    justify-content: center;
    align-items: flex-start;
`;

export const F1_TextInfoExtra = styled.Text`
    color: #fff;
    font-size: 12px;
`;

export const F1_TextInfoExtraDestaque = styled.Text`
    color: #FFF;
    font-size: 20px;
`;

export const F1_CardInfoExtraCar = styled.View`
    width: 100%;
    height: 170px;
    margin-top: -30px;
    border-radius: 15px;
    padding: 22px 15px;
    justify-content: flex-end;
    align-items: flex-start;
`;