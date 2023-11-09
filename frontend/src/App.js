import "./App.css";
import AddBook from "./components/Book/AddBook";
import Books from "./components/Book/Books";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import RegisterUser from "./components/User/Register";
import LoginUser from "./components/User/Login";
import HomePage from "./components/Home/HomePage";
import Profile from "./components/Profile/Profile";
import UpdateProfile from "./components/Profile/UpdateProfile";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/updateprofile" element={<UpdateProfile />} />
        <Route exact path="/profile" element={<Profile />} />
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
