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

export const ModalCrearRol = ({ isOpen, isClose }) => {

  const {postRoles} = useRoles();
  const {allPermisos} = usePermisos();
  const [select, setSelect] = useState([]);
  const [formValues, setFormValues] = useState({
    checked: {}
  });

  const handleChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelect([...select, { idPermiso: value }]);
    } else {
      setSelect(select.filter((obj) => obj.idPermiso !== value));
    }

    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      checked: {
        ...prevFormValues.checked,
        [value]: checked 
      }
    }));
  };


  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => validateInputs(values)}
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
                <span>Permisos</span> <br />
                  {allPermisos.map((permiso)=>(
                    <div key={permiso.idPermiso} className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                      <Input type="checkbox" id={`checked_${permiso.idPermiso}`} name="checked" className="mr-1" value={permiso.idPermiso} checked={formValues.checked[permiso.idPermiso] || false} onChange={handleChange}/>
                      {permiso.nombrePermiso}
                      <br/>
                    </div>
                ))}    
              </Label>
              {touched.checked && errors.checked && <SpanError>{errors.checked}</SpanError>}
              
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
