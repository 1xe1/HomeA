import axios from 'axios';

export const DataHomeB = () => {
    return axios.get('http://localhost:8081/HomeA/apiHomeB/')
        .then(response => response.data)
        .catch(error => {
            console.log(error);
            return [];
        });
};