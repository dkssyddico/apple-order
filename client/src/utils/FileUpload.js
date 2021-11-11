import React from 'react';
import { useDispatch } from 'react-redux';

import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import { uploadProductImg } from '../reducers/productUploadReducer';

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

function FileUpload() {
  const dispatch = useDispatch();

  const handleDrop = (files) => {
    let formData = new FormData();
    formData.append('image', files[0]);
    dispatch(uploadProductImg(formData));
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
    </Container>
  );
}

export default FileUpload;
