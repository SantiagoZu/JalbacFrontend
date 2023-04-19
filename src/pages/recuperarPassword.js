import React, {useState} from 'react'
import { Link } from 'react-router-dom'

import ImageLight from '../assets/img/login-office.jpeg'
import { Label, Input, Button } from '@windmill/react-ui'
import { Input2 } from '../components/Input';
import Swal from 'sweetalert2'

function recuperarPassword() {

  /*
  const [correo, cambiarCorreo] = useState({ campo: '', valido: null });
  const [formularioValido, cambiarFormularioValido] = useState(null);

  const expresiones = {
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
  }

  const alertCorreoIncorrecto = () => {
    Swal.fire({
      title: "Digite el correo correctamente",
      icon: "error"
    })
  }

  const validacionCorreo = (e) => {
    e.preventDefault();
    if (correo.valido === 'true') {
      cambiarFormularioValido(true);
      cambiarCorreo({ campo: '', valido: null });
    } else {
      cambiarFormularioValido(false);
      alertCorreoIncorrecto();
    }
  }
  */
 
  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark"
              src={ImageLight}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Recuperar constraseña
              </h1>

              <Label>
                <span>Ingrese su correo</span>
                <Input className="mt-1 mb-2" placeholder="" />
                <i>Al siguiente correo se le enviara un link para restablecer su constraseña.</i>
              </Label>

              <Button tag={Link} to="/restablecer-password" block className="mt-4">
                Recuperar
              </Button>
            </div>
          </main> 
        </div>
      </div>
    </div>
  )
}

export default recuperarPassword
