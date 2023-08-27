import React, { useEffect, useState } from "react";
import { FcSalesPerformance, FcDocument, FcBusinessman } from "react-icons/fc";
import { GiPayMoney } from "react-icons/gi";
import { Link } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";


const pageSize = 5;
const Section = () => {
  const {t} = useTranslation();


  const [dashboard, setDashboard] = useState([]);
  const [invoices, setInvoices] = useState([]);

  
  // const pageCount = invoices ? Math.ceil(invoices.length / pageSize) : 0;
  // if (pageCount === 1) return null;
  // const pages = _.range(1, pageCount + 1);

  // const pagination = (pageNo) => {
  //   setCurrentPage(pageNo);
  //   const startIndex = (pageNo - 1) * pageSize;
  //   const paginatedClient = _(invoices)
  //     .slice(startIndex)
  //     .take(pageSize)
  //     .value();
  //   setPaginatedClients(paginatedClient);
  // };
  const fetchSupplier = async () => {
    await axios.get("http://127.0.0.1:8000/api/dashboard").then((data) => {
      setDashboard(data.data);
    });
  };

  const fetchInvoices = async () => {
    await axios.get("http://127.0.0.1:8000/api/lastInvoices").then((data) => {
      setInvoices(data.data.data);
    });
  };
  useEffect(() => {
    fetchSupplier();
    fetchInvoices();
  }, []);

  return (
    <div className="bg-gray-50 grid grid-cols-2 col-span-9 gap-3 rounded">
      <p className="col-span-2 h-fit ml-4 pt-2 font-semibold text-2xl">
        {t("home")}
      </p>
      <div className="bg-white rounded ml-3 h-fit">
        <h4 className="p-4 font-thin">{t("totalBalance")}</h4>
        <div className="flex justify-between items-center pl-4">
          <FcSalesPerformance className="text-8xl" />
          <h4 className="relative  pr-3 text-2xl">
            {dashboard.total_balance}$
          </h4>
        </div>
      </div>
      <div className="mr-3 bg-white rounded ml-3 h-fit">
        <h4 className="p-4 font-thin">{t("totalDebt")}</h4>
        <div className="flex justify-between items-center pl-4">
          <GiPayMoney className="text-8xl text-blue-300" />
          <h4 className="relative  pr-3 text-2xl">{dashboard.total_debt}$</h4>
        </div>
      </div>
      <div className="bg-white rounded ml-3 h-fit">
        <h4 className="p-4 font-thin">{t("totalSalesInvoices")}</h4>
        <div className="flex justify-between items-center pl-4">
          <FcDocument className="text-8xl" />
          <h4 className="relative  pr-3 text-2xl">
            {dashboard.total_sales_invoices}
          </h4>
        </div>
      </div>
      <div className="mr-3 bg-white rounded ml-3 h-fit">
        <h4 className="p-4 font-thin">{t("totalClients")}</h4>
        <div className="flex justify-between items-center pl-4">
          <FcBusinessman className="text-8xl" />
          <h4 className="relative  pr-3 text-2xl">{dashboard.total_clients}</h4>
        </div>
      </div>
      <p className="col-span-2 h-fit ml-4 pt-2 font-semibold text-2xl">
        {t("invoices")}
      </p>
      <Link
        className="bg-blue-400 w-fit ml-4 pt-2 rounded px-3 h-10 hover:bg-blue-500 text-white font-medium"
        to={"/pages/Sales"}
      >
        {t("addNewInvoice")}
      </Link>
      {/* <table className="table-auto col-span-2 mx-3 mb-3  text-gray-600">
        <thead className="bg-blue-200 items-center">
          <tr className="rounded">
            <th>Invoice NO</th>
            <th>Invoice Code</th>
            <th>Client Name</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody className="bg-blue-50 text-center ">
          {paginatedClients &&
            paginatedClients.map((invoice, i) => (
              <>
                {invoice.customer.map((inv, index) => (
                  <tr key={invoice.id}>
                    <td>{invoice.id}</td>
                    <td>{invoice.code}</td>
                    <td>{inv.name}</td>
                    <td>{invoice.total}</td>
                  </tr>
                ))}
              </>
            ))}
        </tbody>
      </table> */}
      {/* <nav className="Page col-span-2 mx-auto mb-3navigation example">
        <ul className="inline-flex -space-x-px">
          {pages.map((page) => (
            <li>
              <p
                className="px-3 cursor-pointer py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                onClick={() => pagination(page)}
              >
                {page}
              </p>
            </li>
          ))}
        </ul>
      </nav> */}
    </div>
  );
};

export default Section;
