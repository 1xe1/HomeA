import axios from 'axios';

export const DataHomeU = () => {
    return axios.get('http://localhost:8081/HomeA/apiHomeU/')
        .then(response => response.data)
        .catch(error => {
            console.log(error);
            return [];
        });
};