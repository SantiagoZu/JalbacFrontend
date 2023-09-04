import Swal from 'sweetalert2';
export const showAlertCorrect = (message, icon ) => {
    return Swal.fire({
        title: message,
        icon: icon,
        timer: 2500,
        showConfirmButton: false
    })
}
export const showAlertIncorrect = (message, icon) => {
    return Swal.fire({
        text: message,
        icon: icon,
        timer: 2500,
        showConfirmButton: false
    });
}
export const showAlertDeleted = (message, icon, secondMessage, secondIcon, confirmText) => {
    return new Promise((resolve) => {
        Swal.fire({
            title: message,
            icon: icon,
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#7e3af2',
            cancelButtonColor: '#d33',
            confirmButtonText: confirmText ? confirmText : '¡Sí, eliminar!'
        }).then((result) => {
            resolve(result);
            
        });
    });
};

export const showCloseSesion = (message, icon, onDelete ,onClose) => {
    Swal.fire({
        title: message,
        icon: icon,
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#7e3af2',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, cerrar!'
    }).then((result) => {
        if (result.isConfirmed) {
            onDelete();
            onClose();
        }
    });
}

export const alertInactivar =  (mensaje) => {
    return new Promise((resolve) => {        
        Swal.fire({
        title: mensaje,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#7e3af2',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí!',
        cancelButtonText: 'Cancelar',
      }).then(response => resolve(response))
    })
}


function validarMotivoInactivacion(texto) {
    if (!texto) return Swal.showValidationMessage('Tienes que escribir un motivo de inactivación')
    if (!(/^[a-zA-ZÀ-ÿ0-9\s\,\"]{5,100}$/.test(texto))) Swal.showValidationMessage('El motivo de inactivación no debe tener caracteres especiales y debe tener minimo 5 caracteres')
}

export function alertEscribirMotivoInactivacion(inactivar) {
    return new Promise((resolve) => {

        Swal.fire({
            input: 'textarea',
            html: `<h1>Escribe el motivo de inactivación</h1>`,
            inputAttributes: { 'style': 'resize : none' },
            preConfirm: texto => validarMotivoInactivacion(texto),
            showCancelButton: true,
            confirmButtonColor: '#7e3af2',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Sí!',
            cancelButtonText: 'Cancelar',
        }).then(response => {
            resolve(response)
        })
    
    })
}


export function showMotivoInactivacion(motivo) {
  Swal.fire({
    title: 'Motivo de inactivación',
    text: motivo,
    confirmButtonColor: '#7e3af2',
    confirmButtonText: 'Cerrar'
  })
}

