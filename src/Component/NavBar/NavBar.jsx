import React, { useState } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Navbar,
  NavbarBrand,
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
} from "reactstrap";
import Image from "../../assets/logolight.png";
import avatar2 from "../../assets/avatar-2.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

function NavBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  return (
    <>
      <div className="block g-0 gy-0 border-0">
        <Row className="row g-0 gy-0">
          <Col
            className="bg-light border g-0 gy-0 border-0"
            xs="2"
            style={{ height: "5rem" }}
          >
            <div className="border-0" style={{ backgroundColor: "black", height: "100%", margin: "0rem"  }}>
              <img
                src={Image}
                alt=""
                style={{ height: "3rem", width: "15rem", margin: "1rem" }}
              />
            </div>
          </Col>
          <Col style={{ backgroundColor: "white" }}>
        
            {/* <img src={faBars} alt="" className="Bars"/> */}
            
            <FontAwesomeIcon icon={faBars}  style={{height:"2rem", marginLeft:"0.5rem", marginTop:"0.6rem"}}/>
          <Dropdown
              isOpen={dropdownOpen}
              toggle={toggle}
              style={{ float: "right" }}
            >
              <DropdownToggle
                 tag="button"
                 className="btn header-item waves-effect"
                caret
                size="md"
                style={{
                  backgroundColor: "white",
                  border: "none",
                  color: "grey",
                  marginTop: "10%",
                  marginRight: "1rem",
                }}
              >
                <img
                  className="rounded-circle header-profile-user mr-1"
                  style={{height:"2rem"}}
                  src={avatar2}
                  alt="Header Avatar"
                />
                Admin
              </DropdownToggle>
              <DropdownMenu style={{ backgroundColor: "white" }}>
                <DropdownItem>Action</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            
          </Col>
        </Row>
      </div>
    </>
  );
}

export default NavBar;
