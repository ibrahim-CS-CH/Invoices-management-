import { data } from "autoprefixer";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiShowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import Swal from "sweetalert2";
import SideBar from "../components/SideBar";

const SupplierPay = () => {
  const [sales, setSales] = useState([]);
  const [searchProduct, setSearchProduct] = useState("");

  const fetchPurhcases = async () => {
    await axios
      .get(
        "http://localhost:8000/api/postponedInvoices?type=sales&status=postponed"
      )
      .then((data) => {
        setSales(data.data.data);
      });
  };

  useEffect(() => {
    fetchPurhcases();
  }, []);
  //   console.log(sales);
  const partPay = async (id) => {
    const { value: number } = await Swal.fire({
      input: "number",
      inputLabel: "Amount Paid",
      inputPlaceholder: "Enter paid",
    });

    if (number) {
      await axios
        .put(`http://localhost:8000/api/partial_payment/${id}`, {
          payment: number,
          method: "PUT",
          headers: {
            "Content-Type": "Application/json",
          },
        })
        .then((res) => {
          console.log(res);
          fetchPurhcases();
        });
    }
  };
  const fullPay = async (id) => {
    Swal.fire({
      icon: "warning",
      title: "Are You Sure, Full payment?",
      showCancelButton: true,
    }).then((data) => {
      if (data.isConfirmed) {
        axios
          .put(`http://localhost:8000/api/full_payment/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "Application/json",
            },
          })
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              swal({
                position: "center",
                icon: "success",
                title: "Successfully Paid",
                timer: 1000,
              });
              setSales(sales.filter((sales) => sales.id !== id));
            }
            if (res.data) {
              swal({
                position: "center",
                icon: "error",
                title: "Already Paid",
                timer: 1000,
              });
            }
          });
      }
    });

    console.log(id);
  };

  return (
    <div className="grid grid-cols-12 ">
      <SideBar />
      <div className="col-span-8 bg-gray-50 ">
        <p className=" h-fit ml-4 mb-3 pt-2 font-semibold text-3xl text-gray-600">
          Client Payment
        </p>
        {/* <Link
          className="bg-blue-400 w-fit ml-4 p-2 rounded px-3 h-10 hover:bg-blue-500 text-white font-medium "
          to={"/pages/Purcheses"}
        >
          Add New Invoice
        </Link> */}
        <div className="bg-white rounded  text-xl m-4">
          <label>
            <p className="pl-4 py-2 font-semibold text-2xl text-gray-600">
              Search
            </p>
            <input
              className="p-3 ml-4 font-semibold text-xl border border-blue-300"
              type={"text"}
              value={searchProduct}
              placeholder={"Invoice Number"}
              onChange={(e) => setSearchProduct(e.target.value)}
            />
          </label>
          <div className=" rounded m-4 text-xl  ">
            <table className=" w-full text-gray-600 ">
              <thead className="bg-blue-200 ">
                <tr>
                  <th className="text-start p-2">Invoice-No</th>
                  <th className="text-start p-2">Client</th>
                  <th className="text-start">Status</th>
                  <th className="text-start">Paid</th>
                  <th className="text-start">Total</th>
                  <th className="text-start ">Method</th>
                </tr>
              </thead>
              <tbody className="bg-blue-50 ">
                {sales &&
                  sales
                    .filter((value) => {
                      if (searchProduct === "") {
                        return value;
                      } else if (value.name.includes(searchProduct)) {
                        return value;
                      }
                    })
                    .map((e, i) => (
                      <tr key={i} className={"border-2 border-white"}>
                        <td className="text-start p-2">{e.id}</td>
                        <td className="text-start p-2">{e.id}</td>
                        <td>{e.status}</td>
                        <td>{e.paid}</td>
                        <td>{e.total}</td>
                        <td className="">
                          {/* <BiShowAlt className="cursor-pointer hover:bg-blue-200 rounded " /> */}
                          <button
                            className="bg-green-700 text-white px-2 py-1 rounded hover:bg-green-800 mx-1"
                            onClick={() => {
                              fullPay(e.id);
                            }}
                          >
                            Full
                          </button>
                          <button
                            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-800"
                            onClick={() => {
                              partPay(e.id);
                            }}
                          >
                            Partial
                          </button>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierPay;
