import { useEffect, useState } from "react";
import { FetchData } from "../GenericAxios";

export const useEmpleados = () => {
    const [empleados, setEmpleados] = useState([]);
    const [empleado, setEmpleado] = useState({});
    // const [empleadoEditado, setEmpleadoEditado] = useState({});
    const instance = FetchData('Empleado')

    //llamado a la api de empleados
    useEffect(() => {
        cargarEmpleados();
        // editarEmpleado();
    }, []);


    const cargarEmpleados = async () => {
        const response = await instance.get()
        const data = response.data.resultado;
        setEmpleados(data)
    }

    const editarEmpleado = async (id, obj) => {
        const response = await instance.put(`/${id}`, obj);
        const data = response.data.resultado;
    }

    const cargarEmpleado = async (idEmpleado) => {
        const response = await instance.get(`/${idEmpleado}`);
        const data = response.data.resultado;
    }

    const eliminarEmpleado = async (idEmpleado) => {
        const response = await instance.delete(`/${idEmpleado}`);
        const data = response.data.resultado;
        setEmpleado(empleados);
    }

    return {
        empleados,
        empleado,
        cargarEmpleado,
        editarEmpleado,
        cargarEmpleados,
        eliminarEmpleado,
    }
}
