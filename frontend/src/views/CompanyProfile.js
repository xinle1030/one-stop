/*!

=========================================================
* Black Dashboard React v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";
import { useLocation } from "react-router-dom";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import axios from "axios";

function CompanyProfile() {
  const location = useLocation();
  const companyName = location.state.companyName;
  axios.defaults.baseURL = "http://127.0.0.1:5000";
  const [company, setCompany] = useState({});
  const [chartData, setChartData] = useState({});

  const RadarOptions = {
    scale: {
      legend: {
        display: true
      },
      angleLines: {
        color: "#fff",
      },
      gridLines: {
        color: "#fff",
      },
      ticks: {
        beginAtZero: true,
        fontColor: "#fff",
      },
    },
  };

  useEffect(() => {
    console.log(companyName);
    const getCompanyProfile = () => {
      axios
        .get(`/api/companies/${companyName}`)
        .then((res) => {
          let retData = res.data;
          console.log(retData);
          setCompany(retData);

          setChartData({
            labels: [
              "Total Funding",
              "Last Valuation",
              "Amount raised during last funding round",
              "Revenue for Latest Financial Year",
              "Earnings before Interest and Tax",
              "Employee Growth past 12 months",
            ],
            datasets: [
              {
                label: "Performance Metrics",
                data: [
                  retData.total_funding_c,
                  retData.last_valuation_c,
                  retData.last_round_size_c,
                  retData.revenue_c,
                  retData.EBIT_c,
                  retData.revenue_growth,
                ],
                backgroundColor: "rgba(34, 202, 236, .2)",
                borderColor: "rgba(34, 202, 236, 1)",
                pointBackgroundColor: "rgba(34, 202, 236, 1)",
                pointHoverBorderColor: "rgba(34, 202, 236, 1)",
              },
            ],
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getCompanyProfile();
  }, [companyName]);

  const data = {
    revenue_c: "Revenue growth compared to last FY",
    date_of_last_round: "Date of last fund raise",
    fy_end: "Date of Financial Year End",
    employee_growth_6: "Employee Growth past 6 months",
    employee_growth_12: "Employee Growth past 12 months",
    num_founders: "Num of Founders",
    num_funding_rounds: "Number of Funding Rounds",
    num_shareholders: "Number of Shareholders",
    min_share: "Minimum Share in %",
    median_share: "Median Share in %",
    max_share: "Max Share in %",
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="5">
            <Card>
              <CardHeader className="mb-5">
                <h5 className="card-category">
                  Incorporation Date:{" "}
                  <span>{company && company.incorporated_date_c}</span>
                </h5>
                <CardTitle tag="h3">
                  <h3>
                    Company Name: <span>{company && company.name_c}</span>
                  </h3>
                  <h5>
                    Categories: <span>{company && company.category}</span>
                  </h5>
                </CardTitle>
              </CardHeader>
              <CardBody>
                {Object.entries(data).map(([key, value]) => (
                  <div className="typography-line">
                    <h3>
                      <span>{value}</span>
                      {company[key] ? company[key] : "-"}
                    </h3>
                  </div>
                ))}
              </CardBody>
            </Card>
          </Col>
          {/* </Row>
        <Row> */}
          <Col md="7">
            <Card>
              <CardHeader>
                <h5 className="card-category">Performance Metrics</h5>
                <CardTitle tag="h3">
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Radar data={chartData} options={RadarOptions}></Radar>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default CompanyProfile;
