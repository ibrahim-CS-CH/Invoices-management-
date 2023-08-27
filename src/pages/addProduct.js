import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Swal from "sweetalert2";
import SideBar from "../components/SideBar";
import { useTranslation } from "react-i18next";

export default function AddProduct() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [sell_price, setSell_price] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState([]);
  const [option, setOption] = useState("");
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/categories")
      .then((data) => data.json())
      .then((val) => setCategory(val.data));
  }, []);

  var sendId;
  if (option) {
    category.map((e) => {
      if (e.name === option) {
        sendId = e.id;
      }
    });
  }
  const CreateProduct = async (e) => {
    e.preventDefault();

    axios
      .post(`http://localhost:8000/api/products`, {
        method: "POST",
        name,
        sell_price,
        // purchase_price:"15",
        amount,
        category_id: sendId,
        headers: {
          "Content-Type": "Application/json",
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          swal({
            position: "center",
            icon: "success",
            title: "New Product has been added",

            timer: 1000,
          });
          navigate("/private/products");
        } else {
          swal({
            icon: "error",
            title: "Oops...",
            text: `there are some Error`,
          });
        }
      });
    // if (result.status === 201) {
    //   Swal.fire({
    //     position: "center",
    //     icon: "success",
    //     title: "New Product Has Been Added",
    //     showConfirmButton: false,
    //     timer: 1500,
    //   });
    //   console.log(result.status);
    //   navigate("/products");
    // } else {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Oops...",
    //     text: "Something went wrong!",
    //     // footer: '<a href="">Why do I have this issue?</a>',
    //   });
    // }
  };
  return (
    <div className="grid grid-cols-12">
      <SideBar />
      <div className="col-start-4 col-span-7 border-2 border-blue-300  rounded my-20 ">
        <h1 className="text-2xl font-semibold text-center text-gray-600 pt-2">
          {t("addProduct")}
        </h1>
        <form
          className="grid grid-cols-2 text-gray-600  font-semibold"
          onSubmit={CreateProduct}>
          <div className="p-4 mx-auto">
            <label className="">
              <p>{t("name")}</p>
              <input
                className=" border border-blue-400 rounded h-10 focus:outline-none focus:border-sky-500 w-52"
                type="text"
                placeholder={t("productName")}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
              />
            </label>
          </div>
          <div className="p-4 mx-auto">
            <label className="">
              <p>{t("price")}</p>
              <input
                className=" border border-blue-400 rounded h-10 focus:outline-none focus:border-sky-500 w-52"
                id="grid-last-name"
                type="number"
                placeholder={t("price")}
                min={1}
                onChange={(e) => {
                  setSell_price(e.target.value);
                }}
                required
              />
            </label>
          </div>

          <div className="p-4 mx-auto hidden">
            <label>
              <p>{t("amount")}</p>
              <input
                className=" border border-blue-400 rounded h-10 focus:outline-none focus:border-sky-500 w-52"
                type="number"
                min={1}
                placeholder={t("amount")}
                value={amount}
                readOnly
                // onChange={(e) => {
                //   setAmount(e.target.value);
                // }}
              />
            </label>
          </div>
          <div className="p-4 mx-auto">
            <label className="">
              <p>{t("category")}</p>
              <select
                className="border border-blue-400 rounded h-10 w-52 focus:outline-none focus:border-sky-500 "
                value={option}
                placeholder={t("category")}
                onChange={(e) => setOption(e.target.value)}
                required
                >
                <option >{t("select category")}</option>
                {category.map((opts, i) => (
                  <option key={i}>{opts.name}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="flex justify-center col-span-2">
            <button
              type="submit"
              className=" rounded  px-3 py-2 text-xl mb-5 hover:bg-red-500 border hover:text-white hover:border-white duration-300">
              {t("save")}
            </button>
            <Link
              to={-1}
              className="mx-5  rounded px-3 py-2 text-xl mb-5 hover:bg-orange-500 border hover:text-white hover:border-white duration-300">
              {t("cancel")}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
