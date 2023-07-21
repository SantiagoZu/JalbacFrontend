import React, { useState, useEffect } from 'react'
import { Label, Select } from '@windmill/react-ui'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@windmill/react-ui';
import { showAlertCorrect } from '../../../../helpers/Alertas';
import { Formik } from 'formik';
import { CustomInput } from '../../../../components/CustomInput';
import { CustomInput2 } from '../../../../components/CustomInput2';
import { SpanError } from '../../../../components/styles/styles';
import { initialValues, validateInputs } from './RolFormValidations/RolesFormik';


export const ModalCrearRol = ({ isOpen, isClose }) => {

  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => validateInputs(values)}
      onSubmit={(valores, { resetForm }) => {
        resetForm();
        showAlertCorrect('Rol creado correctamente', 'success', isClose)
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
                <CustomInput2 type="checkbox" id="rol" name="checked" className="ml-3" value="Dashboard"/> Dashboard <br />
                <CustomInput2 type="checkbox" id="rol" name="checked" className="ml-3" value="Backup"/> Backup <br />
                <CustomInput2 type="checkbox" id="rol" name="checked" className="ml-3" value="Roles"/> Roles <br />
                <CustomInput2 type="checkbox" id="rol" name="checked" className="ml-3" value="Usuarios"/> Usuarios <br />
                <CustomInput2 type="checkbox" id="rol" name="checked" className="ml-3" value="Empleados"/> Empleados <br />
                <CustomInput2 type="checkbox" id="rol" name="checked" className="ml-3" value="Clientes"/> Clientes <br />
                <CustomInput2 type="checkbox" id="rol" name="checked" className="ml-3" value="Pedidos"/> Pedidos <br />
                <CustomInput2 type="checkbox" id="rol" name="checked" className="ml-3" value="Devoluciones"/> Devoluciones <br />
              </Label>
              {touched.checked && errors.checked && <SpanError>{errors.checked}</SpanError>}

              <Label className="mt-4">
                <span>Estado</span>
                <Select className="mt-1">
                  <option>Activo</option>
                  <option>Inactivo</option>
                </Select>
              </Label>
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