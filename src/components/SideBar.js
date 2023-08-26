import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaProductHunt, FaFileInvoice } from "react-icons/fa";
import {
  MdOutlineGroups,
  MdLogout,
  MdInventory,
  MdGroup,
} from "react-icons/md";
// import { GrUserSettings } from "react-icons/gr";
import { BiTransferAlt } from "react-icons/bi";
import { RiBillFill, RiBillLine } from "react-icons/ri";
import { TiGroup } from "react-icons/ti";
import { FcExpand } from "react-icons/fc";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { BiGroup } from "react-icons/bi";
import swal from "sweetalert";
import axios from "axios";
import { useTranslation } from "react-i18next";

const SideBar = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const [subMenu, setsubMenu] = useState(false);
  const [subMenu2, setsubMenu2] = useState(false);
  const [subMenu3, setsubMenu3] = useState(false);
  const [subMenu4, setsubMenu4] = useState(false);
  const logoutSubmit = (e) => {
    e.preventDefault();
    axios.post(`api/logout`).then((res) => {
      if (res.data.status === 200) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_name");
        localStorage.removeItem("inv_id");
        swal("success", res.data.message, "success");
        navigate("/");
      } else {
        console.log("welcome");
      }
    });
  };
  let logName = localStorage.getItem("auth_name");
  return (
    <div className="mx-3 text-xl bg-white w-auto max-h-fit col-span-2">
      <ul className="font-semibold">
        <li className="flex items-center px-12">
          <div className="relative flex items-center">
            <img
              className="w-20 h-20 rounded-full items-center"
              src="https://th.bing.com/th/id/R.ace9b0ce8afe31e86581c8e28f2457f7?rik=LPH1Rw7Rdj5vNA&pid=ImgRaw&r=0"
              alt="avatar"
            />
            <span className="top-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
          </div>
        </li>
        <li className="text-gray-600 px-12 pb-4 ">{logName}</li>
        <Link
          to="/private/dashboard"
          className="py-4 px-4 text-gray-600  hover:bg-blue-100 hover:text-blue-400 rounded flex items-center"
        >
          <FaHome className="text-3xl " />
          <p className="px-4">{t("home")}</p>
        </Link>
        <Link
          to="/private/products"
          className="py-4 px-4 text-gray-600 hover:bg-blue-100 hover:text-blue-400 rounded flex items-center "
        >
          <FaProductHunt className="text-3xl" />
          <p className="px-3 ">{t("shopProduct")}</p>
        </Link>
        <Link
          onClick={() => setsubMenu(!subMenu)}
          className="py-4 px-4 text-gray-600 hover:bg-blue-100 hover:text-blue-400 rounded flex items-center"
        >
          <FaFileInvoice className="text-3xl" />
          <p className="px-3">{t("invoices")}</p>
          <FcExpand className={`mx-auto ${subMenu && "rotate-180"} `} />
        </Link>
        {subMenu && (
          <div className=" w-36 mx-5  rounded  text-gray-600 text-xl  ">
            <Link
              className="flex  py-2  hover:bg-blue-100 items-center  "
              to={"../showPurchases"}
            >
              <RiBillFill className="text-3xl mr-2" />
              {t("purchases")}
            </Link>
            <Link
              className="flex py-2 hover:bg-blue-100 text-center items-center"
              to={"../ShowSales"}
            >
              <RiBillLine className="text-3xl mr-2" />
              {t("sales")}
            </Link>
          </div>
        )}
        <Link
          onClick={() => setsubMenu3(!subMenu3)}
          className="py-4 px-4 text-gray-600 hover:bg-blue-100 hover:text-blue-400 rounded flex items-center"
        >
          <MdOutlineGroups className="text-3xl" />
          <p className="px-3">{t("suppliers")}</p>
          <FcExpand className={`mx-auto ${subMenu3 && "rotate-180"} `} />
        </Link>
        {subMenu3 && (
          <div className="  mx-5  rounded text-gray-600 text-xl   ">
            <Link
              className="flex  pb-4 pt-2 hover:bg-blue-100 items-center  "
              to={"../suppliers"}
            >
              <BiGroup className="text-3xl mr-2" />
              Show Supplier
            </Link>
            <Link
              className="flex py-2 hover:bg-blue-100 text-center items-center"
              to={"../supplierPayment"}
            >
              <GiPayMoney className="text-3xl mr-2" />
              <p>Supplier payment</p>
            </Link>
          </div>
        )}
        {/* <Link
          to="/suppliers"
          className="py-4 px-4 text-gray-600 hover:bg-blue-100 hover:text-blue-400 rounded flex items-center"
        >
          <MdOutlineGroups className="text-3xl" />
          <p className="px-3">Suppliers</p>
        </Link> */}
        <Link
          onClick={() => setsubMenu2(!subMenu2)}
          className="py-4 px-4 text-gray-600 hover:bg-blue-100 hover:text-blue-400 rounded flex items-center"
        >
          <MdInventory className="text-3xl" />
          <p className="px-3">Inventory</p>
          <FcExpand className={`mx-auto ${subMenu2 && "rotate-180"} `} />
        </Link>
        {subMenu2 && (
          <div className=" w-36 mx-5 rounded text-gray-600 text-xl  ">
            <Link
              className="flex py-2  hover:bg-blue-100 items-center "
              to={"../pages/ProductsInv"}
            >
              <FaProductHunt className="text-3xl mr-2" />
              Products
            </Link>
            <Link
              className="flex py-2 hover:bg-blue-100 text-center items-center w-full"
              to={"../showTransaction"}
            >
              <BiTransferAlt className="text-3xl mr-2" />
              Transaction
            </Link>
          </div>
        )}
        {/* <Link
          className="py-4 px-4 text-gray-600 hover:bg-blue-100 hover:text-blue-400 rounded flex items-center"
          to={"/clients"}
        >
          <TiGroup className="text-3xl mr-2" />
          Clients
        </Link> */}
        <Link
          onClick={() => setsubMenu4(!subMenu4)}
          className="py-4 px-4 text-gray-600 hover:bg-blue-100 hover:text-blue-400 rounded flex items-center"
        >
          <TiGroup className="text-3xl" />
          <p className="px-3">Clients</p>
          <FcExpand className={`mx-auto ${subMenu4 && "rotate-180"} `} />
        </Link>
        {subMenu4 && (
          <div className="  mx-5  rounded text-gray-600 text-xl   ">
            <Link
              className="flex  pb-4 pt-2 hover:bg-blue-100 items-center  "
              to={"../clients"}
            >
              <MdGroup className="text-3xl mr-2" />
              Show Client
            </Link>
            <Link
              className="flex py-2 hover:bg-blue-100 text-center items-center"
              to={"../clientPayment"}
            >
              <GiReceiveMoney className="text-3xl mr-2" />
              <p>Client payment</p>
            </Link>
          </div>
        )}

        {/* <Link
          className="py-4 px-4 text-gray-600 hover:bg-blue-100 hover:text-blue-400 rounded flex items-center"
          to={"../adduser"}
        >
          <GrUserSettings className="text-3xl" />

          <p className="px-3">Add Admin</p>
        </Link> */}
        {/* <Link>
          <GrUserSettings />
        </Link> */}
        <button
          onClick={logoutSubmit}
          className="py-4 px-4 text-gray-600 hover:bg-blue-100 hover:text-blue-400 rounded flex items-center"
        >
          <MdLogout className="text-3xl" />
          <p className="px-3">Logout</p>
        </button>
      </ul>
    </div>
  );
};

export default SideBar;
