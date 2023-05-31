import React, { useRef, useState, memo } from "react";
import {
  Button,
  Modal,
  Alert,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Form,
  FormGroup,
} from "reactstrap";
import axios from "axios";
import PropTypes from "prop-types";

function DeleteNews (deleteBreakingnewsModal, handleCloseDeleteModal) {
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const srno = useRef("");

  const dataValue = () => {
    // console.log(srno.current.value);

    if (srno.current.value === "Select") {
      setAlertMessage("Please Select the Sr.No");
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
        
      }, 2500);

    } else {
      axios
        .post(process.env.REACT_APP_API_BASE_URL+"/DeleteBreakingNews", {
          srno: srno.current.value,
        })
        .then(async (response) => {
        

          if (response.data.message === "Successfully") {
         
            setSuccessMessage(response.data.message);
            setSuccess(true);
            await setTimeout(() => {
              setSuccess(false);
              handleCloseDeleteModal();
            }, 2500);
          } else {
            // console.log("data");
            setAlertMessage("News is unable to Delete");
            setAlert(true);
            setTimeout(() => {
              setAlert(false);
              handleCloseDeleteModal();
            }, 2500);
          }
        }).catch ((error)=> {

          // console.log(error.response.data.messages);
          setAlertMessage(error.response.data.messages);
          setAlert(true);
          setTimeout(() => {
            setAlert(false);
            
          }, 2500);
        })
    }
  };
  return (
    <React.Fragment>
      <Modal
        isOpen={deleteBreakingnewsModal}
        centered={true}
        // toggle={handleCloseNewsModal}
        //   fullscreen
      >
        <Alert
          color="success"
          style={{ width: "60%", marginLeft: "40%"  ,marginTop:"1%"}}
          isOpen={success}
        >
          {successMessage + " "+"Deleted  News"}
        </Alert>
        <Alert
          color="danger"
          style={{ width: "60%", marginLeft: "40%" ,marginTop:"1%" }}
          isOpen={alert}
        >
          {alertMessage}
        </Alert>
        <ModalHeader> Delete Breaking-News</ModalHeader>
        <ModalBody>
          <div>
            <Form>
              <FormGroup>
                <Label>Sr No.</Label>
                <Input innerRef={srno} type="select" style={{ width: "10rem" }}>
                  <option hidden>Select</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                </Input>
              </FormGroup>
              <ModalFooter style={{ float: "left", border: "none" }}>
                <Button type="button" name="btn" onClick={dataValue}>
                  Delete
                </Button>

                {/* type="submit"  */}

                <Button
                  type="button"
                  name="btn"
                  color="danger"
                  onClick={handleCloseDeleteModal}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </Form>
            {/* )} */}
            {/* </Formik> */}
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}

export default DeleteNews;
