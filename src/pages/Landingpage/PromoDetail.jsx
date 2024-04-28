/* eslint-disable react-refresh/only-export-components */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom"; // Import the useParams hook
import { getPromoById } from "../../action/promoAction";
import Navbar from "../../components/Navbar";

const mapStateToProps = (state) => {
  return {
    promo: state.promo.getPromoById,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPromoById: (id) => dispatch(getPromoById(id)),
  };
};

function PromoDetail({ promo, fetchPromoById }) {
  const { id } = useParams(); // Use the useParams hook to get the ID from the URL

  useEffect(() => {
    fetchPromoById(id); // Fetch promo by ID when the ID changes
  }, [id, fetchPromoById]);

  return (
    <div>
      <Navbar />
      {promo ? (
        <div className="container">
          <div className="fs-5 text-primary mb-4">
            <Link className="nav-link" to={"/promos"}>Home/Promo/{promo.data.title}</Link>
          </div>

          <h3 className="fw-bold text-primary w-100">{promo.data.title}</h3>
          <div className="" style={{ height: "" }}>
            <img
              src={promo.data.imageUrl}
              alt=""
              className="img-fluid w-100"
              style={{
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
          <div className="fw-bold mt-4">
            <p>Description : {promo.data.description}</p>
            <p>Term and Condition : {promo.data.terms_condition}</p>
            <p>Promo Code : {promo.data.promo_code}</p>
            <p>Promo Discount Price : {promo.data.promo_discount_price}</p>
            <p>Minimum Claim Price : {promo.data.minimum_claim_price}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(PromoDetail);
