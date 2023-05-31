import React, {useState, useEffect} from "react";
import {
    Card, CardImg, CardBody, Table, CardTitle, CardText, Button, Col, Row
} from "reactstrap";
import AddNewsPaper from "./AddNewsPaper";
import DeleteNewsPaper from "./DeleteNewsPaper";
import axios from "axios";
import fileDownload from 'js-file-download'
import VerticalComponent from "../../Component/VerticalComponent/VerticalComponent";

function AddPaper() {
    const [newsData, setNewsData] = useState([]);
    const [addBreakingnewsModal, setBreakingnewsModal] = useState(false);
    const [deleteBreakingnewsModal, setDeleteBreakingnewsModal] = useState(false);

    const download = (e) => {
        console.log(e);
        const data = {url: e}
        console.log(data);
        axios({
            url: process.env.REACT_APP_API_BASE_URL + "/downloads", // url:e,
            method: "POST", responseType: "blob", data

        }).then((res) => {
            console.log(res);
            fileDownload(res.data, "download.pdf")
        })
    }
    console.log(newsData);

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_BASE_URL + "/newsPaper").then((response) => {
            setNewsData(response.data.response);
        });
        return () => {
        };
    }, [addBreakingnewsModal, deleteBreakingnewsModal]);
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

    let record = newsData.sort((a, b) => new Date(...a.NewsPaperDate.split('-').reverse()) - new Date(...b.NewsPaperDate.split('-').reverse()));

    console.log("record", record);
    return (<>
        <Row
            className="g-0 gy-0 border-0"
            style={{border: "1px solid red", height: "91vh"}}
        >
            <Col
                sm={2}
                style={{backgroundColor: "black"}}
                className="g-0 gy-0 border-0"
            >
                <VerticalComponent/>
            </Col>
            <Col sm={10} style={{height: "50rem"}}>
                <Col lg={12}>
                    <Card>
                        <CardTitle
                            style={{display: "flex", justifyContent: "space-between"}}
                        >
                <span
                    style={{
                        padding: "20px 0px 10px 20px", fontSize: 25, fontWeight: "bold",
                    }}
                >
                  News Paper
                </span>
                            <Button
                                type="submit"
                                name="btn"
                                onClick={handleShowNewsModal}
                                style={{
                                    margin: "20px 0px 10px 20px", backgroundColor: "Green",
                                }}
                            >
                                Add News Paper
                            </Button>
                            {AddNewsPaper(addBreakingnewsModal, handleCloseNewsModal)}
                            <Button
                                type="submit"
                                name="btn"
                                color="danger"
                                onClick={handleShowDeleteModal}
                                style={{
                                    margin: "20px 20px 10px 20px", backgroundColor: "Red yellow",
                                }}
                            >
                                Delete New's Paper
                            </Button>
                            {DeleteNewsPaper(deleteBreakingnewsModal, handleCloseDeleteModal)}
                        </CardTitle>
                        <CardBody>
                            <Table hover>
                                <thead>
                                <tr className="text-center">
                                    <th>Date</th>
                                    <th>Day</th>
                                    <th>Cover Image</th>
                                    <th> News Paper</th>
                                </tr>
                                </thead>
                                <tbody className="text-center">
                                {record.slice(0)
                                    .reverse().map((newsItem, index) => (<tr style={{width: "60rem"}} key={index}>
                                        <td scope="row">{newsItem.NewsPaperDate}</td>
                                        <td scope="row">{newsItem.Day ? newsItem.Day : "રવિવાર"}</td>
                                        <td scope="row">
                                            <img src={process.env.REACT_APP_API_URL + `${newsItem.PosterPath}`}
                                                 alt={"data"} height="50" width="50"/>
                                        </td>
                                        <td>
                                            <button onClick={(e) => {
                                                download(newsItem.Path)
                                            }}>Download
                                            </button>
                                        </td>
                                    </tr>))}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Col>
        </Row>
    </>);
}

export default AddPaper;
