import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import SideBar from "../components/SideBar";
import swal from "sweetalert";

export default function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [sell_price, setSell_price] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState([]);
  const [option, setOption] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/categories/")
      .then((data) => data.json())
      .then((val) => setCategory(val.data));
  }, []);
  console.log(category);
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/products/${id}`)
      .then(({ data }) => {
        setName(data.data.name);
        setSell_price(data.data.sell_price);
        setAmount(data.data.amount);
        setOption(data.data.category.name);
      });
  };
  var sendId;
  if (option) {
    category.map((e) => {
      if (e.name === option) {
        sendId = e.id;
      }
    });
  }
  console.log(sendId);

  const updateProduct = async (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/api/products/${id}`, {
        method: "PUT",
        name,
        sell_price,
        amount,
        category_id: sendId,
        headers: {
          "Content-Type": "Application/json",
        },
      })
      .then(
        (res) => {
          console.log(res);
          swal({
            position: "center",
            icon: "success",
            title: "New Updated Done",
            timer: 1000,
          });
          navigate("../products");
        },
        (Error) => {
          swal({
            icon: "error",
            title: "Oops...",
            text: `${Error} please change it`,
          });
        }
      );
  };

  return (
    <div className="grid grid-cols-12">
      <SideBar />
      <div className="col-start-4 col-span-7 border-2 border-blue-300 items-start rounded my-20 ">
        <h1 className="text-2xl font-semibold text-center text-gray-600 pt-2">
          Edit Product
        </h1>
        <form
          className="  grid grid-cols-2 text-gray-600  font-semibold "
          onSubmit={updateProduct}
        >
          <div className="p-4 mx-auto">
            <label>
              <p>Name</p>

              <input
                type="text"
                className=" border border-blue-400 rounded h-10 focus:outline-none focus:border-sky-500 w-52"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </label>
          </div>
          <div className="p-4 mx-auto hidden">
            <label className="">
              <p>Amount</p>
              <input
                type="number"
                min={1}
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
            </label>
          </div>
          <div className="p-4 mx-auto">
            <label>
              <p>Price</p>
              <input
                type="float"
                min={1}
                className=" border border-blue-400 rounded h-10 focus:outline-none focus:border-sky-500 w-52"
                value={sell_price}
                onChange={(e) => {
                  setSell_price(e.target.value);
                }}
              />
            </label>
          </div>
          <div className="p-4 mx-auto">
            <label>
              <p>Category</p>
              <select
                className="border border-blue-400 rounded h-10 focus:outline-none focus:border-sky-500 w-52 "
                value={option}
                onChange={(e) => setOption(e.target.value)}
              >
                <option />
                {category.map((opts, i) => (
                  <>
                    <option key={i}>{opts.name}</option>
                    {/* <input
                      type={"hidden"}
                      key={i}
                      value={opts.id}
                      id="sendId"
                    /> */}
                  </>
                ))}
              </select>
            </label>
          </div>
          <button
            type="submit"
            className="col-span-2 mx-auto bg-blue-400 rounded text-white py-2 px-3 text-xl mb-5 hover:bg-blue-500"
          >
            Update
          </button>
          {/* <input type={"hidden"} value={}/> */}
        </form>
      </div>
    </div>
  );
}
