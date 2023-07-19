import { FetchData } from "../GenericAxios";
import Cookies from "js-cookie";

export const useLogin = () => {
    const instance = FetchData('Usuario')

    const postLogin = async(obj) =>{
        const response = await instance.post("/login/", obj);

        const tokenCookie = response.data.resultado.token;
        const cookieValue = Cookies.set('CookieJalbac', tokenCookie);
        document.cookie = cookieValue;

        return response;
    }

    const deleteCookie = async() =>{
        Cookies.remove('CookieJalbac');
    }

    return {
        postLogin,
        deleteCookie
    }
}