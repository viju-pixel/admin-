import logo from "./logo.svg";
import "./App.css";
import { Row, Col } from "reactstrap";
import { useState, useEffect } from 'react'

import NavBar from "./Component/NavBar/NavBar";
import VerticalComponent from "./Component/VerticalComponent/VerticalComponent";
import BreakingNews from "./Pages/BreakingNews/BreakingNews";
import AddPaper from "./Pages/AddPaper/AddPaper";
import AddCategory from "./Pages/AddCategory/AddCategory";
import AddVideos from "./Pages/AddVideos/AddVideos";
// import Login from "./Pages/Admin Login/Login";
import DeleteNews from "./Pages/DeleteNews/DeleteNews";
import NewsAddingPage from "./Pages/NewsAddingPage/NewsAddingPage";
import { FullNews } from "./Pages/DeleteNews/FullNews";
import EditNews from "./Pages/DeleteNews/EditNews";
import SubCategory from "./Pages/AddSubCategory/SubCategory";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Confirmation from "./Pages/DeleteNews/Confirmation";

// login module
import LoginModal from "./Pages/Login/Login"
import DeleteVideo from "./Pages/DeleteVideo/DeleteVideo";

function App() {
  console.log(process.env.REACT_APP_API_BASE_URL);
  return (
    <>
      <div className="App">
        <NavBar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginModal />} />
            <Route path="/NewsAddingPage" element={<NewsAddingPage />} />
            <Route path="/AddCategory" element={<AddCategory />} />
            <Route path="/SubCategory" element={<SubCategory />} />
            <Route path="/AddPaper" element={<AddPaper />} />
            <Route path="/Addvideos" element={<AddVideos />} />
            <Route path="/DeleteVideo" element={<DeleteVideo />} />
            <Route path="/BreakingNews" element={<BreakingNews />} />
            <Route path="/EditNews/:dataId" element={<EditNews />} />
            <Route path="/Delete" element={<DeleteNews />} />
            <Route path="/fullnews/:userId" element={<FullNews />} />
            <Route path="/users/" element />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
