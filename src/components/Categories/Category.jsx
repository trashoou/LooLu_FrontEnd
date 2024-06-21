import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { useGetProductsQuery } from "../../features/api/apiSlice";

import styles from "../../styles/Category.module.css";

import Products from "../Products/Products";

import { NumberParam, StringParam, useQueryParam } from "use-query-params";

const Category = () => {
  const { id } = useParams();
  const { list } = useSelector((state) => state.categories);
  const [setCategoryId] = useQueryParam("categoryId", NumberParam);
  const [title, setTitle] = useQueryParam("title", StringParam);
  const [price_min, setPrice_min] = useQueryParam("price_min", StringParam);
  const [price_max, setPrice_max] = useQueryParam("price_max", StringParam);

  const { data = [], isLoading, isSuccess } = useGetProductsQuery({
    params: {
      categoryId: Number(id),
      title: title || "",
      price_min: price_min ? Number(price_min) : 0,
      price_max: price_max ? Number(price_max) : 10000,
    },
  });

  useEffect(() => {
    setCategoryId(Number(id));
    setTitle(title || "");
    setPrice_min(price_min || "0");
    setPrice_max(price_max || "10000");
  }, [id, setCategoryId, setTitle, setPrice_min, setPrice_max, title, price_min, price_max]);

  const handleReset = () => {
    setTitle("");
    setPrice_min("");
    setPrice_max("");
  };

  const handlePriceChange = (setter) => (e) => {
    const value = e.target.value;
    // Remove leading zeros if there are other digits after them
    const sanitizedValue = value.replace(/^0+(?=\d)/, '');
    setter(sanitizedValue);
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
            type="text"
            name="price_min"
            onChange={handlePriceChange(setPrice_min)}
            placeholder="0"
            value={price_min}
          />
          <span>price min</span>
        </div>
        <div className={styles.filter}>
          <input
            type="text"
            name="price_max"
            onChange={handlePriceChange(setPrice_max)}
            placeholder="10000"
            value={price_max}
          />
          <span>price max</span>
        </div>

        <button type="reset" onClick={handleReset} key="reset">
          Reset
        </button>
      </form>

      {isLoading ? (
        <div className="preloader">Loading...</div>
      ) : !isSuccess || data.length === 0 ? (
        <div className={styles.back}>
          <span>No Results</span>
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
