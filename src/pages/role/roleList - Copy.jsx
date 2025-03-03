import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import { Table, Form, Button, Alert, Row, Col } from "react-bootstrap";
import { IoSearchOutline } from "react-icons/io5";
import { BiEditAlt, BiChevronLeft, BiChevronRight, BiData } from "react-icons/bi";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import ButtonComp from "../../components/common/Buttons/ButtonComp";

export default function RoleList({
    roles = [
        { id: 1, role_type_name: "Admin" },
        { id: 2, role_type_name: "Editor" },
        { id: 3, role_type_name: "Viewer" },
    ],
    currentPage = 1,
    handlePageClick = () => {},
    pageCount = 2,
    offset = 0,
    perPage = 10,
    totalRecords = 10,
    errMsg = "",
    search = { keyword: "" }, // Ensure this is initialized
    handleOnChange = () => {},
    handleDelete = () => {},
    handleRecordsPerPage = () => {},
    handleSorting = () => {},
    activeSortIcon = () => {},
    sortType = "asc",
}) {

    const users = [
        {
            id: 1,
            userName: "John Doe",
            userEmail: "john.doe@example.com",
            userMobile: "+1234567890",
            RoleType: { role_type_name: "Admin" },
            status: 1,
            createdAt: "2025-02-19T13:00:00Z",
        },
        {
            id: 2,
            userName: "Jane Smith",
            userEmail: "jane.smith@example.com",
            userMobile: "+0987654321",
            RoleType: { role_type_name: "Editor" },
            status: 0,
            createdAt: "2024-12-15T08:00:00Z",
        },
        {
            id: 3,
            userName: "Sam Wilson",
            userEmail: "sam.wilson@example.com",
            userMobile: "+1122334455",
            RoleType: { role_type_name: "Viewer" },
            status: 1,
            createdAt: "2025-01-10T12:00:00Z",
        },
    ];


  return (
    <>
      <section className="sec-listing flex-column  container-xxl bg-white ">
        <header className="head-title mb-2 d-flex justify-content-between align-items-center ">
          <h1 className="h3 mb-0 medium ">User Roles</h1>
          <ButtonComp moduleSlug={"roles"} actionSlug={"add"} label={"Role"} />
        </header>
        {errMsg && <Alert variant="danger">{errMsg}</Alert>}

        <Row className="my-3 align-items-center">
          <Col md={8}>
            <div className="t-record d-flex gap-1 align-items-center text-muted mb-md-0 mb-2">
              Total Roles
              <span className="text-black semiBold">({totalRecords})</span>
            </div>
          </Col>
          <Col md={4}>
            <Form.Group className="filterSearch d-flex gap-2">
                <Form.Control
                  type="text"
                  name="keyword"
                  value={search.keyword}
                  onChange={handleOnChange}
                  placeholder="Search role by name"
                  size="sm"
                  autoComplete="off"
                />
                <span className="icon">
                  <IoSearchOutline />
                </span>
            </Form.Group>
          </Col>
        </Row>


        <div className="table-responsive listing-cards">
          <Table hover className="listTable alignMiddle mb-0" striped>
            <thead>
              <tr>
                <th className="text-center">S.No.</th>
                <th className="text-center" onClick={(e) => handleSorting(e, "role_type_name", sortType)}>Role Name {activeSortIcon("role_type_name")}</th>
                <th className="text-center" onClick={(e) => handleSorting(e, "createdAt", sortType)}>Created At {activeSortIcon("createdAt")}</th>
                <th className="colFixed text-center" width="40">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {roles.length > 0 && (
                roles.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td className="colFixed text-center" width={40} >{(currentPage - 1) * perPage + index + 1}</td>
                      <td className="text-nowrap text-center">{item.role_type_name ? item.role_type_name : " "}</td>
                      <td className="text-nowrap text-center">{item.createdAt ? moment(item.createdAt).format("DD-MM-YYYY, LT") : " "}</td>
                      <td className="colFixed">
                        <div className="text-center d-flex align-items-center gap-2">
                          <ButtonComp moduleSlug={"roles"} actionSlug={"edit"} Id={item?.id} />
                          <ButtonComp moduleSlug={"roles"} actionSlug={"delete"} Id={item?.id} event={handleDelete} />
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </Table>
        </div>
        {!roles.length > 0 && (      
          <div className="d-flex p-5 text-muted flex-column align-items-center justify-content-center bg-gray">
          <BiData color="gray" size={50} opacity={0.2} />
          <span>Record Not Found</span>
        </div>
        )}
        <div className="d-flex flex-md-row flex-column align-items-center justify-content-md-between justify-content-center py-2 gap-2">
          <div className="t-record d-flex gap-1 align-items-center text-muted">
            Total Users
            <span className="text-black semiBold">({totalRecords})</span>
          </div>
          <ReactPaginate
            previousLabel={<BiChevronLeft />}
            nextLabel={<BiChevronRight />}
            breakLabel={"..."}
            breakClassName={"break-me"}
            breakLinkClassName={"page-link"}
            pageCount={pageCount}
            marginPagesDisplayed={1}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={
              "pagination gap-1 align-items-center justify-content-center m-0"
            }
            previousClassName={"page-item"}
            previousLinkClassName={"page-link page-link-prev"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link page-link-next"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </div>
      </section>
    </>
  );
}
