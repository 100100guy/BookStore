import React from "react";

const Profile = () => {
  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "rgb(40, 40, 40) " }}>
        <div className="container py-5 ">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-md-9 col-lg-7 col-xl-5">
              <div className="card" style={{borderRadius: '15px'}}>
                <div className="card-body p-4">
                  <div className="d-flex text-black">
                    <div className="flex-shrink-0">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                        alt="Generic placeholder image"
                        className="img-fluid"
                        style={{width: '180px', borderRadius: '10px'}}
                      />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h5 className="mb-1">Danny McLoan</h5>
                      <p className="mb-2 pb-1" style={{color: '#2b2a2a'}}>
                        Senior Journalist
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
    </>
  );
};
export default Profile;
