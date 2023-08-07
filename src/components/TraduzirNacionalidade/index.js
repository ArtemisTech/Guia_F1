import React, { useState } from "react";

export default function TraduzirNacionalidade({ data }) {
    const [nacionalidade, setNacionalidade] = useState(traduzirNacionalidade(data));
    function traduzirNacionalidade(param) {
        switch (param) {
            case 'Dutch':
                // return 'Holandês(a)';
                return 'Holanda';
                break;
            case 'Austrian':
                // return 'Austríaco(a)';
                return 'Áustria';
                break;
            case 'Mexican':
                // return 'Mexicano(a)';
                return 'México';
                break;
            case 'Spanish':
                // return 'Espanhol(a)';
                return 'Espanha';
                break;
            case 'British':
                // return 'Britânico(a)';
                return 'Grã-Bretanha';
                break;
            case 'German':
                // return 'Alemão(ã)';
                return 'Alemanha';
                break;
            case 'Italian':
                // return 'Italiano(a)';
                return 'Itália';
                break;
            case 'Monegasque':
                // return 'Monegasco';
                return 'Mônaco';
                break;
            case 'Canadian':
                // return 'Canadense';
                return 'Canadá';
                break;
            case 'French':
                // return 'Francês(a)';
                return 'França';
                break;
            case 'American':
                // return 'Americano(a)';
                return 'Estados Unidos';
                break;
            case 'Finnish':
                // return 'Finlandês(a)';
                return 'Finlândia';
                break;
            case 'Swiss':
                // return 'Suíço(a)';
                return 'Suíça';
                break;
            case 'Australian':
                // return 'Australiano(a)';
                return 'Austrália';
                break;
            case 'Chinese':
                // return 'Chinês(a)';
                return 'China';
                break;
            case 'Japanese':
                // return 'Japonês(a)';
                return 'Japão';
                break;
            case 'Danish':
                // return 'Dinamarquês(a)';
                return 'Dinamarca';
                break;
            case 'Thai':
                // return 'Tailandês(a)';
                return 'Tailândia';
                break;
            default:
                return data;
        }
    }
    return nacionalidade;
}