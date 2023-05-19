/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState } from "react";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";
import axios from "axios";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  CustomInput,
  Row,
  Col,
  Input,
  Progress,
  Table
} from "reactstrap";

function Playground() {
  const [jsonOutput, setJsonOutput] = useState("");
  const [input, setInput] = useState({});

  const callPredictApi = () => {
    setJsonOutput("");

    const arrInput = [
      input.total_funding_c,
      input.EBIT_c,
      input.employee_growth_6,
      input.employee_growth_12,
      input.num_funding_rounds,
      input.num_shareholders,
      input.revenue_c,
    ];

    const textInput = arrInput.join(",");

    console.log(textInput)

    axios.defaults.baseURL = "http://127.0.0.1:5000";
    axios
      .post("/api/predict-metrics", {
        data: textInput,
      })
      .then((res) => {
        setJsonOutput(JSON.stringify(res.data));
      });
  };

    function formatTable(outputResult) {
      if (outputResult !== "") {
        const text = JSON.parse(outputResult);
        const block = (
          <>
            <br></br>
            <Table className="tablesorter" responsive>
              <thead className="text-primary">
                <tr>
                  <th>Revenue Growth</th>
                  <th>Min Share</th>
                  <th>Median Share</th>
                  <th>Max Share</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{text.revenue_growth}</td>
                  <td>{text.min_share}</td>
                  <td>{text.median_share}</td>
                  <td>{text.max_share}</td>
                </tr>
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
      <BackgroundColorContext.Consumer>
        {({ color }) => (
          <div className="content">
            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">Playground</CardTitle>
                    <p className="category">
                      Try out our playground here for your desired company
                      metric prediction!
                    </p>
                  </CardHeader>

                  <CardBody>
                    <Form>
                      <Row>
                        <Col md="4">
                          <FormGroup>
                            <label>Total Funding</label>
                            <Input
                              placeholder="Total Funding till Date"
                              type="text"
                              onChange={(e) =>
                                setInput((prevInput) => {
                                  return {
                                    ...prevInput,
                                    total_funding_c: e.target.value,
                                  };
                                })
                              }
                            />
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <FormGroup>
                            <label>Earnings</label>
                            <Input
                              placeholder="Earnings before Interest and Tax"
                              type="text"
                              onChange={(e) =>
                                setInput((prevInput) => {
                                  return {
                                    ...prevInput,
                                    EBIT_c: e.target.value,
                                  };
                                })
                              }
                            />
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <FormGroup>
                            <label>Number of Funding Rounds</label>
                            <Input
                              placeholder="Number of Funding Rounds"
                              type="text"
                              onChange={(e) =>
                                setInput((prevInput) => {
                                  return {
                                    ...prevInput,
                                    num_funding_rounds: e.target.value,
                                  };
                                })
                              }
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6">
                          <FormGroup>
                            <label>Employee Growth past 6 Months</label>
                            <Input
                              placeholder="in (%)"
                              type="text"
                              onChange={(e) =>
                                setInput((prevInput) => {
                                  return {
                                    ...prevInput,
                                    employee_growth_6: e.target.value,
                                  };
                                })
                              }
                            />
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup>
                            <label>Employee Growth past 12 Months</label>
                            <Input
                              placeholder="in %"
                              type="text"
                              onChange={(e) =>
                                setInput((prevInput) => {
                                  return {
                                    ...prevInput,
                                    employee_growth_12: e.target.value,
                                  };
                                })
                              }
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6">
                          <FormGroup>
                            <label>Number of Shareholders</label>
                            <Input
                              placeholder="Number of Shareholders"
                              type="text"
                              onChange={(e) =>
                                setInput((prevInput) => {
                                  return {
                                    ...prevInput,
                                    num_shareholders: e.target.value,
                                  };
                                })
                              }
                            />
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup>
                            <label>Revenue for Latest Financial Year</label>
                            <Input
                              placeholder="Revenue for Latest Financial Year"
                              type="text"
                              onChange={(e) =>
                                setInput((prevInput) => {
                                  return {
                                    ...prevInput,
                                    revenue_c: e.target.value,
                                  };
                                })
                              }
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                  <CardFooter>
                    <Button
                      className="btn-fill"
                      color={
                        color === "blue"
                          ? "info"
                          : color === "green"
                          ? "success"
                          : "primary"
                      }
                      type="submit"
                      onClick={callPredictApi}
                    >
                      Try the Magic!
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">Performance Metric Prediction</CardTitle>
                    <label>
                    Here are the list of predicted performance metrics for venture capital evaluation.
                    </label>
                  </CardHeader>
                  <CardBody>{formatTable(jsonOutput)}</CardBody>
                  <CardFooter></CardFooter>
                </Card>
              </Col>
            </Row>
          </div>
        )}
      </BackgroundColorContext.Consumer>
    </>
  );
}

export default Playground;
