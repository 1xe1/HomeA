// ApiLogin.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/HomeA/apiLogin/';

const loginUser = async (email, password) => {
  try {
    const response = await axios.post(API_BASE_URL, {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.error('Error in loginUser:', error);
    throw error;
  }
};

export default loginUser;
