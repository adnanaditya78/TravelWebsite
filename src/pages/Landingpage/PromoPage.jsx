/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

const mapStateToProps = (state) => {
  return {
    promo: state.promo.getPromoList,
  };
};

function PromoPage({ promo }) {
  return (
    <>
      <Navbar />
      <div className="container fs-5 text-primary">Home/Promo</div>

      <div className="container-fluid mt-4">
        {promo ? (
          <div className="container">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 justify-content-center">
              {promo.data.map((promoItem, idx) => (
                <div
                  key={idx}
                  className={`col${(idx + 1) % 3 === 0 ? " mb-4" : ""} mb-3`}
                >
                  <div className="card">
                    <img
                      src={promoItem.imageUrl}
                      className="card-img-top"
                      alt="..."
                      style={{ height: "200px" }}
                    />
                    <div className="card-body bg-primary text-white">
                      <Link className="nav-link" to={`/promo/` + promoItem.id}>
                        <h4 className="card-title">{promoItem.title}</h4>
                      </Link>
                      <p className="card-text">
                        {promoItem.description.length > 50
                          ? promoItem.description.slice(0, 30) + "..." // Memotong deskripsi menjadi 50 karakter dan menambahkan "..."
                          : promoItem.description}
                      </p>
                      <h5 className="card-title">
                        Rp. {promoItem.promo_discount_price}
                      </h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default connect(mapStateToProps, null)(PromoPage);
