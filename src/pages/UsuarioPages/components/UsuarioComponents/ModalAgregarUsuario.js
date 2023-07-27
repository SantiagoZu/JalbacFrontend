import React, { useState, useEffect } from "react";

import { Label, Select } from "@windmill/react-ui";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@windmill/react-ui";
import { Formik } from "formik";
import { CustomInput } from "../../../../components/CustomInput";
import { SpanError } from "../../../../components/styles/styles";
import { showAlertCorrect } from "../../../../helpers/Alertas";
import {
  initialValues,
  validateInputs,
} from "./UsuarioFormValidation/UsuarioFormik";

export const ModalAgregarUsuario = ({ isOpen, isClose }) => {
  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => validateInputs(values)}
      onSubmit={(valores, { resetForm }) => {
        resetForm();
        showAlertCorrect("Usuario creado correctamente", "success", isClose);
      }}
    >
      {({ errors, handleSubmit, touched }) => (
        <form onSubmit={handleSubmit}>
          <Modal isOpen={isOpen} onClose={isClose}>
            <ModalHeader className="mb-3">Registrar usuario</ModalHeader>
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
                  <CustomInput
                    type="text"
                    id="correo"
                    name="correo"
                    placeholder="example@gmail.com"
                  />
                  {touched.correo && errors.correo && (
                    <SpanError>{errors.correo}</SpanError>
                  )}
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
                <Button onClick={handleSubmit}>Enviar</Button>
              </div>
            </ModalFooter>
          </Modal>
        </form>
      )}
    </Formik>
  );
};
