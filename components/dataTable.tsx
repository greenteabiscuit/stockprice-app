import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next'
import React, { FC } from 'react'

type Props = {
    ibmdatapoints: any
}

export const DataTable: FC<Props> = ({
    ibmdatapoints,
}) => (
    <BootstrapTable
        keyField="id"
        data={ibmdatapoints}
        columns={getColumns()}
        classes="table-sm"
    />
)

const getColumns = (
): ColumnDescription[] => [
    {
        dataField: 'code',
        text: 'Code',
        align: 'right',
    },
]
