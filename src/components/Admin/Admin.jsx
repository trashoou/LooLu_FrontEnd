import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  postProduct,
  deleteProduct,
  getProducts,
  getProductById,
} from "../../features/products/productsSlice";
import styles from "../../styles/Admin.module.css";

const Admin = () => {
  const { currentUser } = useSelector(({ user }) => user);
  const { productDetails, isLoading, error } = useSelector(
    ({ products }) => products
  );
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("Products");
  const [activeProductTab, setActiveProductTab] = useState("Add Product");
  const [productData, setProductData] = useState({
    id: "",
    title: "",
    description: "",
    price: 0,
    categoryId: 1,
    images: [""],
  });
  const [deleteProductId, setDeleteProductId] = useState("");
  const [isLoadingDetails, setIsLoadingDetails] = useState(false); // Состояние для отслеживания загрузки деталей продукта
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !currentUser ||
      !currentUser.authorities.some((role) => role.authority === "ROLE_ADMIN")
    ) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleProductTabClick = (tab) => {
    setActiveProductTab(tab);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: name === "categoryId" ? parseInt(value) : value,
    });
  };

  const handleImageChange = (e, index) => {
    const images = [...productData.images];
    images[index] = e.target.value;
    setProductData({ ...productData, images });
  };

  const handleAddImage = () => {
    setProductData({ ...productData, images: [...productData.images, ""] });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(postProduct(productData));
      alert('Product added successfully');
      // Опционально: сбросить форму или выполнить другие действия после успешной отправки
    } catch (error) {
      console.error('Failed to add product', error);
      // Обработка ошибок отправки
    }
  };

  const handleDeleteInputChange = (e) => {
    setDeleteProductId(e.target.value);
  };

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(deleteProduct(deleteProductId));
      alert("Product deleted successfully");
      dispatch(getProducts()); // обновить список продуктов после удаления
    } catch (error) {
      console.error("Failed to delete product", error);
    }
  };

  const handleGetProduct = async (e) => {
    e.preventDefault();
    setIsLoadingDetails(true); // Устанавливаем состояние загрузки перед отправкой запроса
    try {
      await dispatch(getProductById(productData.id));
    } catch (error) {
      console.error("Failed to get product", error);
    } finally {
      setIsLoadingDetails(false); // Сбрасываем состояние загрузки после получения ответа
    }
  };

  return (
    <section className={styles.panel}>
      <div className={styles.tabs}>
        <div
          className={`${styles.tab} ${
            activeTab === "Products" && styles.active
          }`}
          onClick={() => handleTabClick("Products")}
        >
          Manage Products
        </div>
        <div
          className={`${styles.tab} ${
            activeTab === "UsersControll" && styles.active
          }`}
          onClick={() => handleTabClick("UsersControll")}
        >
          Manage Users
        </div>
        <div
          className={`${styles.tab} ${
            activeTab === "CategoryControll" && styles.active
          }`}
          onClick={() => handleTabClick("CategoryControll")}
        >
          Manage Categories
        </div>
      </div>

      <div className={styles.tabContent}>
        {activeTab === "Products" && (
          <div>
            <div className={styles.tabs}>
              <div
                className={`${styles.tab} ${
                  activeProductTab === "Add Product" && styles.active
                }`}
                onClick={() => handleProductTabClick("Add Product")}
              >
                Add Product
              </div>
              <div
                className={`${styles.tab} ${
                  activeProductTab === "Delete Product" && styles.active
                }`}
                onClick={() => handleProductTabClick("Delete Product")}
              >
                Delete Product
              </div>
              <div
                className={`${styles.tab} ${
                  activeProductTab === "Update Product" && styles.active
                }`}
                onClick={() => handleProductTabClick("Update Product")}
              >
                Update Product
              </div>
              <div
                className={`${styles.tab} ${
                  activeProductTab === "Get Product" && styles.active
                }`}
                onClick={() => handleProductTabClick("Get Product")}
              >
                Get Product
              </div>
            </div>
            <div className={styles.subTabContent}>
              {activeProductTab === "Add Product" && (
                <div>
                  <h2>Add New Product</h2>
                  <form className={styles.form} onSubmit={handleFormSubmit}>
                    <div className={styles.group}>
                      <label>
                        Title:
                        <input
                          type="text"
                          name="title"
                          value={productData.title}
                          onChange={handleInputChange}
                        />
                      </label>
                    </div>
                    <div className={styles.group}>
                      <label>
                        Description:
                        <input
                          type="text"
                          name="description"
                          value={productData.description}
                          onChange={handleInputChange}
                        />
                      </label>
                    </div>
                    <div className={styles.group}>
                      <label>
                        Price:
                        <input
                          type="number"
                          name="price"
                          value={productData.price}
                          onChange={handleInputChange}
                        />
                      </label>
                    </div>
                    <div className={styles.group}>
                      <label>
                        Category:
                        <input
                          type="number"
                          name="categoryId"
                          value={productData.categoryId}
                          onChange={handleInputChange}
                        />
                      </label>
                    </div>
                    {productData.images.map((image, index) => (
                      <div className={styles.group} key={index}>
                        <label>
                          Image URL:
                          <input
                            type="text"
                            value={image}
                            onChange={(e) => handleImageChange(e, index)}
                          />
                        </label>
                      </div>
                    ))}
                    <button type="button" onClick={handleAddImage}>
                      Add Another Image
                    </button>
                    <button type="submit">Add Product</button>
                  </form>
                </div>
              )}
              {activeProductTab === "Delete Product" && (
                <div>
                  <h2>Delete Product</h2>
                  <form className={styles.form} onSubmit={handleDeleteSubmit}>
                    <div className={styles.group}>
                      <label>
                        Id Product to delete:
                        <input
                          type="text"
                          name="id"
                          value={deleteProductId}
                          onChange={handleDeleteInputChange}
                        />
                      </label>
                    </div>
                    <button type="submit">Delete Product</button>
                  </form>
                </div>
              )}
              {activeProductTab === "Update Product" && (
                <div>Update Product Content</div>
              )}
              {activeProductTab === "Get Product" && (
                <div>
                  <h2>Get Product</h2>
                  <form className={styles.form} onSubmit={handleGetProduct}>
                    <div className={styles.group}>
                      <label>
                        Product ID:
                        <input
                          type="text"
                          name="id"
                          value={productData.id}
                          onChange={handleInputChange}
                        />
                      </label>
                    </div>
                    <button type="submit">Get Product</button>
                  </form>
                  {isLoadingDetails ? (
                    <p>Loading...</p>
                  ) : error ? (
                    error.response && error.response.status === 404 ? (
                      <p>Product not found.</p>
                    ) : (
                      <p>
                        Error:{" "}
                        {error.message ||
                          "Error occurred while fetching product details."}
                      </p>
                    )
                  ) : !productDetails ? (
                    <p>Product not found.</p>
                  ) : (
                    <div>
                      <p>Name: {productDetails.title}</p>
                      <p>Description: {productDetails.description}</p>
                      <p>Price: {productDetails.price}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
        {activeTab === "UsersControll" && <div>Content for Users</div>}
        {activeTab === "CategoryControll" && <div>Content for Categories</div>}
      </div>
    </section>
  );
};

export default Admin;
