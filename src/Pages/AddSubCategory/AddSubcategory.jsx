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
  Alert
} from "reactstrap";
import axios from "axios";

function AddSubcategory(addCategoryModal, handleCloseNewsModal, resData) {
  const Catego = useRef({});
  const GujSubInput = useRef("");
  const EngSubInput = useRef("");

  const [alert, setAlert] = useState(false);
  const [failAlert, setFailAlert] = useState(false);
  const [message, setMessage] = useState("");


  const DataValues = async () => {

    await axios.post(process.env.REACT_APP_API_BASE_URL + "/AddSubCategory", {
      EngInput: Catego.current.value,
      GujSubCategory: GujSubInput.current.value,
      EngSubCategory: EngSubInput.current.value

    }).then(async (response) => {
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
  };


  return (
    <React.Fragment>
      <Modal isOpen={addCategoryModal} centered={true}>
        <ModalHeader>Add Sub Category </ModalHeader>
        <Alert
          color={alert ? "success" : "danger"}
          style={{ width: "80%", marginLeft: "20%", marginTop: "1%" }}
          isOpen={alert || failAlert}
        >
          {message}
        </Alert>
        <ModalBody>
          <div>
            <FormGroup switch></FormGroup>

            <Form>

              <Label
                for="exampleSelect"
                style={{ fontWeight: "500", marginLeft: "0.5%" }}
              >
                Select News Category
              </Label>
              <Input
                id="exampleSelect"
                name="select"
                type="select"
                bsSize="lg"
                style={{ width: "60%" }}
                innerRef={Catego}
              >
                {resData.map((item, index) => {
                  return (
                    <option key={index} value={item.Category.EngCategory}>
                      {item.Category.GujCategory}{" "}
                    </option>
                  );
                })}
              </Input>

              <Label style={{ fontWeight: "500" }}>
                Category Name in Gujarati:
              </Label>{" "}
              &nbsp;
              <Input type="text" innerRef={GujSubInput} />
              <Label style={{ fontWeight: "500" }}>
                Category Name in English:
              </Label>{" "}
              &nbsp;
              <Input type="text" innerRef={EngSubInput} />

              <ModalFooter>
                <Button type="button" onClick={DataValues}>
                  Add
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

export default AddSubcategory