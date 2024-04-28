/* eslint-disable react-refresh/only-export-components */
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    activity: state.activity.getActivityList,
  };
};

function Activity({ activity }) {
  let activitySliced;
  if (activity) {
    activitySliced = activity.data.slice(0, 3);
  }

  return (
    <>
      <div
        className="bg-white row align-items-center"
        style={{ height: "100px" }}
      >
        <h2 className="fw-bold text-primary text-center">
          Most Popular Activity
        </h2>
      </div>
      {activitySliced ? (
        <div className="container-fluid">
          <div className="row w-100 justify-content-evenly">
            {activitySliced.map((activity, idx) => (
              <div key={idx} className="col-lg-3 mb-3 card border border-0">
                <img
                  src={activity.imageUrls}
                  className="card-img-top w-100"
                  alt="..."
                  style={{ height: "200px" }}
                />
                <div className="card-body bg-white">
                  <Link className="nav-link" to={"/activity/" + activity.id}>
                    <h4 className="card-title text-primary">
                      {activity.title}
                    </h4>
                  </Link>
                  <p className="card-text">
                    {activity.description.length > 50
                      ? activity.description.slice(0, 50) + "..." // Memotong deskripsi menjadi 50 karakter dan menambahkan "..."
                      : activity.description}
                  </p>
                  <h5 className="card-title text-primary">
                    Rating : {activity.rating}
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
          <Link className="nav-link" to="/activities">
            View All Activity
          </Link>
        </div>
      </div>
    </>
  );
}

export default connect(mapStateToProps, null)(Activity);
