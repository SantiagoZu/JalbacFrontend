import { useDetallePedidos } from '../../services/hooks/useDetallePedidos';

function Charts3(fechaInicioServicio, fechaFinServicio) {

    const { detallePedidos } = useDetallePedidos()
    const fechaInicioServiciosFiltrar = fechaInicioServicio || '';

    const serviciosFiltrados = detallePedidos.filter(detalle => {
        if (fechaInicioServiciosFiltrar != '') {
            const fechaServicio = new Date(detalle.idPedidoNavigation.fechaPedido);
            return fechaServicio >= new Date(fechaInicioServiciosFiltrar) &&
                (!fechaFinServicio || fechaServicio <= new Date(fechaFinServicio));
        }
        return (!fechaFinServicio || new Date(detalle.idPedidoNavigation.fechaPedido) <= new Date(fechaFinServicio));
    });

    const serviciosUtilizados = serviciosFiltrados.reduce((acc, detalle) => {
        const tipoServicio = detalle.servicio;
        if (!acc[tipoServicio]) {
            acc[tipoServicio] = 1;
        } else {
            acc[tipoServicio]++;
        }
        return acc;
    }, []);

    const nombreServicios = Object.keys(serviciosUtilizados);
    const valoresServicios = Object.values(serviciosUtilizados);

    const servicios = {
        data: {
            datasets: [
                {
                    data: valoresServicios,
                    /**
                     * These colors come from Tailwind CSS palette
                     * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
                     */
                    backgroundColor: ['#0694a2', '#1c64f2', '#7e3af2'],
                    label: 'PEENENNEISAUHDIUSHIDIASDUHSHUIHU',
                },
            ],
            labels: nombreServicios,
        },
        options: {
            responsive: true,
            cutoutPercentage: 80,
        },
        legend: {
            display: false,
        },
    }

    return {
        servicios,
    };
}

export default Charts3;