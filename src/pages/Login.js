import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [loginInput, setLogin] = useState({
    email: "",
    password: "",
    error_list: [],
  });
  const handleInput = (e) => {
    e.persist();
    setLogin({ ...loginInput, [e.target.name]: e.target.value });
  };

  const loginSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: loginInput.email,
      password: loginInput.password,
    };

    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post(`api/login`, data).then((res) => {
        if (res.data.status === 200) {
          console.log(res.data.status);
          localStorage.setItem("auth_token", res.data.token);
          localStorage.setItem("auth_name", res.data.username);
          localStorage.setItem("inv_id", res.data.inventory_id);
          swal("Success", res.data.message, "success");
          navigate("private/dashboard");
        } else if (res.data.status === 401) {
          swal("Warning", res.data.message, "warning");
        } else {
          setLogin({ ...loginInput, error_list: res.data.validation_errors });
        }
      });
    });
  };

  return (
    <div className="grid grid-cols-12">
      <div className="col-start-4 col-span-6 bg-gray-50   rounded my-20 ">
        <h1 className="text-2xl font-semibold text-center m-5 text-gray-600 pt-2">
          Login
        </h1>
        <form
          className="grid grid-cols-1 text-gray-600 text-center font-semibold"
          onSubmit={loginSubmit}
        >
          <div className="m-7">
            <label className="block text-gray-700 text-sm text-start font-bold mb-2">
              Email
              <input
                type="email"
                name="email"
                onChange={handleInput}
                value={loginInput.email}
                className="shadow appearance-none mt-2 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>
          <span>{loginInput.error_list.email}</span>
          <div className="m-7">
            <label className="block text-gray-700 text-start text-sm font-bold mb-2">
              Password
              <input
                type="password"
                name="password"
                onChange={handleInput}
                value={loginInput.password}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>
          <span>{loginInput.error_list.password}</span>
          <button
            type="submit"
            className=" bg-blue-300 hover:bg-blue-400  text-white font-bold m-7  py-2 px-4 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
export default Login;
