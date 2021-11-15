import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getProduct } from '../../reducers/productReducers';
import Loading from '../../Components/Loading';
import styled from 'styled-components';

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
`;
const Container = styled.div`
  padding-top: 12vh;
  width: 100%;
  height: 100%;
`;

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

function ProductDetail() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading } = useSelector((state) => state.productInfo);
  console.log(product, loading);

  useEffect(() => {
    dispatch(getProduct(id));
  }, []);

  return (
    <Container className='container'>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div>
            <ImageContainer className='imageContainer'>
              <div>
                <img src={`http://localhost:4000/${product.images[0].filePath}`} alt='product' />
              </div>
            </ImageContainer>
            <section className='infoContainer'>
              <div>
                <h1>{product.name}</h1>
                <p>Price: ${product.price}</p>
                <p>Description: {product.description}</p>
                <div>
                  <label>갯수</label>
                  <select>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                  </select>
                </div>
                <p>total price</p>
                <button>Add to cart</button>
              </div>
            </section>
          </div>
        </>
      )}
    </Container>
  );
}

export default ProductDetail;
