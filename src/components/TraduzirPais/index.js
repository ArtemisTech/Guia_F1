import React, { useState } from "react";

export default function TraduzirPais({ data }){
    const [pais, setPais] = useState(traduzirPaises(data));
    function traduzirPaises(param) {
        switch(param) {
            case 'Bahrain':
                return 'Bahrein';
                break;
            case 'Saudi Arabia':
                return 'Arábia Saudita';
                break;
            case 'Australia':
                return 'Austrália';
                break;
            case 'Azerbaijan':
                return 'Azerbaijão';
                break;
            case 'USA':
                return 'Estados Unidos';
                break;
            case 'Italy':
                return 'Itália';
                break;
            case 'Monaco':
                return 'Mônaco';
                break;
            case 'Spain':
                return 'Espanha';
                break;
            case 'Canada':
                return 'Canadá';
                break;
            case 'Austria':
                return 'Áustria';
                break;
            case 'UK':
                return 'Reino Unido';
                break;
            case 'Hungary':
                return 'Hungria';
                break;
            case 'Belgium':
                return 'Bélgica';
                break;
            case 'Netherlands':
                return 'Holanda';
                break;
            case 'Singapore':
                return 'Singapura';
                break;
            case 'Japan':
                return 'Japão';
                break;
            case 'Qatar':
                return 'Catar';
                break;
            case 'Mexico':
                return 'México';
                break;
            case 'Brazil':
                return 'Brasil';
                break;
            case 'United States':
                return 'Estados Unidos';
                break;
            case 'UAE':
                return 'Emirados Árabes';
                break;
            default:
                return data;
        }
    }
    return pais;
}