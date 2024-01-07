import axios from 'axios';

export const DataHomeP = () => {
    return axios.get('http://localhost:8081/HomeA/apiHomeP/')
        .then(response => response.data)
        .catch(error => {
            console.log(error);
            return [];
        });
};