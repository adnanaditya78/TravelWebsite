import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updatePromo, getPromoById } from "../../action/promoAction";

function UpdatePromo() {
  const { promoId } = useParams(); // Ambil ID dari URL dengan useParams
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State untuk menyimpan data promo yang akan diupdate
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    terms_condition: "",
    promo_code: "",
    promo_discount_price: 0,
    minimum_claim_price: 0,
  });

  // Gunakan useSelector untuk mendapatkan data promo dari Redux store
  const promo = useSelector((state) => state.promo.getPromoById.data);

  // Destructure data dari state
  const {
    title,
    description,
    imageUrl,
    terms_condition,
    promo_code,
    promo_discount_price,
    minimum_claim_price,
  } = formData;

  // Ketika komponen di-render, panggil fungsi fetchPromoById untuk mengambil data promo berdasarkan ID
  useEffect(() => {
    dispatch(getPromoById(promoId));
  }, [dispatch, promoId]);

  // Ketika data promo telah didapatkan dari Redux store, set nilai default pada form
  useEffect(() => {
    if (promo) {
      setFormData({
        title: promo.title,
        description: promo.description,
        imageUrl: promo.imageUrl,
        terms_condition: promo.terms_condition,
        promo_code: promo.promo_code,
        promo_discount_price: promo.promo_discount_price,
        minimum_claim_price: promo.minimum_claim_price,
      });
    }
  }, [promo]);

  // Handle perubahan pada input form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit form untuk update promo
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updatePromo(
        promoId,
        title,
        description,
        imageUrl,
        terms_condition,
        promo_code,
        promo_discount_price,
        minimum_claim_price
      )
    );
    // Reset form setelah submit
    setFormData({
      title: "",
      description: "",
      imageUrl: "",
      terms_condition: "",
      promo_code: "",
      promo_discount_price: 0,
      minimum_claim_price: 0,
    });
    navigate("/admin/promo");
  };

  return (
    <div className="row vh-100 justify-content-center align-items-center">
      <div className="col-6">
        <h2 className="mb-3">Create Promo</h2>
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
          <div className="mb-3">
            <label htmlFor="terms_condition" className="form-label">
              Terms Conditions
            </label>
            <textarea
              className="form-control"
              id="terms_condition"
              name="terms_condition"
              value={terms_condition}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="promo_code" className="form-label">
              Promo Code
            </label>
            <input
              type="text"
              className="form-control"
              id="promo_code"
              name="promo_code"
              value={promo_code}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="promo_discount_price" className="form-label">
              Promo Discount Price
            </label>
            <input
              type="number"
              className="form-control"
              id="promo_discount_price"
              name="promo_discount_price"
              value={promo_discount_price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="minimum_claim_price" className="form-label">
              Minimum Claim Price
            </label>
            <input
              type="number"
              className="form-control"
              id="minimum_claim_price"
              name="minimum_claim_price"
              value={minimum_claim_price}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Create Promo
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdatePromo;