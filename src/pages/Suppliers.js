import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { icons } from "react-icons";

const Supplier = () => {
  const [supplier, setSupplier] = useState([]);
  const [searchSupplier, setSearchSupplier] = useState("");
  useEffect(() => {
    fetchSupplier();
  }, []);
  const searchResult = supplier && supplier.filter((e)=>e.name.toLowerCase().includes(searchSupplier.toLowerCase()));

  const fetchSupplier = async () => {
    await axios.get("http://localhost:8000/api/suppliers").then((data) => {
      setSupplier(data.data.data);
    });
  };
  const deleteSupplier = (id) => {
    Swal.fire({
      title: `Are You Sure To delete?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it",
    }).then((data) => {
      if (data.isConfirmed) {
        axios
          .delete(`http://localhost:8000/api/suppliers/${id}`)
          .then(() => {
            Swal.fire("Deleted!", "This Supplier has been deleted.", "success");
            fetchSupplier();
          })
          .catch(({ response: { data } }) => {
            Swal.fire("error 401 ","sorry you can't able to delete this supplier", "error");

            console.log(data.data.message);
          });
      }
    });
  };
  

  return (
    <div className="grid grid-cols-12">
      <SideBar />
      <div className="col-span-9 bg-gray-50 ">
        <p className=" h-fit ml-4 pt-2 mb-3 font-semibold text-2xl">
          Suppliers
        </p>
        <Link
          to={"../addsupplier"}
          className="bg-blue-400 w-fit ml-4 rounded px-3 h-10 hover:bg-blue-500 text-white font-medium py-2"
        >
          Add New Supplier
        </Link>
        <div className="bg-white rounded m-4">
          <p className="p-3 font-semibold text-2xl">Search</p>
          <input
            className="border border-gray-400 rounded p-2 m-3 w-80"
            type="text"
            placeholder="supplier name"
            onChange={(e) => setSearchSupplier(e.target.value)}
          />
        </div>
        <div className=" rounded m-4 text-xl ">
          <table className="table-auto w-full  text-gray-600">
            <thead className="bg-blue-200">
              <tr>
                <th className="text-start py-2 pl-2">user Name</th>
                <th className="text-start">Phone</th>
                <th className="">Action</th>
              </tr>
            </thead>
            <tbody className="bg-blue-50">
              {searchResult.length ? searchResult
                  .map((sup) => (
                    <tr key={sup.id} className={"border-2 border-white"}>
                      <td className="p-2">{sup.name}</td>
                      <td>{sup.phone}</td>
                      <td className="text-center">
                        <ul className="mt-1">
                          <Link
                            className="mr-3 px-3 py-1 rounded bg-blue-400 text-white hover:bg-blue-600 "
                            to={`../editsupplier/${sup.id}`}
                          >
                            Edit
                          </Link>
                          <button
                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-800"
                            onClick={() => {
                              deleteSupplier(sup.id);
                            }}
                          >
                            Delete
                          </button>
                        </ul>
                      </td>
                    </tr>
                  )): <tr className="">Data not founded, Try another search</tr>}
            </tbody>
          </table>
          {/* <nav className="Page text-center navigation example">
            <ul className="inline-flex -space-x-px">
              {pages.map((page) => (
                <li>
                  <p
                    className="px-3 cursor-pointer py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    onClick={() => pagination(page)}
                  >
                    {page}
                  </p>
                </li>
              ))}
            </ul>
          </nav> */}
        </div>
      </div>
    </div>
  );
};

export default Supplier;
