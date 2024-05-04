import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addCategory } from '../../action/categoryAction';
import { uploadImage } from '../../action/imageAction';

function AddCategory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    imageUrl: '',
    selectedFile: null,
  });

  const { name, imageUrl, selectedFile } = formData;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addCategory(name, getUrl));
    // Reset form setelah submit
    setFormData({
      name: '',
      imageUrl: '',
    });
    navigate('/admin/category');
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
      <div className='col-6'>
        <h2 className='mb-3'>Add Category</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='name' className='form-label'>
              Name
            </label>
            <input type='text' className='form-control' id='name' name='name' value={name} onChange={handleChange} required />
          </div>
          <div className='mb-3'>
            <label htmlFor='selectedFile' className='form-label'>
              Image URL
            </label>
            <input type='file' className='form-control' id='selectedFile' name='selectedFile' onChange={onFileChangeCapture} required />
          </div>
          <button type='submit' className='btn btn-primary'>
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCategory;
