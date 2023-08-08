import React, {useState, useEffect} from 'react'
import PageTitle from '../../../../components/Typography/PageTitle';
import {
    Input,
    Table,
    TableCell,
    TableContainer,
    TableRow,
    TableHeader,
    TableBody,
    Pagination,
    TableFooter,
} from '@windmill/react-ui'
import { SearchIcon } from '../../../../icons';
import {useHisEstadoDetallePedido} from '../../../../services/hooks/useHisEstadoDetallePedido'
import {useEmpleados} from '../../../../services/hooks/useEmpleados'

function HistorialDetalles () {
    
    return (
        <>
            <PageTitle>
                Hositals
            </PageTitle>
        </>
    )
}

export default HistorialDetalles
