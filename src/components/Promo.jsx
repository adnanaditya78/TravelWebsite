/* eslint-disable react-refresh/only-export-components */
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    promo: state.promo.getPromoList,
  };
};

function Promo({ promo }) {
  //   const navigate = useNavigate();

  let promoSliced;
  if (promo) {
    promoSliced = promo.data.slice(0, 3);
  }

  return (
    <>
      <div
        className="bg-white row align-items-center"
        style={{ height: "100px" }}
      >
        <h2 className="fw-bold text-primary text-center">
          Unleash Your Wanderlust with Travel Promos
        </h2>
      </div>
      {promoSliced ? (
        <div className="container-fluid">
          <div className="row justify-content-evenly">
            {promoSliced.map((promo, idx) => (
              <div key={idx} className="col-lg-3 col-12 mb-3 col-3 card border border-0">
                <img
                  src={promo.imageUrl}
                  className="card-img-top"
                  alt="..."
                  style={{ height: "200px", objectFit:"cover"}}
                />
                <div className="card-body bg-primary text-white rounded-bottom">
                  <Link className="nav-link" to={`/promo/` + promo.id}>
                    <h4 className="card-title">{promo.title}</h4>
                  </Link>
                  <p className="card-text">
                    {promo.description.length > 50
                      ? promo.description.slice(0, 30) + "..." // Memotong deskripsi menjadi 50 karakter dan menambahkan "..."
                      : promo.description}
                  </p>
                  <h5 className="card-title">
                    Rp. {promo.promo_discount_price}
                  </h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div
        className="bg-white w-100 row align-items-center justify-content-center flex"
        style={{ height: "100px" }}
      >
        <div
          className="btn btn-primary text-white fw-bold"
          style={{ width: "20%" }}
        >
          <Link className="nav-link" to="/promos">
            View All Promo
          </Link>
        </div>
      </div>
    </>
  );
}

export default connect(mapStateToProps, null)(Promo);
