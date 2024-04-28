import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAllUser } from "../../action/authAction";

const mapStateToProps = (state) => {
  return {
    users: state.auth.users,
  };
};

const User = ({ dispatch, users }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 5;
  const maxPageNumbers = 5; // Jumlah maksimum nomor halaman yang ditampilkan

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  console.log(users);

  const totalData = users ? users.data.length : 0;
  const totalPages = Math.ceil(totalData / dataPerPage);

  const middlePage = Math.ceil(maxPageNumbers / 2);
  const startPage = Math.max(1, currentPage - middlePage + 1);
  const endPage = Math.min(startPage + maxPageNumbers - 1, totalPages);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = users ? users.data.slice(indexOfFirstData, indexOfLastData) : [];

  return (
    <>
      {users ? (
        <div className="p-5">
          <div className="table-responsive" style={{ overflowX: "auto" }}>
            <table className="table">
              <thead className="table-primary">
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Role</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Photo Profile</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((user, idx) => {
                  const num = (currentPage - 1) * dataPerPage + idx + 1;
                  return (
                    <tr key={idx} style={{ height: "50px" }}>
                      <td style={{ width: "5%", verticalAlign: "middle" }}>
                        {num}
                      </td>
                      <td style={{ width: "15%", verticalAlign: "middle" }}>
                        {user.name}
                      </td>
                      <td style={{ width: "20%", verticalAlign: "middle" }}>
                        {user.email}
                      </td>
                      <td style={{ width: "5%", verticalAlign: "middle" }}>
                        {user.role}
                      </td>
                      <td style={{ width: "15%", verticalAlign: "middle" }}>
                        {user.phoneNumber}
                      </td>
                      <td style={{ width: "20%", verticalAlign: "middle" }}>
                        <img
                          src={user.profilePictureUrl}
                          alt=""
                          style={{ width: "50px", height: "50px" }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="row justify-content-center">
            <div className="col-6 text-center mt-3">
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => paginate(currentPage - 1)}
                    >
                      Previous
                    </button>
                  </li>
                  {Array.from(
                    { length: endPage - startPage + 1 },
                    (_, i) => startPage + i
                  ).map((pageNumber) => (
                    <li
                      className={`page-item ${
                        pageNumber === currentPage ? "active" : ""
                      }`}
                      key={pageNumber}
                    >
                      <button
                        className="page-link"
                        onClick={() => paginate(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    </li>
                  ))}
                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => paginate(currentPage + 1)}
                    >
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

export default connect(mapStateToProps)(User);
