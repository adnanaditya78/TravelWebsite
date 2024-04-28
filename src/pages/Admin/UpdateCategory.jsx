import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateCategory, getCategoryById } from "../../action/categoryAction";

function UpdateCategory() {
  const { categoryId } = useParams(); // Ambil ID dari URL dengan useParams
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State untuk menyimpan data kategori yang akan diupdate
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
  });

  // Gunakan useSelector untuk mendapatkan data kategori dari Redux store
  const category = useSelector((state) => state.category.getCategoryById.data);

  // Destructure data dari state
  const { name, imageUrl } = formData;

  // Ketika komponen di-render, panggil fungsi fetchCategoryById untuk mengambil data kategori berdasarkan ID
  useEffect(() => {
    dispatch(getCategoryById(categoryId));
  }, [dispatch, categoryId]);
console.log("---------------", category);
  // Ketika data kategori telah didapatkan dari Redux store, set nilai default pada form
  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        imageUrl: category.imageUrl,
      });
    }
  }, [category]);

  // Handle perubahan pada input form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit form untuk update kategori
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCategory(categoryId, name, imageUrl));
    // Reset form setelah submit
    setFormData({
      name: "",
      imageUrl: "",
    });
    navigate("/admin/category");
  };

  return (
    <div className="row vh-100 justify-content-center align-items-center">
      <div className="col-6">
        <h2 className="mb-3">Update Category</h2>
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
            Update Category
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateCategory;
