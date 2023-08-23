import React, { useState, useEffect } from 'react'
import { Label, Select } from '@windmill/react-ui'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@windmill/react-ui';
import { showAlertCorrect, showAlertIncorrect } from '../../../../helpers/Alertas';
import { Field, Formik } from 'formik';
import { CustomInput } from '../../../../components/CustomInput';
import { SpanError } from '../../../../components/styles/styles';
import { validateEditInputs } from './RolFormValidations/RolesFormik';
import { usePermisos } from '../../../../services/hooks/usePermisos';
import { useRoles } from '../../../../services/hooks/useRoles';
import { Switch } from "antd";

export const ModalEditarRol = ({ isOpen, isClose, rol }) => {

  const { editarRol } = useRoles();
  const { allPermisos, getPermisosRol } = usePermisos();
  const [permisosRol, setPermisosRol] = useState([]);
  const [selectedPermisos, setSelectedPermisos] = useState([]);

  useEffect(() => {
    getPermisosRol(rol.idRol).then(response => {
      const data = response.data.resultado;
      setPermisosRol(data);

      // Agregar los idPermiso marcados inicialmente a la lista selectedPermisos
      const selectedIds = data.map(permiso => ({ idPermiso: permiso.idPermiso }));
      setSelectedPermisos(selectedIds);
    });
  }, [rol.idRol]);

  const handleChange = (checked, permisoId) => {
    if (checked) {
      if (!selectedPermisos.some((permiso) => permiso.idPermiso === permisoId)) {
        setSelectedPermisos((prevS) => [...prevS, { idPermiso: permisoId }]);
      }
    }
    else {
      setSelectedPermisos((prevS) => prevS.filter((id) => id.idPermiso !== permisoId));
    }
  };

  const initialValues = {
    rol: rol.nombre || '',
    estado: rol.estado ? 'true' : 'false'

  };

  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => validateEditInputs(values, selectedPermisos)}
      onSubmit={(valores, { resetForm }) => {
        const rolCompleto = {
          idRol: rol.idRol,
          nombre: valores.rol,
          estado: JSON.parse(valores.estado),
          permisos: selectedPermisos
        }

        editarRol(rol.idRol, rolCompleto).then(response => {
          resetForm();
          isClose()
          showAlertCorrect("Rol editado correctamente", "success", isClose)
        }).catch(response => {
          showAlertIncorrect("No se pudo editar el rol", "error", isClose)
        })

      }}
    >

      {({ errors, handleSubmit, touched }) => (
        <form onSubmit={handleSubmit}>
          <Modal isOpen={isOpen} onClose={isClose}>
            <ModalHeader className='mb-3'>Editar Rol</ModalHeader>
            <ModalBody>
              <Label className="mt-4">
                <span>Rol</span>
                <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                  <CustomInput
                    type="text"
                    id="rol"
                    name="rol"
                    placeholder=""
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
                    <Switch name="checked" className="mr-3" checked={selectedPermisos.some((permiso) => permiso.idPermiso === mapPermiso.idPermiso)} onChange={(checked) => handleChange(checked, mapPermiso.idPermiso)} />
                    {mapPermiso.nombrePermiso}
                  </div>
                ))}
              </div>
              {touched.checked && errors.checked && <SpanError>{errors.checked}</SpanError>}


              <Label className="mt-4">
                <span>Estado</span>
                <Field name="estado" id="estado">
                  {({ field }) => (
                    <Select {...field} className="mt-1">
                      <option value="true">Activo</option>
                      <option value="false">Inactivo</option>
                    </Select>
                  )}
                </Field>
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
                  Aceptar
                </Button>
              </div>
            </ModalFooter>
          </Modal>
        </form>
      )}
    </Formik>
  )
}