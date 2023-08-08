import React, { useState, useEffect } from 'react'
import { Label, Select } from '@windmill/react-ui'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@windmill/react-ui';
import { showAlertCorrect, showAlertIncorrect } from '../../../../helpers/Alertas';
import { Formik } from 'formik';
import { CustomInput } from '../../../../components/CustomInput';
import { CustomInput2 } from '../../../../components/CustomInput2';
import { SpanError } from '../../../../components/styles/styles';
import { initialValues, validateInputs } from './RolFormValidations/RolesFormik';

import { usePermisos } from "../../../../services/hooks/UsePermisos";
import { useRoles } from '../../../../services/hooks/useRoles';

import { Switch } from "antd";

export const ModalCrearRol = ({ isOpen, isClose }) => {

  const {postRoles, validacionRol} = useRoles();
  const [nombreError, setNombreError] = useState('');
  const {allPermisos} = usePermisos();
  const [select, setSelect] = useState([]);


  const handleChange = (checked, permisoId  ) => {
    if (checked) {
      if (!select.some((permiso) => permiso.idPermiso === permisoId)) {
        setSelect((prevS) => [...prevS, { idPermiso: permisoId}]);
      }
    }
    else {
      setSelect((prevS) => prevS.filter((id) => id.idPermiso !== permisoId));
    }
  };
  console.log(select)

  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => validateInputs(values, select)}
      onSubmit={(valores, { resetForm }) => {
        const updatedValues = {
          nombre: valores.rol,
          estado: true,
          permisos: select
      };
      postRoles(updatedValues).then(response =>{
        resetForm();
        showAlertCorrect('Rol creado correctamente', 'success', isClose)
        window.location.reload();
      }).catch(response =>{
        showAlertIncorrect('No se pudo crear el rol', 'error', isClose)
      })
        
      }}>
      {({ errors, handleSubmit, touched, setFieldError, resetForm }) => (
        <form onSubmit={handleSubmit}>
          <Modal isOpen={isOpen} onClose={isClose(resetForm())}>
            <ModalHeader className='mb-3'>Registrar Rol</ModalHeader>
            <ModalBody>
              <Label className="mt-4">
                <span>Rol</span>
                <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                  <CustomInput
                    type="text"
                    id="rol"
                    name="rol"
                    placeholder="Empleado"
                    onBlur={async (e) => {
                      const result = await validacionRol(e.target.value.toString());
                      if (result.isExistoso) {
                          setNombreError('Ya existe un rol con el mismo nombre');
                          setFieldError('rol', 'Ya existe un rol con el mismo nombre');
                      } else {
                        setNombreError('');
                          setFieldError('rol', '');
                      }

                  }}
                  />
                  {touched.rol && errors.rol && <SpanError>{errors.rol}</SpanError>}
                  {nombreError && <SpanError>{nombreError}</SpanError>}
                </div>
              </Label>

              <Label className="mt-4">
                <span>Permisos</span> <br />
                  {allPermisos.map((mapPermiso)=>(
                    <div key={mapPermiso.idPermiso} className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                      <Switch name="checked" className="mr-3 mt-2" checked={select.some((permiso) => permiso.idPermiso === mapPermiso.idPermiso)} onChange={(checked) => handleChange(checked, mapPermiso.idPermiso)}/>
                      {mapPermiso.nombrePermiso}
                      <br/>
                    </div>
                ))}    
                {touched.checked && errors.checked && <SpanError>{errors.checked}</SpanError>}
              </Label>
              
              
            </ModalBody>
            <ModalFooter>
              <div className="hidden sm:block">
                <Button layout="outline" onClick={isClose(resetForm())}>
                  Cancelar
                </Button>
              </div>
              <div className="hidden sm:block">
                <Button type="submit" onClick={handleSubmit}>
                  Enviar
                </Button>
              </div>
            </ModalFooter>
          </Modal>
        </form>
      )}
    </Formik>

    
  )
}
