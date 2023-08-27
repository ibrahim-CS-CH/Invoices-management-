import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "../components/SideBar";
import { BiShowAlt } from "react-icons/bi";
import { useTranslation } from "react-i18next";

const ShowPur = () => {
  const {t} = useTranslation();
  var x = [];
  const [salesInv, setSalesInv] = useState([]);

  const fetchProducts = async () => {
    await axios
      .get(
        "http://localhost:8000/api/postponedInvoices?&type=purchases&status=postponed"
      )
      .then((data) => {
        setSalesInv(data.data.data);
      });
  };
  // const fetchAll = async () => {
  //   await axios
  //     .get(
  //       "http://localhost:8000/api/sales-invoices"
  //     )
  //     .then((data) => {
  //       console.log(data, "trying");
  //     }).catch((err)=>console.log(err));
  // };
  const [searchProduct, setSearchProduct] = useState("");
  const [purchases, setPurchases] = useState([]);
  // if (salesInv) {
  //   salesInv.map((e) => {
  //     if (e.type === "purchases") {
  //       x.push(e);
  //     }
  //   });
  //   console.log(x);
  // }
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="grid grid-cols-12">
      <SideBar />
      <div className="col-span-10 bg-gray-50 text-xl ">
        <p className=" h-fit ml-4 mb-3 pt-2 font-semibold text-2xl">
          {t("purchases")}
        </p>
        <Link
          className="bg-blue-400 w-fit ml-4 p-2 rounded px-3 h-10 hover:bg-blue-500 text-white font-medium "
          to={"../pages/Purcheses"}
        >
          {t("addPurchases")}
        </Link>
        <div className="bg-white rounded  text-xl m-4">
          <label>
            {/* <p className="pl-4 py-2 font-semibold text-2xl">Search</p> */}
            {/* <input
              className="p-3 ml-4 font-semibold text-xl border border-blue-300"
              type={"text"}
              value={searchProduct}
              placeholder={"Invoice Number"}
              onChange={(e) => setSearchProduct(e.target.value)}
            /> */}
          </label>
          <div className=" rounded m-4 text-xl  ">
            <table className=" w-full text-gray-600 ">
              <thead className="bg-blue-200 ">
                <tr>
                  <th className="text-start p-2">{t("invoiceNum")}</th>

                  <th className="text-start">{t("total")}</th>
                  <th className="text-start">{t("paid")}</th>
                  <th className="text-start">{t("rest")}</th>
                  <th className="text-start">{t("type")}</th>
                  <th className="text-start">{t("supplierName")}</th>
                  <th className="text-start">{t("codePurchase")}</th>
                  <th className="text-start">{t("created_at")}</th>
                  {/* <th className="text-start">Action</th> */}
                </tr>
              </thead>
              <tbody className="bg-blue-50 ">
                {salesInv &&
                  salesInv
                    .filter((value) => {
                      if (searchProduct === "") {
                        return value;
                      } else if (
                        value.name
                          .toLowerCase()
                          .includes(searchProduct.toLowerCase())
                      ) {
                        return value;
                      }
                    })
                    .map((e, i) => (
                      <tr key={i} className={"border-2 border-white"}>
                        <td className="text-start p-2">{e.id}</td>

                        <td>{e.total}</td>
                        <td>{e.paid}</td>
                        <td>{e.total - e.paid}</td>
                        <td>{e.status}</td>
                        {e.supplier.map((sup) => (
                          <td>{sup.name}</td>
                        ))}
                        {/* <td className="">
                          <BiShowAlt className="cursor-pointer hover:bg-blue-200 rounded " />
                        </td> */}
                        <td>{e.code}</td>
                        <td>{e.created_at}</td>
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

export default ShowPur;
