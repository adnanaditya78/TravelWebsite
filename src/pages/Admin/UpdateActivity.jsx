import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateActivity, getActivityById } from '../../action/activityAction';
import { uploadImage } from '../../action/imageAction';

const mapStateToProps = (state) => {
  return {
    categories: state.category.getCategoryList.data,
  };
};

function UpdateActivity({ categories }) {
  console.log('==================', categories);
  const { activityId } = useParams(); // Ambil ID dari URL dengan useParams
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State untuk menyimpan data aktivitas yang akan diupdate
  const [formData, setFormData] = useState({
    categoryId: '',
    title: '',
    description: '',
    imageUrls: '',
    price: 0,
    price_discount: 0,
    rating: 0,
    total_reviews: 0,
    facilities: '',
    address: '',
    province: '',
    city: '',
    location_maps: '',
    selectedFile: null,
  });

  // Gunakan useSelector untuk mendapatkan data aktivitas dari Redux store
  const activity = useSelector((state) => state.activity.getActivityById.data);

  // Destructure data dari state
  const { categoryId, title, description, imageUrls, price, price_discount, rating, total_reviews, facilities, address, province, city, location_maps, selectedFile } = formData;

  // Ketika komponen di-render, panggil fungsi getActivityById untuk mengambil data aktivitas berdasarkan ID
  useEffect(() => {
    dispatch(getActivityById(activityId));
  }, [dispatch, activityId]);

  // Ketika data aktivitas telah didapatkan dari Redux store, set nilai default pada form
  useEffect(() => {
    if (activity) {
      setFormData({
        categoryId: activity.categoryId,
        title: activity.title,
        description: activity.description,
        imageUrls: activity.imageUrls,
        price: activity.price,
        price_discount: activity.price_discount,
        rating: activity.rating,
        total_reviews: activity.total_reviews,
        facilities: activity.facilities,
        address: activity.address,
        province: activity.province,
        city: activity.city,
        location_maps: activity.location_maps,
      });
    }
  }, [activity]);

  // Untuk mendapatkan link gambar
  const getUrl = useSelector((state) => state.image.link);

  useEffect(() => {
    if (getUrl !== false) {
      setFormData({
        ...formData,
        categoryId: activity.categoryId,
        title: activity.title,
        description: activity.description,
        imageUrls: getUrl,
        price: activity.price,
        price_discount: activity.price_discount,
        rating: activity.rating,
        total_reviews: activity.total_reviews,
        facilities: activity.facilities,
        address: activity.address,
        province: activity.province,
        city: activity.city,
        location_maps: activity.location_maps,
      });
    }
  }, [getUrl]);

  // Handle perubahan pada input form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit form untuk update aktivitas
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedImageUrls = imageUrls === activity.imageUrls ? imageUrls : [imageUrls];
    dispatch(
      updateActivity({
        activityId,
        categoryId,
        title,
        description,
        imageUrls: updatedImageUrls,
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
      categoryId: '',
      title: '',
      description: '',
      imageUrls: '',
      price: 0,
      price_discount: 0,
      rating: 0,
      total_reviews: 0,
      facilities: '',
      address: '',
      province: '',
      city: '',
      location_maps: '',
    });
    navigate('/admin/activity');
  };

  // Handle upload gambar from
  const onFileChangeCapture = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    console.log(e.target.files[0]);
    dispatch(uploadImage(e.target.files[0]));
  };

  return (
    <div className='row vh-100 justify-content-center align-items-center'>
      <div className='col-6'>
        <h2 className='mb-3'>Update Activity</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='categoryId' className='form-label'>
              Category ID
            </label>
            <select className='form-select' id='categoryId' name='categoryId' value={categoryId} onChange={handleChange} required>
              <option value=''>Select Category ID</option>
              {categories &&
                categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
          <div className='mb-3'>
            <label htmlFor='title' className='form-label'>
              Title
            </label>
            <input type='text' className='form-control' id='title' name='title' value={title} onChange={handleChange} required />
          </div>
          <div className='mb-3'>
            <label htmlFor='description' className='form-label'>
              Description
            </label>
            <textarea className='form-control' id='description' name='description' value={description} onChange={handleChange} required></textarea>
          </div>
          <div className='mb-3'>
            <label htmlFor='selectedFile' className='form-label'>
              Image URLs
            </label>
            <input type='file' className='form-control' id='selectedFile' name='selectedFile' onChange={onFileChangeCapture} />
          </div>
          <div className='mb-3'>
            <label htmlFor='price' className='form-label'>
              Price
            </label>
            <input type='number' className='form-control' id='price' name='price' value={price} min={1} onChange={handleChange} required />
          </div>
          <div className='mb-3'>
            <label htmlFor='price_discount' className='form-label'>
              Price Discount
            </label>
            <input type='number' className='form-control' id='price_discount' name='price_discount' value={price_discount} min={1} onChange={handleChange} required />
          </div>
          <div className='mb-3'>
            <label htmlFor='rating' className='form-label'>
              Rating
            </label>
            <input type='number' className='form-control' id='rating' name='rating' value={rating} min={1} onChange={handleChange} required />
          </div>
          <div className='mb-3'>
            <label htmlFor='total_reviews' className='form-label'>
              Total Reviews
            </label>
            <input type='number' className='form-control' id='total_reviews' name='total_reviews' value={total_reviews} min={1} onChange={handleChange} required />
          </div>
          <div className='mb-3'>
            <label htmlFor='facilities' className='form-label'>
              Facilities
            </label>
            <textarea className='form-control' id='facilities' name='facilities' value={facilities} onChange={handleChange} required></textarea>
          </div>
          <div className='mb-3'>
            <label htmlFor='address' className='form-label'>
              Address
            </label>
            <input type='text' className='form-control' id='address' name='address' value={address} onChange={handleChange} required />
          </div>
          <div className='mb-3'>
            <label htmlFor='province' className='form-label'>
              Province
            </label>
            <input type='text' className='form-control' id='province' name='province' value={province} onChange={handleChange} required />
          </div>
          <div className='mb-3'>
            <label htmlFor='city' className='form-label'>
              City
            </label>
            <input type='text' className='form-control' id='city' name='city' value={city} onChange={handleChange} required />
          </div>
          <div className='mb-3'>
            <label htmlFor='location_maps' className='form-label'>
              Location Maps
            </label>
            <input type='text' className='form-control' id='location_maps' name='location_maps' value={location_maps} onChange={handleChange} required />
          </div>
          <button type='submit' className='btn btn-primary'>
            Update Activity
          </button>
        </form>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, null)(UpdateActivity);
