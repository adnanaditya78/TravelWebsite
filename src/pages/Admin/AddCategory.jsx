import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCategory } from "../../action/categoryAction";

function AddCategory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
  });

  const { name, imageUrl } = formData;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addCategory( name, imageUrl ));
    // Reset form setelah submit
    setFormData({
      name: "",
      imageUrl: "",
    });
    navigate("/admin/category");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="row vh-100 justify-content-center align-items-center">
      <div className="col-6">
        <h2 className="mb-3">Add Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
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
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCategory;
