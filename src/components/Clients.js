import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import SideBar from "./SideBar";
import { Link } from "react-router-dom";
import _ from "lodash";

const pageSize = 5;
const Clients = () => {
  const [client, setClient] = useState([]);
  const [searchClient, setSearchClient] = useState("");
  const [paginatedClients, setPaginatedClients] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchClient();
  }, []);

  const fetchClient = async () => {
    await axios.get("http://127.0.0.1:8000/api/customers").then((data) => {
      setClient(data.data.data);
      setPaginatedClients(_(data.data.data).slice(0).take(pageSize).value());
    });
  };

  const deleteClient = (id) => {
    Swal.fire({
      title: `are you sure you want to delete this client ?`,
      showCancelButton: true,
    }).then((data) => {
      if (data.isConfirmed) {
        axios
          .delete("http://localhost:8000/api/customers/" + id)
          .then(({ data }) => {
            console.log(data.message);
            fetchClient();
          })
          .catch(({ response: { data } }) => {
            console.log(data.message);
          });
      }
    });
  };
  const pageCount = client ? Math.ceil(client.length / pageSize) : 0;
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);

  const pagination = (pageNo) => {
    setCurrentPage(pageNo);
    const startIndex = (pageNo - 1) * pageSize;
    const paginatedClient = _(client).slice(startIndex).take(pageSize).value();
    setPaginatedClients(paginatedClient);
  };

  return (
    <div className="grid grid-cols-12">
      <SideBar />
      <div className="col-span-9 bg-gray-50 ">
        <p className=" h-fit ml-4 pt-2 font-semibold text-2xl mb-3">Clients</p>
        <Link
          to={"../addclient"}
          className="bg-blue-400 w-fit ml-4 rounded px-3 h-10 hover:bg-blue-500 text-white font-medium py-2"
        >
          Add New Client
        </Link>
        <div className="bg-white rounded m-4">
          <p className="p-3 font-semibold text-2xl">Search</p>
          <input
            className="border border-gray-400 rounded p-2 m-3 w-80"
            type="text"
            placeholder="client name"
            onChange={(e) => setSearchClient(e.target.value)}
          />
        </div>
        <div className=" rounded m-4 text-xl ">
          <table className="table-auto w-full  text-gray-600">
            <thead className="bg-blue-200 ">
              <tr>
                <th className="text-start p-2">user Name</th>
                <th className="text-start">Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="bg-blue-50">
              {paginatedClients &&
                paginatedClients
                  .filter((value) => {
                    if (searchClient === "") {
                      return value;
                    } else if (
                      value.name
                        .toLowerCase()
                        .includes(searchClient.toLowerCase())
                    ) {
                      return value;
                    }
                  })
                  .map((sup) => (
                    <tr key={sup.id} className={"border-2 border-white"}>
                      <td className="p-2">{sup.name}</td>
                      <td>{sup.phone}</td>
                      <td className="text-center">
                        <ul className="mt-1">
                          <Link
                            className="mr-3 px-3 py-1 rounded bg-blue-400 text-white hover:bg-blue-600 "
                            to={`../editclient/${sup.id}`}
                          >
                            Edit
                          </Link>
                          <button
                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-800"
                            onClick={() => {
                              deleteClient(sup.id);
                            }}
                          >
                            Delete
                          </button>
                        </ul>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
          <nav className="Page text-center navigation example">
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
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Clients;
