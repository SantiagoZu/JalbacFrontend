import { useEffect, useState } from "react";
import { FetchData } from "../GenericAxios";
import Cookies from "js-cookie";
import jwtDecode from 'jwt-decode';
import moment from "moment";

export const useBackup = () => {
    const [backup, setBackup] = useState([]);
    const instance = FetchData('Backup')
    let cookie = Cookies.get("CookieJalbac");
    const unencryptToken = jwtDecode(cookie);
    const idUsuario = unencryptToken.unique_name;

    useEffect(() => {
        getBackup();
    }, []);

    const getBackup = async () => {
        const response = await instance.get()
        const data = response.data.resultado;
        setBackup(data)
        return backup;
    }

    const getBackupDownload = async () => {
        const response = await instance.get('/Download', {
            responseType: 'blob',
        });
        const blob = new Blob([response.data], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);

        // Crea un enlace temporal y simula un clic para descargar el archivo
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Backup${moment().format("DD/MM/YYYY")}.bak`);
        document.body.appendChild(link);
        link.click();

        // Libera el objeto URL y elimina el enlace temporal
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
    }

    const postBackup = async(obj) =>{
        return await instance.post("/", obj).then((response) => {
            return response
        })
    }

    return {
        backup,
        idUsuario,
        getBackup,
        getBackupDownload,
        postBackup
    }
}