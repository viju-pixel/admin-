import React, { useRef, useState } from "react";


import {
  Modal,
  Alert,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  FormGroup,
  Label,
  Form,
  Input,
} from "reactstrap";





import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import * as yup from "yup";
import { addingBreakingNewsSchema } from "../../Component/YupValidationSchema/Schema";

//   import CustomInput from "../../../components/Custom/TextInput/textinput";

function AddNews(addBreakingnewsModal, handleCloseNewsModal) {

  

  const srno = useRef("");
  const tittle = useRef("");
  const bnews = useRef("");
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [success, setSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const dataValue = async () => {
    // console.log(srno.current.value, tittle.current.value, bnews.current.value);

    const data = {
      srno: srno.current.value,
      tittle: tittle.current.value,
      bnews: bnews.current.value,
    };

    const validate = (values) => {
      const errors = {};

      if (values.srno == "Select") {
        errors.srno = "Please Select Sr.No";
        setAlertMessage(errors.srno);
      }

      if (!values.tittle) {
        errors.tittle = "Please enter Tittle";
      }

      if (!values.bnews) {
        errors.bnews = "Please enter Breaking News";
        setAlertMessage(errors.bnews);
      }

      return errors;
    };
    const dtl = validate(data);

    const errorPopup = async(value) => {
      // console.log(value);
      setAlertMessage(value.bnews || value.tittle || value.srno  );
      setAlert(true);
      await setTimeout(() => {
        setAlert(false);
      }, 3000);
    };

    // console.log(Object.keys(dtl).length);

  

    if ( Object.keys(dtl).length !== 0) {
      // console.log("clear");
      // console.log(dtl);
      errorPopup(dtl);
    } else {
      axios
        .post(process.env.REACT_APP_API_BASE_URL+"/AddingNews", data)
        .then(async(response) => {
          if (response.data.status === "Successfully") {
            // console.log(response.data.status);
            setSuccessMessage(response.data.status  );
            setSuccess(true);
            await setTimeout(() => {
              setSuccess(false);
              handleCloseNewsModal();
            }, 2500);
           
          }
        })
        .catch(async (error) => {
          // console.log(error.response.data.message);
          // console.log("new",error.response.data.message);
          const value = await ({bnews:error.response.data.message})
          await errorPopup(value)
        });
    }
  };

  return (
    <React.Fragment>
      <Modal
        isOpen={addBreakingnewsModal}
        centered={true}
        // toggle={handleCloseNewsModal}
        fullscreen
      >
         <Alert
          color="success"
          style={{ width: "40%", marginLeft: "60%" }}
          isOpen={success}
        >
          {successMessage +"Submited News"}
        </Alert>
        <Alert
          color="danger"
          style={{ width: "40%", marginLeft: "60%" }}
          isOpen={alert}
        >
          {alertMessage}
        </Alert>
        <ModalHeader>Add Breaking-News</ModalHeader>

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
                <Label>Tittle</Label>
                <Input
                  // id="exampleEmail"
                  // name="Tittle"
                  placeholder="Tittle"
                  innerRef={tittle}
                  label={"Tittle"}
                  type="Tittle"
                  style={{ width: "20rem" }}
                />
                <Label>Breaking News</Label>
                <Input
                  // name="text"
                  type="textarea"
                  bsSize="lg"
                  innerRef={bnews}
                  // value={bnews}
                  className="mb-3"
                  placeholder="News"
                  style={{ width: "50rem", height: "30rem" }}
                />
              </FormGroup>
              <ModalFooter style={{ float: "left", border: "none" }}>
                <Button type="button" name="btn" onClick={dataValue}>
                  Create
                </Button>

                {/* type="submit"  */}

                <Button
                  type="button"
                  name="btn"
                  color="danger"
                  onClick={handleCloseNewsModal}
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

export default AddNews;
