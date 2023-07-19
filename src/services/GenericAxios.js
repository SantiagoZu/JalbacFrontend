import axios from 'axios';
import Cookies from 'js-cookie';

export const FetchData = (modulo) => {

    const jwt = Cookies.get('CookieJalbac')
    
    const instance = axios.create({
        baseURL: `https://localhost:7068/api/${modulo}`,
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    }); 

    // const config = {
    //     Headers: {
    //         Authorization: `Bearer ${jwt}`
    //     }
    // }
    return instance;
}
