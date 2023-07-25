import { useEffect, useState } from "react";
import { FetchData } from "../GenericAxios";
import Cookies from "js-cookie";
import jwtDecode from 'jwt-decode';
import { useLogin } from "./useLogin";

export const usePermisos = () => {
    const { idUser } = useLogin();
    const [permisos, setPermisos] = useState([]);
    const [allPermisos, setAllPermisos] = useState([]);
    const instance = FetchData('Permiso')
    let cookie = null


    useEffect(() => {
        getAllPermisos();

        if (Cookies.get('CookieJalbac') !== '') {
            cookie = Cookies.get("CookieJalbac");
            const unencryptToken = jwtDecode(cookie);
            const idUsuario = unencryptToken.unique_name;
            getPermisos(idUsuario);
        }
        else {
            console.log('no logueado')
        }

    }, []);

    const getPermisos = async (id) => {
        const response = await instance.get(`/${id}`)
        const data = response.data.resultado;
        setPermisos(data)
        return permisos;
    }

    const getAllPermisos = async () =>{
        const response = await instance.get()
        const data = response.data.resultado;
        setAllPermisos(data)
    }


    return {
        permisos,
        allPermisos,
        getPermisos
    }
}