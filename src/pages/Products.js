// import React, { useEffect, useState } from "react";
// import SideBar from "../components/SideBar";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const Products = () => {
//   // function deleteProduct(id) {
//   //   Swal.fire({
//   //     title: `Are You Sure To delete?`,
//   //     text: "You won't be able to revert this!",
//   //     icon: "warning",
//   //     showCancelButton: true,
//   //     confirmButtonColor: "#3085d6",
//   //     cancelButtonColor: "#d33",
//   //     confirmButtonText: "Yes, delete it",
//   //   }).then((data) => {
//   //     if (data.isConfirmed) {
//   //       axios
//   //         .delete("http://127.0.0.1:8000/api/products/" + id)
//   //         .then(({ data }) => {
//   //           Swal.fire("Deleted!", "Your product has been deleted.", "success");
//   //           setProducts(products.filter((product) => product.id !== id));
//   //         })
//   //         .catch(({ response: { data } }) => {
//   //           console.log(data.message);
//   //         });
//   //     }
//   //   });
//   // }
//   const [products, setProducts] = useState([]);
//   const [searchProduct, setSearchProduct] = useState("");
//   useEffect(() => {
//     fetchProducts();
//   }, []);
//   const fetchProducts = async () => {
//     await axios.get("http://127.0.0.1:8000/api/products").then((data) => {
//       setProducts(data.data.data);
//     });
//   };
//   return (
//     <div className="grid grid-cols-12">
//       <SideBar />
//       <div className="col-span-8 bg-gray-50 ">
//         <p className=" h-fit ml-4 mb-2 pt-2 font-semibold text-2xl">Products</p>
//         <Link
//           to={"/addproduct"}
//           className="bg-blue-400 w-fit ml-4 rounded px-3 h-10 hover:bg-blue-500 text-white font-medium py-2"
//         >
//           Add New Product
//         </Link>
//         <div className="bg-white rounded m-4">
//           <p className="p-3 font-semibold text-2xl">Search</p>
//           <input
//             className="border border-gray-400 rounded p-2 m-3 w-80"
//             type="text"
//             placeholder="product name"
//             onChange={(e) => setSearchProduct(e.target.value)}
//           />
//         </div>
//         <div className=" rounded m-4 text-xl ">
//           <table className="table-auto w-full  text-gray-600 ">
//             <thead className="bg-blue-200 ">
//               <tr>
//                 <th className="text-start p-2">Product Name</th>
//                 <th className="text-start">Price</th>
//                 <th className="text-start">Category</th>
//                 <th className="text-start">Amount</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody className="bg-blue-50 text-center">
//               {products &&
//                 products
//                   .filter((value) => {
//                     if (searchProduct === "") {
//                       return value;
//                     } else if (
//                       value.name
//                         .toLowerCase()
//                         .includes(searchProduct.toLowerCase())
//                     ) {
//                       return value;
//                     }
//                   })
//                   .map((product, i) => (
//                     <tr key={i} className={"border-2 border-white"}>
//                       {/* <td className="text-start p-1">{product.id}</td> */}
//                       <td className="text-start p-2">{product.name}</td>
//                       <td className="text-start">{product.sell_price} $</td>
//                       <td className="text-start">{product.category.name}</td>
//                       <td className="text-start">{product.amount}</td>
//                       <td>
//                         <ul className="mt-1">
//                           <Link
//                             className="mr-3 px-3 py-1 rounded bg-blue-400 text-white hover:bg-blue-600 "
//                             to={`/editproduct/${product.id}`}
//                           >
//                             Edit
//                           </Link>
//                           {/* <button
//                             className="bg-red-500 text-white px-2 rounded hover:bg-red-500"
//                             onClick={() => {
//                               deleteProduct(product.id);
//                             }}
//                           >
//                             Delete
//                           </button> */}
//                         </ul>
//                       </td>
//                     </tr>
//                   ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Products;

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import SideBar from "../components/SideBar";

const Products = () => {
  let invId = localStorage.getItem("inv_id");

  const [products, setProducts] = useState([]);
  const [searchProduct, setSearchProduct] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    await axios
      .get("http://localhost:8000/api/inventories/" + invId)
      .then((data) => {
        setProducts(data.data.data);
      });
  };

  return (
    <>
      <div className="grid grid-cols-12">
        <SideBar />
        <div className="col-span-8 bg-gray-50 ">
          <p className=" h-fit ml-4 mb-2 pt-2 font-semibold text-2xl">
            Products
          </p>
          <Link
            to={"../addproduct"}
            className="bg-blue-400 w-fit ml-4 rounded px-3 h-10 hover:bg-blue-500 text-white font-medium py-2"
          >
            Add New Product
          </Link>
          <div className="bg-white rounded m-4">
            <p className="p-3 font-semibold text-2xl">Search</p>
            <input
              className="border border-gray-400 rounded p-2 m-3 w-80"
              type="text"
              placeholder="Product name"
              onChange={(e) => setSearchProduct(e.target.value)}
            />
          </div>
          <div className=" rounded m-4 text-xl ">
            <table className="table-auto w-full  text-gray-600 ">
              <thead className="bg-blue-200 ">
                <tr className="p-2">
                  <th className="text-start p-2">Product Name</th>
                  <th className="text-start">Amount</th>
                  <th className="text-start">Category</th>
                  <th className="text-start">Price</th>
                  <th className="text-center">action</th>
                </tr>
              </thead>
              <tbody className="bg-blue-50 text-center">
                {products.products &&
                  products.products
                    .filter((value) => {
                      if (searchProduct === "") {
                        return value;
                      } else if (
                        value.product_name
                          .toLowerCase()
                          .includes(searchProduct.toLowerCase())
                      ) {
                        return value;
                      }
                    })
                    .map((product, i) => (
                      <tr key={i} className={"border-2 border-white"}>
                        <>
                          <td className="text-start p-2">
                            {product.product_name}
                          </td>
                          <td className="text-start">{product.amount}</td>
                          <td className="text-start">{product.category}</td>
                          <td className="text-start">{product.sell_price}</td>
                          <td>
                            <ul className="mt-1">
                              <Link
                                className="mr-3 px-3 py-1 rounded bg-blue-400 text-white hover:bg-blue-600 "
                                to={`../editproduct/${product.product_id}`}
                              >
                                Edit
                              </Link>
                            </ul>
                          </td>
                        </>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
