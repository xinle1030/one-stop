/*!

=========================================================
* Black CompanyData React v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/black-CompanyData-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-CompanyData-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Table,
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import axios from "axios";

function CompanyData(props) {
  const [output, setOutput] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pagesCount, setPagesCount] = useState(0);
  const pageSize = 100;
  let history = useHistory();
  axios.defaults.baseURL = "http://127.0.0.1:5000";

  const viewComProfile = (company) => {
    history.push({
      pathname: `/admin/company-data/${company.name_c}`,
      state: { companyName: company.name_c },
    });
  };

  const handlePageClick = (e, index) => {
    e.preventDefault();
    setCurrentPage(index);
  };

  async function fetchData() {
    axios.get("/api/companies").then((res) => setOutput(res.data));
    const length = output.length;
    setPagesCount(Math.ceil(length / pageSize));
    setOutput(output);
  }

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      fetchData();
    }
    return () => {
      ignore = true;
    };
  }, []);

  function formatTable(outputResult) {
    if (outputResult !== "") {
      const block = (
        <>
          <br></br>
          <Table className="tablesorter" responsive>
            <thead className="text-primary">
              <tr>
                <th>No.</th>
                <th>Start Up Name</th>
                <th>Last Valuation</th>
                <th>Total Funding Till Date</th>
                <th>Date of Last Fund Raise</th>
                <th>Revenue for Latest Financial Year</th>
                <th>Earnings before Interest and Tax</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {outputResult
                .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
                .map((res, index) => (
                  <tr
                    onClick={() => {
                      viewComProfile(res);
                    }}
                  >
                    <td>{index + 1}</td>
                    <td>{res.name_c}</td>
                    <td>{res.last_valuation_c}</td>
                    <td>{res.total_funding_c}</td>
                    <td>{res.last_round_size_c}</td>
                    <td>{res.revenue_c ? res.revenue_c : "-"}</td>
                    <td>{res.EBIT_c ? res.EBIT_c : "-"}</td>
                    <td>{res.category}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </>
      );
      return block;
    } else {
      return "";
    }
  }

  return (
    <>
      <div className="content">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Company Data</CardTitle>
                <p className="title d-inline">Data Outsource</p>
                <UncontrolledDropdown className="d-inline">
                  <DropdownToggle
                    caret
                    className="btn-icon"
                    color="link"
                    data-toggle="dropdown"
                    type="button"
                  >
                    <i className="tim-icons icon-settings-gear-63" />
                  </DropdownToggle>
                  <DropdownMenu aria-labelledby="dropdownMenuLink" right>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Action
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Another action
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Something else
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </CardHeader>
              <CardBody>{formatTable(output)}</CardBody>
              <CardFooter>
                <Pagination>
                  <PaginationItem disabled={currentPage <= 0}>
                    <PaginationLink
                      previous
                      onClick={() => setCurrentPage(currentPage - 1)}
                    />
                  </PaginationItem>
                  {[...Array(pagesCount)].map((page, i) => (
                    <PaginationItem active={i === currentPage} key={i}>
                      <PaginationLink
                        onClick={(e) => handlePageClick(e, i)}
                        href="#"
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem disabled={currentPage >= pagesCount - 1}>
                    <PaginationLink
                      next
                      onClick={() => setCurrentPage(currentPage + 1)}
                    />
                  </PaginationItem>
                </Pagination>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default CompanyData;
