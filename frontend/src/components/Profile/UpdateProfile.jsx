import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfileAction } from "../../redux/actions/users/userAction";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;

  const [username, setUserName] = useState(userInfo && userInfo.username);
  const [email, setEmail] = useState(userInfo && userInfo.email);
  const [password, setPassword] = useState("");

  const navigate=useNavigate();
  
  const dispatch = useDispatch();
    const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfileAction(username, email, password));
    navigate("/profile");
    }
  return (
    <>
      <div class="container rounded bg-white mt-5">
        <div class="row">
          <div class="col-md-4 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                class="rounded-circle mt-5"
                src="https://i.imgur.com/0eg0aG0.jpg"
                width="90"
              />
              <span class="font-weight-bold">{username}</span>
              <span class="text-black-50">{email}</span>
              <span>United States</span>
            </div>
          </div>
          <div class="col-md-8">
            <div class="p-3 py-5">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <div class="d-flex flex-row align-items-center back">
                  <i class="fa fa-long-arrow-left mr-1 mb-1"></i>
                  <h6>Back to home</h6>
                </div>
                <h6 class="text-right">Edit Profile</h6>
              </div>
              <div class="row mt-2">
                <div class="col-md-6">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-md-6">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-md-6">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div class="mt-5 text-right">
                <button class="btn btn-primary profile-button" type="button" onClick={handleSubmit}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
