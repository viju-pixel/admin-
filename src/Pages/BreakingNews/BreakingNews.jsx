import React, { useState, useEffect } from "react";
import {
  Card,
  CardImg,
  CardBody,
  Table,
  CardTitle,
  CardText,
  Button,
  Col,
  Row
} from "reactstrap";
import AddNews from "./AddNews";
import DeleteNews from "./DeleteNews";
import axios from "axios";

import "./BreakingNews.css";
import VerticalComponent from "../../Component/VerticalComponent/VerticalComponent";

function BreakingNews() {
  // window.location = window.location

  // const [data, setData] = useState([]);

  // console.log("rendering");

  const [newsData, setNewsData] = useState([]);

  const [addBreakingnewsModal, setBreakingnewsModal] = useState(false);
  const [deleteBreakingnewsModal, setDeleteBreakingnewsModal] = useState(false);

  const handleShowDeleteModal = () => {
    setDeleteBreakingnewsModal(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteBreakingnewsModal(false);
  };

  const handleShowNewsModal = () => {
    setBreakingnewsModal(true);
  };

  const handleCloseNewsModal = () => {
    setBreakingnewsModal(false);
  };

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + "/allBreakingNews")
      .then(async (response) => {
        await setNewsData(response.data.response);
        // console.log(response.data.response);
      });
  }, [addBreakingnewsModal, deleteBreakingnewsModal]);
  return (
    <>
      <Row
        className="g-0 gy-0 border-0"
        style={{ border: "1px solid red", height: "91vh" }}
      >
        <Col
          sm={2}
          style={{ backgroundColor: "black" }}
          className="g-0 gy-0 border-0"
        >
          <VerticalComponent />
        </Col>
        <Col sm={10} style={{ height: "50rem" }}>
          <Col lg={12}>
            <Card>
              <CardTitle
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <span
                  style={{
                    padding: "20px 0px 10px 20px",
                    fontSize: 25,
                    fontWeight: "bold",
                  }}
                >
                  Breaking News
                </span>
                <Button
                  type="submit"
                  name="btn"
                  onClick={handleShowNewsModal}
                  style={{
                    margin: "20px 0px 10px 20px",
                    backgroundColor: "Green",
                  }}
                >
                  Add Breaking News
                </Button>
                {AddNews(addBreakingnewsModal, handleCloseNewsModal)}
                <Button
                  type="submit"
                  name="btn"
                  onClick={handleShowDeleteModal}
                  style={{
                    margin: "20px 0px 10px 20px",
                    backgroundColor: "red",
                  }}
                >
                  Delete Breaking News
                </Button>
                {DeleteNews(deleteBreakingnewsModal, handleCloseDeleteModal)}
              </CardTitle>
              <CardBody>
                <Table hover>
                  <thead>
                    <tr className="text-center">
                      <th>Sr No.</th>
                      <th>Breaking News</th>
                      <th>Tittle</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {newsData.map((newsItem, index) => (
                      <tr key={index} style={{ width: "60rem" }}>
                        <th scope="row">{newsItem.SrNo}</th>
                        <td>{newsItem.News}</td>
                        <td>{newsItem.Title}</td>
                        <td>{newsItem.Submitted}</td>
                      </tr>
                    ))}
                    {/* <tr style={{width:"60rem"}}>
                  <th scope="row">3</th>
                  <td>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat odit mollitia blanditiis dicta dignissimos vel minima, dolorem aliquid facere praesentium atque iste dolore, incidunt similique itaque cumque, reiciendis quo odio?</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                  
                </tr> */}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Col>
      </Row>
    </>
  );
}

export default BreakingNews;
