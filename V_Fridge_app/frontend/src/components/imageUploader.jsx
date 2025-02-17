import React, { useState } from "react";
import "./imageUploader.css";

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [base64Image, setBase64Image] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
        setSelectedImage(URL.createObjectURL(file));
        setBase64Image(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/upload-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: base64Image }),
      });

      if (response.ok) {
        console.log('Image uploaded successfully');
      } else {
        console.error('Image upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <h1>Image Uploader</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {selectedImage && (
        <div>
          <h2>Preview:</h2>
          <img src={selectedImage} alt="Selected" style={{ width: '300px', height: 'auto' }} />
        </div>
      )}
      <button onClick={handleUpload}>Upload Image</button>
    </div>
  );
};

export default ImageUploader;
