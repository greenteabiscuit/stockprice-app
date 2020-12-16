import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css'
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next'
import React, { FC } from 'react'
import { Button } from 'react-bootstrap'

type Props = {
    ibmdata: any
    showModalText: string
    deleteText: string
}

export const dataTable: FC<Props> = ({
    ibmdata
    showModalText,
    deleteText,
}) => (
    <BootstrapTable
        keyField="id"
        data={ibmdata}
        columns={getColumns(showModalText, deleteText,)}
        classes="table-sm"
    />
)

const getColumns = (
    showModalText: string,
    deleteText: string,
): ColumnDescription[] => [
    {
        dataField: 'code',
        text: 'Code',
        align: 'right',
    },
]
