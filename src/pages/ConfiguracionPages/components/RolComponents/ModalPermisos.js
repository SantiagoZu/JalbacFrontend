import React, { useState, useEffect } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@windmill/react-ui';
import { usePermisos } from '../../../../services/hooks/UsePermisos';
import { Switch } from "antd";

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
            <div className="flex items-center pl-3">
                {permisos.map((permiso) => (
                    <label key={permiso.idPermiso}>
                        <span>{permiso.nombrePermiso}</span>
                        <Switch defaultChecked={false} id="checked" name="checked"/>
                    </label>
                        
                    
                ))}
            </div>
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