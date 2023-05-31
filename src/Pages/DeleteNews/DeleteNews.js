import React, {useEffect, useState} from "react";
import "./DeleteNews.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Alert, Row, Col} from "reactstrap";
// import { faGlobe, faLink } from "@fortawesome/free-solid-svg-icons";
// import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import Confirmation from "./Confirmation";
// import { Helmet } from "react-helmet";
// import img from "../../Image/HomePageIMage/raspred1.png";
// import FullNews from "../../Component/FullNews/FullNews";
import {useNavigate,} from "react-router-dom";

// import { FullNews, MyComponent } from "../../Component/FullNews/FullNews";
import {Route, Routes, BrowserRouter, useParams} from "react-router-dom";
// import MetaDecorator from "../MetaTag/Metatag";
import VerticalComponent from "../../Component/VerticalComponent/VerticalComponent";


function DeleteNews() {
    console.log(process.env.REACT_APP_FRONT_FILES);

    // const [url, setUrl] = useState(window.location.href);
    function handleCopyUrl(url) {
        console.log(url);
        navigator.clipboard.writeText(url);
    }

    //   console.log("datassss", props.value.unique);
    const navigate = useNavigate();
    const [newsDatas, setNewsDatas] = useState([]);


    const [modal, setModal] = useState(false);
    const [dataID, setDataID] = useState("")


    const toggle = (id) => {
        setModal(!modal)
        setDataID(id)
    };

    let {userId, cat} = useParams();
    console.log("dataser", newsDatas);


    // console.log(props._id)


    const handleClick = (e) => {
        console.log("need", e.data);

        // const url  = process.env.REACT_APP_FRONT_FILES+ "/filessss" + `${e._id}`

        // window.location.href = url

        console.log();
        navigate("/fullnews/" + `${e._id}`);
        window.location.reload();

        // return (
        //   <MetaDecorator
        //     description={e.data}
        //     title={e.data}
        //     imageUrl={"Media/icon.png"}
        //     imageAlt={"imageAlt"}
        //   />

        // )

        setNewsDatas([]);
        // await


        // const metaDescTag = document.querySelector("meta[name='description']");
        // metaDescTag.setAttribute("content", e.data);
        // document.title = `${e.data}`;

        // // < Helmet><meta property="og:image" content="http://156.67.219.205:5000/Media//2023//2//27/ajay.jpg" data-rh="true"/> </Helmet>

        // const metaDescTag2 = document.querySelector("meta[property='og:image']");
        // metaDescTag2.setAttribute("content", process.env.REACT_APP_API_URL+e.image);

    };

    useEffect(() => {


        // await setNewsDatas([])
        console.warn(cat);
        setNewsDatas([]);
        {

            axios
                .post(process.env.REACT_APP_API_BASE_URL + "/allNews")
                .then(async (response) => {
                    // console.log(response.data.response);
                    await setNewsDatas(response.data.response);

                    console.log(response.data.response);
                })

        }
    }, [modal]);

    return (
        // <a href={`/FullNews/${news._id}`} className="ntres">

        <>
            {/* {props.value.unique? null :<MetaDecorator  description={"Category Block"}
        title={"Category Block"}
        imageUrl={"Category Block"}
        imageAlt={"Category Block"}
        link={"https://www.gujaratvandan.com/category/"+{cat}}/>} */}

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

                    {Confirmation(toggle, modal, dataID)}

                    {newsDatas
                        .slice(0)
                        .reverse()
                        .map((news, index) => (
                            <div className="BlockHead">
                                {console.log(news.EngCategory)}
                                <div
                                    className="refl"

                                >
                                    <div className="headlines-right">
                                        <img
                                            // src={img}
                                            src={process.env.REACT_APP_API_URL + `${news.Path}`}
                                            alt={"data"}

                                        />


                                    </div>


                                    <div className="headlines-left">
                                        {/* <h3>{news.NewsTittle}</h3> */}
                                        {/* {dts(news.EngCategory)} */}
                                        <h3>
                                            <font
                                                style={{color: news.Colored ? news.Colored : "#000000"}}
                                            >
                                                {news.NewsTittle.slice(0, 52)}
                                            </font>
                                            {/* {news.NewsSubTittle.split(" ").splice(0, 20).join(" ")} */}
                                            {/* {news.NewsTittle} */}
                                            {news.NewsSubTittle}

                                            {/* <MyComponent htmlContent={news.NewsTittle.split(" ").splice(0,20).join(" ")}/> */}
                                        </h3>
                                        {/* <p>{news.News}</p> */}
                                        {/* <p>{news.News}</p> */}
                                        {/* <MyComponent htmlContent={news.News}/> */}
                                    </div>


                                </div>


                                <button className="newsButton" onClick={(e) => {
                                    toggle(news._id)
                                }}>Delete News
                                </button>
                                <button className="newsButton" onClick={(e) => {
                                    handleClick({
                                        _id: news._id,
                                        data: news.NewsSubTittle,
                                        image: news.Path,
                                        category: news.EngCategory
                                    });
                                }}>View News
                                </button>
                                <button className="newsButton" onClick={(e) => {
                                    navigate("/EditNews/" + `${news._id}`);
                                }}>Edit News
                                </button>


                                <div className="NewFooter2">
                                    <div className="cated">{news.GujCategory}

                                    </div>
                                    <div>{news.CreatedDate}</div>


                                    <div className="SocialIcon2">

                                        <div onClick={(e) => {
                                            handleCopyUrl(process.env.REACT_APP_FRONT_FILES + "fullnews/" + news._id)
                                        }}>
                                            <FontAwesomeIcon
                                                className="SocialIconed1"
                                                href="#"
                                                // icon={faLink}
                                            ></FontAwesomeIcon>
                                        </div>
                                        <div>
                                            <FontAwesomeIcon
                                                className="SocialIconed2"
                                                href="#"
                                                // icon={faFacebook}
                                            ></FontAwesomeIcon>
                                        </div>
                                        <div>
                                            <FontAwesomeIcon
                                                className="SocialIconed2"
                                                href="#"
                                                // icon={faTwitter}
                                            ></FontAwesomeIcon>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </Col>
            </Row>
        </>
    );
}

// export default NewsBlock;
export default React.memo(DeleteNews);
