import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Button, Modal, Table } from "react-bootstrap";

import { MdDeleteForever } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { AiOutlineHome } from "react-icons/ai";
import { toast } from "react-toastify";
import "./tables.css";
import { Link } from "react-router-dom";
export default function MyTables() {
  let [userAllData, setUserAllData] = useState([]);
  const [show, setShow] = useState(false);
  let [updateId, setUpdateId] = useState();

  let userEnteredName = useRef();
  let userEnteredAge = useRef();
  const getDataFromDb = async () => {
    try {
      let apiData = await axios.get(
        "https://glacial-gorge-06787.herokuapp.com/read"
      );
      apiData = apiData.data;
      //   console.log("Api Data", apiData);
      // dummyArray = [...dummyArray, apiData];
      setUserAllData(apiData);
    } catch (e) {
      console.log("error while reading data from db ", e);
    }
  };

  const getOneUser = async (id) => {
    console.log("Id to be udated is ", updateId);
    try {
      const res = await axios.get(
        `https://glacial-gorge-06787.herokuapp.com/readone/${id}`
      );
      console.log("res = =", res);
      let data = res.data;
      let myName = data.name;
      let myage = data.age;
      console.log("user name =", myName);
      console.log("user name =", myage);
      userEnteredName.current.value = myName;
      userEnteredAge.current.value = myage;
    } catch (e) {
      console.log(" Error while reading per user data ", e);
    }
  };

  const deleteUser = async (id) => {
    console.log("ID is ", id);
    try {
      let del = await axios.delete(
        `https://glacial-gorge-06787.herokuapp.com/delete/${id}`
      );
      console.log(" Deleted Succeffuly", del);
      toast.success("Deleted Successfully");

      getDataFromDb();
    } catch (e) {
      console.log("Eror While deleting the user", e);
      toast.error("Deleting failed !");
    }
  };

  const updateUser = async () => {
    console.log("Id to be udated is ", updateId);
    let userNme = userEnteredName.current.value;
    let userAg = userEnteredAge.current.value;
    try {
      const response = await axios.put(
        "https://glacial-gorge-06787.herokuapp.com/update",
        {
          id: updateId,
          updatedUserName: userNme,
          updatedAge: userAg,
        }
      );
      getDataFromDb();
      setShow(false);

      toast.success("Updated Succeffully");
    } catch (e) {
      console.log("Error while updating User", e);
      toast.error("Updation failed");
    }
  };
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    getOneUser(id);
    setShow(true);
    setUpdateId(id);
  };

  useEffect(() => {
    getDataFromDb();
  }, [userAllData]);
  return (
    <div className="mainContainor d-flex justify-content-center align-items-center ">
      <div>
        <div className="containor">
          <div className="row">
            <div className="col-md-12">
              <div className="d-flex justify-content-center align-items-center">
                <div>
                  <Table className="tableContaner ">
                    <thead>
                      <tr>
                        <th className="fs-4 fw-bold">#</th>
                        <th className="fs-4 fw-bold">Full Name</th>
                        <th className="fs-4 fw-bold">Age</th>
                        <th className="fs-4 fw-bold">Operation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userAllData.map((items, i) => {
                        return (
                          <>
                            <tr>
                              <td className="fs-4  fw-bold">{i + 1}</td>
                              <td className="fs-5">{items.name}</td>
                              <td className="fs-5">{items.age}</td>
                              <td>
                                <span className="fs-2 fw-bold">
                                  <MdDeleteForever
                                    onClick={() => deleteUser(items._id)}
                                  />
                                </span>
                                <span className="fs-2 fw-bold ps-3">
                                  <BiEdit
                                    onClick={() => handleShow(items._id)}
                                  />
                                </span>
                              </td>
                            </tr>
                            {/* <td>@mdo</td> */}
                          </>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
          <div className=" pb-4 pt-2">
            <Link to="/">
              <span></span>

              <span className="">
                <button className="myCustomButon mt-4 p-3 ms-5">
                  {" "}
                  <AiOutlineHome className="me-4 fs-2 fw-bold" />
                  Go to Home page
                </button>
              </span>
            </Link>
          </div>
        </div>
        <div className=" d-flex justify-content-center align-items-center">
          <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header className="modalBg" closeButton>
              <Modal.Title>Update Info</Modal.Title>
            </Modal.Header>
            {/* <Modal.Body> */}{" "}
            <div className="inputContaior modalBg">
              <label className="fw-bold fs-5 ms-3">Name:</label>
              <input
                ref={userEnteredName}
                type="text"
                placeholder="Updated Name"
                className="ipTags1"
              />
              <label className="fw-bold fs-5 ms-3">Age:</label>
              <input
                ref={userEnteredAge}
                type="number"
                placeholder="Update Age"
                className="ipTags1"
              />
            </div>
            {/* </Modal.Body> */}
            <Modal.Footer className="modalBg">
              <Button variant="primary" onClick={() => updateUser()}>
                Update Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}
