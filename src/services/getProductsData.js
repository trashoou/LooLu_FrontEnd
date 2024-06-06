import { HTTP, SWAPI_ROOT, SWAPI_PRODUCTS,
    GUIDE_IMG_EXTENSION, URL_IMG_PRODUCT
} from '@constants/api';

const getId = (picture, category) => {
    const id = picture.
        replace(HTTP+SWAPI_ROOT+category, '')
        .replace(/\//g, '')
    return id
}

export const getProductsId = picture => getId(picture, SWAPI_PRODUCTS);
