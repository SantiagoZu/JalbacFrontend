import React, { useState, useEffect } from "react";

import { HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@windmill/react-ui';
import {Input} from '@windmill/react-ui';
import { Input2 } from '../../../../components/Input';
import Swal from 'sweetalert2'

import { expresiones } from '../../../../helpers/validacionesRegex';
import { showAlertCorrect, showAlertIncorrect } from '../../../../helpers/Alertas';

export const ModalEditarRol = ({isOpen, isClose}) => {

    const [rol, cambiarRol] = useState({ campo: "", valido: null });
    const [formularioValido, cambiarFormularioValido] = useState(null);

    const ValidacionFormEdit = (e) => {
      e.preventDefault();
      if (rol.valido === "true") {
        cambiarFormularioValido(true);
        cambiarRol({ campo: "", valido: null });
        showAlertCorrect("Editado correctamente", "success", isClose);
      } else {
        cambiarFormularioValido(false);
        showAlertIncorrect("Digíte el fomulario correctamente", "error");
      }
    };

  return (
    <>
      <form action="" onSubmit={ValidacionFormEdit}>
        <Modal isOpen={isOpen} onClose={isClose}>
          <ModalHeader>Editar Rol</ModalHeader>
          <ModalBody>
            <Label>
              <span>Rol</span>
              <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                <Input2
                  placeholder="Ingrese el rol..."
                  type="text"
                  estado={rol}
                  cambiarEstado={cambiarRol}
                  expresionRegular={expresiones.nombre}
                  mensajeError={"El rol no puede tener números"}
                />
                <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none"></div>
              </div>
            </Label>

            <Label className="mt-4">
              <span>Permisos</span> <br />
              <Input type="checkbox" className="ml-3" /> Dashboard <br />
              <Input type="checkbox" className="ml-3" /> Backup <br />
              <Input type="checkbox" className="ml-3" /> Roles <br />
              <Input type="checkbox" className="ml-3" /> Usuarios <br />
              <Input type="checkbox" className="ml-3" /> Empleados <br />
              <Input type="checkbox" className="ml-3" /> Clientes <br />
              <Input type="checkbox" className="ml-3" /> Pedidos <br />
              <Input type="checkbox" className="ml-3" /> Devoluciones <br />
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
              <Button type="submit" onClick={ValidacionFormEdit}>
                Aceptar
              </Button>
            </div>
          </ModalFooter>
        </Modal>
      </form>
    </>
  );
}