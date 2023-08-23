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

    const postRoles = async (obj) =>{
        return await instance.post("/",obj)
    }

    const editarRol = async (id, obj) => {
        return await instance.put(`/${id}`, obj);
    }

    const eliminarRol = async (idRol) => {
        return await instance.delete(`/${idRol}`);
    }

    const validacionRol = async (nombre) => {
        const response = await instance.post(`/${nombre}`);
        return response.data;
        
    };

    return {
        roles,
        postRoles,
        editarRol,
        eliminarRol,
        validacionRol,
        cargarRoles
    }
}
