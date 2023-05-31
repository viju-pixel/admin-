import React, {useEffect, useState} from "react";
import "./DeleteVideo.css";
import {Row, Col} from "reactstrap";
import axios from "axios";
import Confirmation from "./Confirmation";
import {useNavigate,} from "react-router-dom";
import {Route, Routes, BrowserRouter, useParams} from "react-router-dom";
import VerticalComponent from "../../Component/VerticalComponent/VerticalComponent";

function DeleteVideo() {
    const navigate = useNavigate();
    const [videoData, setVideoData] = useState([]);
    const [modal, setModal] = useState(false);
    const [dataID, setDataID] = useState("")
    const deleteVideo = (id) => {
        setModal(!modal)
        setDataID(id)
    };

    let {userId, cat} = useParams();
    useEffect(() => {
        setVideoData([]);
        {
            axios.get(process.env.REACT_APP_API_BASE_URL + "/getAllVideoData")
                .then(async (response) => {
                    await setVideoData(response.data);
                    console.log(videoData);
                })
        }
    }, [modal]);

    return (
        <>
            <Row className="g-0 gy-0 border-0" style={{border: "1px solid red", height: "91vh"}}>
                <Col sm={2} style={{backgroundColor: "black"}} className="g-0 gy-0 border-0">
                    <VerticalComponent/>
                </Col>
                <Col sm={10} style={{height: "50rem"}}>
                    {Confirmation(deleteVideo, modal, dataID)}
                    {videoData.map((news, index) => (
                            <div className="BlockHead" key={index}>
                                <div className="refl">
                                    <div className="headlines-right">
                                        <img src={process.env.REACT_APP_API_URL + `${news.ImagePath}`} alt={"data"}/>
                                    </div>
                                    <div className="headlines-left">
                                        <h3>
                                            <font style={{color: news.Colored ? news.Colored : "#000000"}}>
                                                {news.NewsTittle.slice(0, 52)}
                                            </font>
                                            {news.NewsSubTittle}
                                        </h3>
                                    </div>
                                </div>
                                <button className="newsButton" onClick={(e) => {
                                    deleteVideo(news._id)
                                }}>Delete Video
                                </button>
                                <div className="NewFooter2">
                                    <div className="cated">
                                        {news.GujCategory}
                                    </div>
                                    <div>{news.CreatedDate}</div>
                                </div>
                            </div>
                        ))}
                </Col>
            </Row>
        </>
    );
}

// export default NewsBlock;
export default React.memo(DeleteVideo);
