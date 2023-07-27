import React, { useState, useEffect } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@windmill/react-ui';
import { usePermisos } from '../../../../services/hooks/UsePermisos';

export const ModalPermisos = ({ isOpen, isClose, idRol }) => {

    const [permisos, setPermisos] = useState([]);
    const { getPermisosRol } = usePermisos();

    getPermisosRol(idRol).then(response =>{
        const data = response.data.resultado;
        setPermisos(data)
    })

  return (
    <>
    <Modal isOpen={isOpen} onClose={isClose}>
        <ModalHeader className='mb-3'>Permisos</ModalHeader>

        <ModalBody>
            <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                {permisos.map((permiso) => (
                    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600" key={permiso.idPermiso}>
                        <div className="flex items-center pl-3">
                            <Input id="vue-checkbox" type="checkbox" value="" checked={true} disabled={true} className="w-4 h-4 text-blue-600  bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                            <label className="w-full py-3 ml-2 text-sm font-medium text-gray-900  dark:text-gray-300">{permiso.nombrePermiso}</label>
                        </div>
                    </li>
                ))}
            </ul>
        </ModalBody>

        <ModalFooter>
            <div className="hidden sm:block">
                <Button layout="outline" onClick={isClose}>
                  Cancelar
                </Button>
            </div>
        </ModalFooter>
    </Modal>
        

    </>
    
  )
}