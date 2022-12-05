import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { BiTransfer } from "react-icons/bi";
import { TiDelete } from "react-icons/ti";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
const Transaction = () => {
  var productId, inventoryId, shopId;

  const addAction = (e) => {
    e.preventDefault();
    // console.log("hi");
  };

  const handleDelete = (index, e) => {
    setRow(row.filter((v, i) => i !== index));
  };
  const addTransaction = (e) => {
    e.preventDefault();
    if (productOption) {
      if (amount >= 1) {
        setRow(() => [
          ...row,
          {
            from,
            to,
            productOption,
            amount,
            product_id: productId,
          },
        ]);
      }
    }
    console.log("hi");
  };

  const [inventory, setInventory] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [productOption, setProductOption] = useState([]);
  const [product, setProduct] = useState([]);
  const [amount, setAmount] = useState("");
  const [row, setRow] = useState([]);

  const fetchProduct = async () => {
    await axios.get("http://127.0.0.1:8000/api/products").then((data) => {
      setProduct(data.data.data);
    });
  };
  const fetchCategory = async () => {
    await axios.get("http://127.0.0.1:8000/api/inventories").then((data) => {
      setInventory(data.data.data);
    });
  };
  const fetchInventory = async () => {
    await axios.get("http://127.0.0.1:8000/api/categories").then((data) => {
      setCategory(data.data.data);
    });
  };
  useEffect(() => {
    fetchInventory();
    fetchCategory();
    fetchProduct();
  }, []);
  let selectedProduct = [];
  if (product) {
    product.map((e) => {
      if (e.category.name === selectedCategory) {
        selectedProduct.push(e.name);
      }
    });
  }
  const navigate = useNavigate();
  const x = localStorage.getItem("auth_token");
  console.log(x);

  const CreateProvide = async (e) => {
    e.preventDefault();
    if (row.length) {
      axios
        .post("http://localhost:8000/api/provide", {
          method: "POST",
          inventory_id: inventoryId,
          shop_id: shopId,
          product: row,

          headers: {
            "Content-Type": "Application/json",
          },
        })
        .then(
          (response) => {
            swal({
              position: "center",
              icon: "success",
              title: "Successfully Transaction",
              timer: 1000,
            });
            navigate("../showTransaction");
            console.log(response);
          },
          (error) => {
            console.log(error);
            swal({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          }
        );
      // let result = await fetch(`http://localhost:8000/api/provide`, {
      //   method: "POST",
      //   body: JSON.stringify({
      //     inventory_id: inventoryId,
      //     shop_id: shopId,
      //     product: row,
      //   }),
      //   headers: {
      //     "Content-Type": "Application/json",
      //     "XSRF-TOKEN": x,
      //   },
      // });
      // await result.json();
      // console.log(result.status);
      // .then(function (a) {
      //   return a.json();
      // })
      // .then((json) => {
      //   if (json.status === true) {
      //     swal({
      //       icon: "success",
      //       title: "success",
      //       text: "New Invoice Has been added",
      //     });
      //     navigate("/dashboard");
      //   } else {
      //     swal({
      //       icon: "error",
      //       title: "'Oops...'",
      //       text: `${json.error.code}`,
      //     });
      //   }
      // });
    } else {
      swal({
        icon: "warning",
        title: "warning",
        text: "Please compelete data invoice",
      });
    }
  };
  if (productOption) {
    product.map((e) => {
      if (e.name === productOption) {
        productId = e.id;
      }
    });
  }
  if (inventory) {
    inventory.map((e) => {
      if (e.name === from) {
        inventoryId = e.id;
      }
    });
  }
  if (inventory) {
    inventory.map((e) => {
      if (e.name === to) {
        shopId = e.id;
      }
    });
  }
  return (
    <div className="grid grid-cols-12 text-xl text-gray-600">
      <SideBar />
      <div className="col-span-8 bg-gray-50 ">
        <p className=" h-fit ml-4 mb-2 pt-2 font-bold text-3xl">Transactions</p>
        <form onSubmit={CreateProvide}>
          <div className="flex justify-around m-4 p-4 bg-white items-center">
            <label>
              From
              <select
                className="border border-blue-400 rounded h-10 focus:outline-none focus:border-sky-500 w-52 ml-3"
                onChange={(e) => setFrom(e.target.value)}
              >
                <option />
                {inventory.map((e, i) => (
                  <option key={i}>{e.name}</option>
                ))}
              </select>
            </label>
            <BiTransfer className="text-3xl text-blue-400 " />
            <label>
              To
              <select
                className="border border-blue-400 rounded h-10 focus:outline-none focus:border-sky-500 w-52 ml-3"
                onChange={(e) => {
                  setTo(e.target.value);
                }}
              >
                <option />
                {inventory.map((e, i) => (
                  <option key={i}>{e.name}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="flex justify-around bg-white m-4  p-4 font-semibold ">
            <label>
              Category
              <select
                className="border border-blue-400 rounded h-10 focus:outline-none focus:border-sky-500 w-48 ml-1"
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                }}
              >
                <option />
                {category.map((e, i) => (
                  <option key={i}>{e.name}</option>
                ))}
              </select>
            </label>
            <label>
              Product
              <select
                className="border border-blue-400 rounded h-10 focus:outline-none focus:border-sky-500 w-52 ml-1"
                onChange={(e) => {
                  setProductOption(e.target.value);
                }}
              >
                <option />
                {selectedProduct.map((e, i) => (
                  <option key={i}>{e}</option>
                ))}
              </select>
            </label>
            <label>
              Qty
              <input
                type={"number"}
                min={1}
                className="border border-blue-400 w-24 text-center  mx-2 h-10 rounded"
                onChange={(e) => setAmount(e.target.value)}
              />
            </label>
            <button
              className="bg-blue-400 font-semibold text-white rounded px-3 py-1 h-10 hover:bg-blue-600"
              onClick={addTransaction}
            >
              Add
            </button>
          </div>
          <div className="flex justify-center">
            <table className="w-1000 ">
              <thead className="bg-blue-300 text-gray-600 ">
                <tr>
                  <th className="text-start p-2">From</th>
                  <th className="text-start ">To</th>
                  <th className="text-start">product</th>
                  <th className="text-start">Amount</th>
                  <th className="text-start">Action</th>
                </tr>
              </thead>
              <tbody className="bg-blue-100 ">
                {row.map((e, i) => (
                  <tr key={i} className={"border-2 border-white "}>
                    <td className="p-2 w-80">{e.from}</td>
                    <td>{e.to}</td>
                    <td>{e.productOption}</td>
                    <td>{e.amount}</td>
                    <td>
                      <TiDelete
                        className=" text-2xl hover:bg-red-500 rounded cursor-pointer"
                        onClick={(e) => handleDelete(i, e)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className=" text-end m-4 ">
            <button className="bg-blue-400 font-semibold text-white rounded px-3 py-1 h-10 hover:bg-blue-600 mr-16">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Transaction;
