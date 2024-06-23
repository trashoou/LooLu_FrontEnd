import React, { useEffect} from 'react';
import { useDispatch } from "react-redux";

import AppRoutes from '../Routes/Routes';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Sidebar from '../Sidebar/Sidebar';

import { getCategories } from '../../features/categories/categoriesSlice';
import { getProducts } from '../../features/products/productsSlice';
import UserForm from '../User/UserForm';
import { fetchUserProfile } from '../../features/user/userSlice';




const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
    dispatch(fetchUserProfile());
  }, [dispatch]);

  return (
  <div className="app">
    <Header />
    <UserForm />
    <div className="container">
        <Sidebar />
        <AppRoutes />
    </div>

    <Footer />
  </div>
  );
};

export default App;