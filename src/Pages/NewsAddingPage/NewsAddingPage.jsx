import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardBody,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
  Row, Col
} from "reactstrap";
import axios from "axios";
import JoditEditor from "jodit-react";
import VerticalComponent from "../../Component/VerticalComponent/VerticalComponent";

function NewsAddingPage() {
  const [alert, setAlert] = useState(false);
  const [failAlert, setFailAlert] = useState(false);
  const [message, setMessage] = useState("");
  const config = {
    placeholder: "Start Typing",
  }

  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [tittlecontent, setTittleContent] = useState("");

  // const config = useMemo(
  // 	{
  // 		readonly: false, // all options from https://xdsoft.net/jodit/doc/,
  // 		placeholder: placeholder || 'Start typings...'
  // 	},
  // 	[placeholder]
  // );






  const handleChange = (e) => {
    setFiles(e.target.files[0]);
    setFiled(URL.createObjectURL(e.target.files[0]));
    // console.log(URL.createObjectURL(e.target.files[0]));
    // console.log(e.target.files[0]);

    // setFiles(e.target.files[0]);
  };

  const NewsTittle = useRef("");
  const News = useRef("");
  const Imgt = useRef("");
  const Categosub = useRef("");
  // const Catego = useRef({});
  const [Catego, setCatego] = useState();
  const [files, setFiles] = useState();
  // const [Videofiles, setVideoFiles] = useState();
  const [filed, setFiled] = useState("");
  const [resData, setResData] = useState([]);
  const [indexs, setindexs] = useState("");

  const [newsubcate, setNewSubCate] = useState([]);




  const handlesubmenu = () => {
    const subCateo = resData.filter((EngSubCategorye) => {
      console.log("EngSubCategorye", EngSubCategorye.Category.EngCategory, indexs)


      return EngSubCategorye.Category.EngCategory == indexs


    })

    setNewSubCate(

      subCateo
    )



  }

  console.log("indexs", newsubcate);



  // console.log("subCateo", subCateo);
  const values = async () => {

    console.log("Categosub", Categosub.current.value);


    console.log("Catego", Catego);
    // if(await(editor.current.value.split(' ').length) < 500 ) {

    //   setFailAlert(true);
    //   setMessage("News Must be above 500 words");

    //   setTimeout(() => {
    //     setFailAlert(false);
    //     setMessage("");
    //   }, 2000);

    // }

    if (NewsTittle.current.value.length >= 52) {
      setFailAlert(true);
      setMessage("News Tittle Should be less then 52 character");

      setTimeout(() => {
        setFailAlert(false);
        setMessage("");
      }, 2000);
    } else {
      if (News.current.value.length >= 120) {
        setFailAlert(true);
        setMessage("News Sub Tittle Should be less then 120 character");

        setTimeout(() => {
          setFailAlert(false);
          setMessage("");
        }, 2000);
      } else {
        console.log(News.current.value, News.current.value.length);

        if (!files) {
          setFailAlert(true);
          setMessage("Please Select Image in jpg or png");

          setTimeout(() => {
            setFailAlert(false);
            setMessage("");
          }, 2000);
        } else {
          if (!files.name.match(/\.(jpg|jpeg|png)$/)) {
            setFailAlert(true);
            setMessage("Please Select Image in jpg or png");

            setTimeout(() => {
              setFailAlert(false);
              setMessage("");
            }, 2000);
            return false;
          } else {
            if (
              NewsTittle.current.value == "" ||
              editor.current.value == "" ||
              News.current.value == "" ||
              Catego == "Select Category"
            ) {
              setFailAlert(true);
              setMessage("Please Fill form completly ");

              await setTimeout(() => {
                setFailAlert(false);
                setMessage("");
              }, 2000);
            } else {
              const header = new Headers();
              header.append("Access-Control-Allow-Origin", "*");
              let formData = new FormData();

              formData.append("files", files);
              // formData.append("Videofiles", Videofiles);
              await formData.append("SubCategory", Categosub.current.value);

              await formData.append("Category", Catego);
              await formData.append("News", editor.current.value);
              await formData.append("NewsSubTittle", News.current.value);
              await formData.append("NewsTittle", NewsTittle.current.value);




              axios
                .post(
                  process.env.REACT_APP_API_BASE_URL + "/AddNewsDetail",
                  formData
                )
                .then(async (response) => {
                  if (response.status == 200) {
                    setAlert(true);
                    setMessage("Successfully Added News");

                    NewsTittle.current.value = "";
                    News.current.value = "";
                    editor.value = "";
                    editor.current.value = "";
                    Imgt.current.value = "";
                    setFiles("");
                    setFiled("");
                    setContent("");
                    console.log(content);
                    console.log(editor.current.value);

                    await setTimeout(() => {

                      setMessage("");
                      setAlert(false);
                    }, 2000);
                  }
                })
                .catch(async (error) => {
                  setFailAlert(true);
                  setMessage("Failed To Add News");

                  await setTimeout(() => {
                    setMessage("");
                    setFailAlert(false);
                  }, 2000);
                });
            }
          }
        }
      }
    }
  };

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + "/GetCategory")
      .then((response) => {
        setResData(response.data);
      });




  }, []);

  console.log(resData);
  return (
    <>
      <Row
        className="g-0 gy-0 border-0"
        style={{ border: "1px solid red", height: "91vh" }}
      >
        <Col
          sm={2}
          style={{ backgroundColor: "black" }}
          className="g-0 gy-0 border-0"
        >
          <VerticalComponent />
        </Col>
        <Col sm={10} style={{ height: "50rem" }}>
          <Card
            style={{
              width: "69rem",
              height: "auto",
              marginLeft: "5rem",
              marginTop: "3rem",
              marginBottom: "2rem",
            }}
          >
            <Alert
              isOpen={alert || failAlert}
              color={alert ? "success" : "danger"}
              style={{ width: "40%", marginLeft: "60%", marginTop: "1%" }}
            >
              {message}
            </Alert>
            <CardBody>
              <FormGroup>
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
                  style={{ width: "30%" }}
                  // innerRef={Catego}
                  value={Catego}
                  onClick={handlesubmenu}

                  onChange={(e) => { setindexs(e.target.value); setCatego(e.target.value) }

                  }

                >

                  <option defalut>
                    Select Category
                  </option>
                  {resData.map((item, index) => {
                    return (


                      <option key={index} value={item.Category.EngCategory} >
                        {item.Category.GujCategory}{" "}
                      </option>
                    );
                  })}
                </Input>
                <br />

                <Label
                  for="exampleSelect"
                  style={{ fontWeight: "500", marginLeft: "0.5%" }}
                >
                  Select News Sub Category
                </Label>

                <Input
                  id="exampleSelect"
                  name="select"
                  type="select"
                  bsSize="lg"
                  style={{ width: "30%" }}
                  innerRef={Categosub}
                >

                  <option defalut>
                    ----
                  </option>

                  {newsubcate.map((item, index) => {
                    return (

                      item.SubCategory.map((item, index) => {
                        return (

                          <option key={index} value={item.EngSubCategory}>
                            {item.GujSubCategory}{" "}
                          </option>
                        );
                      })
                    )
                  })}
                </Input>
                <br />
                <Label
                  for="exampleFile"
                  style={{ fontWeight: "500", marginLeft: "0.5%" }}
                >
                  Select Image
                </Label>
                <Input
                  // id="exampleFile"
                  innerRef={Imgt}
                  name="file"
                  type="file"
                  // value={}
                  style={{ width: "30%" }}
                  accept="image/jpeg, image/jpg"
                  onChange={handleChange}
                // setFiles(e.target.files[0]);
                />
                <img style={{ width: "30%" }} src={filed} alt="" />
                <br />

                <br />

                <Label
                  for="exampleEmail"
                  style={{ fontWeight: "500", marginLeft: "0.5%" }}
                >
                  News Tittle (Only Upto 52 Characters)
                </Label>

                <Input
                  id="exampleEmail"
                  name="text"
                  // placeholder="with a placeholder"
                  type="text"
                  style={{ width: "60%" }}
                  innerRef={NewsTittle}
                />
                <br />
                <Label
                  for="exampleEmail"
                  style={{ fontWeight: "500", marginLeft: "0.5%" }}
                >
                  News Sub Tittle (Only Upto 120 Characters)
                </Label>

                <Input
                  id="exampleEmail"
                  name="text"
                  // placeholder="with a placeholder"
                  type="text"
                  style={{ width: "60%" }}
                  innerRef={News}
                />
                {/* <JoditEditor
              ref={NewsTittle}
              value={tittlecontent}
              // config={config}
              tabIndex={1} // tabIndex of textarea
              onBlur={(newContent) => setTittleContent(newContent)} // preferred to use only this option to update the content for performance reasons
              onChange={(newContent) => {console.log(newContent)}}
            /> */}
                <br />

                <Label
                  for="exampleText"
                  style={{ fontWeight: "500", marginLeft: "0.5%" }}
                >
                  News{" "}
                </Label>
                {/* <Input
              id="exampleText"
              name="text"
              type="textarea"
              style={{ height: "20rem", width: "85%" }}
              innerRef={News}
            /> */}

                <JoditEditor
                  ref={editor}
                  value=""
                  config={config}
                  tabIndex={1} // tabIndex of textarea
                  onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                  onChange={(newContent) => {
                    console.log(newContent);
                  }}
                />
                <br />
                <Button
                  color="primary"
                  tag="input"
                  type="submit"
                  value="Submit"
                  style={{ fontWeight: "500", marginLeft: "0.5%" }}
                  onClick={values}
                />
              </FormGroup>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default NewsAddingPage;
