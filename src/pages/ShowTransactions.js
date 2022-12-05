import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiShowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import SideBar from "../components/SideBar";

const ShowTransactions = () => {
  const [trans, setTrans] = useState([]);
  const [products, setProducts] = useState([]);
  //   const [productName, setProductName] = useState([]);
  const fetchProducts = async () => {
    await axios.get("http://127.0.0.1:8000/api/products").then((data) => {
      setProducts(data.data.data);
    });
  };
  const fetchTrans = async () => {
    await axios.get("http://127.0.0.1:8000/api/transaction").then((data) => {
      setTrans(data.data.data);
    });
  };
  useEffect(() => {
    fetchTrans();
    fetchProducts();
  }, []);
  let pr = [];
  //   if (trans) {
  //     trans.map((t) => {
  //       products.map((p) => {
  //         if (t.product_id === p.id) {
  //           pr.push(p.name);
  //         }
  //       });
  //     });
  //   }
  //   console.log(pr);

  return (
    <div className="grid grid-cols-12">
      <SideBar />
      <div className="col-span-8 bg-gray-50 ">
        <p className=" h-fit ml-4 mb-3 pt-2 font-semibold text-2xl">
          Transactions
        </p>
        <Link
          className="bg-blue-400 w-fit ml-4 p-2 rounded px-3 h-10 hover:bg-blue-500 text-white font-medium "
          to={"../pages/Transaction"}
        >
          Add New Transaction
        </Link>
        {/* <div className="bg-white rounded  text-xl m-4 py-4 flex justify-around items-center">
          <label className="flex">
            <p className="pl-4 py-2 font-semibold text-2xl">From</p>
            <input
              className="p-3 ml-4 font-semibold text-xl border border-blue-300"
              type={"date"}
              placeholder={"Invoice Number"}
            />
          </label>
          <label className="flex">
            <p className="pl-4 py-2 font-semibold text-2xl">To</p>
            <input
              className="p-3 ml-4 font-semibold text-xl border border-blue-300"
              type={"date"}
              //   value={searchProduct}
              placeholder={"Invoice Number"}
              //   onChange={(e) => setSearchProduct(e.target.value)}
            />
          </label>
        </div> */}
        <div className=" rounded m-4 text-xl  ">
          <table className=" w-full text-gray-600 ">
            <thead className="bg-blue-200 ">
              <tr>
                <th className="text-start p-2">From</th>
                <th className="text-start">To</th>
                <th className="text-start">Product</th>
                <th className="text-start">amount</th>
                <th className="text-start">Date</th>
                {/* <th className="text-start">Action</th> */}
              </tr>
            </thead>
            <tbody className="bg-blue-50 ">
              {trans.map((e, i) => (
                <tr key={i} className={"border-2 border-white"}>
                  <td className="text-start p-2">{e.inventory_id}</td>
                  <td>{e.shop_id}</td>
                  {products.map(
                    (x) => {
                      if (x.id === e.product_id) {
                        return <td key={x.id}>{x.name}</td>;
                      }
                    }
                    // ({if(x.id === e.product_id)} (<td>{x.name}</td>))
                  )}
                  {/* <td>{e.product_id}</td> */}
                  <td>{e.amount}</td>
                  <td>{e.created_at}</td>
                  {/* <td className="">
                    <BiShowAlt className="cursor-pointer hover:bg-blue-200 rounded " />
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShowTransactions;
