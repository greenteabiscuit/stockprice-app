import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next'
import React, { FC } from 'react'

type Props = {
    ibmdatapoints: any
}

export const DataTable: FC<Props> = ({
    ibmdatapoints,
}) => (
    <BootstrapTable
        keyField="x"
        data={ibmdatapoints}
        columns={getColumns()}
        classes="table-sm"
    />
)

const getColumns = (
): ColumnDescription[] => [
    {
        dataField: 'x',
        text: 'date',
        align: 'right',
    },
    {
        dataField: 'y',
        text: 'stockprice',
        align: 'right',
    },
]
