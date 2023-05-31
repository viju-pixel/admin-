import React, {useState, useEffect, useRef} from "react";
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

function AddNewsPaper(addBreakingnewsModal, handleCloseNewsModal) {
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [files, setFiles] = useState();
    const [imageFiles, setImageFiles] = useState();
    const days = useRef("");

    const dataValue = () => {
        console.log(days.current.value);
        const errorPopup = async (value) => {
            // console.log(value);
            setAlertMessage(value);
            setAlert(true);
            setTimeout(() => {
                setAlert(false);
            }, 3000);
        };
        console.log(files);
        if (!files) {
            errorPopup("Select News Paper");
        }

        if (!imageFiles) {
            errorPopup("Select EPaper Poster");
        }

        if (!files.name.match(/\.(pdf)$/)) {
            errorPopup("Select News Paper in pdf format");
        } else {
            let formData = new FormData();
            formData.append("files", files);
            formData.append("poster", imageFiles);
            let formattedDate = `${startDate.getDate()}-${startDate.getMonth() + 1
            }-${startDate.getFullYear()}`;
            console.log(formattedDate);

            formData.append("Date", formattedDate);
            formData.append("Day", days.current.value);
            formData.append("year", `${startDate.getFullYear()}`);
            formData.append("month", `${startDate.getMonth() + 1}`);

            axios.post(process.env.REACT_APP_API_BASE_URL + "/AddingNewsPaper", formData)
                .then(async (response) => {
                    if (response.data.message == "Successfully") {
                        setSuccessMessage(response.data.message);
                        setSuccess(true);
                        setTimeout(() => {
                            setSuccess(false);
                            setFiles("");
                            handleCloseNewsModal();
                        }, 2500);
                    }
                })
                .catch(async (error) => {
                    console.log(error);
                    console.log(error.response.data.message);
                    setFiles("");

                    errorPopup(error.response.data.message || error.message);
                });
        }
    };

    return (
        <React.Fragment>
            <Modal isOpen={addBreakingnewsModal} centered={true}>
                <Alert
                    color="success"
                    style={{width: "60%", marginLeft: "20%"}}
                    isOpen={success}
                >
                    {successMessage + " " + "Paper Submited"}
                </Alert>
                <Alert
                    color="danger"
                    style={{width: "60%", marginLeft: "20%"}}
                    isOpen={alert}
                >
                    {alertMessage}
                </Alert>
                <ModalHeader>Add News Paper</ModalHeader>

                <ModalBody>
                    <div>
                        <Form>
                            <FormGroup>
                                <Label style={{fontWeight: "500"}}>
                                    Select News Paper Date
                                </Label>

                                <DatePicker
                                    selected={startDate}
                                    onChange={(Date) => setStartDate(Date)}
                                    dateFormat="dd-MM-yyyy"
                                    shouldHighlightWeekends
                                />
                                <br/>
                                <br/>
                                <Label for="exampleFile" style={{fontWeight: "500"}}>
                                    News Paper Day {" "}
                                </Label>

                                <Input
                                    id="exampleEmail"
                                    name="select"
                                    type="select"
                                    style={{width: "60%"}}
                                    innerRef={days}
                                >
                                    <option>સોમવાર</option>
                                    <option>મંગળવાર</option>
                                    <option>બુધવાર</option>
                                    <option>ગુરુવાર</option>
                                    <option>શુક્રવાર</option>
                                    <option>શનિવાર</option>
                                    <option>રવિવાર</option>
                                </Input>
                                <br/>
                                <Label for="exampleFile" style={{fontWeight: "500"}}>
                                    Select News Paper{" "}
                                    <a style={{color: "#dc3545"}}>( only PDF)</a>
                                </Label>
                                <Input
                                    id="exampleFile"
                                    name="file"
                                    type="file"
                                    accept="application/pdf"
                                    onChange={(e) => {
                                        setFiles(e.target.files[0]);
                                    }}
                                />

                                <br/>
                                <Label for="exampleFile1" style={{fontWeight: "500"}}>
                                    Select Custom Cover Image
                                </Label>
                                <Input
                                    id="exampleFile1"
                                    name="file"
                                    type="file"
                                    accept="image/jpeg, image/jpg"
                                    onChange={(e) => {
                                        setImageFiles(e.target.files[0]);
                                    }}
                                />
                            </FormGroup>
                            <ModalFooter style={{float: "left", border: "none"}}>
                                <Button type="button" name="btn" onClick={dataValue}>
                                    Create
                                </Button>
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
                    </div>
                </ModalBody>
            </Modal>
        </React.Fragment>
    );
}

export default AddNewsPaper;
