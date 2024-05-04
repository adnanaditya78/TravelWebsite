import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteCategory, getCategoryList } from '../../action/categoryAction';

const mapStateToProps = (state) => {
  return {
    category: state.category.getCategoryList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteCategory: (id) => dispatch(deleteCategory(id)),
    onGetCategoryList: () => dispatch(getCategoryList()),
  };
};

const Category = ({ category, onDeleteCategory, onGetCategoryList }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 5;
  const maxPageNumbers = 5; // Jumlah maksimum nomor halaman yang ditampilkan

  useEffect(() => {
    // Lakukan pemanggilan API atau dispatch aksi untuk mendapatkan data category
    onGetCategoryList();
  }, [onGetCategoryList]); // Dispatch ulang saat komponen di-mount atau terjadi perubahan pada onGetCategoryList

  console.log(category);

  const totalData = category ? category.data.length : 0;
  const totalPages = Math.ceil(totalData / dataPerPage);

  const middlePage = Math.ceil(maxPageNumbers / 2);
  const startPage = Math.max(1, currentPage - middlePage + 1);
  const endPage = Math.min(startPage + maxPageNumbers - 1, totalPages);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = category ? category.data.slice(indexOfFirstData, indexOfLastData) : [];

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      await onDeleteCategory(id);
      await onGetCategoryList(); // Dispatch ulang setelah category dihapus
    }
  };

  return (
    <>
      {category ? (
        <div className='p-5'>
          <Link className='btn btn-primary text-white mb-2' to={'/admin/category/add'}>
            ADD NEW CATEGORY
          </Link>
          <div className='table-responsive' style={{ overflowX: 'auto' }}>
            <table className='table'>
              <thead className='table-primary'>
                <tr>
                  <th scope='col'>No</th>
                  <th scope='col'>Name</th>
                  <th scope='col'>Image</th>
                  <th scope='col'>Actions</th> {/* Tambahkan kolom untuk delete */}
                </tr>
              </thead>
              <tbody>
                {currentData.map((category, idx) => (
                  <tr key={idx}>
                    <td>{indexOfFirstData + idx + 1}</td>
                    <td>{category.name}</td>
                    <td>
                      <img src={category.imageUrl} alt='' style={{ width: '100px' }} />
                    </td>
                    <td>
                      <button className='btn btn-delete mb-2 me-2' onClick={() => handleDelete(category.id)}>
                        Delete
                      </button>
                      <Link to={'/admin/category/update/' + category.id}>
                        <button className='btn btn-warning mb-2 me-2'>Update</button>
                      </Link>
                    </td>
                  </tr>
                ))}
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
      ) : null}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
