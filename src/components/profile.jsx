import React from "react";
import authServices from "../services/authService";

const Profile = () => {
  const currentUser = authServices.getCurrentUser();
  return (
    <div className="container">
      <div className="row my-4 justify-content-center">
        <div className="col-md-7 col-lg-6">
          <h1 className="text-center">Profile Page</h1>
          <hr />
          <div className="row py-2 align-items-center">
            <div className="col">
              <img
                width="200"
                height="200"
                src={"https://joeschmoe.io/api/v1/" + currentUser.name}
                className="img-thumbnail"
                alt="this is your profile"
              />
            </div>
            <div className="col">
              <p>
                Name : <span className="text-info">{currentUser.name}</span>
              </p>
              <p>
                Email : <span className="text-info">{currentUser.email}</span>
              </p>
              <p>
                Role :
                <span className="text-info">
                  {currentUser.isAdmin ? " Admin" : " User"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
