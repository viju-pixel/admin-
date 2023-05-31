import React, { useState } from "react";
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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

function DeleteNewsPaper(deleteBreakingnewsModal, handleCloseDeleteModal) {
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const dataValue = () => {

    const errorPopup = async(value) => {
      // console.log(value);
      setAlertMessage(value);
      setAlert(true);
      await setTimeout(() => {
        setAlert(false);
      }, 3000);
    };
    let formData = new FormData();

    let formattedDate = `${startDate.getDate()}-${
      startDate.getMonth() + 1
    }-${startDate.getFullYear()}`;
    console.log(formattedDate);

    formData.append("Date", formattedDate);
    formData.append("year", `${startDate.getFullYear()}`);
    formData.append("month", `${startDate.getMonth() + 1}`);

    axios
      .post(process.env.REACT_APP_API_BASE_URL + "/DeleteNewsPaper", formData).then(async (response) => {
        console.log(response.data.message);
        if (response.data.message == "Success"){
          setSuccessMessage(response.data.message  );
          setSuccess(true);
          await setTimeout(() => {
            setSuccess(false);
          
            handleCloseDeleteModal();
          }, 2500);
        }
      }).catch(async(err)=>{
        console.log(err.response.data.message );
        errorPopup( err.response.data.message  || err.message)
      })
  };
  return (
    <React.Fragment>
      <Modal isOpen={deleteBreakingnewsModal} centered={true}>
        <Alert
          color="success"
          style={{ width: "60%", marginLeft: "20%" }}
          isOpen={success}
        >
          {successMessage + " " + "Paper Deleted"}
        </Alert>
        <Alert
          color="danger"
          style={{ width: "60%", marginLeft: "20%" }}
          isOpen={alert}
        >
        </Alert>
        <ModalHeader>Delete New's Paper</ModalHeader>

        <ModalBody>
          <div>
            <Form>
              <FormGroup>
                {/* <br /> */}

                <Label style={{ fontWeight: "500" }}>
                  Select New's Paper Date
                </Label>

                <DatePicker
                  selected={startDate}
                  onChange={(Date) => setStartDate(Date)}
                  // minDate={new Date()}
                  dateFormat="dd-MM-yyyy"
                  shouldHighlightWeekends
                />
                <br />
                <br />

                {/* <Label for="exampleFile" style={{ fontWeight: "500" }}>
                Select New's Paper{" "}
                <a style={{ color: "#dc3545" }}>( only PDF)</a>
              </Label>
              <Input
                id="exampleFile"
                name="file"
                type="file"
                accept="application/pdf"
                onChange={(e) => {
                  setFiles(e.target.files[0]);
                }}
              /> */}

                {/* <Label>Breaking News</Label>
              <Input
                // name="text"
                type="textarea"
                bsSize="lg"
                innerRef={bnews}
                // value={bnews}
                className="mb-3"
                placeholder="News"
                style={{ width: "50rem", height: "30rem" }}
              /> */}
              </FormGroup>
              <ModalFooter style={{ float: "left", border: "none" }}>
                <Button type="button" name="btn" onClick={dataValue}>
                  {/* //    onClick={dataValue} */}
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

export default DeleteNewsPaper;
