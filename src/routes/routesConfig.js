import ProductsPage from '@containers/ProductsPage';
import HomePage from '@containers/HomePage';
import { exact } from 'prop-types';

const routesConfig = [
    {
        path: '/',
        exact: true,
        component: HomePage
    },
    {
        path: '/products',
        exact: true,
        component: ProductsPage
    }
];

export default routesConfig;
