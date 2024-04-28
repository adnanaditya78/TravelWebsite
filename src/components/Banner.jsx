/* eslint-disable react-refresh/only-export-components */
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    banner: state.banner.getBannerList,
  };
};

function Banner({ banner }) {
  return (
    <>
      {banner ? (
        <div id="carouselExample" className="carousel slide">
          <div
            className="carousel-inner bg-danger vh-100"
            style={{ height: "" }}
          >
            {banner.data.map((banner, idx) => (
              <div
                key={idx}
                className={`carousel-item ${idx === 0 ? "active" : ""}`}
              >
                <div className="overlay-text text-white fw-bold fs-2">
                  {banner.name}
                </div>
                <img
                  src={banner.imageUrl}
                  style={{objectFit:"cover"}}
                  className="d-block w-100 opacity-50"
                  alt="..."
                />
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      ) : (
        "Loading..."
      )}
    </>
  );
}

export default connect(mapStateToProps, null)(Banner);
