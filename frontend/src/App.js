import "./App.css";
import AddBook from "./components/Book/AddBook";
import Books from "./components/Book/Books";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import RegisterUser from "./components/User/Register";
import LoginUser from "./components/User/Login";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/login" element={<LoginUser />} />
          <Route exact path="/register" element={<RegisterUser />} />
          <Route exact path="/books" element={<Books />} />
          <Route exact path="/addbook" element={<AddBook />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
