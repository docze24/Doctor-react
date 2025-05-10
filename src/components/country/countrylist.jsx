import React, { memo, useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../../contentApi/LanguageContext';
import { Form, Row, Col, InputGroup, Button, Table } from 'react-bootstrap';
import ReactPaginate from "react-paginate";
import { BiEditAlt, BiChevronLeft, BiChevronRight, BiData } from "react-icons/bi";
import CardLoader from '../shared/CardLoader';
import { countriesApi } from '../../api';
import { CiEdit } from "react-icons/ci";
import topTost from '@/utils/topTost';
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa';

const CountryList = () => {
  const { t } = useContext(LanguageContext);
  const [listTableData, setListTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [perPage, setPerPage] = useState(2);
  const [totalRecords, setTotalRecords] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [sortType, setSortType] = useState('');
  const [activeIcon, setActiveIcon] = useState({});


  const getCountries = async () => {
    setLoading(true);

    const requestParams = { page: currentPage, limit: perPage, sortBy, sortType, keyword: searchKeyword, status: statusFilter };
    try {
      const response = await countriesApi.getCountries(requestParams);
      console.log("Country api response", response)
      if (response?.data?.status === 200) {
        const resData = response?.data?.data;
        setListTableData(resData.countries);
        setPageCount(Math.ceil(resData.total / perPage));
        setTotalRecords(resData.total);
      } else {
        topTost(response?.data?.message, "error");
      }
    } catch (error) {
      topTost("Error: " + error?.message);
    } finally {
      setLoading(false);
    }
  };


  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setCurrentPage(selectedPage + 1);
    setOffset(selectedPage * perPage);
  };

  // Sorting Handler
  const handleSorting = (e, sortBy) => {
    let newSortType = "ASC";
    if (sortBy === sortBy && sortType === "ASC") {
      newSortType = "DESC";
    }

    setSortBy(sortBy);
    setSortType(newSortType);

    const updatedIcons = { ...activeIcon, [sortBy]: newSortType };
    setActiveIcon(updatedIcons);
  };

  const activeSortIcon = (column) => {
    if (activeIcon[column] === "ASC") {
      return <FaSortUp />;
    } else if (activeIcon[column] === "DESC") {
      return <FaSortDown />;
    }
    return <FaSort />;
  };

  // Search handler
  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
    setCurrentPage(1);
    setOffset(0);
  };

  // Status filter handler
  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
    setOffset(0);
  };

  // Fetch data on page, filter, sort or search change
  useEffect(() => {
    getCountries();
  }, [offset, currentPage, perPage, statusFilter, searchKeyword, sortBy, sortType]);

  return (
    <div className="dataTables_wrapper dt-bootstrap5 no-footer">
      {loading && <CardLoader refreshKey={loading} />}

      {/* Search and Filters */}
      <div className="header-search">
        <Row className="align-items-end">
          <Col md={3} className="mb-3">
            <Form.Group>
              <Form.Label className="fw-bold text-dark">Search Country</Form.Label>
              <InputGroup>
                <Form.Control
                  name="keyword"
                  value={searchKeyword}
                  onChange={handleSearchChange}
                  placeholder="Search by country name"
                  size="sm"
                />
              </InputGroup>
            </Form.Group>
          </Col>
          <Col md={3} className="mb-3">
            <Form.Group>
              <Form.Label className="fw-bold text-dark">Filter by Status</Form.Label>
              <Form.Select
                name="status"
                size="sm"
                onChange={handleStatusChange}
                value={statusFilter}
              >
                <option value="">Select Status</option>
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

      {/* Country Table */}
      <Table className="table alignMiddle mb-0" striped>
        <thead>
          <tr>
            <th className="text-center">S.No.</th>
            <th
              className="text-center"
              onClick={(e) => handleSorting(e, "countryName")}
            >
              Country Name {activeSortIcon("countryName")}
            </th>
            <th className="text-center">Created At</th>
            <th className="text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {listTableData.length > 0 ? (
            listTableData.map((item, index) => (
              <tr key={item.id}>
                <td className="text-center">{(currentPage - 1) * perPage + index + 1}</td>
                <td className="text-center">{item.countryName}</td>
                <td className="text-center">{item.createdAt}</td>
                <td className="text-center">{item.status === 1 ? "Active" : "Inactive"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No countries found</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Pagination */}
     <div className="d-flex flex-md-row flex-column align-items-center px-4 justify-content-md-between justify-content-center py-2 gap-2">
          <div className="t-record d-flex gap-1 align-items-center text-muted ">
            Total Roles
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
    </div>
  );
};

export default CountryList;
