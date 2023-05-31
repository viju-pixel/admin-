import React, {useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import axios from "axios";
import {Alert} from "reactstrap";

function Confirmation(toggle, modal, dataID) {
    const [alert, setAlert] = useState(false);
    const [failAlert, setFailAlert] = useState(false);
    const [message, setMessage] = useState("");
    const deleteData = (props) => {
        axios.post(process.env.REACT_APP_API_BASE_URL + "/deleteVideo", {id: props._id})
            .then(async (response) => {
                if (response.status === 200) {
                    setAlert(true);
                    setMessage("Successfully Deleted Video");
                    setTimeout(() => {
                        setMessage("");
                        setAlert(false);
                        window.location.reload();
                    }, 2000);
                }
            })
            .catch(async (error) => {
                setFailAlert(true);
                setMessage("Failed To Delete Video");
                setTimeout(() => {
                    setMessage("");
                    setFailAlert(false);
                }, 2000);
            });
        toggle();
    }
    return (
        <div>
            <Alert
                isOpen={alert || failAlert}
                color={alert ? "success" : "danger"}
                style={{width: "40%", marginLeft: "60%", marginTop: "1%"}}
            >
                {message}
            </Alert>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Are You Sure To Delete Video</ModalHeader>
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
