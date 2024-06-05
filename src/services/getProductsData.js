import { HTTP, SWAPI_ROOT, SWAPI_PRODUCTS } from '../constants/api';

const getId = (picture, category) => {
    const id = picture.replace(HTTP+SWAPI_ROOT+category, '');
    return id
}

export const getProductsId = picture => getId(picture, SWAPI_PRODUCTS);
