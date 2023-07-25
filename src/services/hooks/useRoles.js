import React, { useEffect, useState } from 'react';
import { FetchData } from "../GenericAxios";

export const useRoles = () => {
    const [roles, setRoles] = useState([]);

    const instance = FetchData('Rol')

    useEffect(() => {
        cargarRoles();
    }, []);


    const cargarRoles = async () => {
        const response = await instance.get()
        const data = response.data.resultado;
        setRoles(data)
    }

    return {
        roles
    }
}
