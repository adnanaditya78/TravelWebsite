import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { login } from "../../action/authAction";
import foto from "../../assets/images/bg-form.jpg";

const Login = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Panggil fungsi postExample untuk melakukan permintaan POST
    dispatch(login(email, password));
    // Reset form setelah submit
    setFormData({ email: "", password: "" });
  };

  const statusCode = useSelector((state) => state.auth.token.status);

  // Mengambil token dari authReducer menggunakan useSelector
  const token = useSelector((state) => state.auth.token.token);

  // Gunakan useEffect untuk menyimpan token ke sessionStorage
  useEffect(() => {
    if (statusCode === "OK") {
      alert("Berhasil login");
    }

    if (token) {
      sessionStorage.setItem("token", token);
      window.location.reload();
    }
  }, [statusCode, token]);

  // Redirect ke halaman admin jika token tersedia
  if (token) {
    return <Navigate to="/admin" />;
  }

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <img
        src={foto}
        alt="Login Image"
        style={{ width: "350px", height: "345px" }}
      />
      <div
        className="card p-4 d-flex flex-column align-items-center"
        style={{ width: "350px", height: "345px" }}
      >
        <h2 className="mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="w-100">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="d-flex justify-content-between w-100">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <Link className="btn btn-primary" to={"/register"}>
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
