import React, { useState, useEffect } from 'react'

import { HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@windmill/react-ui';
import { Input2 } from '../../../../components/Input';
import Swal from 'sweetalert2'

import { expresiones } from '../../../../helpers/validacionesRegex';
import { showAlertCorrect, showAlertIncorrect } from '../../../../helpers/Alertas';

export const ModalEditarUsuario = ({ isOpen, isClose }) => {
  const [correo, cambiarCorreo] = useState({ campo: "", valido: null });
  const [formularioValido, cambiarFormularioValido] = useState(null);

  const validacionUsuarioEditar = (e) => {
    e.preventDefault();
    if (correo.valido === "true") {
      cambiarFormularioValido(true);
      cambiarCorreo({ campo: "", valido: null });
      showAlertCorrect("Editado correctamente", "success", isClose);
    } else {
      cambiarFormularioValido(false);
      showAlertIncorrect("Digíte el fomulario correctamente", "error");
    }
  };

  return (
    <>
      <form action="" onSubmit={validacionUsuarioEditar}>
        <Modal isOpen={isOpen} onClose={isClose}>
          <ModalHeader className="mb-3">Editar usuario</ModalHeader>
          <ModalBody>
            <Label className="mt-4">
              <span>Rol</span>
              <Select className="mt-1">
                <option>Administrador</option>
                <option>Empleado</option>
              </Select>
            </Label>

            <Label className="mt-4">
              <span>Correo</span>
              <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                <Input2
                  placeholder="Ingrese el correo"
                  type="text"
                  estado={correo}
                  cambiarEstado={cambiarCorreo}
                  expresionRegular={expresiones.correo}
                  mensajeError={
                    "Debe incluir simbolo @ y el dominio. Ejemplo: example@gmail.com"
                  }
                />
              </div>
            </Label>

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
              <Button onClick={validacionUsuarioEditar}>Enviar</Button>
            </div>
          </ModalFooter>
        </Modal>
      </form>
    </>
  );
};
