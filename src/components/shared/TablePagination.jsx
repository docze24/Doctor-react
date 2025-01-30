import React from 'react'
import { useTranslation } from 'react-i18next';

const TablePagination = ({table}) => {
    const { t } = useTranslation("tables");

    return (
        <div className="row gy-2">
            <div className="col-sm-12 col-md-5 p-0">
                <div className="dataTables_info text-lg-start text-center" id="proposalList_info" role="status" aria-live="polite">
                {`${t("showing")} ${table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} 
                ${t("to")} ${(table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize} 
               ${t("of")} ${table.getPageCount() * table.getState().pagination.pageSize} ${t("entries")}`}
                </div>
            </div>
            <div className="col-sm-12 col-md-7 p-0">
                <div className="dataTables_paginate paging_simple_numbers" id="proposalList_paginate">
                    <ul className="pagination mb-0 justify-content-md-end justify-content-center">
                        <li className={`paginate_button page-item previous ${!table.getCanPreviousPage() ? "disabled" : ""} `}
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <a href="#" className="page-link">{t("previous",{ns:'tables'})}</a></li>
                        <li className="paginate_button page-item active">
                            <a href="#" aria-controls="proposalList" data-dt-idx="0" tabIndex="0" className="page-link">
                                {table.getState().pagination.pageIndex + 1}
                                {/* {table.getPageCount().toLocaleString()} */}
                            </a>
                        </li>
                        <li className={`paginate_button page-item next ${!table.getCanNextPage() ? "disabled" : ""}`}
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            <a href="#" className="page-link">{t("next",{ns:'tables'})}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TablePagination