import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "../components/SideBar";

const ShowSales = () => {
  const [salesInv, setSalesInv] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    await axios.get("http://127.0.0.1:8000/api/filter/sales").then((data) => {
      setSalesInv(data.data.data);
    });
  };
  return (
    <div className="grid grid-cols-12">
      <SideBar />
      <div className="col-span-8 bg-gray-50 ">
        <p className=" h-fit ml-4 mb-3 pt-2 font-semibold text-2xl">
          Sales Invoices
        </p>
        <Link
          className="bg-blue-400 w-fit ml-4 p-2 rounded px-3 h-10 hover:bg-blue-500 text-white font-medium "
          to={"../pages/Sales"}
        >
          Add New Invoice
        </Link>
        <div className="bg-white rounded  text-xl m-4">
          <label>
            <p className="pl-4 py-2 font-semibold text-2xl">Search</p>
            <input
              className="p-3 ml-4 font-semibold text-xl border border-blue-300"
              type={"text"}
              placeholder={"Invoice Number"}
            />
          </label>
          <div className=" rounded m-4 text-xl  ">
            <table className=" w-full text-gray-600 ">
              <thead className="bg-blue-200 ">
                <tr>
                  <th className="text-start p-2">No</th>
                  <th className="text-start">Status</th>
                  <th className="text-start">Total</th>
                  <th className="text-start">Padi</th>
                  <th className="text-start">client</th>

                  {/* <th className="text-start">Action</th> */}
                </tr>
              </thead>
              <tbody className="bg-blue-50 ">
                {salesInv.map((e, i) => (
                  <tr key={i} className={"border-2 border-white"}>
                    <td className="text-start p-2">{e.id}</td>
                    <td>{e.status}</td>
                    <td>{e.total}</td>
                    <td>{e.paid}</td>
                    {e.customer.map((cust) => (
                      <td key={i}>{cust.name}</td>
                    ))}
                    {/* <td>asd</td> */}
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

export default ShowSales;
