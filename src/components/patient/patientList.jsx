import React, { memo, useEffect, useState } from 'react'
import Table from '@/components/patient/Table';
import { FiAlertOctagon, FiArchive, FiClock, FiEdit3, FiEye, FiMoreHorizontal, FiPrinter, FiTrash2 } from 'react-icons/fi'
import Dropdown from '@/components/shared/Dropdown';
import SelectDropdown from '@/components/shared/SelectDropdown';
import getIcon from '@/utils/getIcon';
import { leadTableData } from '@/utils/fackData/leadTableData';
import TableSearch from '@/components/shared/TableSearch'
import TablePagination from '@/components/shared/TablePagination'
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'

const PatientList = () => {


    const actions = [
        { label: "Edit", icon: <FiEdit3 /> },
        { label: "Print", icon: <FiPrinter /> },
        { label: "Remind", icon: <FiClock /> },
        { type: "divider" },
        { label: "Archive", icon: <FiArchive /> },
        { label: "Report Spam", icon: <FiAlertOctagon />, },
        { type: "divider" },
        { label: "Delete", icon: <FiTrash2 />, },
    ];
    
    const TableCell = memo(({ options, defaultSelect }) => {
        const [selectedOption, setSelectedOption] = useState(null);
    
        return (
            <SelectDropdown
                options={options}
                defaultSelect={defaultSelect}
                selectedOption={selectedOption}
                onSelectOption={(option) => setSelectedOption(option)}
            />
        );
    });
    
// const [sorting, setSorting] = useState([])
const [globalFilter, setGlobalFilter] = useState('')
const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
})

const columns = [
    {
        accessorKey: 'id',
        header: ({ table }) => {
            const checkboxRef = React.useRef(null);

            useEffect(() => {
                if (checkboxRef.current) {
                    checkboxRef.current.indeterminate = table.getIsSomeRowsSelected();
                }
            }, [table.getIsSomeRowsSelected()]);

            return (
                <input
                    type="checkbox"
                    className="custom-table-checkbox"
                    ref={checkboxRef}
                    checked={table.getIsAllRowsSelected()}
                    onChange={table.getToggleAllRowsSelectedHandler()}
                />
            );
        },
        cell: ({ row }) => (
            <input
                type="checkbox"
                className="custom-table-checkbox"
                checked={row.getIsSelected()}
                disabled={!row.getCanSelect()}
                onChange={row.getToggleSelectedHandler()}
            />
        ),
        meta: {
            headerClassName: 'width-30',
        },
    },

    {
        accessorKey: 'customer',
        header: () => 'Customer',
        cell: (info) => {
            const roles = info.getValue();
            return (
                <a href="#" className="hstack gap-3">
                    {
                        roles?.img ?
                            <div className="avatar-image avatar-md">
                                <img src={roles?.img} alt="" className="img-fluid" />
                            </div>
                            :
                            <div className="text-white avatar-text user-avatar-text avatar-md">{roles?.name.substring(0, 1)}</div>
                    }
                    <div>
                        <span className="text-truncate-1-line">{roles?.name}</span>
                    </div>
                </a>
            )
        }
    },
    {
        accessorKey: 'email',
        header: () => 'Email',
        cell: (info) => <a href="apps-email.html">{info.getValue()}</a>
    },
    {
        accessorKey: 'source',
        header: () => 'Source',
        cell: (info) => {
            const x = info.getValue()
            return (
                <div className="hstack gap-2">
                    <div className="avatar-text avatar-sm">
                        {getIcon(x.icon)}
                    </div>
                    <a href="#">{x.media}</a>
                </div>
            )
        }
    },
    {
        accessorKey: 'phone',
        header: () => 'Phone',
        cell: (info) => <a href="tel:">{info.getValue()}</a>
        // meta: {
        //     className: "fw-bold text-dark"
        // }
    },
    {
        accessorKey: 'date',
        header: () => 'Date',
    },
    {
        accessorKey: 'status',
        header: () => 'Status',
        cell: (info) => <TableCell options={info?.getValue().status} defaultSelect={info?.getValue().defaultSelect} />
    },
    {
        accessorKey: 'actions',
        header: () => "Actions",
        cell: info => (
            <div className="hstack gap-2 justify-content-end">
                <a href="proposal-view.html" className="avatar-text avatar-md">
                    <FiEye />
                </a>
                <Dropdown dropdownItems={actions} triggerClassNaclassName='avatar-md' triggerPosition={"0,21"} triggerIcon={<FiMoreHorizontal />} />
            </div>
        ),
        meta: {
            headerClassName: 'text-end'
        }
    },
]

const table = useReactTable({
        data: leadTableData,
        columns,
        state: {
            globalFilter,
            pagination
        },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
    })

    
    return (
        <div className="col-lg-12">
        <div className="card stretch stretch-full function-table">
            <div className="card-body p-0">
                <div className="table-responsive">
                    <div className='dataTables_wrapper dt-bootstrap5 no-footer'>
                        <TableSearch table={table} setGlobalFilter={setGlobalFilter} globalFilter={globalFilter}/> 
                        <Table data={leadTableData} columns={columns} />
                        <TablePagination table={table} />
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PatientList