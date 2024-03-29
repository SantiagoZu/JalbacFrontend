import Swal from 'sweetalert2';
export const showAlertCorrect = (message, icon, closeModal) => {
    return Swal.fire({
        title: message,
        icon: icon,
        timer: 2500,
        showConfirmButton: false
    })
        .then((value) => {
            closeModal();
        })
}
export const showAlertIncorrect = (message, icon) => {
    return Swal.fire({
        title: message,
        icon: icon,
        timer: 2500,
        showConfirmButton: false
    });
}
export const showAlertDeleted = (message, icon, secondMessage, secondIcon) => {
    return new Promise((resolve) => {
        Swal.fire({
            title: message,
            icon: icon,
            showCancelButton: true,
            confirmButtonColor: '#7e3af2',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Sí, eliminar!'
        }).then((result) => {
            resolve(result);
            
        });
    });
};

export const showCloseSesion = (message, icon,secondMessage, secondIcon, onDelete ,onClose) => {
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
            Swal.fire(
                '',
                secondMessage,
                secondIcon,
            )
            onClose();
        }
    });
}

