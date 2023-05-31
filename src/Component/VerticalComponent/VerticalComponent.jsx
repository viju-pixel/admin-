import React, {useState} from "react";
import {
    Navbar,
    NavbarBrand,
    Row,
    Col,
    ListGroup,
    ListGroupItem,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";
import ImgNews from "../../assets/newspaper.png";
import BreakingNews from "../../assets/breaking-news.png";
import Categories from "../../assets/categories.png";
import Ebook from "../../assets/e-book.png";
import Video from "../../assets/AddVideo.png"

import "./VerticalComponent.css";

function VerticalComponent() {
    return (
        <>
            <div
                style={{color: "white", fontWeight: "bold", backgroundColor: "black"}}
            >
                {" "}
                Menu{" "}
            </div>

            <ListGroup className="g-0 gy-0 border-0">
                <div className="Data">
                <ListGroupItem className="new">
                        <img src={ImgNews} alt=""/>
                        <a className="NavItems" href="/users">Users</a>
                    </ListGroupItem>
                    <ListGroupItem className="new">
                        <img src={ImgNews} alt=""/>
                        <a className="NavItems" href="/NewsAddingPage">News</a>
                    </ListGroupItem>
                    <ListGroupItem className="new">
                        <img src={Categories} alt=""/>
                        <a className="NavItems" href="/AddCategory"> Categories </a>
                    </ListGroupItem>
                    <ListGroupItem className="new">
                        <img src={Categories} alt=""/>
                        <a className="NavItems" href="/SubCategory"> SubCategories </a>
                    </ListGroupItem>
                    <ListGroupItem className="new">
                        <img src={Ebook} alt=""/>
                        <a className="NavItems" href="/AddPaper">E-News </a>
                    </ListGroupItem>
                    <ListGroupItem className="new">
                        <img src={BreakingNews} alt=""/>
                        <a className="NavItems" href="/BreakingNews"> Breaking News </a>
                    </ListGroupItem>
                    <ListGroupItem className="new">
                        <img src={Video} alt=""/>
                        <a className="NavItems" href="/AddVideos"> Add Videos </a>
                    </ListGroupItem>
                    <ListGroupItem className="new">
                        <img src={ImgNews} alt=""/>
                        <a className="NavItems" href="/Delete"> Delete or Update News </a>
                    </ListGroupItem>
                    <ListGroupItem className="new">
                        <img src={Video} alt=""/>
                        <a className="NavItems" href="/DeleteVideo"> Delete or Update Video </a>
                    </ListGroupItem>
                </div>
            </ListGroup>
            {/* </div> */}
        </>
    );
}

export default VerticalComponent;
