import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { Table, Card, CardTitle, CardBody, Col, Button, Alert, Row } from "reactstrap";
import AddSubCategoryButton from './AddSubcategory';
import DeleteSubCategoryButton from "./DeletSubcategory"
import axios from "axios";
import VerticalComponent from "../../Component/VerticalComponent/VerticalComponent";

function SubCategory() {
  const [addCategoryModal, setAddCategoryModal] = useState(false);

  const [DeleteCategoryModal, setDeleteCategoryModal] = useState(false);
  const [resData, setResData] = useState([]);
  useEffect(() => {
    axios.get(process.env.REACT_APP_API_BASE_URL + "/GetCategory").then((response) => {
      setResData(response.data);
      console.log(response.data);
    });

    return () => { };
  }, [DeleteCategoryModal, addCategoryModal]);

  // console.log(resData[0].Category.EngCategory)



  const DeletehandleShowNewsModal = useCallback(() => {
    setDeleteCategoryModal(true);
  }, [DeleteCategoryModal])

  const DeletehandleCloseNewsModal = useCallback(() => {
    setDeleteCategoryModal(false);
  }, [DeleteCategoryModal])


  const handleShowNewsModal = () => {
    setAddCategoryModal(true);
  };

  const handleCloseNewsModal = () => {
    setAddCategoryModal(false);
  };
  return (
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
        <React.Fragment>
          <div className="page-content">
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
                    News
                  </span>
                  <Button
                    type="submit"
                    color="success"
                    name="btn"

                    onClick={handleShowNewsModal}
                    style={{
                      margin: "10px 0px 10px 20px",
                    }}
                  >
                    Add Categories
                  </Button>
                  {AddSubCategoryButton(addCategoryModal, handleCloseNewsModal, resData)}

                  <Button
                    type="submit"
                    color="danger"
                    name="btn"

                    onClick={DeletehandleShowNewsModal}
                    style={{
                      margin: "10px 20px 10px 20px",
                    }}
                  >
                    Delete Categories
                  </Button>
                  {DeleteSubCategoryButton(DeleteCategoryModal, DeletehandleCloseNewsModal, resData)}
                </CardTitle>
                <CardBody>
                  <Table hover>
                    <thead>
                      <tr className="text-center">
                        {/* <th>{"SR_NO"}</th> */}
                        <th>{"CATEGORY_NAME"}</th>
                        <th>{"CATEGORY_NAME _IN_ENGLISH"}</th>
                        <th>{"SUCATEGORY_NAME"}</th>
                        <th>{"CATEGORY_COLOR_CODE"}</th>
                        {/* <th>{"CREATED_DATE"}</th> */}
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {/* <tr> */}
                      {/* <td colSpan={19}> */}
                      {resData.map((newsItem, index) => (
                        <tr key={index} style={{ width: "60rem" }}>
                          {/* <th scope="row">{newsItem._Id}</th> */}
                          {console.log(newsItem.SubCategory)}
                          <td>{newsItem.Category.GujCategory}</td>
                          <td>{newsItem.Category.EngCategory}</td>
                          {/* <td>{newsItem.Category}</td> */}

                          <td>  {newsItem.SubCategory.map((item, index) => (
                            <>
                              <p key={index}>GujSubCategory: {item.GujSubCategory}, EngSubCategory: {item.EngSubCategory}</p>
                              {/* <p key={index}>,</p> */}
                            </>

                          ))}</td>
                          <td>{newsItem.Category.Colored}</td>

                          {/* <td>{newsItem.Submitted}</td> */}
                        </tr>
                      ))}
                      {/* </td> */}
                      {/* </tr> */}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </div>
        </React.Fragment>
      </Col>
    </Row>
  )
}

export default SubCategory