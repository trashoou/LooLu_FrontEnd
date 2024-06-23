import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductQuery } from "../../features/api/apiSlice";
import { getRelatedProducts } from "../../features/products/productsSlice";
import { ROUTES } from "../../utils/routes";
import Product from "./Product";
import Products from "./Products";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { productId } = useParams(); // Изменено на productId для соответствия пути
  const navigate = useNavigate();
  const { related } = useSelector(({ products }) => products);

  const { data, isLoading, isFetching, isError } = useGetProductQuery({ id: productId });

  useEffect(() => {
    if (isError) {
      navigate(ROUTES.HOME);
    }
  }, [isError, navigate]);

  useEffect(() => {
    if (data && data.categoryId) {
      dispatch(getRelatedProducts(data.categoryId));
    }
  }, [data, dispatch]);

  return isLoading || isFetching ? (
    <section className="preloader">Loading...</section>
  ) : !data ? (
    <section className="error">Product not found.</section>
  ) : (
    <>
      <Product {...data} />
      <Products products={related} amount={5} title="Related products" />
    </>
  );
};

export default SingleProduct;
