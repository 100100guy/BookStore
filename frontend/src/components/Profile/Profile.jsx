import React, { useEffect, useState } from "react";
import { getUserProfileAction } from "../../redux/actions/users/userAction";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {

  const userProfile = useSelector((state) => state.userProfile);
  const { loading, userInfo, error } = userProfile;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfileAction())
  } , [dispatch])

   console.log(userProfile)  

  return (
    <>
      { loading && <h1>Loading...</h1>}
      { error && <p>{error}</p>}
      {userInfo && (<><section
        className="vh-50"
        style={{ backgroundColor: "rgb(40, 40, 40) " }}
      >
        <div className="container py-5 ">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-md-9 col-lg-7 col-xl-5">
              <div className="card" style={{ borderRadius: "15px" }}>
                <div className="card-body p-4">
                  <div className="d-flex text-black">
                    <div className="flex-shrink-0">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                        alt="Generic placeholder image"
                        className="img-fluid"
                        style={{ width: "180px", borderRadius: "10px" }}
                      />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h5 className="mb-1">{ userInfo.username}</h5>
                      <p className="mb-2 pb-1" style={{ color: "#2b2a2a" }}>
                      { userInfo.email}
                      </p>
                      <div className="mx-auto"></div>
                      <div className="d-flex pt-1">
                        <button
                          type="button"
                          className="btn btn-outline-primary me-1 flex-grow-1"
                        >
                          Update Profile
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Author</th>
            <th scope="col">Title</th>
            <th scope="col">Update</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
        {userInfo.books.map((book) => (
          <tr key={book._id}>
            <td>{book.author}</td>
            <td>{book.title}</td>
            <td>
              <Link className="btn btn-primary" to="/updateprofile">Update</Link>
            </td>
            <td>
              <button className="btn btn-danger">Delete</button>
            </td>
          </tr>
        ))}
          
        </tbody>
      </table></>)}
    </>
  );
};
export default Profile;
