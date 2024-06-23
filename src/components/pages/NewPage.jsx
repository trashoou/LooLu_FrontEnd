import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMoreProducts, clearProducts } from '../../features/products/productsSlice';
import styles from '../../styles/NewPage.module.css';
const NewPage = () => {
  // eslint-disable-next-line no-unused-vars
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const { list, hasMore, isLoading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(clearProducts()); // Очищаем список при загрузке новой страницы
    dispatch(fetchMoreProducts({ page: 0, pageSize: 10 })); // Загружаем первую страницу
  }, [dispatch]);

  const loadMore = () => {
    setPage(prevPage => {
      const nextPage = prevPage + 1;
      dispatch(fetchMoreProducts({ page: nextPage, pageSize: 10 }));
      return nextPage;
    });
  };

  return (
    <div>
      <h1>This is the new page</h1>
      <div className={styles.productList}>
        {list.map(product => (
          <div key={product.id} className={styles.productItem}>
            <img src={product.imageUrls[0]} alt={product.title} />
            <p>{product.title}</p>
            <p>{product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {hasMore && !isLoading && (
        <button onClick={loadMore}>Load More</button>
      )}
    </div>
  );
};

export default NewPage;

