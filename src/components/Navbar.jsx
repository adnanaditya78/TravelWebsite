import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand text-primary fs-3 fw-bold" href="#">
            Horizon Hopper
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item me-3">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item me-3">
                <Link className="nav-link" to="/promos">
                  Promo
                </Link>
              </li>
              <li className="nav-item me-3">
                <Link className="nav-link" to="/activities">
                  Activity
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  <button className="btn btn-md btn-primary text-white">
                    Login
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
