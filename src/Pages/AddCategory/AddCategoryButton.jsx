import React, { useState, useRef } from "react";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  Form,
  Input,
  FormGroup,
  Label,
  Alert,
} from "reactstrap";
import axios from "axios";

function AddCategoryButton(addCategoryModal, handleCloseNewsModal) {
  const GujInput = useRef("");
  const EngInput = useRef("");
  const [alert, setAlert] = useState(false);
  const [failAlert, setFailAlert] = useState(false);
  const [message, setMessage] = useState("");
  const colored = useRef("");
  const DataValues = async () => {


    const data = {
      EngInput: EngInput.current.value,
      GujInput: GujInput.current.value,
      colored: colored.current.value,
    };

    if ( data.EngInput == "" || data.GujInput == "" || data.colored == ""  ) {
     
      setFailAlert(true);
      setMessage("Please Enter Category in Gujarati and English");

      await setTimeout(() => {
        setFailAlert(false);
        setMessage("");
        handleCloseNewsModal();
      }, 2500);

    }else{
    await axios
      .post(process.env.REACT_APP_API_BASE_URL + "/AddingCategory", data)
      .then(async (response) => {
        if (response.status == 200) {
          setAlert(true);
          setMessage("Success");

          await setTimeout(() => {
            setAlert(false);
            setMessage("");
            handleCloseNewsModal();
          }, 2500);
        }
      })
      .catch(async (error) => {
        setFailAlert(true);
        setMessage("Failed");

        await setTimeout(() => {
          setFailAlert(false);
          setMessage("");
          handleCloseNewsModal();
        }, 2500);
      });

    }
  };
 

  return (
    <React.Fragment>
      <Modal isOpen={addCategoryModal} centered={true}>
        <ModalHeader>Add Category</ModalHeader>
        <Alert
          color={alert ? "success" : "danger"}
          style={{ width: "80%", marginLeft: "20%", marginTop: "1%" }}
          isOpen={alert || failAlert}
        >
          {message}
        </Alert>

        <ModalBody>
          <div>
            <FormGroup switch>
        

             
            </FormGroup>

            <Form>
          
              <Label style={{ fontWeight: "500" }}>
                Category Name in Gujarati:
              </Label>{" "}
              &nbsp;
              <Input type="text" innerRef={GujInput} />
              <Label style={{ fontWeight: "500" }}>
                Category Name in English:
              </Label>{" "}
              &nbsp;
              <Input type="text" innerRef={EngInput} />

             

              <Label style={{ fontWeight: "500" }}>
                Color code in Hex:
              </Label>{" "}
              &nbsp;
              <Input type="text" innerRef={colored} />
       
              <ModalFooter>
                <Button type="button" onClick={DataValues}>
                  Create
                </Button>
                <Button
                  type="button"
                  color="danger"
                  onClick={handleCloseNewsModal}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </Form>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}

export default AddCategoryButton;
