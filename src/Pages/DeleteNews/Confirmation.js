import React, {useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import axios from "axios";
import {

    Alert,
} from "reactstrap";


function Confirmation(toggle, modal, dataID) {

    const [alert, setAlert] = useState(false);
    const [failAlert, setFailAlert] = useState(false);


    const [message, setMessage] = useState("");


    const deleteData = (props) => {

        axios.post(process.env.REACT_APP_API_BASE_URL + "/DeleteNews", {id: props._id}).then(async (response) => {
            if (response.status == 200) {
                setAlert(true);
                setMessage("Successfully Deleted News");


                await setTimeout(() => {

                    setMessage("");
                    setAlert(false);
                }, 2000);
            }
        })
            .catch(async (error) => {
                setFailAlert(true);
                setMessage("Failed To Delete News");

                await setTimeout(() => {
                    setMessage("");
                    setFailAlert(false);
                }, 2000);
            });

        toggle();
    }

    return (
        <div>
            {/* <Button color="danger" onClick={toggle}>
        Click Me
      </Button> */}

            <Alert
                isOpen={alert || failAlert}
                color={alert ? "success" : "danger"}
                style={{width: "40%", marginLeft: "60%", marginTop: "1%"}}
            >
                {message}
            </Alert>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Are You Sure To Delete News</ModalHeader>
                {/* <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody> */}
                <ModalFooter>
                    <Button color="primary" onClick={(e) => {
                        deleteData({_id: dataID})
                    }}>
                        Yes
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default Confirmation;
