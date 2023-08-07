import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

export const F1_Container = styled.View`
    flex: 1;
    background-color: #12121A;
    padding: 10px 10px 15px 10px;
    align-items: center;
`;

export const F1_ContainerJaVotou = styled.View`
    flex: 1;
    background-color: #12121A;
    padding: 10px 10px 15px 10px;
    align-items: center;
    justify-content: center;
`;

export const F1_CardNomeEvento = styled.View`
    background-color: #37374E;
    width: 100%;
    height: 82px;
    border-radius: 15px;
    align-items: center;
    justify-content: center;
`;

export const F1_TextNomeEvento = styled.Text`
    color: #FFF;
    font-size: 16px;
    `;

export const F1_TextNomeEventoDestaque = styled.Text`
    color: #FFF;
    font-size: 20px;
    `;

export const F1_CardPodio = styled.View`
    background-color: #E00600;
    width: 100%;
    height: 140px;
    border-radius: 15px;
    margin-top: 15px;
    align-items: center;
    justify-content: center;
`;

export const F1_ScrollView = styled.ScrollView`
    padding: 10px 10px 15px 10px;
    background-color: #12121A;
`;

export const F1_CardDataVotacao = styled.View`
    background-color: #E00600;
    height: 45px;
    width: 100%;
    border-radius: 15px;
    margin-top: 15px;
    align-items: center;
    justify-content: center;
    flex-direction: row;
`;

export const F1_TextDataVotacao = styled.Text`
    color: #FFF;
    font-size: 14px;
    margin-left: 5px;
`;

export const F1_CardPergunta = styled.View`
    background-color: #37374E;
    width: 100%;
    height: 211px;
    border-radius: 15px;
    margin-top: 15px;
    padding: 15px 0px 15px 15px;
`;

export const F1_CardOpcao = styled.TouchableOpacity`
    height: 125px;
    width: 125px;
    background-color: aliceblue;
    border-radius: 15px;
    margin-right: 10px;
    justify-content: flex-end;
    align-items: center;
`;

export const F1_ImgPiloto = styled.Image`
    height: 125px;
    width: 125px;
    border-radius: 15px;
`;

export const F1_ContainerGradient = styled.View`
    flex: 1;
    justify-content: flex-end;
    width: 125px;
`;

export const F1_Gradient = styled(LinearGradient).attrs({
    colors: ['#FFFFFF00', '#12121A'],
})`
    height: 90px;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
`;

export const F1_TextImgPiloto = styled.Text`
    color: #FFF;
    position: absolute;
    font-size: 12px;
    padding-bottom: 15px;
`;

export const F1_ContainerPergunta = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 15px;
`;

export const F1_CardNumPergunta = styled.View`
    width: 40px;
    height: 40px;
    background-color: #E00600;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
`;

export const F1_TextNumPergunta = styled.Text`
    font-size: 24px;
    color: #FFF;
`;

export const F1_TextPergunta = styled.Text`
    font-size: 16px;
    color: #FFF;
    margin-left: 10px;
`;

export const F1_BtnEnviar = styled.TouchableOpacity`
    background-color: #E00600;
    margin-bottom: 30px;
    margin-top: 15px;
    width: 90%;
    border-radius: 15px;
    align-items: center;
    justify-content: center;
    padding: 17px 20px;
    align-self: center;
`;

export const F1_TextBtnEnviar = styled.Text`
    color: #FFF;
    font-size: 14px;
`;

export const F1_ViewErro = styled.View`
    padding: 10px 10px 15px 10px;
    background-color: #12121A;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const F1_TituloErro = styled.Text`
    color: #FFF;
    font-size: 20px;
    text-align: center;
    margin-top: 30px;
    width: 70%;
`;

export const F1_TextoErro = styled.Text`
    color: #FFF;
    font-size: 16px;
    text-align: center;
    margin-top: 15px;
    width: 70%;
`;