import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { redirect } from "react-router-dom";
import { addBanner, getBannerById, updateBanner } from "../../action/bannerAction";

const mapStateToProps = (state) => {
  return {
    banner: state.banner.getBannerById.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBannerById: (bannerId) => dispatch(getBannerById(bannerId)),
  };
};

function UpdateBanner({ banner, fetchBannerById }) {
  const { bannerId } = useParams(); // Use the useParams hook to get the ID from the URL
console.log(banner);
  useEffect(() => {
    fetchBannerById(bannerId); // Fetch activity by ID when the ID changes
  }, [bannerId, fetchBannerById]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (banner && title === "") {
      setFormData({
        title: banner.name,
        imageUrl: banner.imageUrl,
      });
    }
  }, [banner]);

  const { title, imageUrl } = formData;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateBanner(bannerId, title, imageUrl));
    // Reset form setelah submit
    setFormData({
      title: "",
      imageUrl: "",
    });
    navigate("/admin/banner");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="row vh-100 justify-content-center align-items-center">
      <div className="col-3">
        <h2 className="mb-3">Add Banner</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="imageUrl" className="form-label">
              Image URL
            </label>
            <input
              type="text"
              className="form-control"
              id="imageUrl"
              name="imageUrl"
              value={imageUrl}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Update Banner
          </button>
        </form>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateBanner);
