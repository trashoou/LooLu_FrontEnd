import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMoreProducts, clearProducts } from '../../features/products/productsSlice';
import styles from '../../styles/CategoryPage.module.css';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const { list, hasMore, isLoading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(clearProducts());
    dispatch(fetchMoreProducts({ categoryId, page: 0, pageSize: 10 }));
  }, [dispatch, categoryId]);

  const loadMore = () => {
    setPage(prevPage => {
      const nextPage = prevPage + 1;
      dispatch(fetchMoreProducts({ categoryId, page: nextPage, pageSize: 10 }));
      return nextPage;
    });
  };

  return (
    <div>
      {isLoading && page === 0 ? (
        <p></p>
      ) : (
        <div className={styles.productList}>
          {list.map(product => (
            <div key={product.id} className={styles.productItem}>
              <img src={product.imageUrls[0]} alt={product.title} />
              <p>{product.title}</p>
              <p>${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
      {error && <p>Error: {error}</p>}
      {hasMore && !isLoading && (
        <button onClick={loadMore}>Load More</button>
      )}
    </div>
  );
};

export default CategoryPage;

