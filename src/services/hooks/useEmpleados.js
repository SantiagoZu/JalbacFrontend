import { useEffect, useState } from "react";
import { FetchData } from "../GenericAxios";

export const useEmpleados = () => {
    const [empleados, setEmpleados] = useState([]);
    const instance = FetchData('Empleado')

    //llamado a la api de Empleados
    useEffect(() => {
        const cargarEmpleados = async () => {
            const response = await instance.get()
            const data = response.data.resultado;
   
            setEmpleados(data)
        }
        cargarEmpleados();
    }, []);




    return {
        empleados,
    }
}