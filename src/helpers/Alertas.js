import Swal from 'sweetalert2';

export const showAlertCorrect = (message, icon, timer = 2500, closeModal) => {
    return Swal.fire({
        title: message,
        icon: icon,
        timer: timer,
        showConfirmButton: false
    })
        .then((value) => {
            closeModal();
        })
}

export const showAlertIncorrect = (message, icon, timer = 2500) => {
    return Swal.fire({
        title: message,
        icon: icon,
        timer: timer,
        showConfirmButton: false
    });
}

export const showAlertDeleted = (message, icon, secondMessage, secondIcon) => {
    Swal.fire({
        title: message,
        icon: icon,
        showCancelButton: true,
        confirmButtonColor: '#7e3af2',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, eliminar!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Eliminado',
                secondMessage,
                secondIcon,
            )
        }
    });

}



