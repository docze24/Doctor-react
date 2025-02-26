import React, { memo, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../../contentApi/LanguageContext';
import { CiEdit } from "react-icons/ci";
import { Form, Row, Col, InputGroup, Button, Table } from 'react-bootstrap';
import ReactPaginate from "react-paginate";
import { BiChevronLeft, BiChevronRight} from "react-icons/bi";
import CardLoader from '../shared/CardLoader';


import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa'

import { userApi } from '../../api';
import topTost from '@/utils/topTost';

const UserList = () => {
  const { t } = useContext(LanguageContext);
  const [listTableData, setListTableData] = useState([])

  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [perPage, setPerPage] = useState(2);
  const [totalRecords, setTotalRecords] = useState(null);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState({ keyword: "", roleType: "", status: null, });
  const [searchKeyword, setSearchKeyword] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(false); //useLoading();
  let filterCol = {};
  const [activeIcon, setActiveIcon] = useState(filterCol);
  const [sortBy, setSortBy] = useState('');
  const [sortType, setSortType] = useState('');
  const navigate = useNavigate();

  // const debouncedSearchKeyword = useDebounce(searchKeyword, 500);
  // const debouncedRoleFilter = useDebounce(roleFilter, 500);
  // const debouncedStatusFilter = useDebounce(statusFilter, 500);


  const handleEditUsers = (id) => {
    navigate(`/en/users/edit/${id}`);  // Navigate to edit page with userId
  };

  const handleOnChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });

    console.log('e.target.value', e.target.value);
    if (e.target.name === "keyword") {
      setSearchKeyword(e.target.value);
      setOffset(0);
      setCurrentPage(1);
    }
    if (e.target.name === "roleType") {
      setRoleFilter(e.target.value);
      setOffset(0);
      setCurrentPage(1);
    }
    if (e.target.name === "status") {
      setStatusFilter(e.target.value);
      setOffset(0);
      setCurrentPage(1);
    }
  };

  // const handleRecordsPerPage = (e) => {
  //   setPerPage(parseInt(e.target.value));
  //   setOffset(0);
  //   setCurrentPage(1);
  // };

  const getUsers = async () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000)

    try {
      let parms = { page: currentPage, limit: perPage, sortBy, sortType };

      const requestParms = { ...parms, ...search };


      console.log('RequestParms', requestParms);


      const response = await userApi.getUsers(requestParms);
      if (response?.data?.status === 200) {

       // console.log('response.data', response?.data?.data.users);
        let resdata = response?.data?.data;
        setListTableData(response?.data?.data.users)
        setPageCount(Math.ceil(resdata.total / perPage));
        setUsers(resdata.users);
        setTotalRecords(resdata.total);

      } else {
        topTost(response?.data?.message, "error");
      }

    } catch (error) {
      topTost("Error: " + error?.message);
    } finally {
      setLoading(false);
    }
  };

  //   const [roletype, setRoleType] = useState([]);
  //   const getRoletypeListing = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await getAllRoleslisting();
  //       if (response?.status === "success") {
  //         setRoleType(response.data);
  //       } else {
  //         notifyError(response?.message);
  //       }
  //     } catch (error) {
  //       notifyError("Error: " + error?.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   useEffect(() => {
  //     getRoletypeListing();
  //   }, []);

  useEffect(() => {
    getUsers();
  }, [offset, currentPage, perPage, statusFilter, searchKeyword, sortBy, sortType]);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    const newOffset = selectedPage * perPage;
    setCurrentPage(selectedPage + 1);
    setOffset(newOffset);
  };


  /**************Table Sorting Data******************** */
  //.import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa'
  /*************************************************** */
  const handleSorting = (e, sortBy, sortType) => {
    setSortBy(sortBy);
    if (sortType === "ASC") {
      sortType = "DESC";
    } else if (sortType === "DESC") {
      sortType = "ASC";
    } else {
      sortType = "ASC";
    }
    setSortType(sortType);
    let freshObj = filterCol;
    freshObj[sortBy] = sortType;
    setActiveIcon(freshObj);
  };

  const activeSortIcon = (sortBy) => {
    if (activeIcon[sortBy] === "ASC") {
      return (<span className="text-primary"> <FaSortUp /> </span>);
    } else if (activeIcon[sortBy] === "DESC") {
      return (<span className="text-primary"> <FaSortDown /></span>);
    } else {
      return (<span><FaSort /> </span>
      );
    }
  };


  /******************END SORTING CODE******************** */
  /****************************************************** */

  // functionality to change status
  const handleStatusChange = async (id) => {
    try {
      const response = await userApi.updateUserStatus(id);
      if (response?.data?.status === 200) {
        getUsers();
        topTost(response?.data?.message, "success");

      } else {
        topTost(response?.data?.message, "error");
      }
    } catch (error) {
      topTost("Error : " + error.message);
    }
  };


  return (


    <div className='dataTables_wrapper dt-bootstrap5 no-footer'>
      {loading ? <CardLoader refreshKey={loading} /> : ""}
      {/** SEARCH  */}
      <div class="header-search">
        <Row className="align-items-end ">
          <Col md={3} className="mb-3 mb-md-0">
            <Form.Group>
              <Form.Label className="fw-bold text-dark">Search by Email</Form.Label>
              <InputGroup>
                <Form.Control
                  name="keyword"
                  value={search.keyword}
                  onChange={handleOnChange}
                  placeholder="Search user by name or email"
                  size="sm"
                  autoComplete="off"

                />
              </InputGroup>
            </Form.Group>
          </Col>
          <Col md={3} className="mb-3 mb-md-0">
            <Form.Group>
              <Form.Label className="fw-bold text-dark">Select Role</Form.Label>
              <Form.Select aria-label="Filter 1" size="sm" onChange={handleOnChange} name="status">
                <option value="">Filter by status</option>
                <option value="1">Active</option>
                <option value="0">In Active</option>

              </Form.Select>
            </Form.Group>
          </Col>
          {/* <Col md={2} className="mb-3 mb-md-0">
                            <Form.Group>
                                <Form.Label className="fw-bold text-dark">{t("status", { ns: "tables" })}</Form.Label>
                                <Form.Select>
                                <option value="">Select Status</option>
                                <option value={1}>Active</option>
                                <option value={0}>Inactive</option>
                                </Form.Select>
                            </Form.Group>
                        </Col> */}
          <Col md={4} className="d-flex justify-content-end   ">
            <Button variant="outline-primary" className="me-3 px-4 py-3 "  > Reset</Button>
            <Button variant="primary" className="px-4 py-2" > Search </Button>
          </Col>
        </Row>
      </div>

      <>
        <Table className="table alignMiddle mb-0" striped>
          <thead>
            <tr>
              <th className="text-center">S.No.</th>
              <th className="text-center" >User Role </th>
              <th className="text-center" onClick={(e) => handleSorting(e, "name", sortType)}>User Name  {activeSortIcon("name")}</th>
              <th className="text-center" onClick={(e) => handleSorting(e, "email", sortType)}>User Email  {activeSortIcon("email")}</th>
              <th className="text-center" >Username </th>
              <th className="text-center" >Created_at</th>
              <th className="text-center" >Status</th>
              <th className="text-center" >Actions</th>

            </tr>
          </thead>

          <tbody>
            {listTableData.length > 0 && (
              listTableData.map((item, index) => {
                return (

                  <tr key={item.id}>
                    <td className="colFixed text-center" width={40} > {(currentPage - 1) * perPage + index + 1}</td>
                    <td className="text-nowrap text-center">{item.role ? item.role.role_name : " "}</td>
                    <td className="text-nowrap text-center">{item.name ? item.name : " "}</td>
                    <td className="text-nowrap text-center">{item.email ? item.email : " "}</td>
                    <td className="text-nowrap text-center">{item.username ? item.username : " "}</td>
                    <td className="text-nowrap text-center">{item.created_at ? item.created_at : " "}</td>
                    <td className="text-nowrap text-center">{item.status ? item.status : " "}</td>
                    <td>
                      <CiEdit size={"18px"} onClick={()=>handleEditUsers(item.id)}/>
                    </td>

                  </tr>
                );
              })
            )}
          </tbody>
        </Table>
        <hr />
        <div className="d-flex flex-md-row flex-column align-items-center px-4 justify-content-md-between justify-content-center py-2 gap-2">
          <div className="t-record d-flex gap-1 align-items-center text-muted ">
            Total Users
            <span className="text-black semiBold">({10})</span>
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

      </>


    </div>
  )

}

export default UserList