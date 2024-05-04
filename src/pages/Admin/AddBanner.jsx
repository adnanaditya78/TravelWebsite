import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { connect, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { redirect } from 'react-router-dom';
import { addBanner } from '../../action/bannerAction';
import { uploadImage } from '../../action/imageAction';

function AddBanner({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    imageUrl: '',
    selectedFile: null,
  });

  const { title, imageUrl, selectedFile } = formData;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addBanner(title, getUrl));
    // Reset form setelah submit
    setFormData({
      title: '',
      imageUrl: '',
    });
    navigate('/admin/banner');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFileChangeCapture = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    console.log(e.target.files[0]);
    dispatch(uploadImage(e.target.files[0]));
  };

  const getUrl = useSelector((state) => state.image.link);

  return (
    <div className='row vh-100 justify-content-center align-items-center'>
      <div className='col-3'>
        <h2 className='mb-3'>Add Banner</h2>
        <form onSubmit={handleSubmit} enctype='multipart/form-data'>
          <div className='mb-3'>
            <label htmlFor='title' className='form-label'>
              Title
            </label>
            <input type='text' className='form-control' id='title' name='title' value={title} onChange={handleChange} required />
          </div>
          <div className='mb-3'>
            <label htmlFor='selectedFile' className='form-label'>
              Image URL
            </label>
            <input type='file' className='form-control' id='selectedFile' name='selectedFile' onChange={onFileChangeCapture} required />
          </div>

          <button type='submit' className='btn btn-primary'>
            Add Banner
          </button>
        </form>
      </div>
    </div>
  );
}

export default connect(null)(AddBanner);
