import React from 'react'
import { useTranslation } from 'react-i18next';

const TableSearch = ({table, setGlobalFilter, globalFilter}) => {

    const { t } = useTranslation("tables");
    return (
        <div className='row gy-2'>
            <div className='col-sm-12 col-md-6 ps-0 m-0 pb-10'>
                <div className='dataTables_length d-flex justify-content-md-start justify-content-center'>
                    <label className='d-flex align-items-center gap-1'>
                    {t("show",{ns:'tables'})}
                        <select
                            className='form-select form-select-sm w-auto pe-4'
                            value={table.getState().pagination.pageSize}
                            onChange={e => {
                                table.setPageSize(Number(e.target.value))
                            }}
                        >
                            {[10, 20, 30, 40, 50].map(pageSize => (
                                <option key={pageSize} value={pageSize}>
                                    {pageSize}
                                </option>
                            ))}
                        </select>
                        {t("entries",{ns:'tables'})}
                    </label>
                </div>
            </div>
            <div className='col-sm-12 col-md-6 ps-0 m-0 pb-10'>
                <div className='dataTables_filter d-flex justify-content-md-end justify-content-center'>
                    <label className='d-inline-flex align-items-center gap-2'>
                    {t("search",{ns:'tables'})}
                        <input
                            type="text"
                            value={globalFilter ?? ""}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            placeholder={t("search.",{ns:'tables'})}
                            className="form-control form-control-sm"
                        />
                    </label>
                </div>
            </div>
        </div>
    )
}

export default TableSearch