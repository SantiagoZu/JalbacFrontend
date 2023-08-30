import React from 'react'
import { Link } from 'react-router-dom'

import recuperarContrasena from '../../assets/img/recuperarContrasena.png'
import { Label, Button } from '@windmill/react-ui'
import { Formik } from 'formik'
import { CustomInput } from '../../components/CustomInput'
import { SpanError } from '../../components/styles/styles'
import { initialValues, validateInputs } from "./Components/RecuperarPasswordValidations/RecuperarFormik";
import { useUsuarios } from '../../services/hooks/useUsuarios'
import { showAlertCorrect, showAlertIncorrect } from '../../helpers/Alertas'

function RecuperarPassword() {
  const { enviarCorreo } = useUsuarios();

  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => validateInputs(values)}
      onSubmit={(values, { resetForm }) => {
        const valores = {
          para: values.correo,
          asunto: "Solicitud cambio de contraseña. JalbacSoft ©",
          contenido: "<!DOCTYPE html><html lang='es'><body><div style='width:600px;padding:20px;border:1px solid #DBDBDB;border-radius:12px;font-family:Sans-serif'><h1 style='color:#C76F61'>Restablecer Contraseña</h1><p style='margin-bottom:25px'>Se solicitó un restablecimiento de contraseña para tu cuenta, haz clic en el botón que aparece a continuación.</p><a style='padding:12px;border-radius:12px;background-color:#6181C7;color:#fff;text-decoration:none' href='http://localhost:3000/restablecer-password'>Cambiar Contraseña</a></div></body></html>"
        }

        enviarCorreo(valores).then(response => {
          localStorage.setItem('correo', values.correo)
          showAlertCorrect('Correo enviado correctamente', 'success');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }).catch(response => {
          // if (response.response.data.errorMessages[0] !== null) {
          //   showAlertIncorrect(response.response.data.errorMessages[0], 'error');
          // }else{  
          //   showAlertIncorrect('Error al enviar el correo', 'error');
          // }
        })
      }}
    >

      {({ errors, handleSubmit, touched }) => (
        <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
          <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
            <div className="flex flex-col overflow-y-auto md:flex-row">
              <div className="h-full md:h-auto md:w-1/2">
                <img
                  aria-hidden="true"
                  className="object-cover w-full h-full"
                  src={recuperarContrasena}
                  alt="Office"
                />
              </div>
              <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                <form onSubmit={handleSubmit}>
                  <div className="w-full">
                    <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                      Recuperar constraseña
                    </h1>

                    <Label>
                      <span>Ingrese su correo</span>
                      <CustomInput
                        type="text"
                        id="correo"
                        name="correo"
                        placeholder="email@email.com"
                      />
                      {touched.correo && errors.correo && <SpanError>{errors.correo}</SpanError>}
                      <i>Al siguiente correo se le enviara un link para restablecer su constraseña.</i>

                    </Label>
                    <Button block tag={Link} className="mt-4" onClick={handleSubmit}>
                      Recuperar
                    </Button>
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

export default RecuperarPassword
