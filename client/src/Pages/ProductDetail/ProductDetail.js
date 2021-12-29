import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { getProduct } from '../../reducers/productReducers';
import Loading from '../../Components/Loading';
import styled from 'styled-components';
import Message from '../../Components/Message';
import { addToCart } from '../../actions/cartAction';

// const ImageContainer = styled.div`
//   width: 100%;
//   height: 100%;
// `;

const Container = styled.div`
  padding-top: 12vh;
  width: 100%;
  height: 100%;
`;

function ProductDetail() {
  const dispatch = useDispatch();
  let { id: productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProduct(productId));
  }, [dispatch, productId]);

  const productInfo = useSelector((state) => state.productInfo);
  const { loading, error, product } = productInfo;

  const user = useSelector((state) => state.user);
  const { loginInfo } = user;

  const cart = useSelector((state) => state.cart);
  const { items } = cart;

  const [quantity, setQuantity] = useState(1);

  // 객체 형태로 줘야함.
  const handleCartClick = () => {
    if (!loginInfo) {
      alert('장바구니는 로그인하셔야 이용하실 수 있습니다. 로그인 페이지로 이동합니다.');
      navigate('/login');
      return;
    }
    let productObj = {
      productId,
      quantity,
    };
    console.log(items.filter((item) => item.productId === productId).length);
    let existence = items.filter((item) => item.productId === productId).length > 0 ? true : false;
    if (existence) {
      alert('이미 장바구니에 있는 상품입니다.');
    } else {
      let confirm = window.confirm(
        `다음과 같은 상품을 장바구니에 넣으시겠습니까?\n${product.name} ${quantity}개 ${
          quantity * product.price
        }`
      );
      if (confirm) {
        dispatch(addToCart(loginInfo._id, productObj));
      }
    }
  };

  const handleQuantityChange = (e) => {
    let { value } = e.target;
    setQuantity(parseInt(value));
  };

  return (
    <Container className='container'>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        product && (
          <>
            <div className='imageContainer'>
              <img src={`http://localhost:4000/${product.images[0].filePath}`} alt='product' />
            </div>
            <div className='infoContainer'>
              <h1>{product.name}</h1>
              <h2>{product.price}</h2>
              <div>
                <label>quantity</label>
                <select onChange={handleQuantityChange} value={quantity}>
                  <option key={1} value={1}>
                    1
                  </option>
                  <option key={2} value={2}>
                    2
                  </option>
                  <option key={3} value={3}>
                    3
                  </option>
                </select>
              </div>
              <div>
                <p>Total Price {quantity * product.price}</p>
              </div>
              <button onClick={handleCartClick}>Add to cart</button>
            </div>
          </>
        )
      )}
    </Container>
  );
}

export default ProductDetail;
