import { useEffect, useState } from "react";
import { FetchData } from "../GenericAxios";

export const useEstados = () => {
    const [estados, setEstados] = useState([]);
    const instance = FetchData('Estado')

    //llamado a la api de Estados
    useEffect(() => {
        const cargarEstados = async () => {
            const response = await instance.get()
            const data = response.data.resultado;
           
            setEstados(data)
        }
        cargarEstados();
    }, []);




    return {
        estados,
    }
}