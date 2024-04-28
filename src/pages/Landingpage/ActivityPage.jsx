import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

const mapStateToProps = (state) => {
  return {
    activity: state.activity.getActivityList,
    categories: state.category.getCategoryList.data,
  };
};

function ActivityPage({ activity, categories }) {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredData = activity ? activity.data : [];
  const filteredActivities = selectedCategory
    ? filteredData.filter(
        (activityItem) => activityItem.category.name === selectedCategory
      )
    : filteredData;

  return (
    <>
      <Navbar />
      <div className="container fs-5 text-primary">Home/Activity</div>

      {/* Filter by Category */}
      <div className="container mt-4">
        <label htmlFor="categoryFilter" className="form-label">
          Filter by Category:
        </label>
        <select
          id="categoryFilter"
          className="form-select"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          {/* Menampilkan opsi kategori hanya jika data kategori tersedia */}
          {categories &&
            categories.length > 0 &&
            categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
        </select>
      </div>

      {/* Display Activity Cards */}
      <div className="container-fluid mt-4">
        {activity ? (
          <div className="container">
            {filteredActivities.length > 0 ? (
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 justify-content-center">
                {filteredActivities.map((activityItem, idx) => (
                  <div
                    key={idx}
                    className={`col${(idx + 1) % 3 === 0 ? " mb-4" : ""} mb-3`}
                  >
                    <div className="card">
                      <img
                        src={activityItem.imageUrls}
                        className="card-img-top"
                        alt="..."
                        style={{ height: "200px" }}
                      />
                      <div className="card-body bg-white">
                        <Link
                          className="nav-link"
                          to={"/activity/" + activityItem.id}
                        >
                          <h4 className="card-title text-primary">
                            {activityItem.title}
                          </h4>
                        </Link>
                        <p className="card-text">
                          {activityItem.description.length > 50
                            ? activityItem.description.slice(0, 30) + "..."
                            : activityItem.description}
                        </p>
                        <h5 className="card-title text-primary">
                          Rating : {activityItem.rating}
                        </h5>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="row justify-content-center">
                <p>No activities found.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="container text-center mt-5">
            <p>Loading...</p>
          </div>
        )}
      </div>
    </>
  );
}

export default connect(mapStateToProps)(ActivityPage);
