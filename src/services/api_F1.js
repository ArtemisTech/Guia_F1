import axios from "axios";

//http://ergast.com/
//api/f1/current/driverStandings.json
//api/f1/current.json
// https://ergast.com/api/f1/drivers/alonso/driverStandings/1.json

const api = axios.create({
    baseURL: 'https://ergast.com/'
});

export default api;