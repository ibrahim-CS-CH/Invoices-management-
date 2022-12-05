/* eslint-disable array-callback-return */
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

function AddUser() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    inventory_id: "",
    error_list: [],
  });

  const [inventory, setInventory] = useState([]);
  const [option, setOption] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/inventories")
      .then((data) => data.json())
      .then((val) => setInventory(val.data));
  }, []);

  const handleInput = (e) => {
    e.persist();
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const AddUserSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: inputs.name,
      email: inputs.email,
      password: inputs.password,
      password_confirmation: inputs.password_confirmation,
      inventory_id: option,
    };

    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post(`api/register`, data).then((res) => {
        if (res.data.status === 200) {
          swal("Success", res.data.message, "success");
          navigate("/dashboard");
        } else {
          setInputs({ ...inputs, error_list: res.data.validation_errors });
        }
      });
    });
  };

  return (
    <div className="grid grid-cols-12">
      <div className="col-start-5 col-span-6 bg-gray-50   rounded my-20 ">
        <h1 className="text-2xl font-semibold text-center m-2 text-gray-600 pt-2">
          Add User
        </h1>
        <form
          className="grid grid-cols-1 text-gray-600 text-center font-semibold"
          onSubmit={AddUserSubmit}
        >
          <div className="m-5">
            <label className="block text-gray-700 text-sm text-start font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              onChange={handleInput}
              value={inputs.name}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <span>{inputs.error_list.name}</span>
          </div>
          <div className="m-5">
            <label className="block text-gray-700 text-sm text-start font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={handleInput}
              value={inputs.email}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <span>{inputs.error_list.email}</span>
          </div>
          <div className="m-5">
            <label className="block text-gray-700 text-sm text-start font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={handleInput}
              value={inputs.password}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <span>{inputs.error_list.password}</span>
          </div>
          <div className="m-5">
            <label className="block text-gray-700 text-sm text-start font-bold mb-2">
              confirm Password
            </label>
            <input
              type="password"
              name="password_confirmation"
              onChange={handleInput}
              value={inputs.password_confirmation}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <span>{inputs.error_list.password_confirmation}</span>
          </div>
          <div className="p-4 mx-auto">
            <label className="">
              <p>Work place</p>
              <select
                className="border border-blue-400 rounded h-10 w-52 focus:outline-none focus:border-sky-500 "
                value={option}
                onChange={(e) => setOption(e.target.value)}
              >
                <option />
                {inventory.map((opts, i) => (
                  <option key={i}>{opts.id}</option>
                ))}
              </select>
            </label>
            <span>{inputs.error_list.password_confirmation}</span>
          </div>
          <div className="m-7">
            <input
              type="submit"
              name="add new user"
              className="bg-blue-300 hover:bg-blue-400  text-white font-bold m-5  py-2 px-4 rounded"
              value="add new user"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
export default AddUser;
