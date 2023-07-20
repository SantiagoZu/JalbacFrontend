import React from 'react'
import { Link } from 'react-router-dom'

import ImageLight from '../../assets/img/create-account-office.jpeg'
import ImageDark from '../../assets/img/create-account-office-dark.jpeg'
import { GithubIcon, TwitterIcon } from '../../icons'
import { Input, Label, Button } from '@windmill/react-ui'
import { Formik } from 'formik';
import { CustomInput } from '../../components/CustomInput';
import { SpanError } from '../../components/styles/styles';
import { initialValues, validateInputs } from "./Components/CreateAccountValidations/CreateFormik";
import { showAlertIncorrect } from '../../helpers/Alertas';
import { useUsuarios } from '../../services/hooks/useUsuarios'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

function Login() {

  const { crearCuenta } = useUsuarios();
  const history = useHistory();

  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => validateInputs(values)}
      onSubmit={(values, { resetForm }) => {
        const updatedValues = {
          IdRol: 2,
          ...values
        };
        crearCuenta(updatedValues).then(response =>{
          resetForm();
          history.push('/login')
        }).catch(response => {
            showAlertIncorrect('Verifique que la información sea correcta', 'error');
            console.log(response);
        });
      }}
    >

    {({errors, handleSubmit, touched}) => (
      <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
        <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
          <div className="flex flex-col overflow-y-auto md:flex-row">
            <div className="h-32 md:h-auto md:w-1/2">
              <img
                aria-hidden="true"
                className="object-cover w-full h-full dark:hidden"
                src={ImageLight}
                alt="Office"
              />
              <img
                aria-hidden="true"
                className="hidden object-cover w-full h-full dark:block"
                src={ImageDark}
                alt="Office"
              />
            </div>
            <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
              <form onSubmit={handleSubmit}>
                <div className="w-full">
                  <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                    Crear cuenta
                  </h1>
                  <Label>
                    <span>Correo</span>
                    <div className="mt-1">
                      <CustomInput
                        type="text"
                        id="correo"
                        name="correo"
                        placeholder="Introduzca su correo electrónico"
                      />
                      {touched.correo && errors.correo && <SpanError>{errors.correo}</SpanError>}
                    </div>
                  </Label>
                  <Label className="mt-4">
                    <span>Contraseña</span>
                    <div className="mt-1">
                      <CustomInput
                        type="text"
                        id="contrasena"
                        name="contrasena"
                        placeholder="Introduzca su contraseña"
                      />
                      {touched.contrasena && errors.contrasena && <SpanError>{errors.contrasena}</SpanError>}
                    </div>
                  </Label>
                  <Label className="mt-4">
                    <span>Confirmar contraseña</span>
                    <div className="mt-1">
                      <CustomInput
                        type="text"
                        id="confirmContrasena"
                        name="confirmContrasena"
                        placeholder="Introduzca su contraseña"
                      />
                      {touched.confirmContrasena && errors.confirmContrasena && <SpanError>{errors.confirmContrasena}</SpanError>}
                    </div>
                  </Label>

                  <Button className="mt-4" block tag={Link} onClick={handleSubmit}>
                    Crear cuenta
                  </Button>

                  <hr className="my-8" />

                  <p className="mt-4">
                    <Link
                      className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                      to="/login"
                    >
                      ¿Ya tienes una cuenta? Inicie sesión aquí
                    </Link>
                  </p>
                </div>
              </form>
              
            </main>
          </div>
        </div>
      </div>
    )}
    </Formik>
  )
}

export default Login
