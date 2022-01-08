import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { productAPI } from '../../service/api';
import { useForm } from 'react-hook-form';
import FileUpload from '../../Components/FileUpload';
import categories from '../../utils/category';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

function AdminProductDetail() {
  let { productId } = useParams();
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [productsError, setProductsError] = useState(false);
  const [productsErrorMessage, setProductsErrorMessage] = useState('');
  const [deleteError, setDeleteError] = useState(false);
  const [editError, setEditError] = useState(false);
  const [editErrorMessage, setEditErrorMessage] = useState('');
  const [deleteErrorMessage, setDeleteErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { isValid },
    watch,
    reset,
  } = useForm({
    mode: 'onChange',
  });
  const watchFields = watch();

  const getProduct = async (productId) => {
    try {
      setLoading(true);
      let {
        data: { product },
      } = await productAPI.getInfo(productId);
      setProduct(product);
    } catch (error) {
      let {
        response: {
          data: { message },
        },
      } = error;
      setProductsError(true);
      setProductsErrorMessage(message ? message : error.message);
    } finally {
      setLoading(false);
    }
  };

  const refreshImages = (images) => {
    setImages(images);
  };

  useEffect(() => {
    getProduct(productId);
  }, [productId]);

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        category: product.category,
        price: product.price,
        description: product.description,
      });
      setImages(product.images);
    }
  }, [reset, product]);

  const handleEditSubmit = (data) => {
    const { name, category, price, description } = data;
    if (images.length === 0) {
      alert('상품 이미지는 한 개 이상 필요합니다.');
    } else {
      let confirm = window.confirm('업데이트하시겠습니까?');
      if (confirm) {
        const newProduct = {
          name,
          price,
          category,
          description,
          images,
        };
        productAPI
          .update(productId, newProduct)
          .then((res) => {
            let {
              data: { success },
            } = res;
            if (success) {
              alert('상품 업데이트에 성공했습니다!');
              navigate('/admin/products');
            }
          })
          .catch((error) => {
            let {
              response: {
                data: { message },
              },
            } = error;
            setEditError(true);
            setEditErrorMessage(message ? message : error.message);
          });
      }
    }
  };

  const handleDelete = (itemId) => {
    let confirm = window.confirm('상품을 삭제하시겠습니까?');
    if (confirm) {
      productAPI
        .remove(itemId)
        .then((res) => {
          let {
            data: { success },
          } = res;
          if (success) {
            alert('상품 삭제에 성공했습니다!');
            navigate('/admin/products');
          }
        })
        .catch((error) => {
          let {
            response: {
              data: { message },
            },
          } = error;
          setDeleteError(true);
          setDeleteErrorMessage(message ? message : error.message);
        });
    }
  };

  return (
    <div className='container'>
      {loading ? (
        <h1>Loading</h1>
      ) : productsError ? (
        <h1>{productsErrorMessage}</h1>
      ) : (
        <>
          {editError && <h1>{editErrorMessage}</h1>}
          {deleteError && <h1>{deleteErrorMessage}</h1>}
          <Container>
            <FileUpload originalImages={images} refreshImages={refreshImages} />
          </Container>
          <form onSubmit={handleSubmit(handleEditSubmit)}>
            <label>상품명</label>
            {watchFields.name && watchFields.name.length < 2 && <p>2글자 이상 입력하세요</p>}
            <input
              {...register('name', {
                minLength: {
                  value: 2,
                  message: '2글자 이상 입력하세요.',
                },
                required: true,
              })}
              type='text'
            />
            <br />
            <br />
            <select
              name='category'
              {...register('category', {
                required: true,
              })}
            >
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
            {watchFields.price && watchFields.price < 1 && <p>1이상의 가격을 입력하세요</p>}
            {watchFields.price && watchFields.price > 9999 && (
              <p>9999 이상의 가격을 입력할 수 없습니다.</p>
            )}
            <input
              {...register('price', {
                min: {
                  value: 1,
                  message: '상품 가격은 1달러 이상 입력하세요.',
                },
                max: {
                  value: 9999,
                  message: '상품 가격은 9999 달러를 초과할 수 없습니다.',
                },
                required: true,
              })}
              type='number'
            />
            <br />
            <br />
            <label>상품 설명</label>
            <textarea
              {...register('description', {
                minLength: {
                  value: 2,
                  message: '2글자 이상 입력하세요.',
                },
                required: true,
              })}
              name='description'
            />
            {watchFields.description && watchFields.description.length < 2 && (
              <p>2글자 이상 입력하세요</p>
            )}
            <br />
            <br />
            <input disabled={!isValid || images.length === 0} type='submit' />
          </form>
          <div>
            <button onClick={() => handleDelete(productId)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
}

export default AdminProductDetail;
