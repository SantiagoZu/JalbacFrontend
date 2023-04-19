import React from 'react'
import { Link } from 'react-router-dom'

import ImageLight from '../assets/img/forgot-password-office.jpeg'
import ImageDark from '../assets/img/forgot-password-office-dark.jpeg'
import { Label, Input, Button } from '@windmill/react-ui'

function restablecerPassword() {
  return (
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
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Restablecer contraseña
              </h1>

              <Label>
                <span>Contraseña nueva</span>
                <Input className="mt-1" placeholder="" />
              </Label>
              <Label className ="mt-2">
                <span>Confirmar nueva contraseña</span>
                <Input className="mt-1" placeholder="" />
              </Label>

              <Button tag={Link} to="/login" block className="mt-4">
                Restablecer
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default restablecerPassword
