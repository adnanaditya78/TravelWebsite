import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { connect } from "react-redux";
import { getBannersList } from "./action/bannerAction";
import { getPromoList } from "./action/promoAction";
import { getActivityList } from "./action/activityAction";
import { getCategoryList } from "./action/categoryAction";
import PromoPage from "./pages/Landingpage/PromoPage";
import Footer from "./components/Footer";
import ActivityPage from "./pages/Landingpage/ActivityPage";
import PromoDetail from "./pages/Landingpage/PromoDetail";
import ActivityDetail from "./pages/Landingpage/ActivityDetail";
import Login from "./pages/Auth/Login";
import Banner from "./pages/Admin/Banner";
import LandingPage from "./pages/Landingpage/LandingPage";
import Sidebar from "./components/Sidebar";
import Promo from "./pages/Admin/Promo";
import Category from "./pages/Admin/Category";
import Activity from "./pages/Admin/Activity";
import User from "./pages/Admin/User";
import Register from "./pages/Auth/Register";
import Profile from "./pages/Admin/Profile";
import AddBanner from "./pages/Admin/AddBanner";
import UpdateBanner from "./pages/Admin/UpdateBanner";
import AddPromo from "./pages/Admin/AddPromo";
import UpdatePromo from "./pages/Admin/UpdatePromo";
import AddCategory from "./pages/Admin/AddCategory";
import UpdateCategory from "./pages/Admin/UpdateCategory";
import AddActivity from "./pages/Admin/AddActivity";
import UpdateActivity from "./pages/Admin/UpdateActivity";

function App({ dispatch }) {
  useEffect(() => {
    dispatch(getBannersList());
    dispatch(getPromoList());
    dispatch(getActivityList());
    dispatch(getCategoryList());
  }, [dispatch]);

  // Cek apakah terdapat token di sessionStorage
  const token = sessionStorage.getItem("token");

  return (
    <>
      <Router>
        {token ? (
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-2">
                <Sidebar />
              </div>
              <div className="col-md-10">
                <div className="main-content">
                  <Routes>
                    <Route path="admin/user" element={<User />} />
                    <Route path="admin/profile" element={<Profile />} />
                    <Route path="admin/banner" element={<Banner />} />
                    <Route path="admin/banner/add" element={<AddBanner />} />
                    <Route path="admin/banner/update/:bannerId" element={<UpdateBanner />} />
                    <Route path="admin/promo" element={<Promo />} />
                    <Route path="admin/promo/add" element={<AddPromo />} />
                    <Route path="admin/promo/update/:promoId" element={<UpdatePromo />} />
                    <Route path="admin/category" element={<Category />} />
                    <Route path="admin/category/add" element={<AddCategory />} />
                    <Route path="admin/category/update/:categoryId" element={<UpdateCategory />} />
                    <Route path="admin/activity" element={<Activity />} />
                    <Route path="admin/activity/add" element={<AddActivity />} />
                    <Route path="admin/activity/update/:activityId" element={<UpdateActivity />} />
                    <Route path="*" element={<Navigate to="admin/banner" replace />} />
                  </Routes>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="promos" element={<PromoPage />} />
              <Route path="activities" element={<ActivityPage />} />
              <Route path="promo/:id" element={<PromoDetail />} />
              <Route path="activity/:id" element={<ActivityDetail />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Footer />
          </>
        )}
      </Router>
    </>
  );
}

export default connect()(App);
