import axios from 'axios';

export const DataMain = () => {
    return axios.get('http://localhost:8081/HomeA/apiMain/')
        .then(response => response.data)
        .catch(error => {
            console.log(error);
            return [];
        });
};