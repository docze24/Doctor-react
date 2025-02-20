import React, { memo, useContext, useEffect, useState } from 'react'
import Table from '@/components/patient/Table';
import { FiAlertOctagon, FiArchive, FiClock, FiEdit, FiEdit3, FiEye, FiMoreHorizontal, FiPrinter, FiTrash2 } from 'react-icons/fi'
import Dropdown from '@/components/shared/Dropdown';
import getIcon from '@/utils/getIcon';
import { leadTableData } from '@/utils/fackData/leadTableData';
import TableSearch from '@/components/shared/TableSearch'
import TablePagination from '@/components/shared/TablePagination'
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { LanguageContext } from '../../contentApi/LanguageContext';
import { Form, Row, Col, InputGroup, Button } from 'react-bootstrap';
const RoleList = () => {
    const {t} = useContext(LanguageContext);
    
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
        },
        meta: {
            headerClassName: 'width-30',
        },
    },

    {
        accessorKey: 'customer',
        header: () => t("profile"),
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
        header: () =>  t("email"),
        cell: (info) => <a href="apps-email.html">{info.getValue()}</a>
    },
   
    {
        accessorKey: 'phone',
        header: () =>  t("phone"),
        cell: (info) => <a href="tel:">{info.getValue()}</a>
    },
    {
        accessorKey: 'date',
        header: () => t("date"),
    },
    {
        accessorKey: 'status',
        header: () =>  t("status"),
        cell: (info) => <>Active</>
    },
    {
        accessorKey: 'actions',
        header: () => t("actions"),
        cell: info => (
            <div className="hstack gap-2 justify-content-end">
                <a href="proposal-view.html" className="avatar-text avatar-md">
                    <FiEye />
                </a>
                <FiEdit />
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

            <div className='dataTables_wrapper dt-bootstrap5 no-footer'>
                {/* <TableSearch table={table} setGlobalFilter={setGlobalFilter} globalFilter={globalFilter}/>  */}
                <div class="header-search">

                <div >
                    <Row className="align-items-end ">
                        <Col md={3} className="mb-3 mb-md-0">
                        <Form.Group>
                            <Form.Label className="fw-bold text-dark">Search by Email</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    value={globalFilter ?? ""}
                                    onChange={(e) => setGlobalFilter(e.target.value)}
                                    placeholder="search"
                                    
                                />
                            </InputGroup>
                        </Form.Group>
                        </Col>
                       
                        <Col md={3} className="mb-3 mb-md-0">
                            <Form.Group>
                                <Form.Label className="fw-bold text-dark">Select Role</Form.Label>
                                <Form.Select >
                                <option value="">Select role</option>
                                <option>Admin</option>
                                <option>Manager</option>
                                <option>User</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>

                     
                        <Col md={2} className="mb-3 mb-md-0">
                            <Form.Group>
                                <Form.Label className="fw-bold text-dark">{t("status", { ns: "tables" })}</Form.Label>
                                <Form.Select>
                                <option value="">Select Status</option>
                                <option>Active</option>
                                <option>Inactive</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={4} className="d-flex justify-content-end">
                        <Button  variant="outline-primary"  className="me-3 px-4 py-2"  > Reset</Button>
                        <Button  variant="primary"  className="px-4 py-2" > Search </Button>
                        </Col>
                    </Row>
                    </div>

                </div>
                
                <Table data={leadTableData} columns={columns} />
                <TablePagination table={table} />
            </div>
       )
     
}

export default RoleList