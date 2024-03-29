export const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,25}$/, // Letras y espacios, pueden llevar acentos.
    contrasena: /^.{3,25}$/, // 3 a 25 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/, // 7 a 14 numeros.
    documento: /^[a-zA-Z0-9\_\-\.]{4,10}$/,
    estado:/^[a-zA-Z0-9\_\-]{4,16}$/,
}

export const expresionesRol = {
    rol: /^[a-zA-Z0-9\_\-]{4,16}$/,
    checked: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
}


export const expresionesProducto = {
    nombreAnillido: /^[A-Za-z0-9 ]+$/, // no caracteres especiales
    peso: /^\d+(\.\d{1,12})?$/,     ///^.{4,12}$/ de 4 a 12 digitos decimal
    tamanoAnillo: /^\d+(\.\d{1,12})?$/,     ///^.{4,12}$/ de 4 a 12 digitos
    tamanoPiedra: /^\d+(\.\d{1,12})?$/,     ///^.{4,12}$/ de 4 a 12 digitos
    detalle: /^[A-Za-z0-9]{0,100}$/,
    cantidad : /^\d+(\.\d{1,12})?$/, 
    motivoDevolucion: /^[A-Za-z0-9]{0,100}$/,     // solo acepta de 0 a 200 caracteres

}
export const expresionesCrearPedido = {
    cliente: /^[A-Za-z0-9 ]+$/, // no caracteres especiales
    fechaEntrega: /^\d+(\.\d{1,12})?$/,     ///^.{4,12}$/ de 4 a 12 digitos decimal   
}


const expresionesEditarPedido = {
    clienteEditarPedido: /^[a-zA-ZÀ-ÿ\s]{1,25}$/, // Letras, numeros, guion y guion_bajo
    motivoDevolucionEditarPedido: /^[A-Za-z0-9]{0,100}$/, // Letras, numeros, guion y guion_bajo
}

const expresiones2 = {
    cliente: /^[a-zA-ZÀ-ÿ\s]{1,25}$/, // Letras, numeros, guion y guion_bajo
}
