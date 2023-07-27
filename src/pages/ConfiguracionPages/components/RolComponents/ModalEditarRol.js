import React, { useState, useEffect } from 'react'
import { Label, Select } from '@windmill/react-ui'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@windmill/react-ui';
import { showAlertCorrect, showAlertIncorrect } from '../../../../helpers/Alertas';
import { Field, Formik } from 'formik';
import { CustomInput } from '../../../../components/CustomInput';
import { SpanError } from '../../../../components/styles/styles';
import { validateEditInputs } from './RolFormValidations/RolesFormik';
import { usePermisos } from '../../../../services/hooks/UsePermisos';
import { useRoles } from '../../../../services/hooks/useRoles';

export const ModalEditarRol = ({ isOpen, isClose, rol }) => {

  const { editarRol } = useRoles();
  const { allPermisos, getPermisosRol } = usePermisos();
  const [permisosRol, setPermisosRol] = useState([]);
  const [permisosSeleccionados, setPermisosSeleccionados] = useState([]);

  useEffect(() => {
    setPermisosSeleccionados(permisosRol.map(permiso => ({idPermiso: permiso.idPermiso})));
  }, [permisosRol]);

  const handleChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setPermisosSeleccionados([...permisosSeleccionados, { idPermiso: value }]);
    } else {
      const permisoIndex = permisosSeleccionados.findIndex(permiso => permiso.idPermiso === value);
      if (permisoIndex !== -1) {
        const updatedPermisos = [...permisosSeleccionados];
        updatedPermisos.splice(permisoIndex, 1);
        setPermisosSeleccionados(updatedPermisos);
      }
    }
    console.log(permisosSeleccionados)
  };
  
  getPermisosRol(rol.idRol).then(response =>{
    const data = response.data.resultado;
    setPermisosRol(data)
  })

  const initialValues = {
    rol: rol.nombre || '',
    estado: rol.estado ? 'true' : 'false'
    
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => validateEditInputs(values)}
      onSubmit={(valores, { resetForm }) => {
        const rolCompleto = {
          idRol: rol.idRol,
          nombre: valores.rol,
          estado: JSON.parse(valores.estado),
          permisos: permisosSeleccionados
        }

        editarRol(rol.idRol, rolCompleto).then(response =>{
          showAlertCorrect("Rol editado correctamente", "success", isClose)
          resetForm();
          setTimeout(() => {
              window.location.reload();
          }, 1000);
        }).catch(response =>{
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
              <span>Permisos</span> <br />
                <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  {allPermisos.map((mapPermiso) => (
                    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600" key={mapPermiso.idPermiso}>
                      <div className="flex items-center pl-3">
                        <Input
                           id="checked"
                           name="checked"
                           type="checkbox"
                           value={mapPermiso.idPermiso}
                           className="w-4 h-4 text-blue-600  bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                           onChange={handleChange}
                           checked={permisosSeleccionados.findIndex(permiso => permiso.idPermiso === mapPermiso.idPermiso) !== -1}
                        />
                        <label className="w-full py-3 ml-2 text-sm font-medium text-gray-900  dark:text-gray-300">{mapPermiso.nombrePermiso}</label>
                      </div>
                    </li>
                  ))}
                </ul>
                
              </Label>
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