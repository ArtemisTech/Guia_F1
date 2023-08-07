import React, { useState } from "react";

export default function ConverterMes({data}) {
    const dataSplit = data.date.split('-');
    const dataDia = dataSplit[2];
    const dataMes = dataSplit[1];
    const [dataCorrida, setDataCorrida] = useState(traduzirMes(dataMes));
    function traduzirMes(param) {
        switch(param) {
            case '01':
                return 'jan';
                break;
            case '02':
                return 'fev';
                break;
            case '03':
                return 'mar';
                break;
            case '04':
                return 'abr';
                break;
            case '05':
                return 'mai';
                break;
            case '06':
                return 'jun';
                break;
            case '07':
                return 'jul';
                break;
            case '08':
                return 'ago';
                break;
            case '09':
                return 'set';
                break;
            case '10':
                return 'out';
                break;
            case '11':
                return 'nov';
                break;
            case '12':
                return 'dez';
                break;
            default:
                return dataMes;
        }
    }
    return dataCorrida;
}