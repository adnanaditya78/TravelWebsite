import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { deleteBanner, getBannersList } from '../../action/bannerAction';
import { Link } from 'react-router-dom';

const mapStateToProps = (state) => {
  return {
    banner: state.banner.getBannerList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteBanner: (id) => dispatch(deleteBanner(id)),
    onGetBannerList: () => dispatch(getBannersList()),
  };
};

const Banner = ({ banner, onDeleteBanner, onGetBannerList }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 5;
  const maxPageNumbers = 5; // Jumlah maksimum nomor halaman yang ditampilkan

  useEffect(() => {
    // Lakukan pemanggilan API atau dispatch aksi untuk mendapatkan data banner
    onGetBannerList();
  }, [onGetBannerList]);

  const totalData = banner ? banner.data.length : 0;
  const totalPages = Math.ceil(totalData / dataPerPage);

  const middlePage = Math.ceil(maxPageNumbers / 2);
  const startPage = Math.max(1, currentPage - middlePage + 1);
  const endPage = Math.min(startPage + maxPageNumbers - 1, totalPages);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = banner ? banner.data.slice(indexOfFirstData, indexOfLastData) : [];

  const handleDeleteBanner = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      await onDeleteBanner(id);
      await onGetBannerList(); // Dispatch ulang setelah category dihapus
    }
  };

  return (
    <>
      {banner ? (
        <div className='p-5'>
          <Link className='btn btn-primary text-white mb-2' to={'/admin/banner/add'}>
            ADD NEW BANNER
          </Link>
          <div className='table-responsive' style={{ overflowX: 'auto' }}>
            <table className='table'>
              <thead className='table-primary'>
                <tr>
                  <th scope='col'>No</th>
                  <th scope='col'>Name</th>
                  <th scope='col'>Image</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((banner, idx) => (
                  <tr key={idx} style={{ height: '50px' }}>
                    <td style={{ width: '30%', verticalAlign: 'middle' }}>{indexOfFirstData + idx + 1}</td>
                    <td style={{ width: '30%', verticalAlign: 'middle' }}>{banner.name}</td>
                    <td style={{ width: '30%', verticalAlign: 'middle' }}>
                      <img src={banner.imageUrl} alt='' style={{ width: '100px', height: '60px' }} />
                    </td>
                    <td style={{ width: '10%', verticalAlign: 'middle' }}>
                      <button className='btn btn-delete mb-2' onClick={() => handleDeleteBanner(banner.id)}>
                        Delete
                      </button>
                      <Link to={'/admin/banner/update/' + banner.id}>
                        <button className='btn btn-warning mb-2'>Update</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
