import axios from 'axios';

export const FetchData = (modulo) => {
    const instance = axios.create({
        baseURL: `https://localhost:7068/api/${modulo}`
    }); 

    const config = {
        Headers: {
            Authorization: 'bearer '
        }
    }
    return instance;
}
