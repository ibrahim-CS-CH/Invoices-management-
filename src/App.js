import "./App.css";
import { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Products from "./pages/Products";
import NotFound from "./pages/NotFound";
import Suppliers from "./pages/Suppliers";
import Login from "./pages/Login";
import Purcheses from "./pages/Purcheses";
import Sales from "./pages/Sales";
import ProductsInv from "./pages/ProductsInv";
import Transaction from "./pages/Transaction";
import EditProduct from "./pages/EditProduct";
import EditSuppliers from "./pages/EditSuppliers";
import AddUser from "./pages/AddUser";
import AddClient from "./pages/AddClient";
import AddSupplier from "./pages/addSupplier";
import AddProduct from "./pages/addProduct";
import Clients from "./components/Clients";
import EditClient from "./pages/EditClient";
import LocalizeProvider from "./Context/LocalizeContext"
// import PrivateRoute from "./components/PrivateRoute";
import ShowSales from "./pages/ShowSales";
import ShowPur from "./pages/ShowPur";
import axios from "axios";
import ShowTransactions from "./pages/ShowTransactions";
import ClientPay from "./pages/ClientPay";
import SupplierPay from "./pages/SupplierPay";
import PrivateRoute from "./components/PrivateRoute";
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("auth_token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";

  return config;
});
function App() {
  return (
    <LocalizeProvider>
      <Router>
        <Fragment>
          <NavBar />
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/private" element={<PrivateRoute />}>
              <Route path="dashboard" element={<Home />} />
              <Route path="products" element={<Products />} />
              <Route path="suppliers" element={<Suppliers />} />
              <Route path="pages/Purcheses" element={<Purcheses />} />
              <Route path="showPurchases" element={<ShowPur />} />
              <Route path="addproduct" element={<AddProduct />} />
              <Route path="showSales" element={<ShowSales />} />
              <Route path="pages/Sales" element={<Sales />} />
              <Route path="supplierPayment" element={<SupplierPay />} />
              <Route path="addsupplier" element={<AddSupplier />} />
              <Route path="clients" element={<Clients />} />
              <Route path="pages/ProductsInv" element={<ProductsInv />} />
              <Route path="pages/Transaction" element={<Transaction />} />
              <Route path="showTransaction" element={<ShowTransactions />} />
              <Route path="addClient" element={<AddClient />} />
              <Route path="clientPayment" element={<ClientPay />} />
              <Route path="editproduct/:id" element={<EditProduct />} />
              <Route path="editsupplier/:id" element={<EditSuppliers />} />
              <Route path="addUser" element={<AddUser />} />
              <Route path="editclient/:id" element={<EditClient />} />
            </Route>
            <Route path="/" element={<Login />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Fragment>
      </Router>
    </LocalizeProvider>

  );
}

export default App;
