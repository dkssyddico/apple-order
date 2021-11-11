import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import { uploadProductImg, uploadProduct } from '../../../reducers/productUploadReducer';
import Message from '../../../Components/Message';
import { UPLOAD_PRODUCT_REFRESH } from '../../../actions/types';

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

function UploadProduct() {
  const dispatch = useDispatch();
  const { loginInfo } = useSelector((state) => state.user);
  const { images, error, success } = useSelector((state) => state.productToBeUploaded);
  const history = useHistory();

  useEffect(() => {
    if (!loginInfo || !loginInfo.isAdmin) {
      alert('관리자만 들어올 수 있습니다.');
      history.push('/');
    }
    if (success) {
      alert('상품 등록에 성공했습니다!');
      history.push('/admin/products');
      dispatch({ type: UPLOAD_PRODUCT_REFRESH });
    }
  }, [history, loginInfo, success, dispatch]);

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState(1);
  const [description, setDescription] = useState('');

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
    console.log(images, images.length);
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
      dispatch(uploadProduct(newProduct));
    }
  };

  return (
    <div className='container'>
      <h1>Upload product</h1>
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
              <div key={index}>
                <img
                  style={{ minWidth: '300px' }}
                  src={`http://localhost:4000/${image.filePath}`}
                  alt='product'
                />
              </div>
            ))}
        </Previews>
      </Container>
      <form onSubmit={handleSubmit}>
        {error && <Message>{error}</Message>}
        <label>상품명</label>
        <input onChange={handleChange} name='name' type='text' required />
        <br />
        <br />
        <select name='category' onChange={handleChange} required>
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
        <input onChange={handleChange} name='price' type='number' required />
        <br />
        <br />
        <label>상품 설명</label>
        <textarea onChange={handleChange} name='description' required />
        <br />
        <br />
        <input type='submit' />
      </form>
    </div>
  );
}

export default UploadProduct;
