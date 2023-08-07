import styled from 'styled-components/native'
import LinearGradient from 'react-native-linear-gradient';

export const F1_Container = styled.View`
    flex: 1;
`;
export const F1_BtnPrincipal = styled.TouchableOpacity`
    background-color: #E00600;
    align-items: center;
    padding: 15px 0 15px 0;
    margin: 10px 20px 15px 20px;
    border-radius: 15px;
    width: 90%;
    margin-bottom: 20px;
`;

export const F1_TextBtnPrincipal = styled.Text`
    font-size: 14px;
    color: #fff;
`;

export const F1_ContainerTexto = styled.View`
    width: 300px;
    align-items: center;
    margin-top: 10%;
`;

export const F1_Text = styled.Text`
    color: #FFF;
    font-size: 16px;
    text-align: center;
    margin-top: -40px;
`;

export const F1_ContainerImg = styled.View`
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
`;

export const F1_ContainerTela = styled.View`
    height: 100%;
    width: 100%;
    position: absolute;
    align-items: center;
    justify-content: space-between;
`;

export const F1_ContainerGradient = styled.View`
    height: 100%;
    width: 100%;
    justify-content: space-between;
    position: absolute;
`;

export const F1_ImgFundo = styled.Image.attrs({
    resizeMode: 'contain'
})`
    margin-left: 90%;
    height: 105%;
`;

export const F1_Gradient = styled(LinearGradient).attrs({
    colors: ['#FFFFFF00', '#12121A'],
})`
    height: 491px;
    width: 100%
`;

export const F1_Gradient2 = styled(LinearGradient).attrs({
    colors: ['#12121A', '#FFFFFF00'],
})`
    height: 376px;
    width: 100%
`;

export const F1_LogoGF1 = styled.Image.attrs({
    resizeMode: 'contain'
})`
    width: 165px;
`;