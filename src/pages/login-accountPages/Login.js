import React from 'react'
import { Link } from 'react-router-dom'

import ImageJalbac from '../../assets/img/Login.png'
import { Label, Button } from '@windmill/react-ui'
import { showAlertIncorrect } from '../../helpers/Alertas';
import { Formik } from 'formik';
import { CustomInput } from '../../components/CustomInput';
import { SpanError } from '../../components/styles/styles';
import { initialValues, validateInputs } from './Components/LoginFormValidations/LoginFormik';
import { useLogin } from '../../services/hooks/useLogin'

import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

function Login() {

  const { postLogin } = useLogin();
  const history = useHistory();

  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => validateInputs(values)}
      onSubmit={(values, { resetForm }) => {
        const updatedValues = {
          ...values
        };
        postLogin(updatedValues).then(response => {

          history.push('/app')
        }).catch(response => {
          if (response.response.data.errorMessages[0] !== null) {
            showAlertIncorrect(response.response.data.errorMessages[0], 'error');
          } else {
            showAlertIncorrect('Error al iniciar sesión', 'error');
          }

        });
        resetForm();
      }}
    >

      {({ errors, handleSubmit, touched }) => (

        <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
          <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
            <div className="flex flex-col overflow-y-auto md:flex-row">
              <div className="h-full md:h-auto md:w-1/2">
                <img
                  aria-hidden="true"
                  className="object-cover w-full h-full dark:hidden"
                  src={ImageJalbac}
                  alt="Office"
                />
                <img
                  aria-hidden="true"
                  className="hidden object-cover w-full h-full dark:block"
                  src={ImageJalbac}
                  alt="Office"
                />
              </div>

              <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                <form onSubmit={handleSubmit}>
                  <div className="w-full">
                    <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Inicio de sesión</h1>
                    <Label>
                      <span>Correo</span>
                      <div className="mt-1">
                        <CustomInput
                          type="text"
                          id="correo"
                          name="correo"
                          placeholder="email@email.com"
                        />
                        {touched.correo && errors.correo && <SpanError>{errors.correo}</SpanError>}
                      </div>
                    </Label>

                    <Label className="mt-4">
                      <span>Contraseña</span>
                      <div className="mt-1">
                        <CustomInput
                          type="password"
                          id="contrasena"
                          name="contrasena"
                          placeholder="Contraseña"
                        />
                        {touched.contrasena && errors.contrasena && <SpanError>{errors.contrasena}</SpanError>}
                      </div>
                    </Label>

                    <Button className="mt-4" block tag={Link} onClick={handleSubmit}>
                      Iniciar sesión
                    </Button>


                    <hr className="mt-8 mb-2" />

                    <p>
                      <Link
                        className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                        to="/recuperar-password"
                      >
                        Recuperar contraseña
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