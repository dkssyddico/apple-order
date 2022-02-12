import React, { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import productService from '../../service/product';
import styles from './FileUpload.module.css';
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
              <p>Drag 'n' drop some files here, or click to select files</p>
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
