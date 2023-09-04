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

export const showAlertInactivarOActivarPedido =  (mensaje) => {
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

