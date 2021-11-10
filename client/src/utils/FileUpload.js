import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';

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

function FileUpload() {
  const [images, setImages] = useState([]);
  console.log(images);

  const handleDrop = (files) => {
    console.log(files);
    let formData = new FormData();
    const config = {
      header: {
        'Content-Type': 'multipart/form-data',
      },
    };
    formData.append('file', files[0]);
    console.log(formData);
  };
  return (
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
        {images.map((image, index) => (
          <div key={index}>
            <img
              style={{ minWidth: '300px' }}
              // src={`http://localhost:5500/${image}`}
              alt='product'
            />
          </div>
        ))}
      </Previews>
    </Container>
  );
}

export default FileUpload;
