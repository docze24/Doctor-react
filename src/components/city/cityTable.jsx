import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../../contentApi/LanguageContext';
import { Form, Row, Col, InputGroup, Button, Table } from 'react-bootstrap';
import ReactPaginate from "react-paginate";
import { CiEdit } from "react-icons/ci";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import CardLoader from '../shared/CardLoader';
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa';


import { citiesApi } from '../../api';
import topTost from '@/utils/topTost';

const CityList = () => {
  const { t } = useContext(LanguageContext);
  const [listTableData, setListTableData] = useState([]); // Initialize as an empty array

  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [perPage, setPerPage] = useState(2);
  const [totalRecords, setTotalRecords] = useState(null);
  const [search, setSearch] = useState({ keyword: "", status: null });
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [sortType, setSortType] = useState('');
  const [activeIcon, setActiveIcon] = useState({});

  const navigate = useNavigate();



  // Fetch States
  const getCity = async () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);

    try {
      let parms = { page: currentPage, limit: perPage, sortBy, sortType, t: new Date().getTime() };
      const requestParms = { ...parms, ...search };

      console.log('RequestParms', requestParms);

      const response = await citiesApi.getCity(requestParms);
      if (response?.data?.status === 200) {
        let resdata = response?.data?.data;
        setListTableData(resdata.cities || []);
        setPageCount(Math.ceil(resdata.total / perPage));
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


  // Toggle Status
  const handleToggleStatus = async (cityId, currentStatus) => {
    try {
      const newStatus = currentStatus === 1 ? 0 : 1; // Toggle status between 1 (active) and 0 (inactive)

      setListTableData(prevData =>
        prevData.map(city =>
          city.id === cityId ? { ...city, status: newStatus } : city
        )
      );

      const response = await citiesApi.updateCityStatus(cityId, newStatus);
      console.log("Status updated response:", response);

      if (response?.data?.status === 200) {
        topTost(`City status updated successfully!`, "success");
      } else {

        setListTableData(prevData =>
          prevData.map(city =>
            city.id === cityId ? { ...city, status: currentStatus } : city
          )
        );
        topTost(response?.data?.message || "Failed to update status", "error");
      }
    } catch (error) {

      setListTableData(prevData =>
        prevData.map(city =>
          city.id === cityId ? { ...city, status: currentStatus } : city
        )
      );
      topTost("Error: " + error?.message, "error");
    }
  };


  // handle Input changes
  const handleOnChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });

    if (e.target.name === "keyword") {
      setOffset(0);
      setCurrentPage(1);
    }
    if (e.target.name === "status") {
      setOffset(0);
      setCurrentPage(1);
    }
  };

  // Pagination handle
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    const newOffset = selectedPage * perPage;
    setCurrentPage(selectedPage + 1);
    setOffset(newOffset);
  };

  // Sorting functionality
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
    let freshObj = activeIcon;
    freshObj[sortBy] = sortType;
    setActiveIcon(freshObj);
  };

  const activeSortIcon = (sortBy) => {
    if (activeIcon[sortBy] === "ASC") {
      return (<span className="text-primary"> <FaSortUp /> </span>);
    } else if (activeIcon[sortBy] === "DESC") {
      return (<span className="text-primary"> <FaSortDown /></span>);
    } else {
      return (<span><FaSort /> </span>);
    }
  };

  // Effect to call API
  useEffect(() => {
    getCity();
  }, [offset, currentPage, perPage, search, sortBy, sortType]);

  // Handle Edit
  const handleEditCity = (cityId) => {
    if (!cityId) {
      console.error("ERROR: cityId is undefined!");
      topTost("City ID is missing!", "error");
      return;
    }
    navigate(`/en/city/edit/${cityId}`);
  };

  return (
    <div className="dataTables_wrapper dt-bootstrap5 no-footer">
      {loading ? <CardLoader refreshKey={loading} /> : ""}
      {/** SEARCH  */}
      <div className="header-search">
        <Row className="align-items-end ">
          <Col md={3} className="mb-3 mb-md-0">
            <Form.Group>
              <Form.Label className="fw-bold text-dark">Search by City</Form.Label>
              <InputGroup>
                <Form.Control
                  name="keyword"
                  value={search.keyword}
                  onChange={handleOnChange}
                  placeholder="Search city by name"
                  size="sm"
                  autoComplete="off"
                />
              </InputGroup>
            </Form.Group>
          </Col>
          <Col md={3} className="mb-3 mb-md-0">
            <Form.Group>
              <Form.Label className="fw-bold text-dark">Select Status</Form.Label>
              <Form.Select aria-label="Filter 1" size="sm" onChange={handleOnChange} name="status">
                <option value="">Filter by status</option>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4} className="d-flex justify-content-end   ">
            <Button variant="outline-primary" className="me-3 px-4 py-3 "  > Reset</Button>
            <Button variant="primary" className="px-4 py-2" > Search </Button>
          </Col>
        </Row>
      </div>

      <Table className="table alignMiddle mb-0" striped>
        <thead>
          <tr>
            <th className="text-center">S.No.</th>
            <th className="text-center" onClick={(e) => handleSorting(e, "cityName", sortType)}>
              City Name {activeSortIcon("cityName")}
            </th>
            <th className="text-center" onClick={(e) => handleSorting(e, "status", sortType)}>
              Status {activeSortIcon("status")}
            </th>
            <th className="text-center">Created At</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listTableData.length > 0 && (
            listTableData.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td className="colFixed text-center" width={40}> {(currentPage - 1) * perPage + index + 1}</td>
                  <td className="text-nowrap text-center">{item.cityName ? item.cityName : " "}</td>
                  <td className="text-nowrap text-center" style={{ color: item.status === 1 ? "green" : "red", cursor: "pointer" }} onClick={() => handleToggleStatus(item.id, item.status)}> {item.status === 1 ? 'Active' : 'Inactive'}</td>
                  <td className="text-nowrap text-center">{item.createdAt ? item.createdAt : " "}</td>
                  <td className="text-nowrap text-center">
                    <CiEdit size={"18px"} onClick={() => handleEditCity(item.id)} />
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
          Total City
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
          containerClassName={"pagination gap-1 align-items-center justify-content-center m-0"}
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
    </div>
  );
};

export default CityList;



