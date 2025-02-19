import React from "react";
import { Link } from 'react-router-dom';
import { Table, Form, Nav, Badge, Row, Col } from "react-bootstrap";
import { BiChevronLeft, BiChevronRight, BiData } from "react-icons/bi";
import ReactPaginate from "react-paginate";
import moment from "moment";
import ButtonComp from '../../components/common/Buttons/ButtonComp';
import "react-datepicker/dist/react-datepicker.css";

export default function UserList({
    users = [{
        id: 1,
        userName: "John Doe",
        userEmail: "john.doe@example.com",
        userMobile: "+1234567890",
        RoleType: { role_type_name: "Admin" },
        status: 1,
        createdAt: "2025-02-19T13:00:00Z",
    },],
    handlePageClick = () => { },
    pageCount = 0,
    totalRecords = 0,
    handleDelete = () => { },
    handleOnChange = () => { },
    search = { keyword: "" },
    roletype = [],
    perPage = 10,
    currentPage = 1,
    handleSorting = () => { },
    activeSortIcon = () => { },
    sortType = "asc",
    handleStatusChange = () => { },
}) {
    return (
        <section className="sec-listing flex-column bg-light p-4">
            <header className="head-title mb-4 d-flex justify-content-between align-items-center bg-white rounded-2 shadow-sm p-4">
                <h1 className="h4 mb-0 medium mt-4 ">User List</h1>
                <ButtonComp moduleSlug={"users"} actionSlug={"add"} label={"User"} />
            </header>
            <Row className="my-3 align-items-center">
                <Col lg={7} md={8}>
                    <Row className="row-gap">
                        <Col sm={6}>
                            <Form.Group className="filterSearch d-flex gap-2 mb-sm-0 mb-2">
                                <Form.Control
                                    type="text"
                                    name="keyword"
                                    value={search.keyword || ''}
                                    onChange={handleOnChange}
                                    placeholder="Search user by name or email"
                                    size="sm"
                                    autoComplete="off"
                                />
                            </Form.Group>
                        </Col>
                        <Col sm={6}>
                            <Row className="row-gap">
                                <Col xs={6}>
                                    <Form.Group>
                                        <Form.Select aria-label="Filter by Role" size="sm" onChange={handleOnChange} name="roleType">
                                            <option value="">Filter by role</option>
                                            {
                                                roletype.map((item) => {
                                                    return (
                                                        <option value={item.id} key={item.id}>{item.role_type_name}</option>
                                                    )
                                                })
                                            }
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col xs={6}>
                                    <Form.Group>
                                        <Form.Select aria-label="Filter by Status" size="sm" onChange={handleOnChange} name="status">
                                            <option value="">Filter by status</option>
                                            <option value="1">Active</option>
                                            <option value="0">In Active</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row className="my-3">
                <Col lg={7} md={8} className="d-flex justify-content-start">
                    <div className="t-record d-flex gap-1 align-items-center text-muted mb-md-0 mb-2">
                        Total Users
                        <span className="text-black semiBold">({totalRecords})</span>
                    </div>
                </Col>
            </Row>


            <div className="table-responsive bg-white shadow-sm rounded-3 p-3">
                <Table hover className="listTable alignMiddle mb-0 " striped>
                    <thead >
                        <tr>
                            <th className="text-center">S.No.</th>
                            <th className="text-center" onClick={(e) => handleSorting(e, "userName", sortType)}>User Name {activeSortIcon("userName")}</th>
                            <th className="text-center">User Email</th>
                            <th className="text-center">User Mobile</th>
                            <th className="text-center">Role Type</th>
                            <th className="text-center" onClick={(e) => handleSorting(e, "status", sortType)}>Status {activeSortIcon("status")}</th>
                            <th className="text-center" onClick={(e) => handleSorting(e, "createdAt", sortType)}>Created At {activeSortIcon("createdAt")}</th>
                            <th className="colFixed text-center" width="40">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 && users.map((item, index) => (
                            <tr key={item.id} className="text-center">
                                <td>{(currentPage - 1) * perPage + index + 1}</td>
                                <td>{item.userName}</td>
                                <td>{item.userEmail}</td>
                                <td>{item.userMobile}</td>
                                <td>{item.RoleType.role_type_name}</td>
                                <td>
                                    {item.status == 1 ? <Badge bg="success">Active</Badge> : <Badge bg="danger">In Active</Badge>}
                                </td>
                                <td>{item.createdAt ? moment(item.createdAt).format("DD-MM-YYYY, LT") : " "}</td>
                                <td>
                                    <div className="d-flex justify-content-center gap-2">
                                        <ButtonComp moduleSlug={"users"} actionSlug={"edit"} Id={item?.id} />
                                        {
                                            item?.id !== 1 &&
                                            <ButtonComp moduleSlug={"users"} actionSlug={"change_status"} Id={item?.id} event={handleStatusChange} title={item.status == 1 ? "Active" : "In Active"} />
                                        }
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            {!users.length && (
                <div className="d-flex flex-column align-items-center justify-content-center bg-gray p-5">
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
                    pageCount={pageCount}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName="pagination gap-1 align-items-center justify-content-center m-0"
                    previousClassName="page-item"
                    previousLinkClassName="page-link page-link-prev"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link page-link-next"
                    subContainerClassName="pages pagination"
                    activeClassName="active"
                />
            </div>
        </section>
    );
}
