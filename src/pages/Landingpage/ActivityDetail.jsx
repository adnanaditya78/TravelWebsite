/* eslint-disable react-refresh/only-export-components */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom"; // Import the useParams hook
import { getActivityById } from "../../action/activityAction";
import Navbar from "../../components/Navbar";

const mapStateToProps = (state) => {
  return {
    activity: state.activity.getActivityById,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchActivityById: (id) => dispatch(getActivityById(id)),
  };
};

function ActivityDetail({ activity, fetchActivityById }) {
  const { id } = useParams(); // Use the useParams hook to get the ID from the URL

  useEffect(() => {
    fetchActivityById(id); // Fetch activity by ID when the ID changes
  }, [id, fetchActivityById]);

  return (
    <div>
      <Navbar />
      {activity ? (
        <div className="container">
          <div className="fs-5 text-primary mb-4">
            <Link className="nav-link" to={"/activities"}>Home/Activity/{activity.data.title}</Link>
          </div>

          <h3 className="fw-bold text-primary w-100">{activity.data.title}</h3>
          <div className="" style={{ height: "" }}>
            <img
              src={activity.data.imageUrls}
              alt=""
              className="img-fluid w-100"
              style={{
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
          <div className="fw-bold mt-4">
            <p>Description : {activity.data.description}</p>
            <p>Price : {activity.data.price}</p>
            <p>Price Discount : {activity.data.price_discount}</p>
            <p>Rating : {activity.data.rating}</p>
            <p>Total Reviews : {activity.data.total_reviews}</p>
            <p>Facilities : {activity.data.facilities}</p>
            <p>Address : {activity.data.address}</p>
            <p>Province : {activity.data.province}</p>
            <p>City : {activity.data.city}</p>
            <p>Location Map :</p>
            <div
              dangerouslySetInnerHTML={{ __html: activity.data.location_maps }}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityDetail);
