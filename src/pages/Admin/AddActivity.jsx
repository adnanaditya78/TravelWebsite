import React, { useState } from "react";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addActivity } from "../../action/activityAction";

const mapStateToProps = (state) => {
  return {
    categories: state.category.getCategoryList.data,
  };
};

function AddActivity({ categories }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    categoryId: "",
    title: "",
    description: "",
    imageUrls: "",
    price: 0,
    price_discount: 0,
    rating: 0,
    total_reviews: 0,
    facilities: "",
    address: "",
    province: "",
    city: "",
    location_maps: "",
  });

  const {
    categoryId,
    title,
    description,
    imageUrls,
    price,
    price_discount,
    rating,
    total_reviews,
    facilities,
    address,
    province,
    city,
    location_maps,
  } = formData;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addActivity({
        categoryId,
        title,
        description,
        imageUrls,
        price,
        price_discount,
        rating,
        total_reviews,
        facilities,
        address,
        province,
        city,
        location_maps,
      })
    );
    // Reset form setelah submit
    setFormData({
      categoryId: "",
      title: "",
      description: "",
      imageUrls: "",
      price: 0,
      price_discount: 0,
      rating: 0,
      total_reviews: 0,
      facilities: "",
      address: "",
      province: "",
      city: "",
      location_maps: "",
    });
    navigate("/admin/activity");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="row vh-100 justify-content-center align-items-center">
      <div className="col-6">
        <h2 className="mb-3">Add Activity</h2>
        <form onSubmit={handleSubmit}>
          {categories ?(
            <div className="mb-3">
              <label htmlFor="categoryId" className="form-label">
                Category ID
              </label>
              <select
                className="form-select"
                id="categoryId"
                name="categoryId"
                value={categoryId}
                onChange={handleChange}
                required
              >
                <option value="">Select Category ID</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <p>Loading categories...</p>
          )}
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
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="imageUrls" className="form-label">
              Image URLs
            </label>
            <input
              type="text"
              className="form-control"
              id="imageUrls"
              name="imageUrls"
              value={imageUrls}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              value={price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price_discount" className="form-label">
              Price Discount
            </label>
            <input
              type="number"
              className="form-control"
              id="price_discount"
              name="price_discount"
              value={price_discount}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="rating" className="form-label">
              Rating
            </label>
            <input
              type="number"
              className="form-control"
              id="rating"
              name="rating"
              value={rating}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="total_reviews" className="form-label">
              Total Reviews
            </label>
            <input
              type="number"
              className="form-control"
              id="total_reviews"
              name="total_reviews"
              value={total_reviews}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="facilities" className="form-label">
              Facilities
            </label>
            <textarea
              className="form-control"
              id="facilities"
              name="facilities"
              value={facilities}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="province" className="form-label">
              Province
            </label>
            <input
              type="text"
              className="form-control"
              id="province"
              name="province"
              value={province}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <input
              type="text"
              className="form-control"
              id="city"
              name="city"
              value={city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="location_maps" className="form-label">
              Location Maps
            </label>
            <input
              type="text"
              className="form-control"
              id="location_maps"
              name="location_maps"
              value={location_maps}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Activity
          </button>
        </form>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, null)(AddActivity);
