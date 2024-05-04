import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../../action/authAction';
import { uploadImage } from '../../action/imageAction';
import foto from '../../assets/images/bg-form.jpg';

const Register = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    passwordRepeat: '',
    role: '',
    phoneNumber: '',
    profilePictureUrl: '',
    selectedFile: null,
  });

  const { email, name, password, passwordRepeat, role, phoneNumber, profilePictureUrl, selectedFile } = formData;

  console.log(formData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Panggil fungsi register untuk melakukan permintaan POST
    dispatch(
      register({
        email,
        name,
        password,
        passwordRepeat,
        role,
        phoneNumber,
        getUrl,
      })
    );
    // Reset form setelah submit
    setFormData({
      email: '',
      name: '',
      password: '',
      passwordRepeat: '',
      role: '',
      phoneNumber: '',
      profilePictureUrl: '',
    });
  };

  const statusCode = useSelector((state) => state.auth.user.status);

  useEffect(() => {
    if (statusCode == 'OK') {
      alert('Berhasil Register');
    }
  }, [statusCode]);

  const onFileChangeCapture = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    console.log(e.target.files[0]);
    dispatch(uploadImage(e.target.files[0]));
  };

  const getUrl = useSelector((state) => state.image.link);

  return (
    <div className='container p-5 d-flex justify-content-center align-items-center' style={{ minHeight: '100vh' }}>
      <div className='card p-4 w-100 d-flex flex-column align-items-center'>
        <h2 className='mb-4'>Register</h2>
        <form onSubmit={handleSubmit} className='w-100'>
          <div className='mb-3'>
            <label htmlFor='email' className='form-label'>
              Email
            </label>
            <input type='email' className='form-control' id='email' name='email' value={email} onChange={handleChange} required />
          </div>
          <div className='mb-3'>
            <label htmlFor='name' className='form-label'>
              Name
            </label>
            <input type='text' className='form-control' id='name' name='name' value={name} onChange={handleChange} required />
          </div>
          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>
              Password
            </label>
            <input type='password' className='form-control' id='password' name='password' value={password} onChange={handleChange} required />
          </div>
          <div className='mb-3'>
            <label htmlFor='passwordRepeat' className='form-label'>
              Repeat Password
            </label>
            <input type='password' className='form-control' id='passwordRepeat' name='passwordRepeat' value={passwordRepeat} onChange={handleChange} required />
          </div>
          <div className='mb-3'>
            <label htmlFor='role' className='form-label'>
              Role
            </label>
            <input type='text' className='form-control' id='role' name='role' value={role} onChange={handleChange} required />
          </div>
          <div className='mb-3'>
            <label htmlFor='phoneNumber' className='form-label'>
              Phone Number
            </label>
            <input type='text' className='form-control' id='phoneNumber' name='phoneNumber' value={phoneNumber} onChange={handleChange} required />
          </div>
          <div className='mb-3'>
            <label htmlFor='selectedFile' className='form-label'>
              Upload Profile Picture
            </label>
            <input type='file' className='form-control' id='selectedFile' name='selectedFile' onChange={onFileChangeCapture} required />
          </div>
          <button type='submit' className='btn btn-primary'>
            Register
          </button>
          <Link className='nav-link' to={'/login'}>
            Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
