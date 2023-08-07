import React, { useLayoutEffect, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import {
    F1_Container,
    F1_CardImgPiloto,
    F1_ImgPiloto,
    F1_Gradient,
    F1_ContainerGradient,
    F1_NomePiloto,
    F1_ContainerLogo,
    F1_LogoImg,
    F1_ContainerNome,
    F1_Bandeira,
    F1_ContainerInfoPiloto,
    F1_NomePais,
    F1_Pais,
    F1_CardPontos,
    F1_TextPontos,
    F1_CardPosition,
    F1_ConteinerItem,
    F1_ConteinerItemMultiple,
    F1_TextItemDestaque,
    F1_ConteinerTextTitulo,
    F1_TextCardTituloEsquerda,
    F1_TextCardTituloDireita,
    F1_ContainerDados,
    F1_CardDados,
    F1_ContainerDadosTitulo,
    F1_TextDadosTitulo,
    F1_ContainerCar,
    F1_ImageCar,
    F1_CarEquipeImg,
    F1_ContainerCarEquipe,
    F1_TextCarEquipe,
    F1_CardInfoExtra,
    F1_TextInfoExtra,
    F1_TextInfoExtraDestaque,
    F1_CardBio,
    F1_ConteinerBio,
    F1_TituloBio,
    F1_TextBio
} from './styles';

import { useRoute, useNavigation } from "@react-navigation/native";

import api from "../../services/api_F1";
import TraduzirNacionalidade from "../../components/TraduzirNacionalidade";

export default function DetalhesPiloto() {
    const route = useRoute();
    const navigation = useNavigation();
    const [infoPiloto, setInfoPiloto] = useState([]);

    const [givenName, setGivenName] = useState();
    const [familyName, setFamilyName] = useState();
    const [dateOfBirth, setDateOfBirth] = useState();
    const [driverCode, setDriverCode] = useState();
    const [nationality, setNationality] = useState();
    const [permanentNumber, setPermanentNumber] = useState();
    const [driverId, setDriverId] = useState();

    const [points, setPoints] = useState();
    const [position, setPosition] = useState();
    const [wins, setWins] = useState();

    const [constructorId, setConstructorId] = useState();
    const [constructorName, setConstructorName] = useState();
    const [constructorNationality, setConstructorNationality] = useState();

    const [fastestLapCurrent, setFastestLapCurrent] = useState();
    const [fastestLapAllTime, setFastestLapAllTime] = useState();
    const [racesCurrent, setRacesCurrent] = useState();
    const [racesAllTime, setRacesAllTime] = useState();

    const [totalPodios, setTotalPodios] = useState();
    const [totalPodiosCurrent, setTotalPodiosCurrent] = useState();
    const [worldChampion, setWorldChampion] = useState();

    const [infoExtra, setInfoExtra] = useState({});
    const [sourceImgEquipe, setSourceImgEquipe] = useState();
    const [sourceImgFlag, setSourceImgFlag] = useState();
    const [source, setSource] = useState();
    const [sourceImgCar, setSourceImgCar] = useState();
    const [loading, setLoading] = useState(false);
    const [color, setColor] = useState();
    const [colorDadosTitulo, setColorDadosTitulo] = useState();

    const nacionalidadePiloto = <TraduzirNacionalidade data={nationality} />;
    const nacionalidadeEquipe = <TraduzirNacionalidade data={constructorNationality} />;

    async function InfoDriver() {
        const responseDriverStandings = await api.get(`api/f1/current/drivers/${route.params?.DriverId}/driverStandings.json`);

        if (responseDriverStandings.data.MRData !== undefined) {
            const listaInfoDriverStandings = responseDriverStandings.data.MRData.StandingsTable.StandingsLists;
            setInfoPiloto(listaInfoDriverStandings);
            setLoading(false);
        }
        else {
            GetInfoPiloto(route.params?.DriverId);
            setLoading(false);
        }
    };

    async function AllPodiums() {
        const responsePodios1 = await api.get(`api/f1/drivers/${route.params?.DriverId}/results/1.json`);
        const responsePodios2 = await api.get(`api/f1/drivers/${route.params?.DriverId}/results/2.json`);
        const responsePodios3 = await api.get(`api/f1/drivers/${route.params?.DriverId}/results/3.json`);

        if (responsePodios1.data.MRData !== undefined || responsePodios2.data.MRData || responsePodios3.data.MRData) {
            const podios1 = responsePodios1.data.MRData.total;
            const podios2 = responsePodios2.data.MRData.total;
            const podios3 = responsePodios3.data.MRData.total;
            const podiosSum = parseInt(podios1) + parseInt(podios2) + parseInt(podios3);
            setTotalPodios(podiosSum);

        } else {
            GetAllPodiums(route.params?.DriverId);
        }
    };

    async function CurrentPodiums() {
        const responsePodios1Current = await api.get(`api/f1/current/drivers/${route.params?.DriverId}/results/1.json`);
        const responsePodios2Current = await api.get(`api/f1/current/drivers/${route.params?.DriverId}/results/2.json`);
        const responsePodios3Current = await api.get(`api/f1/current/drivers/${route.params?.DriverId}/results/3.json`);

        if (responsePodios1Current.data.MRData !== undefined || responsePodios2Current.data.MRData !== undefined || responsePodios3Current.data.MRData !== undefined) {

            const podios1Current = responsePodios1Current.data.MRData.total;
            const podios2Current = responsePodios2Current.data.MRData.total;
            const podios3Current = responsePodios3Current.data.MRData.total;
            const podiosSumCurrent = parseInt(podios1Current) + parseInt(podios2Current) + parseInt(podios3Current);
            setTotalPodiosCurrent(podiosSumCurrent);

        } else {
            GetCurrentPodiums(route.params?.DriverId);
        }
    };

    async function AllFastestLaps() {
        const responseFastest = await api.get(`api/f1/drivers/${route.params?.DriverId}/fastest/1/results.json`);

        if (responseFastest.data.MRData !== undefined) {
            const fastest = responseFastest.data.MRData.total;
            setFastestLapAllTime(fastest);
        } else {
            GetAllFastestLaps(route.params?.DriverId);
        }
    };

    async function CurrentFastestLaps() {
        const responseFastestCurrent = await api.get(`api/f1/current/drivers/${route.params?.DriverId}/fastest/1/results.json`);

        if (responseFastestCurrent.data.MRData !== undefined) {
            const fastestCurrent = responseFastestCurrent.data.MRData.total;
            setFastestLapCurrent(fastestCurrent);

        } else {
            GetFastastLapCurrent(route.params?.DriverId);
        }
    };

    async function AllRaces() {
        const responseAllRacesAllTime = await api.get(`api/f1/drivers/${route.params?.DriverId}/results.json`);

        if (responseAllRacesAllTime.data.MRData) {
            const allRacesAllTime = responseAllRacesAllTime.data.MRData.total;
            setRacesAllTime(allRacesAllTime);

        } else {
            GetRacesAllTime(route.params?.DriverId);
        }
    };

    async function CurrentRaces() {
        const responseAllRacesCurrent = await api.get(`api/f1/current/drivers/${route.params?.DriverId}/results.json`);

        if (responseAllRacesCurrent.data.MRData !== undefined) {
            const allRacesCurrent = responseAllRacesCurrent.data.MRData.total;
            setRacesCurrent(allRacesCurrent);

        } else {
            GetCurrentRaces(route.params?.DriverId);
        }
    };

    async function WorldChampion() {
        const responseChampion = await api.get(`api/f1/drivers/${route.params?.DriverId}/driverStandings/1.json`);

        if (responseChampion.data.MRData !== undefined) {
            const champion = responseChampion.data.MRData.total;
            setWorldChampion(champion);

        } else {
            GetWorldChampion(route.params?.DriverId);
        }
    };

    function buscarInfoExtra(param) {
        switch (param) {
            case 'hamilton':
                const objHamilton = {
                    localNascimento: "Stevenage, Inglaterra",
                    bio: "'Still I Rise' - estas são as palavras estampadas na parte de trás do capacete de Lewis Hamilton e tatuadas em seus ombros, e desde então aniquilando as expectativas com uma das maiores performances de estreante na história da F1 em 2007, isso é literalmente tudo o que ele fez: subiu para o topo da lista de pole position de todos os tempos à frente de seu herói Ayrton Senna, subiu para o primeiro lugar na coluna de vitórias superando o inimitável Michael Schumacher e então igualou os sete títulos mundiais do lendário alemão.\n\nEle é o G.O.A.T? Poucos negariam que ele está na conversa - e o que é mais importante, ele consegue o que quer, combinando sua velocidade implacável com a recusa em se conformar aos estereótipos de como um piloto de corrida deve pensar, se vestir ou se comportar.\n\nO respeito é conquistado com dificuldade na F1, mas Hamilton – agora Sir Lewis Hamilton para ser mais preciso – o tem de todos os seus colegas. Por quê? Porque eles sabem que qualquer que seja a pista, sejam quais forem as condições, seja qual for a situação, quando o visor dele baixa e as luzes se apagam, é tempo de martelo.",
                };
                return setInfoExtra(objHamilton);
                break;
            case 'max_verstappen':
                const objVerstappen = {
                    localNascimento: "Hasselt, Bélgica",
                    bio: "Ele é Max de nome e max por natureza.\n\nChegando como o mais jovem competidor da Fórmula 1 com apenas 17 anos, Verstappen levou seu carro, seus rivais e os livros de recordes do esporte ao limite. O holandês com cara de bebê e coração de leão levou a Toro Rosso – e depois a Red Bull – pelos chifres com seu estilo de corrida instintivo.\n\nO mais jovem pontuador da F1 logo se tornou o mais jovem vencedor de uma corrida – aos 18 anos e 228 dias – com uma pilotagem oportunista, mas controlada, na estreia pela Red Bull em Barcelona 2016. Um verdadeiro piloto roda a roda, outra pilotagem impressionante no Brasil da parte de trás do pelotão ao pódio em uma traiçoeira pista molhada manteve os aplausos chegando.\n\nA atitude irrestrita de Verstappen e sua defesa difícil às vezes o colocam em maus lençóis com seus colegas e pagadores. Mas os erros que inicialmente estragaram seu potencial deram lugar à maturidade, enquanto as bravatas e a energia que o tornam um talento de sucesso de público permaneceram – e as vitórias continuaram chegando.\n\nEles culminaram em sua primeira coroa de pilotos de F1 após o já lendário confronto final com Lewis Hamilton em 2021. E ele seguiu com uma poderosa defesa do título em 2022, vencendo um recorde de 15 corridas ao longo da temporada.\n\nO filho do ex-piloto de F1, Jos Verstappen, e da superveloz mãe do kart, Sophie Kumpen, corre através de seus genes. Apesar de ter saído da casa do pai para morar em Mônaco, Verstappen permanece próximo à família e, embora não tenha medo de falar o que pensa, ainda pode ser surpreendentemente tímido.\n\nTendo se tornado o primeiro campeão mundial da Holanda com apenas 24 anos, as expectativas para o piloto da próxima geração são altas - mas com Verstappen há uma sensação de que o céu é o limite.",
                };
                return setInfoExtra(objVerstappen);
                break;
            case 'perez':
                const objPerez = {
                    localNascimento: "Guadalajara, México",
                    bio: "Ele é o lutador com um toque suave da terra da Lucha Libre.\n\nA reputação de Perez na F1 foi construída em abordagens opostas às corridas de Grande Prêmio. Por um lado, ele é um combatente enérgico que luta para abrir caminho no pelotão e chegar aos pontos. Sem medo de adicionar um pouco de tempero aos seus encontros na pista, mesmo seus companheiros de equipe nem sempre escapam do calor do mexicano.\n\nPor outro lado, Perez é um operador tranquilo, um mestre em gerenciar pneus para obter desempenho extra e dar a ele vantagem na estratégia. Um firme favorito no grid depois de sua passagem pela Sauber, McLaren, Force India e Racing Point, Perez se tornou um piloto analítico e jogador de equipe.\n\nCompatriota orgulhoso, o pistoleiro de Guadalajara acumulou mais pontos do que qualquer outro mexicano na história da F1. No Sakhir 2020, ele também igualou o herói e compatriota Pedro Rodriguez ao levar a bandeira quadriculada em primeiro lugar - uma performance que lhe rendeu uma vaga no candidato ao título Red Bull.\n\nLá, ele forneceu forte apoio às campanhas de vitórias do campeonato de Max Verstappen em 2021 e 22, também adicionando mais três vitórias à sua própria contagem. Mais vitórias podem não ser garantidas, especialmente com Verstappen como companheiro de equipe, mas Perez trabalhando duro e correndo com o coração sim.",
                };
                return setInfoExtra(objPerez);
                break;
            case 'alonso':
                const objAlonso = {
                    localNascimento: "Oviedo, Espanha",
                    bio: "Michael Schumacher era o rei indiscutível da Fórmula 1 no início dos anos 2000, conquistando vitórias e campeonatos em um ritmo simplesmente inédito na época. Seria preciso alguém muito especial para derrubar a lenda da Ferrari de seu trono – e que foi Fernando Alonso quem fez isso, conta tudo o que você precisa saber sobre o espanhol.\n\nFerozmente competitivo, Alonso não tem vergonha de seu talento, classificando-se como 9/10 “em tudo”, e poucos que o conhecem discordariam, com suas performances na F1 caracterizadas por velocidade alucinante, pensamento tático brilhante, habilidade de corrida exemplar, uma navalha - olho aguçado para os detalhes e uma determinação implacável para vencer.\n\nUm recordista em série em seus primeiros dias, ele foi - ao mesmo tempo - o mais jovem polesitter da F1, vencedor de corrida, campeão mundial e bicampeão mundial enquanto devorava o sucesso com a equipe Renault. Mesmo Alonso não conseguiu continuar essa corrida incrível em sua carreira posterior, falhando em adicionar outro título à sua coleção, apesar das passagens pela McLaren e Ferrari.\n\nMas depois de dois anos longe das corridas de Fórmula 1 – e com duas vitórias em Le Mans no bolso – Alonso voltou com a Alpine em 2021. Com velocidade e determinação inalteradas, ele voltou ao pódio naquele ano, mas frustrado pela baixa confiabilidade – e o falta de um contrato de longo prazo - na temporada seguinte, ele optou por abandonar o navio mais uma vez.\n\nAgora Alonso espera que a Aston Martin seja a equipe com a qual ele finalmente retornará às vitórias, já que tem negócios inacabados com a F1…",
                };
                return setInfoExtra(objAlonso);
                break;
            case 'sainz':
                const objSainz = {
                    localNascimento: "Madri, Espanha",
                    bio: "Ele é o matador da realeza das corridas de Madrid.\n\nDepois de entrar no Bull Ring da F1 ao lado de Max Verstappen na Toro Rosso em 2015, Sainz rapidamente mostrou seu espírito de luta. Um piloto tenaz, ele coloca o carro no limite enquanto abre caminho pelo pelotão. Não é à toa que Sainz ganhou o apelido de Chilli.\n\nMas o espanhol é tão inteligente quanto instintivo, pensando em seu caminho durante a corrida e nos pontos. Este temperamento calmo o segue fora da pista, onde ele permanece imperturbável pelas pressões de forjar uma carreira de Grande Prêmio com um nome famoso.\n\nSainz é filho do bicampeão mundial de rali, também seu homônimo, e trouxe algumas das habilidades de pilotagem do pai para o circuito de F1 – júnior adora uma deliciosa dose de drift.\n\nDepois de seguir as pegadas de seu famoso pai, Sainz teve grandes chuteiras para preencher - primeiro na McLaren, onde substituiu seu herói de infância Fernando Alonso, e agora na Ferrari, no lugar que pertencia a Sebastian Vettel.\n\nNunca é fácil viver na sombra de gigantes do esporte, mas Sainz mostrou determinação e disposição para lidar com isso e, em 2022, conquistou sua primeira vitória na F1 com a vitória em Silverstone. Vamos!",
                };
                return setInfoExtra(objSainz);
                break;
            case 'russell':
                const objRussell = {
                    localNascimento: "King's Lynn, Inglaterra",
                    bio: "Ele é o piloto com o lema: “Na dúvida, vá direto”.\n\nGeorge Russell viveu isso ao longo de sua carreira na F1 até o momento, superando o experiente companheiro de equipe Robert Kubica em todos os 21 Grandes Prêmios em sua temporada de estreia, colocando Williams de volta ao pódio em 2021 e conquistando sua primeira vitória com a Mercedes em 2022.\n\nEssa velocidade de linha de base brilhante serviu bem a Russell enquanto ele somava títulos em seu caminho para a Fórmula 1. O britânico invadiu o campeonato GP3 de 2017 e conquistou a coroa da Fórmula 2 de 2018 sob imensa pressão.\n\nIdentificando seu potencial, a Mercedes, campeã mundial, decidiu contratá-lo para seu programa júnior em 2017, quando Russell já tinha um contrato com a DTM na mesa. Ele acumulou mais experiência com sessões de treinos com a Force India e testes para o Silver Arrows, antes de pousar em sua corrida Williams com motor Mercedes.\n\nA recusa em ceder terreno para seus rivais - e o compromisso com um passe complicado - sustenta a mentalidade vencedora de Russell. E foi isso que o levou a ser convocado para substituir Lewis Hamilton em uma aparição única na Mercedes para o Sakhir 2020, quando o atual campeão foi atingido pelo Covid-19.\n\nEssa virada de estrela viu Russell perder a pole por apenas 0,026s e depois ultrapassar o forte da Mercedes, Valtteri Bottas. Apenas um pit stop estragado e um furo no final do coração impediram uma quase certa vitória inaugural para o super-sub em ascensão.\n\nEle manteve a cabeça baixa na Williams em 2021, marcando seus primeiros pontos e pódio, sempre de olho no prêmio maior. Tendo se mostrado um trabalhador esforçado e um talento tenaz, esse prêmio chegou na forma de uma chance de enfrentar o compatriota e heptacampeão Hamilton em máquinas idênticas.\n\nFoi uma oportunidade que Russell aproveitou, ao conquistar sua primeira vitória na F1 – e a única vitória da Mercedes em 2022 – no Brasil, rumo ao quarto lugar no campeonato de pilotos, duas posições e 35 pontos à frente de seu ilustre companheiro de equipe.\n\nSe os Silver Arrows puderem produzir um carro verdadeiramente competitivo para 2023, uma oferta pelo título certamente acena. Um grande desafio, mas, como sempre, ‘Russell the Rocket’ vai bombar.",
                };
                return setInfoExtra(objRussell);
                break;
            case 'leclerc':
                const objLeclerc = {
                    localNascimento: "Monte Carlo, Mônaco",
                    bio: "Nascido no idílio mediterrâneo de Mônaco, Leclerc chegou à F1 em uma onda de expectativa.\n\nPraticamente incomparável em seu caminho para as coroas da GP3 e da Fórmula 2, ele exibiu uma deslumbrante variedade de habilidades, desde pole position escaldantes, conquistando vitórias - mesmo quando seu carro pegou fogo duas vezes em Silverstone - até a habilidade de abrir caminho no pelotão. Vencer campeonatos consecutivos também ensinou Leclerc a lidar com a pressão, outra ferramenta útil no grande lago das corridas de Fórmula 1.\n\nSubindo para a F1 em 2018, Leclerc mostrou flashes de ritmo balístico aos sábados e brilhantismo nas corridas aos domingos, arrastando sua Sauber além de seus limites - e ganhando uma vaga na Ferrari para 2019 que o dinheiro não pode comprar, entrando no lugar do último campeão mundial da Scuderia, Kimi Raikkonen.\n\nLá ele imediatamente colocou o gato entre os pombos proverbiais, sem medo de ir roda a roda com o número um estabelecido, Sebastian Vettel. Uma vitória inaugural da F1 em Spa foi seguida por outra uma semana depois no sagrado território da Ferrari em Monza. O tifosi encontrou outro novo herói - que se tornou o primeiro homem a superar Vettel em uma temporada com a Scuderia, feito que ele repetiu de forma esmagadora no ano seguinte.\n\nAs temporadas de 2020 e 21 renderam poucos frutos para a Ferrari, mas Leclerc manteve sua determinação de emergir como um verdadeiro candidato ao título em 2022. Com três vitórias, 11 pódios e nove pole position, ele foi o único homem capaz de lutar consistentemente pelo título. Max Verstappen.\n\nFora do carro, Leclerc é modesto e atencioso - mas ele está em sua própria missão pessoal. Este empolgante jovem talento está correndo para seu falecido pai Herve e seu amigo e mentor Jules Bianchi, o piloto de F1 que morreu em 2015.\n\nPelas evidências até agora, ele está deixando os dois orgulhosos.",
                };
                return setInfoExtra(objLeclerc);
                break;
            case 'stroll':
                const objStroll = {
                    localNascimento: "Montreal, Canadá",
                    bio: "Não existe muito cedo para Stroll, uma sensação adolescente com predileção por clima úmido. Um dos garotos legais do grid, Stroll foi revelado logo após seu aniversário de 18 anos por Williams - antes de terminar o ensino médio e obter sua carteira de motorista.\n\nStroll quis dizer negócios em sua temporada de estreia em 2017, estabelecendo recordes no caminho. Um piloto oportunista, ele subiu ao pódio em Baku, o estreante mais jovem a fazê-lo. Como filho de um empresário rico, Stroll está acostumado a um estilo de vida com champanhe, mas agora ele sabe que a efervescência tem um sabor ainda mais doce na tribuna. Então, em Monza, ele dominou as chuvas para se tornar o piloto mais jovem da história a alinhar na primeira linha.\n\nIniciante obstinado, o canadense adora ganhar posições na primeira volta e brigar pelos pontos. Stroll tem potencial para ser um elemento de longo prazo na Fórmula 1 – como amplamente ilustrado por uma pole inaugural e outros dois pódios em 2020.\n\nIsso aconteceu depois que seu pai Lawrence liderou o consórcio que assumiu a Force India no meio da temporada de 2018 e a transformou de Racing Point em Aston Martin em 2021. O futuro parece brilhante para a equipe e seu jovem piloto - e mesmo que seja chove, então Stroll pode continuar dirigindo na ponta do pelotão.",
                };
                return setInfoExtra(objStroll);
                break;
            case 'norris':
                const objNorris = {
                    localNascimento: "Bristol, Inglaterra",
                    bio: "Lando Norris pode não ter o nome do rebelde de Star Wars Lando Calrissian - sua mãe apenas gostava do apelido - mas ele tem talento e espírito de luta em abundância.\n\nA McLaren teve o adolescente britânico em seus livros por dois anos antes de colocá-lo rapidamente na galáxia de estrelas da F1 em 2019. Um fogo de artifício em sua carreira júnior, com uma queda por pole position e disputas roda a roda, Norris não os deixou para baixo.\n\nEmparelhado com o altamente cotado - e muito mais experiente - Carlos Sainz, sua temporada de estreia foi impressionante, com Norris superando o espanhol em sua batalha de qualificação frente a frente, marcando pontos 11 vezes e perdendo por pouco um dos 10 primeiros na colocação do campeonato.\n\nUm pódio inaugural veio em 2020, com mais seguidores nas duas temporadas subsequentes – ele perdeu por pouco uma vitória na Rússia 2021 – ao dominar outro companheiro de equipe mais experiente, Daniel Ricciardo, para se estabelecer firmemente na primeira divisão da F1.\n\nUm talento emocionante na pista, longe disso, Norris transborda com um charme modesto e um lado artístico o vê projetar e pintar seu próprio equipamento de corrida como um hobby. O foco para o futuro é aliar arte e ambição na pista, já que a McLaren conta com a promessa da juventude para levá-los de volta ao topo.\n\nNorris espera que o downforce esteja com ele…",
                };
                return setInfoExtra(objNorris);
                break;
            case 'gasly':
                const objGasly = {
                    localNascimento: "Ruão, França",
                    bio: "Se há um homem que sabe o quão grande pode ser uma montanha-russa na carreira de um piloto de F1, é Pierre Gasly!\n\nO voador francês foi convocado para estrear em 2017 na Malásia no lugar de Daniil Kvyat e, após provar sua garra, foi nomeado piloto da Toro Rosso no ano seguinte. Depois de mais 21 corridas em sua carreira incipiente, Gasly foi promovido novamente - desta vez para substituir o figurão da Red Bull, Daniel Ricciardo.\n\nGasly parecia ter o dom de estar no lugar certo na hora certa – uma qualidade que é igualmente útil na pista. Uma série de desempenhos impressionantes em 2018 para a Toro Rosso – incluindo um brilhante quarto lugar no Bahrein – mostrou uma promessa empolgante para o que ele pode fazer com a equipe ‘A’ em 2019.\n\nInfelizmente, essa promessa apareceu apenas em flashes - e ele rapidamente sofreu comparações desfavoráveis com o companheiro de equipe Max Verstappen. Tanto que, após as férias de verão, ele foi enviado de volta para a Toro Rosso, com outro jovem promissor - Alex Albon - recebendo uma chance no assento 'sênior' da Red Bull.\n\nMas Gasly se recuperou, como só Gasly pode. Nas nove corridas restantes da temporada, ele marcou quase tantos pontos quanto o companheiro de equipe Kvyat conseguiu durante todo o ano - e garantiu seu melhor resultado de corrida com o P2 no Brasil. Essa trajetória continuou em 2020, culminando com uma emocionante vitória inaugural na rebatizada corrida caseira da equipe AlphaTauri na Itália, e não diminuiu em 2021, quando ele voltou ao pódio e marcou 110 dos 142 pontos do time.\n\nQuando o ímpeto do AlphaTauri estagnou em 2022, Gasly decidiu que era hora de uma mudança – na forma da equipe francesa Alpine, com o compatriota francês – e antigo adversário – Esteban Ocon como companheiro de equipe. A questão agora é se ele pode recuperar o ímpeto e conseguir outra chance no grande momento da F1…",
                };
                return setInfoExtra(objGasly);
                break;
            case 'hulkenberg':
                const objHulkenberg = {
                    localNascimento: "Emmerich am Rhein, Alemanha",
                    bio: "Ele é o super-herói com talento para se tornar uma superestrela das corridas - se ao menos pudesse exercitar seus músculos com uma equipe de ponta. O 'Hulk' da F1 mostrou força e resistência incríveis como meio-campo saqueador da Williams, Force India, Sauber, Renault, Racing Point e Aston Martin durante uma carreira que remonta a 2010 - e agora ele está de volta ao grid com a Haas.\n\nNaquela temporada de estreia, Hulkenberg dominou as mudanças nas condições da pista para conseguir uma brilhante pole position no Brasil, mostrando que tinha cérebro e força. Desde então, sua capacidade de acumular pontos de forma consistente o tornou um jogador de equipe altamente valorizado. Em 2015, sua reputação cresceu mais uma vez quando, em um fim de semana longe de seu trabalho diário, ele venceu a clássica corrida de 24 Horas de Le Mans pela Porsche na primeira vez que pediu.\n\nO alter ego off-track de Hulkenberg é pé no chão – ele é o tipo de piloto que segura seu próprio guarda-chuva quando está chovendo no caminho para o grid – com um senso de humor atrevido. Quando ele alcançou o recorde indesejado de mais corridas sem terminar no pódio, ele riu disso como o início da 'era Hulkenberg'.\n\nFelizmente, mesmo depois de ser dispensado pela Renault no final de 2019, a era do popular alemão continuou com algumas unidades substitutas (e destacadas) em 2020 e 2022 e, dada a oportunidade, o 'Hulk' agora tem outra chance de definir o registro reto.",
                };
                return setInfoExtra(objHulkenberg);
                break;
            case 'ocon':
                const objOcon = {
                    localNascimento: "Évreux, Normandia",
                    bio: "Se há uma palavra que domina a carreira de Esteban Ocon é ‘sacrifício’.\n\nQuando ele era apenas um kartista promissor, os pais de Ocon venderam a casa, suspenderam o emprego e começaram uma vida na estrada, morando em um trailer e viajando de circuito em circuito para apoiar a carreira florescente do filho.\n\nSacrifício, veja - mas funcionou. O ano de 2014 viu Ocon se destacar no mundo dos monolugares, ao vencer um certo Max Verstappen para o título europeu de F3. Apoiado pela Mercedes, ele conquistou o título da GP3 no ano seguinte e estava no meio de uma temporada do DTM em 2016, quando teve a chance de substituir Rio Haryanto na equipe minnow Manor a partir do Grande Prêmio da Bélgica.\n\nEssa oportunidade levou a um assento em tempo integral no ano seguinte com a Force India, onde seus duelos roda a roda com o companheiro de equipe altamente cotado Sergio Perez rapidamente o marcaram como uma estrela em ascensão. Mas quando Lawrence Stroll, pai do piloto Lance, interveio no meio de 2018 para garantir o futuro financeiro da equipe, a escrita estava na parede para Ocon, que foi afastado no final do ano para permitir que Stroll Jnr viesse da Williams.\n\nOcon esperou seu tempo, porém, e depois de um ano afastado como piloto reserva da Mercedes, ele encontrou seu caminho de volta para uma vaga de corrida para 2020 com a Renault, que se tornou Alpine para 2021 - quando sua espera finalmente valeu a pena, como ele marcou sua – e da famosa marca francesa – primeira vitória na F1.\n\nNada na carreira de automobilismo de Ocon foi fácil - mas se Ocon conseguiu retornar ao grid da F1 e subir ao pódio, é por meio de uma combinação de autoconfiança, determinação e talento que está ao lado dos melhores.",
                };
                return setInfoExtra(objOcon);
                break;
            case 'bottas':
                const objBottas = {
                    localNascimento: "Nastola, Finlândia",
                    bio: "Aprendendo seu ofício nas estradas finlandesas de gelo e neve, ele nasceu para ser um piloto de Grande Prêmio.\n\nBottas explica que, se você pode dirigir nas estradas congeladas de sua terra natal, pode dirigir em qualquer lugar. Depois, há a mentalidade finlandesa - reservada, diligente e calma, a pista rápida da F1 não o incomoda.\n\nFazendo sua estreia na F1 com a Williams em 2013, Bottas logo se tornou parte da família. Pontos e pódios se seguiram com o piloto confiável, mesmo acumulando mais pontos sem vencer, um recorde do qual ele se ressentiu, mas que mostrou sua habilidade. O fato de o finlandês ser uma máquina de pontos fez com que ele fosse repentinamente promovido ao lugar mais cobiçado da F1 - o lugar vago de Nico Rosberg para vencer o campeonato na Mercedes.\n\nBottas floresceu no Silver Arrows em 2017, liberando seu ritmo para marcar pole position e vitórias pessoais, bem como um campeonato de equipes para a famosa marca Mercedes ao lado de Lewis Hamilton. Ele até empatou com Hamilton e Sebastian Vettel com 13 pódios.\n\nPara um cara tímido, isso trouxe um impulso de confiança e uma nova arrogância - embora de uma forma finlandesa muito reticente. Ele precisaria de toda essa confiança em 2018 – uma temporada que Bottas descreveu como sua pior na F1, já que ele conquistou zero vitórias contra 11 de Hamilton.\n\nBottas subiu de nível em 2019, quatro vitórias garantindo um convincente segundo lugar no campeonato atrás de Hamilton, mas caiu para duas vitórias contra as 11 de seu companheiro de equipe em 2020 e apenas uma em 2021, levando a Mercedes a dispensá-lo após cinco temporadas.\n\nEm 2022, ele iniciou um novo capítulo em sua carreira na F1, substituindo o compatriota Kimi Raikkonen para liderar uma nova formação na Alfa Romeo e levando o estreante chinês Zhou Guanyu sob sua proteção.",
                };
                return setInfoExtra(objBottas);
                break;
            case 'piastri':
                const objPiastri = {
                    localNascimento: "Melbourne, Victoria",
                    bio: "Nascido em Melbourne, a poucos passos de distância do local do Grande Prêmio da Austrália, os sonhos de um jovem Oscar Piastri de um dia correr na Fórmula 1 foram inflamados pelos pilotos famosos do esporte rugindo pelas ruas locais, também conhecidas como Albert Park.\n\nMas seria preciso muito empenho e sacrifício para transformar esse sonho em realidade, com uma mudança para a Europa - feita por compatriotas como Mark Webber e Daniel Ricciardo antes dele - a única maneira de enfrentar os melhores e chamar a atenção dos tomadores de decisão do esporte.\n\nUsando o sucesso no cenário do kart australiano como trampolim, Piastri continuou a aprender o ofício em campeonatos em toda a Europa, antes de experimentar pela primeira vez a competição de monolugares aos 15 anos de idade - dois pódios na F4 UAE um sinal de coisas vir.\n\nA partir daí, o sucesso fluiu. Vice-campeão britânico da F4. Campeão da Fórmula Renault. Campeão da F3. Campeão da F2 (por mais de 50 pontos). Piastri não simplesmente subiu a escada do monolugar júnior, ele subiu para bater com força na porta da F1.\n\nTão impressionante foi Piastri que duas equipes de F1 brigaram por seus serviços para 2023, adicionando uma nova dimensão ao mercado de pilotos e à chamada “temporada boba”.\n\nApós uma reunião do Conselho de Reconhecimento de Contratos, foi confirmado que era a McLaren, e não os patrocinadores de longa data da Alpine, que tinha direito aos serviços de Piastri, e com quem o jovem de 21 anos deve realizar seu sonho na F1.",
                };
                return setInfoExtra(objPiastri);
                break;
            case 'zhou':
                const objZhou = {
                    localNascimento: "Xangai, China",
                    bio: "A China nunca teve um titular de Grande Prêmio entre seus cidadãos – mas Zhou Guanyu é o piloto encarregado de mudar esse estado de coisas, depois de receber a convocação para fazer sua estreia na F1 pela Alfa Romeo em 2022.\n\nO piloto nascido em Xangai participou do Grande Prêmio inaugural de sua cidade natal em 2004 aos cinco anos de idade, torcendo por seu herói Fernando Alonso. Mas, tendo contraído o vírus das corridas, o piloto chinês estabeleceu a meta ambiciosa de se tornar o primeiro piloto de F1 de seu país – alcançando um feito que Ma Qinghua, o único outro piloto chinês a participar de um fim de semana de Fórmula 1, nunca conseguiu.\n\nMostrando ousadia e dedicação, Zhou colocou seu plano em ação ao se mudar para a Inglaterra com sua família com apenas 12 anos para perseguir suas ambições no automobilismo. Um segundo lugar no campeonato italiano de F4 de 2015 provou que Zhou tinha as coisas certas – um fato já observado pela Ferrari, que o contratou para sua academia de pilotos um ano antes.\n\nA mudança para a academia da Renault em 2019 coincidiu com sua estreia na Fórmula 2, com Zhou ganhando confiança na categoria por meio de várias vitórias e pole position em três temporadas, o que o levou a disputar o título de pilotos em 2021.\n\nIsso foi o suficiente para convencer o chefe da equipe Alfa Romeo, Fred Vasseur, a colocar sua fé em Zhou para 2022 e colocá-lo ao lado do ex-piloto da Mercedes Valtteri Bottas - permitindo que Zhou realizasse seu sonho de correr na F1 e até mesmo para ver como ele se sai contra seus próprio herói de infância, Fernando Alonso.",
                };
                return setInfoExtra(objZhou);
                break;
            case 'tsunoda':
                const objTsunoda = {
                    localNascimento: "Sagamihara, Japão",
                    bio: "Em toda a história da Fórmula 1, nenhum piloto japonês jamais ganhou um Grande Prêmio do Campeonato Mundial. Yuki Tsunoda poderia ser o primeiro? A Red Bull certamente pensa assim, com o jovem no caminho para sua equipe principal, se continuar a impressionar como tem feito nos últimos anos.\n\nA ascensão de Tsunoda ao topo do automobilismo foi surpreendentemente rápida: ele passou das corridas na F4 japonesa para uma vaga na Fórmula 1 com a AlphaTauri em pouco mais de três anos, tendo chegado à Europa em 2019 sem conhecimento dos circuitos.\n\nMas depois de um início lento na F3, seguido por uma campanha de estreia extremamente impressionante na F2, que o viu terminar em terceiro no campeonato e conquistar três vitórias ao longo do caminho, Tsunoda provou que tinha a velocidade e a habilidade de corrida para forçar seu caminho para o grade F1.\n\nEle pode não ter se adaptado às corridas de Grande Prêmio tão rapidamente quanto à F2, mas com o tempo ele ainda pode se encontrar lutando no final muito afiado em um Red Bull.",
                };
                return setInfoExtra(objTsunoda);
                break;
            case 'kevin_magnussen':
                const objMagnussen = {
                    localNascimento: "Roskilde, Dinamarca",
                    bio: "Chame-o de cavaleiro solitário ou independente, mas Magnussen está de volta à Fórmula 1 por um único motivo: correr.\n\nEle pode ser um piloto de F1 de segunda geração - seguindo seu pai, Jan, no grid - mas os ídolos de Magnussen são da 'era de ouro' das corridas de Grande Prêmio, quando nomes como Juan Manuel Fangio e Stirling Moss arriscaram tudo pelo amor do esporte.\n\nA própria proeza do piloto de Roskilde foi comprovada na estreia pela McLaren, que o guiou nas categorias de juniores, quando ele cruzou para os três primeiros no Grande Prêmio da Austrália de 2014, tornando-se o primeiro dinamarquês a reivindicar um pódio na F1.\n\nOutros momentos de champanhe foram mais difíceis de encontrar, já que ele deixou a McLaren para trás por uma temporada com a Renault, antes de se contentar com quatro entre espíritos afins na Haas. E depois de um ano nos Estados Unidos, competindo na Indy e em carros esportivos, entre outras coisas, ele voltou para a equipe dos EUA em 2022, garantindo sua primeira pole position no Grande Prêmio do Brasil.\n\nSuas manobras carnudas e abordagem de cotoveladas lhe renderam uma reputação de bad boy na pista, algo que ainda o deixa perplexo. Fora do carro, Magnussen é descontraído e afável. Afinal, ele tem o emprego dos seus sonhos – e está aqui apenas para competir.",
                };
                return setInfoExtra(objMagnussen);
                break;
            case 'albon':
                const objAlbon = {
                    localNascimento: "Londres, Inglaterra",
                    bio: "Nascido em Londres, mas correndo sob a bandeira da Tailândia, a primeira palavra de Alexander Albon foi na verdade italiana. Essa palavra era Ferrari - embora tenha sido com outra equipe italiana que ele conseguiu sua grande chance na F1.\n\nIdolatrando Michael Schumacher e sonhando em um dia correr na Fórmula 1, o júnior Albon foi derrotado pelo título da GP3 de 2016 por um certo Charles Leclerc. Ele então deixou sua grande amizade com George Russell na pista ao levar a luta pelo título da Fórmula 2 de 2018 até o fim.\n\nGraduando-se na grande liga da F1 junto com outro contemporâneo – Lando Norris – em 2019, Albon fez sua palestra na pista com a Toro Rosso nas corridas de abertura, ganhando uma promoção no meio da temporada para a Red Bull Racing.\n\nUm elegante ultrapassador com uma mentalidade de campeonato, Albon não se intimidou ao fazer parceria com Max Verstappen na segunda metade de sua temporada de estreia, terminando entre os seis primeiros em oito de suas nove corridas de 2019 com a Red Bull.\n\nManter contato com o futuro campeão foi mais difícil em 2020 e a Red Bull o retirou de sua escalação de corrida. Crucialmente, porém, Albon foi mantido como piloto de teste e reserva, mantendo-o no radar dos chefes de equipe, levando ao seu retorno em 2022 ao grid com a Williams.\n\nDescontraído e alegre com um sorriso atrevido, o piloto tailandês é popular entre seus pares – nem sempre fácil no caldeirão de competição do automobilismo – mas você não consegue sucesso na Fórmula 1 sendo popular. O desafio de Albon agora é grande – aproveitar ao máximo uma rara segunda oportunidade na F1.",
                };
                return setInfoExtra(objAlbon);
                break;
            case 'sargeant':
                const objSargeant = {
                    localNascimento: "Fort Lauderdale, Flórida",
                    bio: "Logan Sargeant se torna o primeiro piloto americano da F1 em quase oito anos ao entrar no grid para a temporada de 2023, dando ao país um favorito da casa para torcer mais uma vez.\n\nUm prolífico vencedor do título no kart, a glória do campeonato iludiu Sargeant depois que ele fez a transição para as corridas de monolugares, mas as pole position e as vitórias em quase todas as categorias que disputou sublinharam sua velocidade e potencial brutos.\n\nDe facto, o vice-campeonato na F4 Emirados Árabes Unidos, terceiro na F4 britânica e terceiro na F3 (tendo também subido ao pódio no prestigioso Grande Prémio de Macau) mostrou que pode estar lá ou perto de vários campeonatos, com muito potencial ainda para ser inexplorado.\n\nTambém convenceu a Williams a adicionar o jovem aos seus livros quando ele alcançou a F2, onde mais vitórias e outra classificação entre os três primeiros em 2022 garantiram os pontos da Superlicença necessários para completar a jornada e passar para a F1 com a equipe Grove em 2023.\n\nDesde o quinteto de aparições de Alexander Rossi com os backmarkers Manor no final da temporada de 2015, um americano não apareceu no grid da F1, e Sargeant está ansioso para mudar isso em sua primeira temporada.\n\nE com três corridas a serem realizadas nos EUA em 2023 – viagens para Miami, Austin e Las Vegas todas planejadas – a mais recente estrela da F1 da América será estimulada por bastante apoio doméstico durante sua campanha de estreia.",
                };
                return setInfoExtra(objSargeant);
                break;
            case 'de_vries':
                const objDevries = {
                    localNascimento: "Uitwellingerga, Holanda",
                    bio: "Nyck de Vries teve que esperar até os 27 anos para tentar correr na F1, mas foi uma oportunidade que o holandês agarrou com as duas mãos para se tornar uma das opções mais quentes do mercado de pilotos e, finalmente, conseguir um contrato em tempo integral. com AlphaTauri.\n\nBem versado em máquinas de F1 graças ao seu papel de reserva na Mercedes, que incluiu várias corridas de FP1 para as equipes de trabalho e fornecedores em carros com especificações de 2022, De Vries se encaixou perfeitamente quando Williams o chamou inesperadamente para substituir o indisposto Alex Albon no 2022 Grande Prêmio da Itália.\n\nAbraçando a pressão do momento, De Vries se classificou e superou o piloto regular Nicholas Latifi para levar a bandeira quadriculada em um nono lugar altamente impressionante, adicionando dois pontos valiosos à contagem de Williams e recebendo muitos elogios.\n\nO desempenho consolidou as opiniões de muitos no paddock da F1, incluindo Toto Wolff, que viu De Vries conquistar o título da Fórmula E com a Mercedes na temporada 2020-21, somando-se a um armário de troféus que também inclui títulos da F2 e da Fórmula Renault.\n\nDepois que o telefone de De Vries parou de tocar após Monza, foi AlphaTauri quem venceu a batalha para garantir seus serviços – o conselheiro da Red Bull, Helmut Marko, passou dois dias conversando e jantando com De Vries na Áustria por sugestão do compatriota Max Verstappen.\n\nUm estreante na F1 mais velho do que muitos antes dele, De Vries buscará combinar a experiência extra que ganhou ao longo dos anos com seu ritmo inquestionável e garantir que o esporte se torne o lar da fase de pico de sua carreira no automobilismo.",
                };
                return setInfoExtra(objDevries);
                break;
            default:
                const objDefault = {
                    localNascimento: param,
                    bio: param
                }
                return setInfoExtra(objDefault);
        }
    };

    function getImgEquipe(constructorId) {
        switch (constructorId) {
            case "alfa":
                return setSourceImgEquipe(require('../../assets/logoEquipes/alfa.png'));
                break;
            case "alphatauri":
                return setSourceImgEquipe(require('../../assets/logoEquipes/alphatauri.png'));
                break;
            case "alpine":
                return setSourceImgEquipe(require('../../assets/logoEquipes/alpine.png'));
                break;
            case "aston_martin":
                return setSourceImgEquipe(require('../../assets/logoEquipes/aston_martin.png'));
                break;
            case "ferrari":
                return setSourceImgEquipe(require('../../assets/logoEquipes/ferrari.png'));
                break;
            case "haas":
                return setSourceImgEquipe(require('../../assets/logoEquipes/haas.png'));
                break;
            case "mclaren":
                return setSourceImgEquipe(require('../../assets/logoEquipes/mclaren.png'));
                break;
            case "mercedes":
                return setSourceImgEquipe(require('../../assets/logoEquipes/mercedes.png'));
                break;
            case "red_bull":
                return setSourceImgEquipe(require('../../assets/logoEquipes/red_bull.png'));
                break;
            case "williams":
                return setSourceImgEquipe(require('../../assets/logoEquipes/williams.png'));
                break;
            default:
                return setSourceImgEquipe(require('../../assets/forbidden.png'));
                break;
        }
    };

    function getImgCountry(nationality) {
        switch (nationality) {
            case "American":
                return setSourceImgFlag(require('../../assets/flags/USA.png'));
                break;
            case "Australian":
                return setSourceImgFlag(require('../../assets/flags/Australia.png'));
                break;
            case "Austrian":
                return setSourceImgFlag(require('../../assets/flags/Austria.png'));
                break;
            case "British":
                return setSourceImgFlag(require('../../assets/flags/UK.png'));
                break;
            case "Canadian":
                return setSourceImgFlag(require('../../assets/flags/Canada.png'));
                break;
            case "Chinese":
                return setSourceImgFlag(require('../../assets/flags/China.png'));
                break;
            case "Danish":
                return setSourceImgFlag(require('../../assets/flags/Denmark.png'));
                break;
            case "Dutch":
                return setSourceImgFlag(require('../../assets/flags/Netherlands.png'));
                break;
            case "Finnish":
                return setSourceImgFlag(require('../../assets/flags/Finland.png'));
                break;
            case "French":
                return setSourceImgFlag(require('../../assets/flags/France.png'));
                break;
            case "German":
                return setSourceImgFlag(require('../../assets/flags/Germany.png'));
                break;
            case "Italian":
                return setSourceImgFlag(require('../../assets/flags/Italy.png'));
                break;
            case "Japanese":
                return setSourceImgFlag(require('../../assets/flags/Japan.png'));
                break;
            case "Mexican":
                return setSourceImgFlag(require('../../assets/flags/Mexico.png'));
                break;
            case "Monegasque":
                return setSourceImgFlag(require('../../assets/flags/Monaco.png'));
                break;
            case "Spanish":
                return setSourceImgFlag(require('../../assets/flags/Spain.png'));
                break;
            case "Swiss":
                return setSourceImgFlag(require('../../assets/flags/Switzerland.png'));
                break;
            case "Thai":
                return setSourceImgFlag(require('../../assets/flags/Thailand.png'));
                break;
            default:
                return setSourceImgFlag(require('../../assets/forbidden.png'));
                break;
        }
    };

    function getSourceImg(driverId) {
        switch (driverId) {
            case "max_verstappen":
                return setSource(require('../../assets/imgPilotos/max_verstappen.png'));
                break;
            case "perez":
                return setSource(require('../../assets/imgPilotos/perez.png'));
                break;
            case "alonso":
                return setSource(require('../../assets/imgPilotos/alonso.png'));
                break;
            case "hamilton":
                return setSource(require('../../assets/imgPilotos/hamilton.png'));
                break;
            case "russell":
                return setSource(require('../../assets/imgPilotos/russell.png'));
                break;
            case "sainz":
                return setSource(require('../../assets/imgPilotos/sainz.png'));
                break;
            case "leclerc":
                return setSource(require('../../assets/imgPilotos/leclerc.png'));
                break;
            case "stroll":
                return setSource(require('../../assets/imgPilotos/stroll.png'));
                break;
            case "ocon":
                return setSource(require('../../assets/imgPilotos/ocon.png'));
                break;
            case "gasly":
                return setSource(require('../../assets/imgPilotos/gasly.png'));
                break;
            case "norris":
                return setSource(require('../../assets/imgPilotos/norris.png'));
                break;
            case "hulkenberg":
                return setSource(require('../../assets/imgPilotos/hulkenberg.png'));
                break;
            case "piastri":
                return setSource(require('../../assets/imgPilotos/piastri.png'));
                break;
            case "bottas":
                return setSource(require('../../assets/imgPilotos/bottas.png'));
                break;
            case "zhou":
                return setSource(require('../../assets/imgPilotos/zhou.png'));
                break;
            case "tsunoda":
                return setSource(require('../../assets/imgPilotos/tsunoda.png'));
                break;
            case "kevin_magnussen":
                return setSource(require('../../assets/imgPilotos/kevin_magnussen.png'));
                break;
            case "albon":
                return setSource(require('../../assets/imgPilotos/albon.png'));
                break;
            case "de_vries":
                return setSource(require('../../assets/imgPilotos/de_vries.png'));
                break;
            case "sargeant":
                return setSource(require('../../assets/imgPilotos/sargeant.png'));
                break;
            default:
                return setSource(require('../../assets/forbidden.png'));
                break;
        }
    };

    function getColor(constructorId) {
        switch (constructorId) {
            case "red_bull":
                return setColor('#001A30');
                break;
            case "mercedes":
                return setColor('#02F5D0');
                break;
            case "aston_martin":
                return setColor('#00665E');
                break;
            case "ferrari":
                return setColor('#D92A1C');
                break;
            case "mclaren":
                return setColor('#FF7300');
                break;
            case "alpine":
                return setColor('#0844FD');
                break;
            case "haas":
                return setColor('#8A8A99');
                break;
            case "alfa":
                return setColor('#A61D2F');
                break;
            case "alphatauri":
                return setColor('#08314C');
                break;
            case "williams":
                return setColor('#041E42');
                break;
            default:
                return setColor('#E00600');
                break;
        }
    };

    function getColorDadosTitulo(constructorId) {
        switch (constructorId) {
            case "red_bull":
                return setColorDadosTitulo('#FFF');
                break;
            case "mercedes":
                return setColorDadosTitulo('#12121A');
                break;
            case "aston_martin":
                return setColorDadosTitulo('#FFF');
                break;
            case "ferrari":
                return setColorDadosTitulo('#FFF');
                break;
            case "mclaren":
                return setColorDadosTitulo('#FFF');
                break;
            case "alpine":
                return setColorDadosTitulo('#FFF');
                break;
            case "haas":
                return setColorDadosTitulo('#FFF');
                break;
            case "alfa":
                return setColorDadosTitulo('#FFF');
                break;
            case "alphatauri":
                return setColorDadosTitulo('#FFF');
                break;
            case "williams":
                return setColorDadosTitulo('#FFF');
                break;
            default:
                return setColorDadosTitulo('#FFF');
                break;
        }
    };

    function getImgCar(constructorId) {
        switch (constructorId) {
            case "alfa":
                return setSourceImgCar(require('../../assets/cars/alfa.png'));
                break;
            case "alphatauri":
                return setSourceImgCar(require('../../assets/cars/alphatauri.png'));
                break;
            case "alpine":
                return setSourceImgCar(require('../../assets/cars/alpine.png'));
                break;
            case "aston_martin":
                return setSourceImgCar(require('../../assets/cars/aston_martin.png'));
                break;
            case "ferrari":
                return setSourceImgCar(require('../../assets/cars/ferrari.png'));
                break;
            case "haas":
                return setSourceImgCar(require('../../assets/cars/haas.png'));
                break;
            case "mclaren":
                return setSourceImgCar(require('../../assets/cars/mclaren.png'));
                break;
            case "mercedes":
                return setSourceImgCar(require('../../assets/cars/mercedes.png'));
                break;
            case "red_bull":
                return setSourceImgCar(require('../../assets/cars/red_bull.png'));
                break;
            case "williams":
                return setSourceImgCar(require('../../assets/cars/williams.png'));
                break;
            default:
                return setSourceImgCar(require('../../assets/forbidden.png'));
                break;
        }
    };

    // Funções para quando API não funcionar
    function GetInfoPiloto(idPiloto) {
        let StandingsLists = '';

        switch (idPiloto) {
            case 'hamilton':
                StandingsLists = [
                    {
                        season: "2023",
                        round: "6",
                        DriverStandings: [
                            {
                                position: "4",
                                positionText: "4",
                                points: "69",
                                wins: "0",
                                Driver: {
                                    driverId: "hamilton",
                                    permanentNumber: "44",
                                    code: "HAM",
                                    url: "http://en.wikipedia.org/wiki/Lewis_Hamilton",
                                    givenName: "Lewis",
                                    familyName: "Hamilton",
                                    dateOfBirth: "1985-01-07",
                                    nationality: "British"
                                },
                                Constructors: [
                                    {
                                        constructorId: "mercedes",
                                        url: "http://en.wikipedia.org/wiki/Mercedes-Benz_in_Formula_One",
                                        name: "Mercedes",
                                        nationality: "German"
                                    }
                                ]
                            }
                        ]
                    }
                ]
                    ;
                return setInfoPiloto(StandingsLists);
                break;
            case 'max_verstappen':
                StandingsLists = [
                    {
                        season: "2023",
                        round: "6",
                        DriverStandings: [
                            {
                                position: "1",
                                positionText: "1",
                                points: "144",
                                wins: "4",
                                Driver: {
                                    driverId: "max_verstappen",
                                    permanentNumber: "33",
                                    code: "VER",
                                    url: "http://en.wikipedia.org/wiki/Max_Verstappen",
                                    givenName: "Max",
                                    familyName: "Verstappen",
                                    dateOfBirth: "1997-09-30",
                                    nationality: "Dutch"
                                },
                                Constructors: [
                                    {
                                        constructorId: "red_bull",
                                        url: "http://en.wikipedia.org/wiki/Red_Bull_Racing",
                                        name: "Red Bull",
                                        nationality: "Austrian"
                                    }
                                ]
                            }
                        ]
                    }
                ]
                    ;
                return setInfoPiloto(StandingsLists);
                break;
            case 'perez':
                StandingsLists = [
                    {
                        season: "2023",
                        round: "6",
                        DriverStandings: [
                            {
                                position: "2",
                                positionText: "2",
                                points: "105",
                                wins: "2",
                                Driver: {
                                    driverId: "perez",
                                    permanentNumber: "11",
                                    code: "PER",
                                    url: "http://en.wikipedia.org/wiki/Sergio_P%C3%A9rez",
                                    givenName: "Sergio",
                                    familyName: "Pérez",
                                    dateOfBirth: "1990-01-26",
                                    nationality: "Mexican"
                                },
                                Constructors: [
                                    {
                                        constructorId: "red_bull",
                                        url: "http://en.wikipedia.org/wiki/Red_Bull_Racing",
                                        name: "Red Bull",
                                        nationality: "Austrian"
                                    }
                                ]
                            }
                        ]
                    }
                ]
                    ;
                return setInfoPiloto(StandingsLists);
                break;
            case 'alonso':
                StandingsLists = [
                    {
                        season: "2023",
                        round: "7",
                        DriverStandings: [
                            {
                                position: "3",
                                positionText: "3",
                                points: "93",
                                wins: "0",
                                Driver: {
                                    driverId: "alonso",
                                    permanentNumber: "14",
                                    code: "ALO",
                                    url: "http://en.wikipedia.org/wiki/Fernando_Alonso",
                                    givenName: "Fernando",
                                    familyName: "Alonso",
                                    dateOfBirth: "1981-07-29",
                                    nationality: "Spanish"
                                },
                                Constructors: [
                                    {
                                        constructorId: "aston_martin",
                                        url: "http://en.wikipedia.org/wiki/Aston_Martin_in_Formula_One",
                                        name: "Aston Martin",
                                        nationality: "British"
                                    }
                                ]
                            }
                        ]
                    }
                ]
                    ;
                return setInfoPiloto(StandingsLists);
                break;
            case 'sainz':
                StandingsLists = [
                    {
                        season: "2023",
                        round: "6",
                        DriverStandings: [
                            {
                                position: "6",
                                positionText: "6",
                                points: "48",
                                wins: "0",
                                Driver: {
                                    driverId: "sainz",
                                    permanentNumber: "55",
                                    code: "SAI",
                                    url: "http://en.wikipedia.org/wiki/Carlos_Sainz_Jr.",
                                    givenName: "Carlos",
                                    familyName: "Sainz",
                                    dateOfBirth: "1994-09-01",
                                    nationality: "Spanish"
                                },
                                Constructors: [
                                    {
                                        constructorId: "ferrari",
                                        url: "http://en.wikipedia.org/wiki/Scuderia_Ferrari",
                                        name: "Ferrari",
                                        nationality: "Italian"
                                    }
                                ]
                            }
                        ]
                    }
                ]
                    ;
                return setInfoPiloto(StandingsLists);
                break;
            case 'russell':
                StandingsLists = [
                    {
                        season: "2023",
                        round: "6",
                        DriverStandings: [
                            {
                                position: "5",
                                positionText: "5",
                                points: "50",
                                wins: "0",
                                Driver: {
                                    driverId: "russell",
                                    permanentNumber: "63",
                                    code: "RUS",
                                    url: "http://en.wikipedia.org/wiki/George_Russell_%28racing_driver%29",
                                    givenName: "George",
                                    familyName: "Russell",
                                    dateOfBirth: "1998-02-15",
                                    nationality: "British"
                                },
                                Constructors: [
                                    {
                                        constructorId: "mercedes",
                                        url: "http://en.wikipedia.org/wiki/Mercedes-Benz_in_Formula_One",
                                        name: "Mercedes",
                                        nationality: "German"
                                    }
                                ]
                            }
                        ]
                    }
                ]
                    ;
                return setInfoPiloto(StandingsLists);
                break;
            case 'leclerc':
                StandingsLists = [
                    {
                        season: "2023",
                        round: "6",
                        DriverStandings: [
                            {
                                position: "7",
                                positionText: "7",
                                points: "42",
                                wins: "0",
                                Driver: {
                                    driverId: "leclerc",
                                    permanentNumber: "16",
                                    code: "LEC",
                                    url: "http://en.wikipedia.org/wiki/Charles_Leclerc",
                                    givenName: "Charles",
                                    familyName: "Leclerc",
                                    dateOfBirth: "1997-10-16",
                                    nationality: "Monegasque"
                                },
                                Constructors: [
                                    {
                                        constructorId: "ferrari",
                                        url: "http://en.wikipedia.org/wiki/Scuderia_Ferrari",
                                        name: "Ferrari",
                                        nationality: "Italian"
                                    }
                                ]
                            }
                        ]
                    }
                ]
                    ;
                return setInfoPiloto(StandingsLists);
                break;
            case 'stroll':
                StandingsLists = [
                    {
                        season: "2023",
                        round: "6",
                        DriverStandings: [
                            {
                                position: "8",
                                positionText: "8",
                                points: "27",
                                wins: "0",
                                Driver: {
                                    driverId: "stroll",
                                    permanentNumber: "18",
                                    code: "STR",
                                    url: "http://en.wikipedia.org/wiki/Lance_Stroll",
                                    givenName: "Lance",
                                    familyName: "Stroll",
                                    dateOfBirth: "1998-10-29",
                                    nationality: "Canadian"
                                },
                                Constructors: [
                                    {
                                        constructorId: "aston_martin",
                                        url: "http://en.wikipedia.org/wiki/Aston_Martin_in_Formula_One",
                                        name: "Aston Martin",
                                        nationality: "British"
                                    }
                                ]
                            }
                        ]
                    }
                ]
                    ;
                return setInfoPiloto(StandingsLists);
                break;
            case 'norris':
                StandingsLists = [
                    {
                        season: "2023",
                        round: "6",
                        DriverStandings: [
                            {
                                position: "11",
                                positionText: "11",
                                points: "12",
                                wins: "0",
                                Driver: {
                                    driverId: "norris",
                                    permanentNumber: "4",
                                    code: "NOR",
                                    url: "http://en.wikipedia.org/wiki/Lando_Norris",
                                    givenName: "Lando",
                                    familyName: "Norris",
                                    dateOfBirth: "1999-11-13",
                                    nationality: "British"
                                },
                                Constructors: [
                                    {
                                        constructorId: "mclaren",
                                        url: "http://en.wikipedia.org/wiki/McLaren",
                                        name: "McLaren",
                                        nationality: "British"
                                    }
                                ]
                            }
                        ]
                    }
                ]
                    ;
                return setInfoPiloto(StandingsLists);
                break;
            case 'gasly':
                StandingsLists = [
                    {
                        season: "2023",
                        round: "6",
                        DriverStandings: [
                            {
                                position: "10",
                                positionText: "10",
                                points: "14",
                                wins: "0",
                                Driver: {
                                    driverId: "gasly",
                                    permanentNumber: "10",
                                    code: "GAS",
                                    url: "http://en.wikipedia.org/wiki/Pierre_Gasly",
                                    givenName: "Pierre",
                                    familyName: "Gasly",
                                    dateOfBirth: "1996-02-07",
                                    nationality: "French"
                                },
                                Constructors: [
                                    {
                                        constructorId: "alpine",
                                        url: "http://en.wikipedia.org/wiki/Alpine_F1_Team",
                                        name: "Alpine F1 Team",
                                        nationality: "French"
                                    }
                                ]
                            }
                        ]
                    }
                ]
                    ;
                return setInfoPiloto(StandingsLists);
                break;
            case 'hulkenberg':
                StandingsLists = [
                    {
                        season: "2023",
                        round: "6",
                        DriverStandings: [
                            {
                                position: "12",
                                positionText: "12",
                                points: "6",
                                wins: "0",
                                Driver: {
                                    driverId: "hulkenberg",
                                    permanentNumber: "27",
                                    code: "HUL",
                                    url: "http://en.wikipedia.org/wiki/Nico_H%C3%BClkenberg",
                                    givenName: "Nico",
                                    familyName: "Hülkenberg",
                                    dateOfBirth: "1987-08-19",
                                    nationality: "German"
                                },
                                Constructors: [
                                    {
                                        constructorId: "haas",
                                        url: "http://en.wikipedia.org/wiki/Haas_F1_Team",
                                        name: "Haas F1 Team",
                                        nationality: "American"
                                    }
                                ]
                            }
                        ]
                    }
                ]
                    ;
                return setInfoPiloto(StandingsLists);
                break;
            case 'ocon':
                StandingsLists = [
                    {
                        season: "2023",
                        round: "6",
                        DriverStandings: [
                            {
                                position: "9",
                                positionText: "9",
                                points: "21",
                                wins: "0",
                                Driver: {
                                    driverId: "ocon",
                                    permanentNumber: "31",
                                    code: "OCO",
                                    url: "http://en.wikipedia.org/wiki/Esteban_Ocon",
                                    givenName: "Esteban",
                                    familyName: "Ocon",
                                    dateOfBirth: "1996-09-17",
                                    nationality: "French"
                                },
                                Constructors: [
                                    {
                                        constructorId: "alpine",
                                        url: "http://en.wikipedia.org/wiki/Alpine_F1_Team",
                                        name: "Alpine F1 Team",
                                        nationality: "French"
                                    }
                                ]
                            }
                        ]
                    }
                ]
                    ;
                return setInfoPiloto(StandingsLists);
                break;
            case 'bottas':
                StandingsLists = [
                    {
                        season: "2023",
                        round: "6",
                        DriverStandings: [
                            {
                                position: "14",
                                positionText: "14",
                                points: "4",
                                wins: "0",
                                Driver: {
                                    driverId: "bottas",
                                    permanentNumber: "77",
                                    code: "BOT",
                                    url: "http://en.wikipedia.org/wiki/Valtteri_Bottas",
                                    givenName: "Valtteri",
                                    familyName: "Bottas",
                                    dateOfBirth: "1989-08-28",
                                    nationality: "Finnish"
                                },
                                Constructors: [
                                    {
                                        constructorId: "alfa",
                                        url: "http://en.wikipedia.org/wiki/Alfa_Romeo_in_Formula_One",
                                        name: "Alfa Romeo",
                                        nationality: "Swiss"
                                    }
                                ]
                            }
                        ]
                    }
                ]
                    ;
                return setInfoPiloto(StandingsLists);
                break;
            case 'piastri':
                StandingsLists = [
                    {
                        season: "2023",
                        round: "6",
                        DriverStandings: [
                            {
                                position: "13",
                                positionText: "13",
                                points: "5",
                                wins: "0",
                                Driver: {
                                    driverId: "piastri",
                                    permanentNumber: "81",
                                    code: "PIA",
                                    url: "http://en.wikipedia.org/wiki/Oscar_Piastri",
                                    givenName: "Oscar",
                                    familyName: "Piastri",
                                    dateOfBirth: "2001-04-06",
                                    nationality: "Australian"
                                },
                                Constructors: [
                                    {
                                        constructorId: "mclaren",
                                        url: "http://en.wikipedia.org/wiki/McLaren",
                                        name: "McLaren",
                                        nationality: "British"
                                    }
                                ]
                            }
                        ]
                    }
                ]
                    ;
                return setInfoPiloto(StandingsLists);
                break;
            case 'zhou':
                StandingsLists = [
                    {
                        season: "2023",
                        round: "6",
                        DriverStandings: [
                            {
                                position: "15",
                                positionText: "15",
                                points: "2",
                                wins: "0",
                                Driver: {
                                    driverId: "zhou",
                                    permanentNumber: "24",
                                    code: "ZHO",
                                    url: "http://en.wikipedia.org/wiki/Guanyu_Zhou",
                                    givenName: "Guanyu",
                                    familyName: "Zhou",
                                    dateOfBirth: "1999-05-30",
                                    nationality: "Chinese"
                                },
                                Constructors: [
                                    {
                                        constructorId: "alfa",
                                        url: "http://en.wikipedia.org/wiki/Alfa_Romeo_in_Formula_One",
                                        name: "Alfa Romeo",
                                        nationality: "Swiss"
                                    }
                                ]
                            }
                        ]
                    }
                ]
                    ;
                return setInfoPiloto(StandingsLists);
                break;
            case 'tsunoda':
                StandingsLists = [
                    {
                        season: "2023",
                        round: "6",
                        DriverStandings: [
                            {
                                position: "16",
                                positionText: "16",
                                points: "2",
                                wins: "0",
                                Driver: {
                                    driverId: "tsunoda",
                                    permanentNumber: "22",
                                    code: "TSU",
                                    url: "http://en.wikipedia.org/wiki/Yuki_Tsunoda",
                                    givenName: "Yuki",
                                    familyName: "Tsunoda",
                                    dateOfBirth: "2000-05-11",
                                    nationality: "Japanese"
                                },
                                Constructors: [
                                    {
                                        constructorId: "alphatauri",
                                        url: "http://en.wikipedia.org/wiki/Scuderia_AlphaTauri",
                                        name: "AlphaTauri",
                                        nationality: "Italian"
                                    }
                                ]
                            }
                        ]
                    }
                ]
                    ;
                return setInfoPiloto(StandingsLists);
                break;
            case 'kevin_magnussen':
                StandingsLists = [
                    {
                        season: "2023",
                        round: "6",
                        DriverStandings: [
                            {
                                position: "17",
                                positionText: "17",
                                points: "2",
                                wins: "0",
                                Driver: {
                                    driverId: "kevin_magnussen",
                                    permanentNumber: "20",
                                    code: "MAG",
                                    url: "http://en.wikipedia.org/wiki/Kevin_Magnussen",
                                    givenName: "Kevin",
                                    familyName: "Magnussen",
                                    dateOfBirth: "1992-10-05",
                                    nationality: "Danish"
                                },
                                Constructors: [
                                    {
                                        constructorId: "haas",
                                        url: "http://en.wikipedia.org/wiki/Haas_F1_Team",
                                        name: "Haas F1 Team",
                                        nationality: "American"
                                    }
                                ]
                            }
                        ]
                    }
                ]
                    ;
                return setInfoPiloto(StandingsLists);
                break;
            case 'albon':
                StandingsLists = [
                    {
                        season: "2023",
                        round: "6",
                        DriverStandings: [
                            {
                                position: "18",
                                positionText: "18",
                                points: "1",
                                wins: "0",
                                Driver: {
                                    driverId: "albon",
                                    permanentNumber: "23",
                                    code: "ALB",
                                    url: "http://en.wikipedia.org/wiki/Alexander_Albon",
                                    givenName: "Alexander",
                                    familyName: "Albon",
                                    dateOfBirth: "1996-03-23",
                                    nationality: "Thai"
                                },
                                Constructors: [
                                    {
                                        constructorId: "williams",
                                        url: "http://en.wikipedia.org/wiki/Williams_Grand_Prix_Engineering",
                                        name: "Williams",
                                        nationality: "British"
                                    }
                                ]
                            }
                        ]
                    }
                ]
                    ;
                return setInfoPiloto(StandingsLists);
                break;
            case 'sargeant':
                StandingsLists = [
                    {
                        season: "2023",
                        round: "6",
                        DriverStandings: [
                            {
                                position: "20",
                                positionText: "20",
                                points: "0",
                                wins: "0",
                                Driver: {
                                    driverId: "sargeant",
                                    permanentNumber: "2",
                                    code: "SAR",
                                    url: "http://en.wikipedia.org/wiki/Logan_Sargeant",
                                    givenName: "Logan",
                                    familyName: "Sargeant",
                                    dateOfBirth: "2000-12-31",
                                    nationality: "American"
                                },
                                Constructors: [
                                    {
                                        constructorId: "williams",
                                        url: "http://en.wikipedia.org/wiki/Williams_Grand_Prix_Engineering",
                                        name: "Williams",
                                        nationality: "British"
                                    }
                                ]
                            }
                        ]
                    }
                ]
                    ;
                return setInfoPiloto(StandingsLists);
                break;
            case 'de_vries':
                StandingsLists = [
                    {
                        season: "2023",
                        round: "6",
                        DriverStandings: [
                            {
                                position: "19",
                                positionText: "19",
                                points: "0",
                                wins: "0",
                                Driver: {
                                    driverId: "de_vries",
                                    permanentNumber: "21",
                                    code: "DEV",
                                    url: "http://en.wikipedia.org/wiki/Nyck_de_Vries",
                                    givenName: "Nyck",
                                    familyName: "de Vries",
                                    dateOfBirth: "1995-02-06",
                                    nationality: "Dutch"
                                },
                                Constructors: [
                                    {
                                        constructorId: "alphatauri",
                                        url: "http://en.wikipedia.org/wiki/Scuderia_AlphaTauri",
                                        name: "AlphaTauri",
                                        nationality: "Italian"
                                    }
                                ]
                            }
                        ]
                    }
                ]
                    ;
                return setInfoPiloto(StandingsLists);
                break;
            default:
                return setInfoPiloto(StandingsLists);
        }
        
    };

    function GetAllPodiums(idPiloto) {

        let podios1 = '';
        let podios2 = '';
        let podios3 = '';
        let podiosSum = '';

        switch (idPiloto) {
            case 'hamilton':
                podios1 = '103';
                podios2 = '54';
                podios3 = '35';
                podiosSum = parseInt(podios1) + parseInt(podios2) + parseInt(podios3);
                return setTotalPodios(podiosSum);
                break;
            case 'max_verstappen':
                podios1 = '39';
                podios2 = '28';
                podios3 = '16';
                podiosSum = parseInt(podios1) + parseInt(podios2) + parseInt(podios3);
                return setTotalPodios(podiosSum);
                break;
            case 'perez':
                podios1 = '6';
                podios2 = '12';
                podios3 = '12';
                podiosSum = parseInt(podios1) + parseInt(podios2) + parseInt(podios3);
                return setTotalPodios(podiosSum);
                break;
            case 'alonso':
                podios1 = '32';
                podios2 = '38';
                podios3 = '33';
                podiosSum = parseInt(podios1) + parseInt(podios2) + parseInt(podios3);
                return setTotalPodios(podiosSum);
                break;
            case 'sainz':
                podios1 = '1';
                podios2 = '5';
                podios3 = '9';
                podiosSum = parseInt(podios1) + parseInt(podios2) + parseInt(podios3);
                return setTotalPodios(podiosSum);
                break;
            case 'russell':
                podios1 = '1';
                podios2 = '2';
                podios3 = '6';
                podiosSum = parseInt(podios1) + parseInt(podios2) + parseInt(podios3);
                return setTotalPodios(podiosSum);
                break;
            case 'leclerc':
                podios1 = '5';
                podios2 = '9';
                podios3 = '11';
                podiosSum = parseInt(podios1) + parseInt(podios2) + parseInt(podios3);
                return setTotalPodios(podiosSum);
                break;
            case 'stroll':
                podios1 = '0';
                podios2 = '0';
                podios3 = '3';
                podiosSum = parseInt(podios1) + parseInt(podios2) + parseInt(podios3);
                return setTotalPodios(podiosSum);
                break;
            case 'norris':
                podios1 = '0';
                podios2 = '1';
                podios3 = '5';
                podiosSum = parseInt(podios1) + parseInt(podios2) + parseInt(podios3);
                return setTotalPodios(podiosSum);
                break;
            case 'gasly':
                podios1 = '1';
                podios2 = '1';
                podios3 = '1';
                podiosSum = parseInt(podios1) + parseInt(podios2) + parseInt(podios3);
                return setTotalPodios(podiosSum);
                break;
            case 'hulkenberg':
                podios1 = '0';
                podios2 = '0';
                podios3 = '0';
                podiosSum = parseInt(podios1) + parseInt(podios2) + parseInt(podios3);
                return setTotalPodios(podiosSum);
                break;
            case 'ocon':
                podios1 = '1';
                podios2 = '1';
                podios3 = '1';
                podiosSum = parseInt(podios1) + parseInt(podios2) + parseInt(podios3);
                return setTotalPodios(podiosSum);
                break;
            case 'bottas':
                podios1 = '10';
                podios2 = '29';
                podios3 = '28';
                podiosSum = parseInt(podios1) + parseInt(podios2) + parseInt(podios3);
                return setTotalPodios(podiosSum);
                break;
            case 'piastri':
                podios1 = '0';
                podios2 = '0';
                podios3 = '0';
                podiosSum = parseInt(podios1) + parseInt(podios2) + parseInt(podios3);
                return setTotalPodios(podiosSum);
                break;
            case 'zhou':
                podios1 = '0';
                podios2 = '0';
                podios3 = '0';
                podiosSum = parseInt(podios1) + parseInt(podios2) + parseInt(podios3);
                return setTotalPodios(podiosSum);
                break;
            case 'tsunoda':
                podios1 = '0';
                podios2 = '0';
                podios3 = '0';
                podiosSum = parseInt(podios1) + parseInt(podios2) + parseInt(podios3);
                return setTotalPodios(podiosSum);
                break;
            case 'kevin_magnussen':
                podios1 = '0';
                podios2 = '1';
                podios3 = '0';
                podiosSum = parseInt(podios1) + parseInt(podios2) + parseInt(podios3);
                return setTotalPodios(podiosSum);
                break;
            case 'albon':
                podios1 = '0';
                podios2 = '0';
                podios3 = '2';
                podiosSum = parseInt(podios1) + parseInt(podios2) + parseInt(podios3);
                return setTotalPodios(podiosSum);
                break;
            case 'sargeant':
                podios1 = '0';
                podios2 = '0';
                podios3 = '0';
                podiosSum = parseInt(podios1) + parseInt(podios2) + parseInt(podios3);
                return setTotalPodios(podiosSum);
                break;
            case 'de_vries':
                podios1 = '0';
                podios2 = '0';
                podios3 = '0';
                podiosSum = parseInt(podios1) + parseInt(podios2) + parseInt(podios3);
                return setTotalPodios(podiosSum);
                break;
            default:
                return setTotalPodios('');
        }
    };

    function GetCurrentPodiums(idPiloto) {

        let podios1 = '';
        let podios2 = '';
        let podios3 = '';
        let podiosSum = '';

        switch (idPiloto) {
            case 'hamilton':
                podios1 = '0';
                podios2 = '1';
                podios3 = '0';
                podiosSum = parseInt(podios1) + parseInt(podios2) + parseInt(podios3);
                return setTotalPodiosCurrent(podiosSum);
                break;
            case 'max_verstappen':
                podios1 = '4';
                podios2 = '2';
                podios3 = '0';
                podiosSum = parseInt(podios1) + parseInt(podios2) + parseInt(podios3);
                return setTotalPodiosCurrent(podiosSum);
                break;
            case 'perez':
                podios1 = '2';
                podios2 = '2';
                podios3 = '0';
                podiosSum = parseInt(podios1) + parseInt(podios2) + parseInt(podios3);
                return setTotalPodiosCurrent(podiosSum);
                break;
            case 'alonso':
                podios1 = '0';
                podios2 = '1';
                podios3 = '4';
                podiosSum = parseInt(podios1) + parseInt(podios2) + parseInt(podios3);
                return setTotalPodiosCurrent(podiosSum);
                break;
            case 'sainz':
                podios1 = '0';
                podios2 = '0';
                podios3 = '0';
                podiosSum = parseInt(podios1) + parseInt(podios2) + parseInt(podios3);
                return setTotalPodiosCurrent(podiosSum);
                break;
            case 'russell':
                podios1 = '0';
                podios2 = '0';
                podios3 = '0';
                podiosSum = parseInt(podios1) + parseInt(podios2) + parseInt(podios3);
                return setTotalPodiosCurrent(podiosSum);
                break;
            case 'leclerc':
                podios1 = '0';
                podios2 = '0';
                podios3 = '1';
                podiosSum = parseInt(podios1) + parseInt(podios2) + parseInt(podios3);
                return setTotalPodiosCurrent(podiosSum);
                break;
            case 'stroll':
                podios1 = '0';
                podios2 = '0';
                podios3 = '0';
                podiosSum = parseInt(podios1) + parseInt(podios2) + parseInt(podios3);
                return setTotalPodiosCurrent(podiosSum);
                break;
            case 'norris':
                podios1 = '0';
                podios2 = '0';
                podios3 = '0';
                podiosSum = parseInt(podios1) + parseInt(podios2) + parseInt(podios3);
                return setTotalPodiosCurrent(podiosSum);
                break;
            case 'gasly':
                podios1 = '0';
                podios2 = '0';
                podios3 = '0';
                podiosSum = parseInt(podios1) + parseInt(podios2) + parseInt(podios3);
                return setTotalPodiosCurrent(podiosSum);
                break;
            case 'hulkenberg':
                podios1 = '0';
                podios2 = '0';
                podios3 = '0';
                podiosSum = parseInt(podios1) + parseInt(podios2) + parseInt(podios3);
                return setTotalPodiosCurrent(podiosSum);
                break;
            case 'ocon':
                podios1 = '0';
                podios2 = '0';
                podios3 = '1';
                podiosSum = parseInt(podios1) + parseInt(podios2) + parseInt(podios3);
                return setTotalPodiosCurrent(podiosSum);
                break;
            case 'bottas':
                podios1 = '0';
                podios2 = '0';
                podios3 = '0';
                podiosSum = parseInt(podios1) + parseInt(podios2) + parseInt(podios3);
                return setTotalPodiosCurrent(podiosSum);
                break;
            case 'piastri':
                podios1 = '0';
                podios2 = '0';
                podios3 = '0';
                podiosSum = parseInt(podios1) + parseInt(podios2) + parseInt(podios3);
                return setTotalPodiosCurrent(podiosSum);
                break;
            case 'zhou':
                podios1 = '0';
                podios2 = '0';
                podios3 = '0';
                podiosSum = parseInt(podios1) + parseInt(podios2) + parseInt(podios3);
                return setTotalPodiosCurrent(podiosSum);
                break;
            case 'tsunoda':
                podios1 = '0';
                podios2 = '0';
                podios3 = '0';
                podiosSum = parseInt(podios1) + parseInt(podios2) + parseInt(podios3);
                return setTotalPodiosCurrent(podiosSum);
                break;
            case 'kevin_magnussen':
                podios1 = '0';
                podios2 = '0';
                podios3 = '0';
                podiosSum = parseInt(podios1) + parseInt(podios2) + parseInt(podios3);
                return setTotalPodiosCurrent(podiosSum);
                break;
            case 'albon':
                podios1 = '0';
                podios2 = '0';
                podios3 = '0';
                podiosSum = parseInt(podios1) + parseInt(podios2) + parseInt(podios3);
                return setTotalPodiosCurrent(podiosSum);
                break;
            case 'sargeant':
                podios1 = '0';
                podios2 = '0';
                podios3 = '0';
                podiosSum = parseInt(podios1) + parseInt(podios2) + parseInt(podios3);
                return setTotalPodiosCurrent(podiosSum);
                break;
            case 'de_vries':
                podios1 = '0';
                podios2 = '0';
                podios3 = '0';
                podiosSum = parseInt(podios1) + parseInt(podios2) + parseInt(podios3);
                return setTotalPodiosCurrent(podiosSum);
                break;
            default:
                return setTotalPodiosCurrent('');
        }
    };

    function GetAllFastestLaps(idPiloto) {

        switch (idPiloto) {
            case 'hamilton':
                return setFastestLapAllTime('62');
                break;
            case 'max_verstappen':
                return setFastestLapAllTime('23');
                break;
            case 'perez':
                return setFastestLapAllTime('10');
                break;
            case 'alonso':
                return setFastestLapAllTime('22');
                break;
            case 'sainz':
                return setFastestLapAllTime('3');
                break;
            case 'russell':
                return setFastestLapAllTime('6');
                break;
            case 'leclerc':
                return setFastestLapAllTime('7');
                break;
            case 'stroll':
                return setFastestLapAllTime('0');
                break;
            case 'norris':
                return setFastestLapAllTime('5');
                break;
            case 'gasly':
                return setFastestLapAllTime('3');
                break;
            case 'hulkenberg':
                return setFastestLapAllTime('2');
                break;
            case 'ocon':
                return setFastestLapAllTime('0');
                break;
            case 'bottas':
                return setFastestLapAllTime('19');
                break;
            case 'piastri':
                return setFastestLapAllTime('0');
                break;
            case 'zhou':
                return setFastestLapAllTime('2');
                break;
            case 'tsunoda':
                return setFastestLapAllTime('0');
                break;
            case 'kevin_magnussen':
                return setFastestLapAllTime('2');
                break;
            case 'albon':
                return setFastestLapAllTime('0');
                break;
            case 'sargeant':
                return setFastestLapAllTime('0');
                break;
            case 'de_vries':
                return setFastestLapAllTime('0');
                break;
            default:
                return setFastestLapAllTime('');
        }
    };

    function GetFastastLapCurrent(idPiloto) {

        switch (idPiloto) {
            case 'hamilton':
                return setFastestLapCurrent('1');
                break;
            case 'max_verstappen':
                return setFastestLapCurrent('2');
                break;
            case 'perez':
                return setFastestLapCurrent('1');
                break;
            case 'alonso':
                return setFastestLapCurrent('0');
                break;
            case 'sainz':
                return setFastestLapCurrent('0');
                break;
            case 'russell':
                return setFastestLapCurrent('1');
                break;
            case 'leclerc':
                return setFastestLapCurrent('0');
                break;
            case 'stroll':
                return setFastestLapCurrent('0');
                break;
            case 'norris':
                return setFastestLapCurrent('0');
                break;
            case 'gasly':
                return setFastestLapCurrent('0');
                break;
            case 'hulkenberg':
                return setFastestLapCurrent('0');
                break;
            case 'ocon':
                return setFastestLapCurrent('0');
                break;
            case 'bottas':
                return setFastestLapCurrent('0');
                break;
            case 'piastri':
                return setFastestLapCurrent('0');
                break;
            case 'zhou':
                return setFastestLapCurrent('1');
                break;
            case 'tsunoda':
                return setFastestLapCurrent('0');
                break;
            case 'kevin_magnussen':
                return setFastestLapCurrent('0');
                break;
            case 'albon':
                return setFastestLapCurrent('0');
                break;
            case 'sargeant':
                return setFastestLapCurrent('0');
                break;
            case 'de_vries':
                return setFastestLapCurrent('0');
                break;
            default:
                return setFastestLapCurrent('');
        }
    };

    function GetRacesAllTime(idPiloto) {

        switch (idPiloto) {
            case 'hamilton':
                return setRacesAllTime('316');
                break;
            case 'max_verstappen':
                return setRacesAllTime('169');
                break;
            case 'perez':
                return setRacesAllTime('243');
                break;
            case 'alonso':
                return setRacesAllTime('364');
                break;
            case 'sainz':
                return setRacesAllTime('169');
                break;
            case 'russell':
                return setRacesAllTime('88');
                break;
            case 'leclerc':
                return setRacesAllTime('109');
                break;
            case 'stroll':
                return setRacesAllTime('128');
                break;
            case 'norris':
                return setRacesAllTime('88');
                break;
            case 'gasly':
                return setRacesAllTime('114');
                break;
            case 'hulkenberg':
                return setRacesAllTime('190');
                break;
            case 'ocon':
                return setRacesAllTime('117');
                break;
            case 'bottas':
                return setRacesAllTime('207');
                break;
            case 'piastri':
                return setRacesAllTime('6');
                break;
            case 'zhou':
                return setRacesAllTime('28');
                break;
            case 'tsunoda':
                return setRacesAllTime('50');
                break;
            case 'kevin_magnussen':
                return setRacesAllTime('148');
                break;
            case 'albon':
                return setRacesAllTime('65');
                break;
            case 'sargeant':
                return setRacesAllTime('6');
                break;
            case 'de_vries':
                return setRacesAllTime('7');
                break;
            default:
                return setRacesAllTime('');
        }
    };

    function GetCurrentRaces(idPiloto) {

        switch (idPiloto) {
            case 'hamilton':
                return setRacesCurrent('6');
                break;
            case 'max_verstappen':
                return setRacesCurrent('6');
                break;
            case 'perez':
                return setRacesCurrent('6');
                break;
            case 'alonso':
                return setRacesCurrent('6');
                break;
            case 'sainz':
                return setRacesCurrent('6');
                break;
            case 'russell':
                return setRacesCurrent('6');
                break;
            case 'leclerc':
                return setRacesCurrent('6');
                break;
            case 'stroll':
                return setRacesCurrent('6');
                break;
            case 'norris':
                return setRacesCurrent('6');
                break;
            case 'gasly':
                return setRacesCurrent('6');
                break;
            case 'hulkenberg':
                return setRacesCurrent('6');
                break;
            case 'ocon':
                return setRacesCurrent('6');
                break;
            case 'bottas':
                return setRacesCurrent('6');
                break;
            case 'piastri':
                return setRacesCurrent('6');
                break;
            case 'zhou':
                return setRacesCurrent('6');
                break;
            case 'tsunoda':
                return setRacesCurrent('6');
                break;
            case 'kevin_magnussen':
                return setRacesCurrent('6');
                break;
            case 'albon':
                return setRacesCurrent('6');
                break;
            case 'sargeant':
                return setRacesCurrent('6');
                break;
            case 'de_vries':
                return setRacesCurrent('6');
                break;
            default:
                return setRacesCurrent('');
        }
    };

    function GetWorldChampion(idPiloto) {

        switch (idPiloto) {
            case 'hamilton':
                return setWorldChampion('7');
                break;
            case 'max_verstappen':
                return setWorldChampion('2');
                break;
            case 'perez':
                return setWorldChampion('0');
                break;
            case 'alonso':
                return setWorldChampion('2');
                break;
            case 'sainz':
                return setWorldChampion('0');
                break;
            case 'russell':
                return setWorldChampion('0');
                break;
            case 'leclerc':
                return setWorldChampion('0');
                break;
            case 'stroll':
                return setWorldChampion('0');
                break;
            case 'norris':
                return setWorldChampion('0');
                break;
            case 'gasly':
                return setWorldChampion('0');
                break;
            case 'hulkenberg':
                return setWorldChampion('0');
                break;
            case 'ocon':
                return setWorldChampion('0');
                break;
            case 'bottas':
                return setWorldChampion('0');
                break;
            case 'piastri':
                return setWorldChampion('0');
                break;
            case 'zhou':
                return setWorldChampion('0');
                break;
            case 'tsunoda':
                return setWorldChampion('0');
                break;
            case 'kevin_magnussen':
                return setWorldChampion('0');
                break;
            case 'albon':
                return setWorldChampion('0');
                break;
            case 'sargeant':
                return setWorldChampion('0');
                break;
            case 'de_vries':
                return setWorldChampion('0');
                break;
            default:
                return setWorldChampion('');
        }
    };

    useEffect(() => {
        setLoading(true);
        async function carregarInfoPiloto() {
            // acessar dados do piloto
            InfoDriver();

            // contagem pódios -> todos os tempos
            AllPodiums();

            // contagem pódios -> temporada atual
            CurrentPodiums();

            // volta + rapida -> temporada atual
            CurrentFastestLaps();

            // volta + rapida -> todos os tempos
            AllFastestLaps();

            // corridas participantes -> temporada atual
            CurrentRaces();

            // corridas participantes -> todos os tempos
            AllRaces();

            // quantidade de campeonatos mundiais
            WorldChampion();
        }
        carregarInfoPiloto();
    }, []);

    useEffect(() => {
        infoPiloto.map((standings) => {

            //console.log(standings.DriverStandings);

            standings.DriverStandings.filter((item) => {
                setGivenName(item.Driver.givenName);
                setFamilyName(item.Driver.familyName);
                setDriverCode(item.Driver.code);
                setNationality(item.Driver.nationality);
                setPermanentNumber(item.Driver.permanentNumber);
                setDriverId(item.Driver.driverId);

                setPoints(item.points);
                setPosition(item.positionText);
                setWins(item.wins);

                // formatando data
                let dataNasc = item.Driver.dateOfBirth.split('-');
                let dataFormatada = dataNasc[2] + '/' + dataNasc[1] + '/' + dataNasc[0];
                setDateOfBirth(dataFormatada);

                // buscar imagem do pais
                getImgCountry(item.Driver.nationality);

                item.Constructors.filter((constructor) => {
                    setConstructorId(constructor.constructorId);
                    setConstructorName(constructor.name);
                    setConstructorNationality(constructor.nationality);
                    // buscar imagem da equipe
                    getImgEquipe(constructor.constructorId);
                    // buscar cor da equipe
                    getColor(constructor.constructorId);
                    // buscar cor do titulo do card de dados
                    getColorDadosTitulo(constructor.constructorId);
                    // buscar imagem do carro
                    getImgCar(constructor.constructorId);
                });
            });
        });
        buscarInfoExtra(route.params?.DriverId);
        // buscar imagem do piloto
        getSourceImg(route.params?.DriverId);
    }, [infoPiloto]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: route.params?.Nome === '' ? 'Detalhes' : route.params?.Nome
        });
    }, [navigation]);

    return (
        loading ? (
            <View style={{ flex: 1, backgroundColor: '#12121A', alignItems: 'center', justifyContent: 'center' }}>
                <View style={styles.loading}>
                    <ActivityIndicator size={30} color={'red'} />
                    <Text style={{ color: '#FFF' }}>Conectando ao servidor</Text>
                </View>
            </View>
        ) : (
            <ScrollView>
                {/* Logo superior */}
                <F1_ContainerLogo>
                    {constructorId ?
                        <F1_LogoImg source={sourceImgEquipe}></F1_LogoImg>
                        :
                        <F1_LogoImg source={require('../../assets/forbidden.png')}></F1_LogoImg>
                    }
                </F1_ContainerLogo>
                <F1_Container>
                    {/* Imagem do piloto */}
                    <F1_CardImgPiloto style={{ backgroundColor: color }}>
                        {driverId ?
                            <F1_ImgPiloto source={source}></F1_ImgPiloto>
                            :
                            <F1_ImgPiloto source={require('../../assets/forbidden.png')}></F1_ImgPiloto>
                        }
                        <F1_ContainerGradient>
                            <F1_Gradient></F1_Gradient>
                        </F1_ContainerGradient>
                    </F1_CardImgPiloto>
                    {/* Nome do piloto */}
                    <F1_ContainerNome>
                        {nationality ?
                            <F1_Bandeira source={sourceImgFlag}></F1_Bandeira>
                            :
                            <F1_Bandeira source={require('../../assets/forbidden.png')}></F1_Bandeira>
                        }
                        <F1_NomePiloto>
                            <Text style={{ fontFamily: 'Ubuntu-Medium' }}>{givenName} {familyName}</Text>
                        </F1_NomePiloto>
                    </F1_ContainerNome>
                    {/* Informações do piloto (país e pontos) */}
                    <F1_ContainerInfoPiloto>
                        <View>
                            <F1_Pais>
                                <Text style={{ fontFamily: 'OpenSans-Regular' }}>País</Text>
                            </F1_Pais>
                            <F1_NomePais>
                                <Text style={{ fontFamily: 'Ubuntu-Medium' }}>{nacionalidadePiloto}</Text>
                            </F1_NomePais>
                        </View>
                        <F1_CardPontos>
                            <F1_TextPontos>
                                <Text style={{ fontFamily: 'Ubuntu-Medium' }}>{points} pts</Text>
                            </F1_TextPontos>
                        </F1_CardPontos>
                    </F1_ContainerInfoPiloto>
                    {/* Temporada atual e qtde de campeonatos mundiais */}
                    <F1_CardPosition>
                        <F1_ConteinerItem>
                            <F1_TextItemDestaque>
                                <Text style={{ fontFamily: 'Ubuntu-Bold' }}>{position}º</Text>
                            </F1_TextItemDestaque>
                            <F1_ConteinerTextTitulo>
                                <F1_TextCardTituloEsquerda>
                                    <Text style={{ fontFamily: 'OpenSans-Regular', textAlign: 'left' }}>Temporada atual</Text>
                                </F1_TextCardTituloEsquerda>
                            </F1_ConteinerTextTitulo>
                        </F1_ConteinerItem>
                        <F1_ConteinerItem>
                            <F1_ConteinerTextTitulo>
                                <F1_TextCardTituloDireita>
                                    <Text style={{ fontFamily: 'OpenSans-Regular', textAlign: "right" }}>Campeonato mundial</Text>
                                </F1_TextCardTituloDireita>
                            </F1_ConteinerTextTitulo>
                            <F1_TextItemDestaque>
                                <Text style={{ fontFamily: 'Ubuntu-Bold' }}> {worldChampion}</Text>
                            </F1_TextItemDestaque>
                        </F1_ConteinerItem>
                    </F1_CardPosition>
                    {/* Cards de dados da temporada atual e de todos os tempos */}
                    <F1_ContainerDados>
                        <F1_CardDados>
                            <F1_ContainerDadosTitulo style={{ backgroundColor: color }}>
                                <F1_TextDadosTitulo>
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', color: colorDadosTitulo }} >2023</Text>
                                </F1_TextDadosTitulo>
                            </F1_ContainerDadosTitulo>
                            <F1_ConteinerItemMultiple>
                                <F1_TextItemDestaque>
                                    <Text style={{ fontFamily: 'Ubuntu-Bold' }}>{totalPodiosCurrent}</Text>
                                </F1_TextItemDestaque>
                                <F1_ConteinerTextTitulo>
                                    <F1_TextCardTituloEsquerda>
                                        <Text style={{ fontFamily: 'OpenSans-Regular', textAlign: 'left' }}>pódio(s)</Text>
                                    </F1_TextCardTituloEsquerda>
                                </F1_ConteinerTextTitulo>
                            </F1_ConteinerItemMultiple>
                            <F1_ConteinerItemMultiple>
                                <F1_TextItemDestaque>
                                    <Text style={{ fontFamily: 'Ubuntu-Bold' }}>{fastestLapCurrent}</Text>
                                </F1_TextItemDestaque>
                                <F1_ConteinerTextTitulo>
                                    <F1_TextCardTituloEsquerda>
                                        <Text style={{ fontFamily: 'OpenSans-Regular', textAlign: 'left' }}>voltas + rápidas</Text>
                                    </F1_TextCardTituloEsquerda>
                                </F1_ConteinerTextTitulo>
                            </F1_ConteinerItemMultiple>
                            <F1_ConteinerItemMultiple>
                                <F1_TextItemDestaque>
                                    <Text style={{ fontFamily: 'Ubuntu-Bold' }}>{racesCurrent}</Text>
                                </F1_TextItemDestaque>
                                <F1_ConteinerTextTitulo>
                                    <F1_TextCardTituloEsquerda>
                                        <Text style={{ fontFamily: 'OpenSans-Regular', textAlign: 'left' }}>GP's</Text>
                                    </F1_TextCardTituloEsquerda>
                                </F1_ConteinerTextTitulo>
                            </F1_ConteinerItemMultiple>
                        </F1_CardDados>
                        <F1_CardDados>
                            <F1_ContainerDadosTitulo style={{ backgroundColor: '#E00600' }}>
                                <F1_TextDadosTitulo>
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', color: '#FFF' }}>Todas as temporadas</Text>
                                </F1_TextDadosTitulo>
                            </F1_ContainerDadosTitulo>
                            <F1_ConteinerItemMultiple>
                                <F1_TextItemDestaque>
                                    <Text style={{ fontFamily: 'Ubuntu-Bold' }}>{totalPodios}</Text>
                                </F1_TextItemDestaque>
                                <F1_ConteinerTextTitulo>
                                    <F1_TextCardTituloEsquerda>
                                        <Text style={{ fontFamily: 'OpenSans-Regular', textAlign: 'left' }}>pódio(s)</Text>
                                    </F1_TextCardTituloEsquerda>
                                </F1_ConteinerTextTitulo>
                            </F1_ConteinerItemMultiple>
                            <F1_ConteinerItemMultiple>
                                <F1_TextItemDestaque>
                                    <Text style={{ fontFamily: 'Ubuntu-Bold' }}>{fastestLapAllTime}</Text>
                                </F1_TextItemDestaque>
                                <F1_ConteinerTextTitulo>
                                    <F1_TextCardTituloEsquerda>
                                        <Text style={{ fontFamily: 'OpenSans-Regular', textAlign: 'left' }}>voltas + rápidas</Text>
                                    </F1_TextCardTituloEsquerda>
                                </F1_ConteinerTextTitulo>
                            </F1_ConteinerItemMultiple>
                            <F1_ConteinerItemMultiple>
                                <F1_TextItemDestaque>
                                    <Text style={{ fontFamily: 'Ubuntu-Bold' }}>{racesAllTime}</Text>
                                </F1_TextItemDestaque>
                                <F1_ConteinerTextTitulo>
                                    <F1_TextCardTituloEsquerda>
                                        <Text style={{ fontFamily: 'OpenSans-Regular', textAlign: 'left' }}>GP's</Text>
                                    </F1_TextCardTituloEsquerda>
                                </F1_ConteinerTextTitulo>
                            </F1_ConteinerItemMultiple>
                        </F1_CardDados>
                    </F1_ContainerDados>
                    {/* Imagem do carro da equipe */}
                    <F1_ContainerCar style={{ backgroundColor: color }} onPress={() => {
                        navigation.navigate('DetalhesEquipes', { ConstructorId: constructorId });
                    }}>
                        <F1_ContainerCarEquipe>
                            {constructorId ?
                                <F1_CarEquipeImg source={sourceImgEquipe}></F1_CarEquipeImg>
                                :
                                <F1_CarEquipeImg source={require('../../assets/forbidden.png')}></F1_CarEquipeImg>
                            }
                            <F1_TextCarEquipe style={{ color: colorDadosTitulo }}>
                                <Text style={{ fontFamily: 'OpenSans-SemiBold' }} >{constructorName}</Text>
                            </F1_TextCarEquipe>
                        </F1_ContainerCarEquipe>
                        {constructorId ?
                            <F1_ImageCar source={sourceImgCar}></F1_ImageCar>
                            :
                            <F1_ImageCar source={require('../../assets/forbidden.png')}></F1_ImageCar>
                        }
                    </F1_ContainerCar>
                    {/* Informações extras do piloto (local e data de nascimento) */}
                    <F1_CardInfoExtra style={{ backgroundColor: '#37374E' }}>
                        <F1_TextInfoExtra>
                            <Text style={{ fontFamily: 'OpenSans-Regular' }} >Local de nascimento</Text>
                        </F1_TextInfoExtra>
                        <F1_TextInfoExtraDestaque style={{ marginBottom: 18 }}>
                            <Text style={{ fontFamily: 'Ubuntu-Medium' }}>{infoExtra.localNascimento}</Text>
                        </F1_TextInfoExtraDestaque>
                        <F1_TextInfoExtra>
                            <Text style={{ fontFamily: 'OpenSans-Regular' }} >Data</Text>
                        </F1_TextInfoExtra>
                        <F1_TextInfoExtraDestaque>
                            <Text style={{ fontFamily: 'Ubuntu-Medium' }}>{dateOfBirth}</Text>
                        </F1_TextInfoExtraDestaque>
                    </F1_CardInfoExtra>
                    {/* Biografia do piloto */}
                    <F1_CardBio>
                        <F1_ConteinerBio>
                            <F1_TituloBio>
                                <Text style={{ fontFamily: 'Ubuntu-Medium' }}>Biografia</Text>
                            </F1_TituloBio>
                        </F1_ConteinerBio>
                        <F1_TextBio>
                            <Text style={{ fontFamily: 'OpenSans-Regular' }}>{infoExtra.bio}</Text>
                        </F1_TextBio>
                    </F1_CardBio>
                </F1_Container>
            </ScrollView>

        )
    )
}

const styles = StyleSheet.create({
    titulo: {
        fontSize: 20,
    },
    conteudo: {
        fontWeight: "bold"
    },
    subtitulo: {
        fontSize: 20,
        marginTop: 15
    },
    card: {
        backgroundColor: '#FFF',
        marginLeft: 15,
        marginRight: 15,
        marginTop: 15,
        elevation: 2,
        padding: 15,
        borderRadius: 10
    },
    cardTitle: {
        fontWeight: 'bold',
        fontSize: 20
    }
});