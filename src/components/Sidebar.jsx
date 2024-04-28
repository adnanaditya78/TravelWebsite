import React, { useState, useEffect } from "react";

import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import foto from "../assets/images/home.avif";
import { getLoggedUser } from "../action/authAction";
import { connect } from "react-redux";

const handleLogout = () => {
  // Hapus token dari sessionStorage
  if(confirm("Apakah yakin ingin logout?")){

      sessionStorage.removeItem("token");
      window.location.reload();
      // Redirect ke halaman utama
      return <Navigate to="/" />;
  }
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.userLogged,
  };
};

const Sidebar = ({ dispatch, user }) => {
  useEffect(() => {
    dispatch(getLoggedUser());
  }, [user]);

  return (
    <>
      {user ? (
        <div
          className="p-2 text-center sidebar d-flex flex-column justify-content-between align-items-center"
          style={{
            height: "100vh",
            position: "fixed",
            top: 0,
            left: 0,
            width: "250px",
            backgroundColor: "#f8f9fa",
          }}
        >
          <div className="sidebar-header">
            <a className="navbar-brand text-primary fs-3 fw-bold" href="#">
              Horizon Hopper
            </a>
          </div>
          <ul className="list-unstyled components flex-grow-1 d-flex flex-column justify-content-center w-100">
            <li className="mb-5">
              <img src={user.data.profilePictureUrl} alt="" className="rounded-circle mt-2" style={{ width: "100px" }} />
              <p className="mt-3">{user.data.name}</p>
              <Link className="nav-link" to={"/admin/profile"}>
              <div className="btn btn-primary btn-sm">Edit</div>
              </Link>
            </li>
            <li className="btn btn-primary w-100 mb-3">
              <Link to="/admin/user" className="nav-link text-white fs-5">
                <i className="bi bi-house-door me-2"></i> User
              </Link>
            </li>

            <li className="btn btn-primary w-100 mb-3">
              <Link to="/admin/banner" className="nav-link text-white fs-5">
                <i className="bi bi-house-door me-2"></i> Banner
              </Link>
            </li>

            <li className="btn btn-primary w-100 mb-3">
              <Link to="/admin/promo" className="nav-link text-white fs-5">
                <i className="bi bi-house-door me-2"></i> Promo
              </Link>
            </li>

            <li className="btn btn-primary w-100 mb-3">
              <Link to="/admin/category" className="nav-link text-white fs-5">
                <i className="bi bi-house-door me-2"></i> Category
              </Link>
            </li>

            <li className="btn btn-primary w-100 mb-3">
              <Link to="/admin/activity" className="nav-link text-white fs-5">
                <i className="bi bi-house-door me-2"></i> Activity
              </Link>
            </li>
            <li className="mb-3">
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default connect(mapStateToProps)(Sidebar);
