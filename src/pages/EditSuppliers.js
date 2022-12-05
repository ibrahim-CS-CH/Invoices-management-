import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import SideBar from "../components/SideBar";
import Swal from "sweetalert2";
import swal from "sweetalert";
const EditSuppliers = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    fetchSupplier();
  }, []);

  const fetchSupplier = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/suppliers/${id}`)
      .then(({ data }) => {
        setName(data.data.name);
        setPhone(data.data.phone);
      });
  };

  const updateSupplier = async (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/api/suppliers/${id}`, {
        method: "PUT",
        name,
        phone,
        headers: {
          "Content-Type": "Application/json",
        },
      })
      .then(
        (response) => {
          console.log(response);
          if (response.data.data) {
            swal({
              position: "center",
              icon: "success",
              title: "Your update Done successfully",
              timer: 1500,
            });
            navigate("../suppliers");
          }

          if (response.data.error) {
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
      <div className="col-start-4 col-span-7 border-2 border-blue-300 items-start rounded my-20 ">
        <h1 className="text-2xl font-semibold text-center text-gray-600 pt-2">
          Edit Supplier
        </h1>
        <form
          className="  grid grid-cols-2 text-gray-600  font-semibold "
          onSubmit={updateSupplier}
        >
          <div className="p-4 mx-auto">
            <label className="mr-2 ">Name</label>
            <input
              type="text"
              className=" border border-blue-400 rounded h-10 focus:outline-none focus:border-sky-500"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="p-4 mx-auto">
            <label className="mr-2  ">Phone</label>
            <input
              type="text"
              className=" border border-blue-400 rounded h-10 focus:outline-none focus:border-sky-500"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </div>

          <div className="col-span-2 mx-auto bg-blue-400 rounded text-white px-3 py-2 text-xl mb-5 hover:bg-blue-500">
            <button type="submit" className="">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EditSuppliers;
