import { Spinner } from "react";

import Navbar from "../../components/Navbar";
import photo from "../../assets/images/home.avif";
import { connect } from "react-redux";
import Banner from "../../components/Banner";
import Promo from "../../components/Promo";
import Activity from "../../components/Activity";
import Footer from "../../components/Footer";

// eslint-disable-next-line react-refresh/only-export-components
const LandingPage = () => {
  // eslint-disable-next-line react/prop-types
  return (
    <>
      <Navbar />

      <div
        className="bg-danger row vh-100 align-items-center justify-content-center"
      >
        <img
          src={photo}
          alt=""
          className="img-fluid"
          style={{
            height: "100%",
            objectFit: "cover",
            opacity: "20%",
            position: "relative",
          }}
        />
        <div
          className="col text-center text-white "
          style={{ position: "absolute" }}
        >
          <h2 className="fw-semibold mb-5">
            Explore the World, One Adventure at a Time!
          </h2>
          <p className="fw-light">
            Unlock New Horizons, Embrace Unforgettable Moments, and Travel
            Beyond Boundaries!
          </p>
        </div>
      </div>

      <div
        className="bg-white row align-items-center"
        style={{ height: "100px" }}
      >
        <h2 className="fw-bold text-primary text-center">
          Choose your destionation!
        </h2>
      </div>

      <Banner />

      <Promo />

      <Activity />
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default LandingPage;
