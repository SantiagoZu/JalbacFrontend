import { useEffect, useState } from "react";
import { FetchData } from "../GenericAxios";

export const useEmpleados = () => {
    const [empleados, setEmpleados] = useState([]);
    const [empleado, setEmpleado] = useState({});
    const [loading, setLoading] = useState(true)

    // const [empleadoEditado, setEmpleadoEditado] = useState({});
    const instance = FetchData('Empleado')

    //llamado a la api de empleados
    useEffect(() => {
        cargarEmpleados();      
        setTimeout(() => {
            setLoading(false)
        }, 5000);
        // editarEmpleado();
    }, []);


    const cargarEmpleados = async () => {
        const response = await instance.get()
        const data = response.data.resultado;
        setEmpleados(data)
    }

    const editarEmpleado = async (id, obj) => {
        const response = await instance.put(`/${id}`, obj);
    }

    const cargarEmpleado = async (idEmpleado) => {
        const response = await instance.get(`/${idEmpleado}`);
        const data = response.data.resultado;
        setEmpleados(data)
    }

    const eliminarEmpleado = async (idEmpleado) => {
        const response = await instance.delete(`/${idEmpleado}`);
        setEmpleado(empleados);
    }

    const crearEmpleado = async (obj) => {
        const response = await instance.post("/", obj);
    }

    const validacionDocumento = async (documento) => {
        const response = await instance.post(`/${documento}`);
        return response.data;

    };

    return {
        empleados,
        empleado,
        loading,
        cargarEmpleado,
        editarEmpleado,
        cargarEmpleados,
        eliminarEmpleado,
        crearEmpleado,
        validacionDocumento,
        setLoading
    }
}