import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Crud from "./Components/crudDorm/crud";
import MyTables from "./Components/Tables/tables";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Crud />} />
          <Route exact path="/table" element={<MyTables />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
