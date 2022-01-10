import httpClient from './httpClient';

const config = {
  header: {
    'Content-Type': 'multipart/form-data',
  },
};

class Product {
  constructor(httpClient) {
    this.product = httpClient;
  }
  add = (newProduct) => {
    return this.product.post('/products', newProduct);
  };

  saveImages = (formData) => {
    return this.product.post('/products/image', formData, config);
  };

  getAllProducts = () => {
    return this.product.get('/products');
  };

  remove = (productId) => {
    return this.product.delete(`/products/${productId}`);
  };

  getInfo = (productId) => {
    return this.product.get(`/products/${productId}`);
  };

  update = (productId, productUpdatedObj) => {
    return this.product.get(`/products/${productId}`, productUpdatedObj);
  };
}

const productService = new Product(httpClient);
export default productService;
