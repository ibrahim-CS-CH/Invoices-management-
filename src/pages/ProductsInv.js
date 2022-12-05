/* eslint-disable array-callback-return */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "../components/SideBar";
// import _ from "lodash";

// const pageSize = 3;
const ProductsInv = () => {
  const [products, setProducts] = useState([]);
  const [searchProduct, setSearchProduct] = useState("");
  // const [paginatedClients, setPaginatedClients] = useState();
  // const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    await axios.get("http://127.0.0.1:8000/api/inventories").then((data) => {
      setProducts(data.data.data);
      // setPaginatedClients(_(data.data.data).slice(0).take(pageSize).value());
    });
  };
  // const pageCount = products ? Math.ceil(products.length / pageSize) : 0;
  // if (pageCount === 1) return null;
  // const pages = _.range(1, pageCount + 1);

  // const pagination = (pageNo) => {
  //   setCurrentPage(pageNo);
  //   const startIndex = (pageNo - 1) * pageSize;
  //   const paginatedClient = _(products)
  //     .slice(startIndex)
  //     .take(pageSize)
  //     .value();
  //   setPaginatedClients(paginatedClient);
  // };

  return (
    <>
      <div className="grid grid-cols-12">
        <SideBar />
        <div className="col-span-8 bg-gray-50 ">
          <p className=" h-fit ml-4 mb-2 pt-2 font-semibold text-2xl">
            Products
          </p>
          <div className="bg-white rounded m-4">
            <p className="p-3 font-semibold text-2xl">Search</p>
            <input
              className="border border-gray-400 rounded p-2 m-3 w-80"
              type="text"
              placeholder="inventory name"
              onChange={(e) => setSearchProduct(e.target.value)}
            />
          </div>
          <div className=" rounded m-4 text-xl ">
            <table className="table-auto w-full  text-gray-600 ">
              <thead className="bg-blue-200 ">
                <tr className="rounded ">
                  <th className="text-start p-2">Product Name</th>
                  <th className="text-start">Amount</th>
                  <th className="text-start">Category</th>
                  <th className="text-start">Price</th>
                </tr>
              </thead>
              <tbody className="bg-blue-50 text-center">
                {products &&
                  products
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
                    .map((product, i) => (
                      <>
                        {product.products.map((pro, k) => (
                          <tr className=" border-2 border-white">
                            <>
                              <td className="text-start p-2">
                                {pro.product_name}
                              </td>
                              <td className="text-start">{pro.amount}</td>
                              <td className="text-start">{pro.category}</td>
                              <td className="text-start">{pro.sell_price}</td>
                            </>
                          </tr>
                        ))}
                      </>
                    ))}
              </tbody>
            </table>
            {/* <nav className="Page text-center navigation example">
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
        </div>
      </div>
    </>
  );
};

export default ProductsInv;
