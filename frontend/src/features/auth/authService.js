//making HTTP request and sending data back/setting it in localStorage
import axios from 'axios';

const API_URL = '/api/users/';

//register user
const register = async (userData) => { //userData (a.k.a. user in the authSlice file's register function) 
    const response = await axios.post(API_URL, userData);
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
}

//login user 
const login = async (userData) => { //userData (a.k.a. user in the authSlice file's register function) 
    const response = await axios.post(API_URL + "login", userData);
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
}

//logout user
const logout = () => {
    localStorage.removeItem('user');
}

const authService = {
    register,
    login,
    logout,
}

export default authService;