import React, { useState } from "react";

export default function NomeCompletoEvento({ data }){
    const [nomeCompleto, setNomeCompleto] = useState(getNomeCompleto(data));
    function getNomeCompleto(param) {
        switch(param) {
            case 'bahrain':
                return 'Fórmula 1 Gulf Air Grande Prêmio do Bahrein 2023';
                break;
            case 'jeddah':
                return 'Fórmula 1 STC Grande Prêmio da Arábia Saudita 2023';
                break;
            case 'albert_park':
                return 'Fórmula 1 Rolex Grande Prêmio da Austrália 2023';
                break;
            case 'baku':
                return 'Fórmula 1 Grande Prêmio do Azerbaijão 2023';
                break;
            case 'miami':
                return 'Fórmula 1 Crypto.com Grande Prêmio de Miami 2023';
                break;
            case 'imola':
                return 'Fórmula 1 Qatar Airways Grande Prêmio da Itália e Emilia-Romagna 2023';
                break;
            case 'monaco':
                return 'Fórmula 1 Grande Prêmio de Mônaco 2023';
                break;
            case 'catalunya':
                return 'Fórmula 1 AWS Grande Prêmio da Espanha 2023';
                break;
            case 'villeneuve':
                return 'Fórmula 1 Pirelli Grande Prêmio do Canadá 2023';
                break;
            case 'red_bull_ring':
                return 'Fórmula 1 Rolex Grande Prêmio Grosser Von Österreich 2023';
                break;
            case 'silverstone':
                return 'Fórmula 1 Aramco Grande Prêmio da Inglaterra 2023';
                break;
            case 'hungaroring':
                return 'Fórmula 1 Qatar Airways Grande Prêmio da Hungria 2023';
                break;
            case 'spa':
                return 'Fórmula 1 MSC Cruises Grande Prêmio da Bélgica 2023';
                break;
            case 'zandvoort':
                return 'Fórmula 1 Heineken Grande Prêmio da Holanda 2023';
                break;
            case 'monza':
                return 'Fórmula 1 Pirelli Grande Prêmio da Itália 2023';
                break;
            case 'marina_bay':
                return 'Fórmula 1 Singapore Airlines Grande Prêmio de Singapura 2023';
                break;
            case 'suzuka':
                return 'Fórmula 1 Lenovo Grande Prêmio do Japão 2023';
                break;
            case 'losail':
                return 'Fórmula 1 Qatar Airways Grande Prêmio do Catar 2023';
                break;
            case 'americas':
                return 'Fórmula 1 Lenovo Grande Prêmio dos Estados Unidos 2023';
                break;
            case 'rodriguez':
                return 'Fórmula 1 Grande Prêmio da Cidade do México 2023';
                break;
            case 'interlagos':
                return 'Fórmula 1 Rolex Grande Prêmio de São Paulo 2023';
                break;
            case 'vegas':
                return 'Fórmula 1 Heineken Silver Grande Prêmio de Las Vegas 2023';
                break;
            case 'yas_marina':
                return 'Fórmula 1 Etihad Airways Grande Prêmio de Abu Dhabi 2023';
                break;
            default:
                return data;
        }
    }
    return nomeCompleto;
}