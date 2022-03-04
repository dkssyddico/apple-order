import React, { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import productService from '../../service/product';
import styles from './FileUpload.module.scss';
import toast from 'react-hot-toast';

function FileUpload({ refreshImages, originalImages }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (originalImages) {
      setImages(originalImages);
    }
  }, [originalImages]);

  const saveImage = async (formData) => {
    try {
      let { data } = await productService.saveImages(formData);
      setImages((prevImages) => [data, ...prevImages]);
      refreshImages([data, ...images]);
    } catch (error) {
      console.log(error);
      let {
        response: {
          data: { message },
        },
      } = error;

      toast.error(message ? message : error.message);
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
    <div className={styles.fileUploadBox}>
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div className={styles.zone} {...getRootProps()}>
              <input {...getInputProps()} />
              <div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className={`feather feather-image ${styles.img}`}
                >
                  <rect x='3' y='3' width='18' height='18' rx='2' ry='2'></rect>
                  <circle cx='8.5' cy='8.5' r='1.5'></circle>
                  <polyline points='21 15 16 10 5 21'></polyline>
                </svg>
              </div>
            </div>
          </section>
        )}
      </Dropzone>
      <div className={styles.previews}>
        {images &&
          images.map((image, index) => (
            <div onClick={() => handleDelete(image)} key={index}>
              <img className={styles.image} src={image.filePath} alt='product' />
            </div>
          ))}
      </div>
    </div>
  );
}

export default FileUpload;
