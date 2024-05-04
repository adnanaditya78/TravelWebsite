import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteActivity, getActivityList } from '../../action/activityAction';

const mapStateToProps = (state) => {
  return {
    activity: state.activity.getActivityList,
    categories: state.category.getCategoryList.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteActivity: (id) => dispatch(deleteActivity(id)),
    onGetActivityList: () => dispatch(getActivityList()),
  };
};

const Activity = ({ activity, categories, onDeleteActivity, onGetActivityList }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const dataPerPage = 5;
  const maxPageNumbers = 5;

  useEffect(() => {
    // Lakukan pemanggilan API atau dispatch aksi untuk mendapatkan data activity
    onGetActivityList();
  }, [onGetActivityList]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  if (!activity) {
    return null; // Tampilkan null jika data activity belum tersedia
  }

  const totalData = activity.data.length;
  const totalPages = Math.ceil(totalData / dataPerPage);

  const middlePage = Math.ceil(maxPageNumbers / 2);
  const startPage = Math.max(1, currentPage - middlePage + 1);
  const endPage = Math.min(startPage + maxPageNumbers - 1, totalPages);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const filteredData = selectedCategory ? activity.data.filter((item) => item.category.name === selectedCategory) : activity.data;
  const currentData = filteredData.slice(indexOfFirstData, indexOfLastData);

  const handleDeleteActivity = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this activity?');
    if (confirmDelete) {
      await onDeleteActivity(id);
      await onGetActivityList(); // Dispatch ulang setelah activity dihapus
    }
  };

  return (
    <div className='p-5'>
      <Link className='btn btn-primary text-white mb-2' to={'/admin/activity/add'}>
        ADD NEW ACTIVITY
      </Link>
      {/* Dropdown untuk filter kategori */}
      <div className='mb-3'>
        <label htmlFor='categoryFilter' className='form-label'>
          Filter by Category:
        </label>
        <select id='categoryFilter' className='form-select' value={selectedCategory} onChange={handleCategoryChange}>
          <option value=''>All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className='table-responsive' style={{ overflowX: 'auto' }}>
        <table className='table'>
          <thead className='table-primary'>
            <tr>
              <th scope='col'>No</th>
              <th scope='col'>Category</th>
              <th scope='col'>Title</th>
              <th scope='col'>Description</th>
              <th scope='col'>Price</th>
              <th scope='col'>Price Discount</th>
              <th scope='col'>Rating</th>
              <th scope='col'>Facilities</th>
              <th scope='col'>Address</th>
              <th scope='col'>Province</th>
              <th scope='col'>City</th>
              <th scope='col'>Images</th>
              <th scope='col'>Actions</th> {/* Tambahkan kolom Actions */}
            </tr>
          </thead>
          <tbody>
            {currentData.map((activity, idx) => {
              const num = (currentPage - 1) * dataPerPage + idx + 1;
              return (
                <tr key={idx}>
                  <td>{num}</td>
                  <td>{activity.category.name}</td>
                  <td>{activity.title}</td>
                  <td>{activity.description}</td>
                  <td>{activity.price}</td>
                  <td>{activity.price_discount}</td>
                  <td>{activity.rating}</td>
                  <td>{activity.facilities}</td>
                  <td>{activity.address}</td>
                  <td>{activity.province}</td>
                  <td>{activity.city}</td>
                  <td>
                    <img src={activity.imageUrls} alt='' style={{ width: '100px' }} />
                  </td>
                  <td>
                    <button className='btn btn-delete mb-2' onClick={() => handleDeleteActivity(activity.id)}>
                      Delete
                    </button>
                    <Link to={'/admin/activity/update/' + activity.id}>
                      <button className='btn btn-warning mb-2'>Update</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className='row justify-content-center'>
        <div className='col-6 text-center mt-3'>
          <nav aria-label='Page navigation example'>
            <ul className='pagination'>
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className='page-link' onClick={() => paginate(currentPage - 1)}>
                  Previous
                </button>
              </li>
              {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((pageNumber) => (
                <li className={`page-item ${pageNumber === currentPage ? 'active' : ''}`} key={pageNumber}>
                  <button className='page-link' onClick={() => paginate(pageNumber)}>
                    {pageNumber}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className='page-link' onClick={() => paginate(currentPage + 1)}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Activity);
