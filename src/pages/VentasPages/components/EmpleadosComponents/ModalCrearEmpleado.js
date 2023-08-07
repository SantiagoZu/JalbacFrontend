import React from 'react'
import { Label, Select } from '@windmill/react-ui'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@windmill/react-ui';
import { showAlertCorrect, showAlertIncorrect } from '../../../../helpers/Alertas';
import { Formik, Field } from 'formik';
import { CustomInput } from '../../../../components/CustomInput';
import { SpanError } from '../../../../components/styles/styles';
import { validateInputs, initialValues } from './EmpleadosFormValidations/EmpleadosFormik';
import { useEmpleados } from '../../../../services/hooks/useEmpleados';
import { useUsuarios } from '../../../../services/hooks/useUsuarios';
import { useRoles } from '../../../../services/hooks/useRoles';

export const ModalCrearEmpleado = ({ isOpen, isClose }) => {


    const { crearEmpleado, validacionDocumento } = useEmpleados();
    const { validacionCorreo } = useUsuarios();
    const { roles } = useRoles();
    return (
        <Formik
            initialValues={initialValues}
            validate={(values) => validateInputs(values, validacionDocumento, validacionCorreo)}
            onSubmit={(valores, { resetForm }) => {
                const empleado = {
                    estado: true,
                    documento: valores.documento.toString(),
                    nombre: valores.nombre,
                    apellido: valores.apellido,
                    cargo: valores.cargo,
                    idRol: valores.idRol,
                    correo: valores.correo,
                    contrasena: valores.contrasena,
                }
                crearEmpleado(empleado).then(response => {
                    isClose()
                    showAlertCorrect("Empleado creado correctamente", "success")
                    resetForm();
                    // setTimeout(() => {
                    //     window.location.reload();
                    // }, 1000);
                }).catch(response => {
                    showAlertIncorrect("No se pudo crear el empleado", "error", isClose)
                })
            }}
        >
            {({ errors, handleSubmit, touched }) => (
                <form onSubmit={handleSubmit}>
                    <Modal isOpen={isOpen} onClose={isClose}>
                        <ModalHeader className='mb-3'>Crear empleado</ModalHeader>
                        <ModalBody>
                            <Label className="mt-4">
                                <span>Documento</span>
                                <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                                    <CustomInput
                                        type="number"
                                        id="documento"
                                        name="documento"
                                        placeholder="1234567890"
                                    />
                                    {touched.documento && errors.documento && <SpanError>{errors.documento}</SpanError>}
                                </div>
                            </Label>

                            <Label className="mt-4">
                                <span>Nombre</span>
                                <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                                    <CustomInput
                                        type="text"
                                        id="nombre"
                                        name="nombre"
                                        placeholder="Santiago"
                                    />
                                    {touched.nombre && errors.nombre && <SpanError>{errors.nombre}</SpanError>}

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
                                <span>Contraseña</span>
                                <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                                    <CustomInput
                                        type="password"
                                        id="contrasena"
                                        name="contrasena"
                                        placeholder="Contraseña"
                                    />
                                    {touched.contrasena && errors.contrasena && <SpanError>{errors.contrasena}</SpanError>}
                                </div>
                            </Label>

                            <Label className="mt-4">
                                <span>Rol</span>
                                <Field
                                    as="select"
                                    id="idRol"
                                    name="idRol"
                                    className="block w-full pl-4 mt-1 mb-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-select"

                                >
                                    <option value="" label="Seleccionar..." hidden />
                                    {roles.map((rol) => (
                                        <option key={rol.idRol} value={rol.idRol}>
                                            {rol.nombre}
                                        </option>
                                    ))}

                                </Field>
                            </Label>
                            {touched.idRol && errors.idRol && <SpanError>{errors.idRol}</SpanError>}
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
                                {touched.cargo && errors.cargo && <SpanError>{errors.cargo}</SpanError>}
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
