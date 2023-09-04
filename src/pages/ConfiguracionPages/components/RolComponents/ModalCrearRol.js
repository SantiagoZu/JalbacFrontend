import React, { useState, useEffect } from 'react'
import { Label, Select } from '@windmill/react-ui'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@windmill/react-ui';
import { showAlertCorrect, showAlertIncorrect } from '../../../../helpers/Alertas';
import { Formik } from 'formik';
import { CustomInput } from '../../../../components/CustomInput';
import { CustomInput2 } from '../../../../components/CustomInput2';
import { SpanError } from '../../../../components/styles/styles';
import { initialValues, validateInputs } from './RolFormValidations/RolesFormik';

import { usePermisos } from "../../../../services/hooks/usePermisos";
import { useRoles } from '../../../../services/hooks/useRoles';

import { Switch } from "antd";

export const ModalCrearRol = ({ isOpen, isClose }) => {

  const { postRoles, validacionRol } = useRoles();
  const { allPermisos } = usePermisos();
  const [select, setSelect] = useState([]);

  const handleChange = (checked, permisoId) => {
    if (checked) {
      if (!select.some((permiso) => permiso.idPermiso === permisoId)) {
        setSelect((prevS) => [...prevS, { idPermiso: permisoId }]);
      }
    }
    else {
      setSelect((prevS) => prevS.filter((id) => id.idPermiso !== permisoId));
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => validateInputs(values, select, validacionRol)}
      onSubmit={(valores, { resetForm }) => {
        const updatedValues = {
          nombre: valores.rol,
          estado: true,
          permisos: select
        };
        postRoles(updatedValues).then(response => {
          isClose()
          resetForm();
          showAlertCorrect('Rol creado correctamente', 'success')
          // window.location.reload();
        }).catch(response => {
          showAlertIncorrect('No se pudo crear el rol', 'error')
        })

      }}>
      {({ errors, handleSubmit, touched }) => (
        <form onSubmit={handleSubmit}>
          <Modal isOpen={isOpen} onClose={isClose}>
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
                  />
                  {touched.rol && errors.rol && <SpanError>{errors.rol}</SpanError>}
                </div>
              </Label>

              <Label className="mt-4">
                <span>Permisos</span>
              </Label>
              <div className='grid grid-cols-2'>
                {allPermisos.map((mapPermiso) => (
                  <div key={mapPermiso.idPermiso} className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400 mt-2">
                    <Switch name="checked" className="mr-3" checked={select.some((permiso) => permiso.idPermiso === mapPermiso.idPermiso)} onChange={(checked) => handleChange(checked, mapPermiso.idPermiso)} />
                    {mapPermiso.nombrePermiso}
                  </div>
                ))}
              </div>

              <div className='mt-2'>
                {touched.checked && errors.checked && <SpanError>{errors.checked}</SpanError>}
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="hidden sm:block">
                <Button layout="outline" onClick={isClose}>
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
