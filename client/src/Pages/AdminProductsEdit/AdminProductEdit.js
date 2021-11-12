import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProduct, updateProduct } from '../../reducers/productReducers';
import {
  GET_PRODUCT_REFRESH,
  UPDATE_PRODUCT_REFRESH,
  UPLOAD_PRODUCT_IMG_REFRESH,
} from '../../actions/types';
import { uploadProductImg } from '../../reducers/productUploadReducer';
import Message from '../../Components/Message';

const categories = [
  { key: 1, value: 'Family' },
  {
    key: 2,
    value: 'Present',
  },
  { key: 3, value: 'etc' },
];

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Zone = styled.div`
  width: 300px;
  height: 240px;
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Previews = styled.div`
  display: flex;
  width: 350px;
  height: 240px;
  overflow-x: scroll;
  background-color: beige;
`;

// 로딩 처리
function AdminProductEdit() {
  let { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.productInfo);
  const { success: successUpdateProduct, error: updateError } = useSelector(
    (state) => state.updatedProduct
  );

  const {
    images: uploadedImages,
    error: uploadImagesError,
    success: successUploadImages,
  } = useSelector((state) => state.productImageUpload);

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState(1);
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (!product || id !== product._id) {
      dispatch({ type: GET_PRODUCT_REFRESH });
      dispatch(getProduct(id));
    } else {
      setName(product.name);
      setPrice(product.price);
      setCategory(product.category);
      setDescription(product.description);
      setImages(product.images);
    }
  }, [history, dispatch, product, id]);

  useEffect(() => {
    if (successUploadImages) {
      setImages((prev) => [...uploadedImages, ...prev]);
      dispatch({ type: UPLOAD_PRODUCT_IMG_REFRESH });
    }
  }, [dispatch, successUploadImages, uploadedImages]);

  useEffect(() => {
    if (successUpdateProduct) {
      alert('상품 업데이트에 성공했습니다!');
      history.push('/admin/products');
      dispatch({ type: UPDATE_PRODUCT_REFRESH });
    }
  }, [dispatch, history, successUpdateProduct]);

  const handleDrop = (files) => {
    let formData = new FormData();
    formData.append('image', files[0]);
    dispatch(uploadProductImg(formData));
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    value = value.trim();
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'category':
        setCategory(value);
        break;
      case 'price':
        setPrice(value);
        break;
      case 'description':
        setDescription(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (images.length === 0) {
      alert('상품 이미지는 한 개 이상 필요합니다.');
    } else {
      const newProduct = {
        name,
        price,
        category,
        description,
        images,
      };
      dispatch(updateProduct(id, newProduct));
    }
  };

  const handleDelete = (image) => {
    const currentIdx = images.indexOf(image);
    let newImages = [...images];
    newImages.splice(currentIdx, 1);
    setImages(newImages);
  };

  return (
    <div className='container'>
      <Container>
        <Dropzone onDrop={handleDrop}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <Zone {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </Zone>
            </section>
          )}
        </Dropzone>
        <Previews>
          {images &&
            images.map((image, index) => (
              <div onClick={() => handleDelete(image)} key={index}>
                <img
                  style={{ maxWidth: '350px' }}
                  src={`http://localhost:4000/${image.filePath}`}
                  alt='product'
                />
              </div>
            ))}
        </Previews>
      </Container>
      <form onSubmit={handleSubmit}>
        {uploadImagesError && <Message>{uploadImagesError}</Message>}
        {updateError && <Message>{updateError}</Message>}
        <label>상품명</label>
        <input onChange={handleChange} name='name' type='text' value={name} required />
        <br />
        <br />
        <select name='category' value={category} onChange={handleChange} required>
          {categories.map((item) => {
            return (
              <option key={item.key} value={item.key}>
                {item.value}
              </option>
            );
          })}
        </select>
        <br />
        <br />
        <label>상품 가격</label>
        <input onChange={handleChange} name='price' type='number' value={price} required />
        <br />
        <br />
        <label>상품 설명</label>
        <textarea onChange={handleChange} name='description' value={description} required />
        <br />
        <br />
        <input type='submit' />
      </form>
    </div>
  );
}

export default AdminProductEdit;
