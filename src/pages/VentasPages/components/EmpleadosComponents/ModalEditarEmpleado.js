import React from 'react'
import { Label, Select } from '@windmill/react-ui'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@windmill/react-ui';
import { showAlertCorrect, showAlertIncorrect } from '../../../../helpers/Alertas';
import { Formik, Field } from 'formik';
import { CustomInput } from '../../../../components/CustomInput';
import { SpanError } from '../../../../components/styles/styles';
import { validateEditInputs } from './EmpleadosFormValidations/EmpleadosFormik';
import { useEmpleados } from '../../../../services/hooks/useEmpleados';
import { useUsuarios } from '../../../../services/hooks/useUsuarios';
import { useRoles } from '../../../../services/hooks/useRoles';

export const ModalEditarEmpleado = ({ isOpen, isClose, empleado }) => {
    const initialValues = {
        nombre: empleado.nombre || '',
        apellido: empleado.apellido || '',
        documento: empleado.documento || '',
        correo: empleado.idUsuarioNavigation?.correo || '',
        cargo: empleado.cargo || '',
        rol: empleado.idUsuarioNavigation?.idRolNavigation?.idRol || '',
        estado: empleado.estado ? 'true' : 'false',
        originalRol: empleado.idUsuarioNavigation?.idRolNavigation?.idRol || '',
    };

    const { editarEmpleado, validacionDocumento } = useEmpleados();
    const { validacionCorreo } = useUsuarios();
    const { roles } = useRoles();
    
    return (
        <Formik
            initialValues={initialValues}
            validate={(values) => validateEditInputs(values, validacionDocumento, validacionCorreo)}
            onSubmit={(valores, { resetForm }) => {
                const empleadoEditado = {
                    idEmpleado: empleado.idEmpleado,
                    idUsuario: empleado.idUsuario,
                    idRol: valores.idRol || initialValues.originalRol,
                    estado: JSON.parse(valores.estado),
                    documento: valores.documento.toString(),
                    nombre: valores.nombre,
                    correo: valores.correo,
                    apellido: valores.apellido,
                    cargo: valores.cargo,
                };
                editarEmpleado(empleado.idEmpleado, empleadoEditado)
                    .then(response => {
                        resetForm();
                        isClose();
                        showAlertCorrect('Empleado editado correctamente', 'success', isClose);
                    })
                    .catch(response => {
                        if (response.response.data.errorMessages[0] !== null) {
                            isClose()
                            showAlertIncorrect(response.response.data.errorMessages[0], 'error');
                        } else {
                            showAlertIncorrect('Hubo un error en la edición del empleado', 'error');
                        }
                    });
            }}
        >
            {({ errors, handleSubmit, touched, }) => (
                <form onSubmit={handleSubmit}>
                    <Modal isOpen={isOpen} onClose={isClose}>
                        <ModalHeader className='mb-3'>Editar empleado</ModalHeader>
                        <ModalBody>

                            <Label className="mt-4">
                                <span>Nombre</span>
                                <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                                    <CustomInput
                                        type="text"
                                        id="nombre"
                                        name="nombre"
                                        placeholder="Santiago Zuluaga"
                                    />
                                    {touched.nombre && errors.nombre && <SpanError>{errors.nombre}</SpanError>}
                                    {/* {console.log('nombre:', updateValues.nombre)} */}

                                </div>
                            </Label>
                            <Label className="mt-4">
                                <span>Apellidos</span>
                                <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                                    <CustomInput
                                        type="text"
                                        id="apellido"
                                        name="apellido"
                                        placeholder="Zuluaga Muñoz"
                                    />
                                    {touched.apellido && errors.apellido && <SpanError>{errors.apellido}</SpanError>}
                                </div>
                            </Label>
                            <Label className="mt-4">
                                <span>Documento</span>
                                <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                                    <CustomInput
                                        type="number"
                                        id="documento"
                                        name="documento"
                                        placeholder="12345678910"
                                    />
                                    {touched.documento && errors.documento && <SpanError>{errors.documento}</SpanError>}
                                </div>
                            </Label>
                            <Label className="mt-4">
                                <span>Correo</span>
                                <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                                    <CustomInput
                                        type="email"
                                        id="correo"
                                        name="correo"
                                        placeholder="email@email.com"
                                    />
                                    {touched.correo && errors.correo && <SpanError>{errors.correo}</SpanError>}
                                </div>
                            </Label>

                            <Label className="mt-4">
                                <span>Rol</span>
                                <Field
                                    id="idRol"
                                    name="idRol"
                                // className="block w-full pl-4 mt-1 mb-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-select"
                                >
                                    {({ field }) => (
                                        <Select {...field}>
                                            {/* <option value={null} label='Seleccionar...'/> */}
                                            {roles.map((rol) => (
                                                <option key={rol.idRol} value={rol.idRol}>
                                                    {rol.nombre}
                                                </option>
                                            ))}
                                        </Select>
                                    )}

                                </Field>
                            </Label>

                            <Label className="mt-4">
                                <span>Cargo</span>
                                <Field name="cargo" id="cargo">
                                    {({ field }) => (
                                        <Select {...field} className="mt-1">
                                            <option hidden>Seleccionar...</option>
                                            <option value="Vaceador">Vaceador</option>
                                            <option value="Diseñador 3D">Diseñador 3D</option>
                                            <option value="A mano">A mano</option>
                                        </Select>
                                    )}
                                </Field>
                            </Label>
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
                                <Button type="button" onClick={handleSubmit}>Enviar</Button>
                            </div>
                        </ModalFooter>
                    </Modal>
                </form>
            )}
        </Formik >
    )
}
