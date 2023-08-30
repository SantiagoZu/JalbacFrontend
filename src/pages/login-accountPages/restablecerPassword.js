import React from 'react'
import { Link } from 'react-router-dom'

import ImageLight from '../../assets/img/forgot-password-office.jpeg'
import ImageDark from '../../assets/img/forgot-password-office-dark.jpeg'
import { Label, Input, Button } from '@windmill/react-ui'
import { Formik } from 'formik'
import { CustomInput } from '../../components/CustomInput'
import { SpanError } from '../../components/styles/styles'
import { initialValues, validateInputs } from "./Components/RestablecerPasswordValidations/RestablecerFormik";
import { useUsuarios } from '../../services/hooks/useUsuarios'
import { showAlertCorrect, showAlertIncorrect } from '../../helpers/Alertas'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

function RestablecerPassword() {

  const { resetPassword } = useUsuarios();
  const history = useHistory();

  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => validateInputs(values)}
      onSubmit={(values, { resetForm }) => {
        const correo = localStorage.getItem('correo')
        const valores = {
          correo: correo,
          contrasena: values.contrasena
        }

        resetPassword(valores).then(response => {
          showAlertCorrect('Contraseña reestablecida correctamente', 'success');
          localStorage.removeItem('correo')
          history.push('/login')
        }).catch(response => {
          if (response.response.data.errorMessages[0] !== null) {
            showAlertIncorrect(response.response.data.errorMessages[0], 'error');
          } else {
            showAlertIncorrect('Error al recuperar contraseña', 'error');
          }
        })
      }}
    >

      {({ errors, handleSubmit, touched }) => (
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
                      Restablecer contraseña
                    </h1>

                    <Label>
                      <span>Contraseña nueva</span>
                      <div className="mt-1 w-full">
                        <CustomInput
                          type="password"
                          id="contrasena"
                          name="contrasena"
                          placeholder="Contraseña"
                        />
                        {touched.contrasena && errors.contrasena && <SpanError>{errors.contrasena}</SpanError>}
                      </div>

                    </Label>


                    <Label className="mt-2">
                      <span>Confirmar nueva contraseña</span>
                      <div className="mt-1">
                        <CustomInput
                          type="password"
                          id="confirmContrasena"
                          name="confirmContrasena"
                          placeholder="Contraseña"
                        />
                        {touched.confirmContrasena && errors.confirmContrasena && <SpanError>{errors.confirmContrasena}</SpanError>}
                      </div>
                    </Label>

                    <div className='flex flex-row gap-2 h-16 max-sm:flex-col'>
                      <Button block tag={Link} className="mt-4" onClick={handleSubmit}>
                        Restablecer
                      </Button>
                      <Button layout="outline" className="mt-4" onClick={() => history.push('/app/login')}>
                        Regresar al login
                      </Button>
                    </div>

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

export default RestablecerPassword
