import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateProfile } from '../../action/authAction';
import { uploadImage } from '../../action/imageAction';

const mapStateToProps = (state) => {
  return {
    user: state.auth.userLogged,
  };
};

function Profile({ user }) {
  const dispatch = useDispatch();

  console.log(user);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    phoneNumber: '',
    profilePictureUrl: '',
    selectedFile: null,
  });

  useEffect(() => {
    if (user && name === '') {
      setFormData({
        name: user.data.name,
        email: user.data.email,
        role: user.data.role,
        phoneNumber: user.data.phoneNumber,
        profilePictureUrl: user.data.profilePictureUrl,
      });
    }
  }, [user]);

  // Untuk mendapatkan link gambar
  const getUrl = useSelector((state) => state.image.link);

  useEffect(() => {
    if (getUrl !== false) {
      setFormData({
        ...formData,
        name: user.data.name,
        email: user.data.email,
        role: user.data.role,
        phoneNumber: user.data.phoneNumber,
        profilePictureUrl: getUrl,
      });
    }
  }, [getUrl]);

  const { email, name, role, phoneNumber, profilePictureUrl, selectedFile } = formData;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email);
    // Panggil fungsi postExample untuk melakukan permintaan POST
    dispatch(updateProfile({ name, email, phoneNumber, profilePictureUrl }));
    // Reset form setelah submit
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const statusCode = useSelector((state) => state.auth.user.status);

  useEffect(() => {
    if (statusCode === 'OK') {
      alert('Berhasil Update');
    }
  }, [statusCode]);

  // Handle upload gambar from
  const onFileChangeCapture = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    console.log(e.target.files[0]);
    dispatch(uploadImage(e.target.files[0]));
  };

  return (
    <>
      {user ? (
        <div className='vh-100'>
          <div className='row vh-100 justify-content-center align-items-center'>
            <div className='col-3 grid text-center'>
              <img src={profilePictureUrl} className='rounded-circle' alt='' style={{ width: '200px', height: '200px' }} />
            </div>
            <div className='col-4 bg-secondary'>
              <form onSubmit={handleSubmit} className='w-100'>
                <div className='mb-3'>
                  <label htmlFor='name' className='form-label'>
                    Name
                  </label>
                  <input type='text' className='form-control' id='name' name='name' value={name} onChange={handleChange} required />
                </div>
                <div className='mb-3'>
                  <label htmlFor='email' className='form-label'>
                    Email
                  </label>
                  <input type='email' className='form-control' id='email' name='email' value={email} onChange={handleChange} required />
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
                    Image URL
                  </label>
                  <input type='file' className='form-control' id='selectedFile' name='selectedFile' onChange={onFileChangeCapture} />
                </div>
                <div className='row px-2 text-center'>
                  <button type='submit' className='btn btn-primary text-white'>
                    Update
                  </button>
                  <Link className='nav-link' to={'/'}>
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default connect(mapStateToProps)(Profile);
