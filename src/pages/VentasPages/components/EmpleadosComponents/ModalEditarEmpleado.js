import React, { useState, useEffect } from 'react'
import { Label, Select } from '@windmill/react-ui'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@windmill/react-ui';
import { showAlertCorrect, showAlertIncorrect } from '../../../../helpers/Alertas';
import { Formik, Field } from 'formik';
import { CustomInput } from '../../../../components/CustomInput';
import { SpanError } from '../../../../components/styles/styles';
import { validateEditInputs } from './EmpleadosFormValidations/EmpleadosFormik';
import { useEmpleados } from '../../../../services/hooks/useEmpleados';
import { useRoles } from '../../../../services/hooks/useRoles';

export const ModalEditarEmpleado = ({ isOpen, isClose, empleado }) => {
    // const [documentoUnico, setDocumentoUnico] = useState(false);
    const initialValues = {
        nombre: empleado.nombre || '',
        apellido: empleado.apellido || '',
        documento: empleado.documento || '',
        correo: empleado.idUsuarioNavigation?.correo || '',
        cargo: empleado.cargo || '',
        rol: empleado.idUsuarioNavigation?.idRolNavigation?.nombre || '',
        estado: empleado.estado ? 'true' : 'false',
    };

    const { editarEmpleado } = useEmpleados();
    const { roles } = useRoles();
    const rolesDropdown = [
        { value: '', label: initialValues.rol },
        ...roles.map((rol) => ({ value: rol.idRol, label: rol.nombre })),
    ];

    

    return (
        <Formik
            initialValues={initialValues}
            validate={(values) => validateEditInputs(values)}
            onSubmit={(valores, { resetForm }) => {
                const empleadoEditado = {
                    idEmpleado: empleado.idEmpleado,
                    idUsuario: empleado.idUsuario,
                    idRol: empleado.idUsuarioNavigation.idRol,
                    estado: JSON.parse(valores.estado),
                    documento: valores.documento.toString(),
                    nombre: valores.nombre,
                    correo: valores.correo,
                    apellido: valores.apellido,
                    cargo: valores.cargo
                };
                editarEmpleado(empleado.idEmpleado, empleadoEditado)
                    .then(response => {
                        showAlertCorrect('Empleado editado correctamente', 'success', isClose);
                        resetForm();
                        setTimeout(() => {
                            window.location.reload();
                        }, 1000);
                    })
                    .catch(response => {
                        showAlertIncorrect('Hubo un error en la edición del empleado', 'error');
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
                                <CustomInput
                                    type="select"
                                    id="idRol"
                                    name="idRol"
                                    options={rolesDropdown}
                                />
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
