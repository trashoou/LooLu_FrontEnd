import React, { useEffect} from 'react';
import { useDispatch } from "react-redux";

import AppRoutes from '../Routes/Routes';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Sidebar from '../Sidebar/Sidebar';

import { getCategories } from '../../features/categories/categoriesSlice';
import { getProducts } from '../../features/products/productsSlice';
import UserForm from '../User/UserForm'




const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
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





// import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import routes from '../../utils/routes';
// import Header from '@components/Header'

// import styles from './App.module.css';

// const App = () => {
//   return (
//     <>
//       <BrowserRouter>
//       <div className={styles.wrapper}>
//             <Header />

//             <Routes>
//                 {routes.map((route, index) => (
//                     <Route 
//                         key={index}
//                         path={route.path}
//                         exact={route.exact}
//                         element={<route.component />} 
//                     />
//                 ))}
//             </Routes>
//         </div>
//       </BrowserRouter>
//     </>
//   );
// }

// export default App;
