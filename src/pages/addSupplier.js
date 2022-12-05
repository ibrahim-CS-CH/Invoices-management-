import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import Swal from "sweetalert2";
import axios from "axios";
import swal from "sweetalert";

export default function AddSupplier() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const CreateSupplier = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/suppliers", {
        method: "POST",
        name,
        phone,
        headers: {
          "Content-Type": "Application/json",
        },
      })
      .then(
        (response) => {
          console.log(response);
          if (response.status === 201) {
            swal({
              position: "center",
              icon: "success",
              title: "New Supplier has been added",
              timer: 1000,
            });
            navigate("../suppliers");
          } else {
            swal({
              icon: "error",
              title: "Oops...",
              text: `${response.data.error.phone} please change it`,
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };
  return (
    <div className="grid grid-cols-12">
      <SideBar />
      <div className="col-start-4 col-span-7 border-2 border-blue-300  rounded my-20 ">
        <h1 className="text-2xl font-semibold text-center text-gray-600 pt-2">
          Add New Supplier
        </h1>
        <form
          className="grid grid-cols-2 text-gray-600  font-semibold"
          onSubmit={CreateSupplier}
        >
          <div className="p-4 mx-auto">
            <label className="">
              <p>User Name</p>
              <input
                className="border border-blue-400 rounded h-10 focus:outline-none focus:border-sky-500 w-52"
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </label>
          </div>
          {/* <div className="p-4 mx-auto">
            <label>
              <p>Email</p>
            </label>
            <input
              className="border border-blue-400 rounded h-10 focus:outline-none focus:border-sky-500 w-52"
              id="grid-last-name"
              type="email"
              // onChange={(e) => {
              //   setEmail(e.target.value);
              // }}
            />
          </div> */}
          <div className="p-4 mx-auto">
            <label>
              <p>Phone</p>
              <input
                className="border border-blue-400 rounded h-10 focus:outline-none focus:border-sky-500 w-52"
                type="number"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </label>
          </div>
          <button
            type="submit"
            className="col-span-2 shadow bg-blue-300 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mx-auto mb-4 "
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
