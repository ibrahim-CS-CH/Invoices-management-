import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "../components/SideBar";
import swal from "sweetalert";
import { TiDelete } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

const Sales = () => {
  let productChosen = [];
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [categ, setCateg] = useState([]);
  const [product, setProduct] = useState("");
  const [option, setOption] = useState("");
  const [total, setTotal] = useState();
  const [x, setX] = useState([]);
  const [t1, setT1] = useState([]);
  const [invoice, setInvoice] = useState([]);
  const [paid, setPaid] = useState(0);
  const [invProduct, setInvProduct] = useState([]);
  const navigate = useNavigate();
  var productId;
  const fetchCategory = async () => {
    await axios.get("http://127.0.0.1:8000/api/categories").then((data) => {
      setCateg(data.data.data);
    });
  };
  useEffect(() => {
    fetchCategory();
    fetchProductQty();
  }, []);

  const fetchProduct = async () => {
    await axios.get("http://127.0.0.1:8000/api/products").then((data) => {
      setProduct(data.data.data);
    });
  };
  const fetchProductQty = async () => {
    await axios.get("http://127.0.0.1:8000/api/inventories/2").then((data) => {
      setInvProduct(data.data.data.products);
    });
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  let sum = 0;
  for (let i = 0; i < t1.length; i++) {
    sum = sum + t1[i].total;
  }
  var dsa;
  if (product) {
    product.map((e) => {
      if (e.name === x) {
        dsa = e.sell_price;
      }
    });
  }
  if (product) {
    product.map((e) => {
      if (e.category.name === option) {
        productChosen.push(e.name);
      }
    });
  }

  if (product) {
    product.map((e) => {
      if (e.name === x) {
        productId = e.id;
      }
    });
  }
  const onSubmit = (e) => {
    e.preventDefault();
    if (total !== undefined && total !== "") {
      var qty = total / dsa;
      setT1(() => [
        ...t1,
        {
          product: x,
          sell_price: dsa,
          amount: qty,
          total,
          product_id: productId,
        },
      ]);
    } else {
      swal("Please Select Your Order and Quantity");
    }
    setTotal("");
    setOption("");
    document.getElementById("resetQty").value = "";
    document.getElementById("resetPrice").value = "";
  };
  // if (paid ===total) {

  // }
  const handleDelete = (index, e) => {
    setT1(t1.filter((v, i) => i !== index));
  };

  const CreateSells = async (e) => {
    e.preventDefault();

    if (t1.length) {
      await axios
        .post(`http://localhost:8000/api/sellInvoice`, {
          method: "POST",
          product: t1,
          total: sum,
          paid,
          inventory_id: 2,
          customerName: name,
          customerPhone: phone,
          headers: {
            "Content-Type": "Application/json",
          },
        })
        .then((res) => {
          swal({
            icon: "success",
            title: "success",
            text: "New Invoice Has been added",
          });
          navigate("../ShowSales");
        });
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
    } else {
      swal({
        icon: "warning",
        title: "warning",
        text: "Please compelete data invoice",
      });
    }
  };

  return (
    <div className="grid grid-cols-12 text-xl text-gray-600">
      <SideBar />
      <div className="col-span-8 bg-gray-50 ">
        <p className=" h-fit ml-4 mb-2 pt-2 font-semibold text-2xl">Sales</p>

        <form onSubmit={CreateSells}>
          <div className="bg-white rounded m-4 space-x-5 w-fit p-4">
            <p className="font-semibold mb-3">Client Details</p>
            <label>
              Name
              <input
                type={"text"}
                className="border border-blue-400 w-48  mx-2 h-10 rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              Phone
              <input
                type={"text"}
                className="border border-blue-400 w-48  mx-2 h-10 rounded"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </label>
          </div>
          <div className=" bg-white rounded mx-2 space-x-8  p-4 ">
            <p className="font-semibold mb-2 pt-2">Order Details</p>
            <div className=" bg-white rounded ml-2 p-4 flex justify-around ">
              <label>
                Category
                <select
                  className="border border-blue-400 rounded h-10 focus:outline-none focus:border-sky-500 w-52 ml-1 "
                  value={option}
                  onChange={(e) => setOption(e.target.value)}
                >
                  <option />
                  {categ.map((e, i) => (
                    <option key={i}>{e.name}</option>
                  ))}
                </select>
              </label>
              <label className="">
                Product
                <select
                  className="border border-blue-400 rounded h-10 focus:outline-none focus:border-sky-500 w-52 ml-1"
                  onChange={(e) => setX(e.target.value)}
                >
                  <option />
                  {productChosen.map((e, i) => (
                    <option key={i}>{e}</option>
                  ))}
                </select>
              </label>
              <label>
                Price
                <input
                  name={dsa}
                  value={dsa}
                  readOnly
                  className="border border-blue-400 w-20 text-center ml-1 h-10 rounded"
                  id={"resetPrice"}
                />
                <span className="mr-1">$</span>
              </label>
              <label>
                Qty
                <input
                  type={"number"}
                  min={1}
                  className="border border-blue-400 w-16 text-center ml-1 h-10 rounded"
                  onChange={(e) => setTotal(e.target.value * +dsa)}
                  id={"resetQty"}
                />
              </label>
              <label>
                Total
                <input
                  className="border border-blue-400 w-16 text-center ml-1 h-10 rounded"
                  value={total}
                />
              </label>
              <button
                onClick={onSubmit}
                className="bg-blue-400 font-semibold text-white rounded px-3 py-1 h-10"
              >
                Add
              </button>
            </div>
          </div>

          <div className="m-4">
            <table className="w-1000 mx-auto">
              <thead className="bg-blue-300 text-gray-600">
                <tr>
                  <th className="text-start p-2">product</th>
                  <th className="text-start">price</th>
                  <th className="text-start">Qty</th>
                  <th className="text-start">Total</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody className="bg-blue-100 ">
                {t1.map((e, i) => (
                  <tr key={i} className={"border-2 border-white"}>
                    <td className="p-2 w-80">{e.product}</td>
                    <td>{e.sell_price}</td>
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
          <div className="bg-white m-4 space-x-5 w-fit p-4 font-semibold">
            <p>
              The reset
              <span className="bg-white rounded p-1 mx-1 border border-blue-300">
                {sum - paid}
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Sales;
