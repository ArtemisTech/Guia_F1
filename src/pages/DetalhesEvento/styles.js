import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

export const F1_Container = styled.View`
    flex: 1;
    justify-content: center;
    background-color: #12121A;
    padding: 15px 10px 15px 10px;
    align-items: center;
`;

export const F1_CardImgCorrida = styled.View`
    background-color: #37374E;
    height: 374px;
    width: 100%;
    justify-content: flex-end;
    border-radius: 15px;
    align-items: center;
`;

export const F1_ImgCorrida = styled.Image.attrs({
    resizeMode: 'contain'
})`
    height: 374px;
    width: 95%;
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
    justify-content: center;
`;

export const F1_NomePais = styled.Text`
    color: #FFF;
    text-align: center;
    font-size: 32px;
`;

export const F1_Bandeira = styled.Image`
    width: 33px;
    height: 24px;
    margin-right: 10px;
    border-radius: 5px;
`;

export const F1_ContainerInfoEvento = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: center;
    padding: 32px 20px 0px 20px;
`;

export const F1_ContainerPais = styled.View`
    width: 100%;
`;

export const F1_Nome = styled.Text`
    color: #FFF;
    font-size: 16px;
    text-align: center;
`;

export const F1_NomeDestaque = styled.Text`
    color: #FFF;
    font-size: 20px;
    text-align: center;
`;

export const F1_CardPosition = styled.View`
    background-color: #37374E;
    height: 494px;
    width: 100%;
    border-radius: 15px;
    margin-top: 30px;
    justify-content: flex-start;
    align-items: center;
    padding: 15px 0;
`;

export const F1_CabecalhoProg = styled.View`
    width: 100%;
    margin-bottom: 25px;
    margin-left: 25px;
`;

export const F1_TextItemDestaque = styled.Text`
    color: #FFF;
    font-size: 20px;
    text-align: left;
`;

export const F1_TextItem = styled.Text`
    color: #FFF;
    font-size: 12px;
    text-align: left;
`;

export const F1_CardEtapas = styled.View`
    background-color: #6D6D84;
    width: 100%;
    height: 70px;
    border-radius: 15px;
    flex-direction: row;
    margin-bottom: 12px;
`;

export const F1_CardData = styled.View`
    background-color: #E00600;
    height: 70px;
    width: 77px;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    align-items: center;
    justify-content: center;
`;

export const F1_DadosCorrida = styled.View`
    margin-left: 15px;
    justify-content: center;
    width: 68%;
`;

export const F1_EtapaText = styled.Text`
    color: #FFF;
    font-size: 20px;
    margin-bottom: 2px;
`;

export const F1_HorarioText = styled.Text`
    color: #FFF;
    font-size: 12px;
`;

export const F1_DiaText = styled.Text`
    color: #FFF;
    font-size: 20px;
    margin-top: -5px;
    margin-bottom: 2px;
`;

export const F1_MesText = styled.Text`
    background-color: #E6E6FF;
    color: #37374E;
    font-size: 16px;
    padding: 0 10px;
    border-radius: 6px;
`;

export const F1_CardInfoExtra = styled.View`
    background-color: #37374E;
    width: 100%;
    height: 86px;
    margin-top: 15px;
    border-radius: 15px;
    padding: 15px;
    align-items: flex-start;
    justify-content: center;
`;

export const F1_CardContainer = styled.View`
    flex-direction: row;
    width: 100%;
    height: 86px;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 15px;
`;

export const F1_CardInfoExtraMenor = styled(F1_CardInfoExtra)`
    height: 70px;
`;

export const F1_TextInfoExtra = styled.Text`
    color: #fff;
    font-size: 12px;
`;

export const F1_TextInfoExtraDestaque = styled.Text`
    color: #FFF;
    font-size: 20px;
`;

export const F1_TextItemDestaqueMaior = styled(F1_TextItemDestaque)`
    font-size: 40px;
`;

export const F1_Linha = styled.View`
    flex-direction: row;
    align-items: flex-end;
    width: 100%;
`;

export const F1_ContainerVoltaRapida = styled.View`
    flex-direction: row;
    width: 100%;
    height: 100%;
    position: absolute;
    justify-content: flex-end;
    margin: 0 15px;
    align-items: center;
`;

export const F1_VoltaRapidaPiloto = styled.View`
    background-color: #E00600;
    height: 43px;
    width: auto;
    border-radius: 6px;
    align-items: flex-end;
    justify-content: center;
    padding: 8px;
`;

export const F1_VoltaRapidaPilotoText = styled.Text`
    color: #fff;
    font-size: 12px;
`;