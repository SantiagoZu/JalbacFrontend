import { expresionesCrearPedido as regex } from '../../../../../helpers/validacionesRegex';

export const initialValues = {
    cliente: '',
    fechaEntrega: '',
};

export const validationScheme = {
    cliente: regex.cliente,
    fechaEntrega: regex.fechaEntrega,
}

export const validateInputs = (values) => {

    let errores = {};

    if (!values.cliente) {
        errores.cliente = 'El campo Cliente es oblígatorio'
    } else if (!validationScheme.nombre.test(values.cliente)) {
        errores.nombre = 'El nombre no puede tener numeros'
    }

    if (!values.fechaEntrega) {
        errores.fechaEntrega = 'El campo Fecha entrega es oblígatorio'
    } else if (!validationScheme.fechaEntrega.test(values.fechaEntrega)) {
        errores.fechaEntrega = 'El Fecha entrega debe ser válido'
    }

    return errores;

};
/*
const date = new Date()
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
const [cliente, cambiarCliente] = useState({ campo: '', valido: null });
const [fechaPedido, cambiarFechaPedido] = useState({ campo: `${year}-${month}-${day}`, valido: null });
const [nombre, cambiarNombre] = useState({ campo: '', valido: null });
const [peso, cambiarPeso] = useState({ campo: '', valido: null });
const [tamanoAnillo, cambiarTamanoAnillo] = useState({ campo: '', valido: null });
const [tamanoPiedra, cambiarTamanoPiedra] = useState({ campo: '', valido: null });
const [detalle, cambiarDetalle] = useState({ campo: '', valido: null });
const [motivoDevolucion, cambiarMotivoDevolucion] = useState({ campo: '', valido: true, desactivado: true });




const [clienteEditarPedido, cambiarClienteEditarPedido] = useState({ campo: '', valido: null });
const [motivoDevolucionEditarPedido, cambiarMotivoDevolucionEditarPedido] = useState({ campo: '', valido: true, desactivado: true });
const [fechaPedidoEditar, cambiarFechaPedidoEditar] = useState({ campo: `${year}-${month}-${day}`, valido: null });
// const [estadoPedido, cambiarEstadoPedido] = useState({ campo: '', valido: null, desactivado: true });

const [formularioValido, cambiarFormularioValido] = useState(null);

const onChange = (e) => {
  if (type == "date") {
      if (new Date(estado.campo).toLocaleDateString() >= new Date().toLocaleDateString("es-CO")) {
          cambiarEstado({ ...estado, campo: e.target.value, valido: 'true' });

      }
      else {
          cambiarEstado({ ...estado, campo: e.target.value, valido: 'false' });

      }
  }
  else {
      cambiarEstado({ ...estado, campo: e.target.value, desactivado: desactivado });
  }

}

const validacionFormulario = (e) => {
    e.preventDefault();
    if (cliente.valido === 'true' && fechaPedido.valido === "true" && motivoDevolucion.valido === true) {

        cambiarFormularioValido(true);
        cambiarCliente({ campo: '', valido: null });
        cambiarFechaPedido({ campo: '', valido: null });

        showAlertCorrect("Pedido agregado","success" , isClose);

    } else {
        cambiarFormularioValido(false);
        showAlertIncorrect('Digíte el fomulario correctamente', 'error');
    }
}
*/