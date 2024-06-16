import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '@components/Home/Home';

import { ROUTES } from '@utils/routes';
import SingleProduct from '../Products/SingleProduct';
import Profile from '../Profile/Profile';
import SingleCategory from '../Categories/SingleCategory';
import Cart from '../Cart/Cart';
import Settings from '../Settings/Settings';
import Orders from '../Orders/Orders';
import Admin from '../Admin/Admin';

const AppRoutes = () => (
    <Routes>
        <Route index element={<Home />} />
        <Route path={ROUTES.PRODUCT} element={<SingleProduct/>} />
        <Route path={ROUTES.PROFILE} element={<Profile/>} />
        <Route path={ROUTES.CATEGORY} element={<SingleCategory/>} />
        <Route path={ROUTES.CART} element={<Cart/>} />        
        <Route path={ROUTES.SETTINGS} element={<Settings/>} />     
        <Route path={ROUTES.ORDERS} element={<Orders/>} />   
        <Route path={ROUTES.ADMIN} element={<Admin/>} />   

    </Routes>
);

export default AppRoutes;
