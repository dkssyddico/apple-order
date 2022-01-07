import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import { productAPI } from '../service/api';

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

function FileUpload({ refreshImages, originalImages }) {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (originalImages) {
      setImages(originalImages);
    }
  }, [originalImages]);

  const saveImage = async (formData) => {
    try {
      let { data } = await productAPI.saveImage(formData);
      setImages((prevImages) => [data, ...prevImages]);
      refreshImages([data, ...images]);
    } catch (error) {
      let {
        response: {
          data: { message },
        },
      } = error;
      setError(true);
      setErrorMessage(message ? message : error.message);
    }
  };

  const handleDrop = (files) => {
    let formData = new FormData();
    formData.append('image', files[0]);
    saveImage(formData);
  };

  const handleDelete = (image) => {
    const currentIdx = images.indexOf(image);
    let newImages = [...images];
    newImages.splice(currentIdx, 1);
    setImages(newImages);
    refreshImages(newImages);
  };

  return (
    <Container>
      {error && <h1>{errorMessage}</h1>}
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
  );
}

export default FileUpload;
