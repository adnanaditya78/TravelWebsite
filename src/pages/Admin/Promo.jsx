import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deletePromo, getPromoList } from "../../action/promoAction";

const mapStateToProps = (state) => {
  return {
    promo: state.promo.getPromoList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDeletePromo: (id) => dispatch(deletePromo(id)),
    onGetPromoList: () => dispatch(getPromoList()),
  };
};

const Promo = ({ promo, onDeletePromo, onGetPromoList }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 5;
  const maxPageNumbers = 5; // Jumlah maksimum nomor halaman yang ditampilkan

  useEffect(() => {
    // Lakukan pemanggilan API atau dispatch aksi untuk mendapatkan data promo
    onGetPromoList();
  }, [onGetPromoList]); // Dispatch ulang saat komponen di-mount atau terjadi perubahan pada onGetPromoList

  console.log(promo);

  const totalData = promo ? promo.data.length : 0;
  const totalPages = Math.ceil(totalData / dataPerPage);

  const middlePage = Math.ceil(maxPageNumbers / 2);
  const startPage = Math.max(1, currentPage - middlePage + 1);
  const endPage = Math.min(startPage + maxPageNumbers - 1, totalPages);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = promo
    ? promo.data.slice(indexOfFirstData, indexOfLastData)
    : [];

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this promo?")) {
      onDeletePromo(id);
      onGetPromoList(); // Dispatch ulang setelah promo dihapus
    }
  };

  return (
    <>
      {promo ? (
        <div className="p-5">
          <Link
            className="btn btn-primary text-white mb-2"
            to={"/admin/promo/add"}
          >
            ADD NEW PROMO
          </Link>
          <div className="table-responsive" style={{ overflowX: "auto" }}>
            <table className="table">
              <thead className="table-primary">
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Title</th>
                  <th scope="col">Description</th>
                  <th scope="col">Image</th>
                  <th scope="col">Term Condition</th>
                  <th scope="col">Promo Code</th>
                  <th scope="col">Promo Price</th>
                  <th scope="col">Minimum Claim</th>
                  <th scope="col">Actions</th>{" "}
                  {/* Tambahkan kolom untuk delete */}
                </tr>
              </thead>
              <tbody>
                {currentData.map((promo, idx) => (
                  <tr key={idx} style={{ height: "50px" }}>
                    <td style={{ width: "5%", verticalAlign: "middle" }}>
                      {indexOfFirstData + idx + 1}
                    </td>
                    <td style={{ width: "20%", verticalAlign: "middle" }}>
                      {promo.title}
                    </td>
                    <td style={{ width: "20%", verticalAlign: "middle" }}>
                      {promo.description.length > 50
                        ? promo.description.slice(0, 30) + "..." // Memotong deskripsi menjadi 50 karakter dan menambahkan "..."
                        : promo.description}
                    </td>
                    <td style={{ width: "15%", verticalAlign: "middle" }}>
                      <img
                        src={promo.imageUrl}
                        alt=""
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td style={{ width: "15%", verticalAlign: "middle" }}>
                      {promo.terms_condition.length > 30
                        ? promo.terms_condition.slice(0, 30) + "..." // Memotong deskripsi menjadi 50 karakter dan menambahkan "..."
                        : promo.terms_condition}
                    </td>
                    <td style={{ width: "10%", verticalAlign: "middle" }}>
                      {promo.promo_code}
                    </td>
                    <td style={{ width: "10%", verticalAlign: "middle" }}>
                      {promo.promo_discount_price}
                    </td>
                    <td style={{ width: "10%", verticalAlign: "middle" }}>
                      {promo.minimum_claim_price}
                    </td>
                    <td style={{ width: "5%", verticalAlign: "middle" }}>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(promo.id)}
                      >
                        Delete
                      </button>
                      <Link to={"/admin/promo/update/" +promo.id}>
                        <button
                          className="btn btn-danger"
                        >
                          Update
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(Promo);
