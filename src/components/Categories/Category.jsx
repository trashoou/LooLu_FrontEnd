import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { useGetProductsQuery } from "../../features/api/apiSlice";

import styles from "../../styles/Category.module.css";

import Products from "../Products/Products";

import { NumberParam, StringParam, useQueryParam } from "use-query-params";

const Category = () => {
  const { id } = useParams();
  const { list } = useSelector(({ categories }) => categories);

  // eslint-disable-next-line no-unused-vars
  const [categoryId, setCategoryId] = useQueryParam("categoryId", NumberParam);
  const [title, setTitle] = useQueryParam("title", StringParam);
  const [price_min, setPrice_min] = useQueryParam("price_min", NumberParam);
  const [price_max, setPrice_max] = useQueryParam("price_max", NumberParam);

  const { data = [], isLoading, isSuccess } = useGetProductsQuery({
    params: {
      categoryId: Number(id),
      title: title || "",
      price_min: price_min || 0,
      price_max: price_max || 10000,
    },
  });

  useEffect(() => {
    setCategoryId(Number(id));
    setTitle(title || "");
    setPrice_min(price_min || 0);
    setPrice_max(price_max || 10000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, setCategoryId, setTitle, setPrice_min, setPrice_max]);

  const handleReset = () => {
    setTitle("");
    setPrice_min(0);
    setPrice_max(10000);
  };

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>{list.find(item => item.id === Number(id))?.name}</h2>

      <form className={styles.filters} onSubmit={(e) => e.preventDefault()}>
        <div className={styles.filter}>
          <input
            type="text"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Product name"
            value={title}
          />
        </div>
        <div className={styles.filter}>
          <input
            type="number"
            name="price_min"
            onChange={(e) => setPrice_min(Number(e.target.value))}
            placeholder="0"
            value={price_min}
          />
          <span>Price from</span>
        </div>
        <div className={styles.filter}>
          <input
            type="number"
            name="price_max"
            onChange={(e) => setPrice_max(Number(e.target.value))}
            placeholder="0"
            value={price_max}
          />
          <span>Price to</span>
        </div>

        <button type="reset" onClick={handleReset}>
          Reset
        </button>
      </form>

      {isLoading ? (
        <div className="preloader">Loading...</div>
      ) : !isSuccess || data.length === 0 ? (
        <div className={styles.back}>
          <span>No results</span>
        </div>
      ) : (
        <Products
          title=""
          products={data}
          style={{ padding: 0 }}
          amount={data.length}
        />
      )}
    </section>
  );
};

export default Category;
