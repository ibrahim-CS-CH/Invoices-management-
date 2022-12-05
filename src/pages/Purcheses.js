import axios from "axios";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { TiDelete } from "react-icons/ti";
import SideBar from "../components/SideBar";
import { json, Navigate, useNavigate } from "react-router-dom";

const Purcheses = () => {
  const [supplier, setSupplier] = useState([]);
  const [categ, setCateg] = useState([]);
  const [product, setProduct] = useState([]);
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");
  const [selectedProduct, setSelectedProduct] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [info, setInfo] = useState([]);
  const [inv, setInv] = useState([]);
  const [invNo, setInvNo] = useState("");
  const [supplierSelected, setSupplierSelected] = useState("");

  const fetchSupplier = async () => {
    await axios.get("http://127.0.0.1:8000/api/suppliers").then((data) => {
      setSupplier(data.data.data);
    });
  };

  const fetchCategory = async () => {
    await axios.get("http://127.0.0.1:8000/api/categories").then((data) => {
      setCateg(data.data.data);
    });
  };
  const fetchProduct = async () => {
    await axios.get("http://127.0.0.1:8000/api/products").then((data) => {
      setProduct(data.data.data);
    });
  };
  useEffect(() => {
    fetchSupplier();
    fetchProduct();
    fetchCategory();
    fetchInventory();
  }, []);
  let productChosen = [];
  if (product) {
    product.map((e) => {
      if (e.category.name === selectedCategory) {
        productChosen.push(e.name);
      }
    });
  }
  const addProduct = (e) => {
    e.preventDefault();
    if (qty * price > 1) {
      setInfo(() => [
        ...info,
        {
          product: selectedProduct,
          purchase_price: price,
          amount: qty,
          total: qty * price,
          product_id: productId,
        },
      ]);
    } else {
      swal({
        icon: "info",
        title: "No product Found To Add",
      });
    }
    setPrice("");
    setQty("");
  };
  let sum = 0;
  for (let i = 0; i < info.length; i++) {
    sum = sum + info[i].total;
  }

  const handleDelete = (index, e) => {
    setInfo(info.filter((v, i) => i !== index));
  };
  const [inventory, setInventory] = useState([]);
  const fetchInventory = async () => {
    await axios.get("http://127.0.0.1:8000/api/inventories").then((data) => {
      setInventory(data.data.data);
    });
  };
  console.log(product);
  const [selectedInventory, setSelectedInventory] = useState("");
  const [paid, setPaid] = useState(0);
  var productId, supplierId;
  if (supplierSelected) {
    supplier.map((e) => {
      if (e.name === supplierSelected) {
        supplierId = e.id;
      }
    });
  }
  if (selectedProduct) {
    product.map((e) => {
      if (e.name === selectedProduct) {
        productId = e.id;
      }
    });
  }
  const navigate = useNavigate();
  const CreatePurchase = async (e) => {
    e.preventDefault();
    if (info.length) {
      await axios
        .post(`http://localhost:8000/api/purchaseInvoice`, {
          method: "POST",
          supplier_id: supplierId,
          code: invNo,
          product: info,
          total: sum,
          paid,
          inventory_id: selectedInventory,
          headers: {
            "Content-Type": "Application/json",
          },
        })
        .then((res) => {
          console.log(res);
          console.log("success");
          swal({
            icon: "success",
            title: "success",
            text: "New Invoice Has been added",
            timer: 1000,
          });
          navigate("../showPurchases");
        })
        .then((err) => {
          console.log(err);
        });

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
      //     navigate("/showPurchases");
      //   } else {
      //     swal({
      //       icon: "error",
      //       title: "'Oops...'",
      //       text: `${json.error.code}`,
      //     });
      //   }
      // });
      // } else {
      //   swal({
      //     icon: "warning",
      //     title: "warning",
      //     text: "Please compelete data invoice",
      //   });
    }
  };

  return (
    <div className="grid grid-cols-12 text-xl text-gray-600">
      <SideBar />
      <div className="col-span-8 bg-gray-50 p-4">
        <p className=" h-fit ml-4 mb-2 pt-2 font-bold text-3xl">Purchases</p>
        <form onSubmit={CreatePurchase}>
          <div className="bg-white m-4 space-x-5 w-fit p-4 font-semibold">
            <label>
              Supplier
              <select
                className="border border-blue-400 rounded h-10 focus:outline-none focus:border-sky-500 w-52 ml-1"
                required
                onChange={(e) => {
                  setSupplierSelected(e.target.value);
                }}
              >
                <option />
                {supplier.map((e, i) => (
                  <option key={i}>{e.name}</option>
                ))}
              </select>
            </label>
            <label>
              Code
              <input
                type={"number"}
                className="border border-blue-400 w-28 text-center  mx-2 h-10 rounded"
                required
                onChange={(e) => {
                  setInvNo(e.target.value);
                }}
              />
            </label>
          </div>
          <div className="bg-white m-4 space-x-5 w-fit p-4 font-semibold">
            <label>
              Store In
              <select
                className="border border-blue-400 rounded h-10 focus:outline-none focus:border-sky-500 w-48 ml-1"
                onChange={(e) => {
                  setSelectedInventory(e.target.value);
                }}
              >
                <option />
                {inventory.map((e, i) => (
                  <option key={i} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="bg-white m-4 space-x-4 w-fit p-4 font-semibold">
            <label>
              Category
              <select
                className="border border-blue-400 rounded h-10 focus:outline-none focus:border-sky-500 w-48 ml-1"
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                }}
              >
                <option />
                {categ.map((e, i) => (
                  <option key={i}>{e.name}</option>
                ))}
              </select>
            </label>
            <label>
              Product
              <select
                className="border border-blue-400 rounded h-10 focus:outline-none focus:border-sky-500 w-52 ml-1"
                onChange={(e) => {
                  setSelectedProduct(e.target.value);
                }}
              >
                <option />
                {productChosen.map((e, i) => (
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
                value={qty}
                onChange={(e) => setQty(e.target.value)}
              />
            </label>
            <label>
              Price
              <input
                type={"number"}
                className="border border-blue-400 w-16 text-center  mx-2 h-10 rounded"
                min={1}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>
            <label className="hidden">
              Total
              <input
                readOnly
                type={"text"}
                className="border border-blue-400 w-20 text-center  mx-2 h-10 rounded"
                value={price * qty}
              />
            </label>
            <button
              className="bg-blue-400 font-semibold text-white rounded px-3 py-1 h-10"
              onClick={addProduct}
            >
              Add
            </button>
          </div>
          <div className="ml-4">
            <table className="w-1000 ">
              <thead className="bg-blue-300 text-gray-600 ">
                <tr>
                  <th className="text-start p-2">product</th>
                  <th className="text-start ">price</th>
                  <th className="text-start">Qty</th>
                  <th className="text-start">Total</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody className="bg-blue-100">
                {info.map((e, i) => (
                  <tr key={i} className={"border-2 border-white"}>
                    <td className="p-2 w-80">{e.product}</td>
                    <td>{e.purchase_price}</td>
                    <td>{e.amount}</td>
                    <td>{e.total}</td>
                    <td>
                      <TiDelete
                        className=" text-2xl hover:bg-red-500 rounded cursor-pointer mx-auto"
                        onClick={(e) => handleDelete(i, e)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-white m-4 space-x-5 w-fit p-4 font-semibold">
            Total invoice:
            <span className="bg-white rounded p-1 mx-1 border border-blue-300">
              {sum}$
            </span>
            <label>
              Paid
              <input
                type={"number"}
                min={0}
                value={paid}
                className="border border-blue-400 w-24 text-center  mx-2 h-10 rounded"
                onChange={(e) => {
                  setPaid(e.target.value);
                }}
              />
            </label>
            <button
              className="bg-blue-400 text-white font-semibold rounded px-3 py-1 "
              type="submit"
            >
              Submit
            </button>
          </div>

          {/* <div className="bg-white m-4 space-x-5 w-fit p-4 font-semibold">
            <label>
              store in
              <select
                className="border border-blue-400 rounded h-10 focus:outline-none focus:border-sky-500 w-48 ml-1"
                // onChange={(e) => {
                //   setSelectedCategory(e.target.value);
                // }}
              >
                <option />
                {inventory.map((e, i) => (
                  <option key={i}>{e.name}</option>
                ))}
              </select>
            </label>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default Purcheses;
