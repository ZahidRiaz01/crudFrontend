import React, { useRef } from "react";
import "./crud.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import { BsForwardFill } from "react-icons/bs";
import { BiMessageSquareAdd } from "react-icons/bi";

export default function Crud() {
  let userEnteredName = useRef();
  let userEnteredAge = useRef();

  const addDataToDataBase = async () => {
    let userNme = userEnteredName.current.value;
    let userAg = userEnteredAge.current.value;
    if (userNme.length > 0 && userAg.length > 0) {
      try {
        const response = await axios.post(
          "https://crudmycrud.herokuapp.com//insertItems",
          { withCredentials: false },
          {
            name: userNme,
            age: userAg,
          }
        );
        // .then(function (response) {
        //   console.log("RESPONSE", response.request.body);
        // })
        // .catch((e) => {
        //   console.log("RESPONSE error", e);
        // });
        toast.success("Added Data Successfully");
        console.log("Posted data ", response);
      } catch (e) {
        console.log("Error while posting data from front end");
        toast.error("Adding Data Failed");
      }
      //adding faltu comment
    } else {
      toast.info("Fields cannot be empty");
    }
  };
  return (
    <div className="mainWithBg ">
      <div className="d-flex justify-content-center align-items-center">
        <div className="container">
          <div className="row ">
            <div className="col-md-12">
              <div className="headContainor">
                <p className="headText">My Crud Application</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="midContainor">
                <div className="inputContaior">
                  {/* <label>Name</label> */}
                  <input
                    ref={userEnteredName}
                    type="text"
                    placeholder="Name"
                    className="mt-5 ipTags"
                  />
                  {/* <label>Age</label> */}
                  <input
                    ref={userEnteredAge}
                    type="number"
                    placeholder="Age"
                    className=" mt-3 ipTags"
                  />
                </div>
                <div className=" pb-4 pt-2">
                  <span className="">
                    <button
                      onClick={() => addDataToDataBase()}
                      className="myCustomButon mt-4 p-3"
                    >
                      Add Data <BiMessageSquareAdd className=" fs-3 ms-2" />
                    </button>
                  </span>

                  <Link to="/table">
                    <span className="">
                      <button className="myCustomButon mt-4 p-3 ms-5">
                        View List <BsForwardFill className=" fs-3 ms-2 " />
                      </button>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
