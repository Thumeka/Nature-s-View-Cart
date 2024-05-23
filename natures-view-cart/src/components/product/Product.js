import React, { useState } from 'react';
import './Product.css';
import { useStateValue } from '../stateProvider/StateProvider';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function Product({ id, title, price, rating, image }) {
    const [, dispatch] = useStateValue();
    const [uploading, setUploading] = useState(false);
    const [uploadedImage, setUploadedImage] = useState(image);

    const addToBasket = () => {
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id,
                title,
                image: uploadedImage,
                price,
                rating,
            },
        });
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const storage = getStorage();
        const storageRef = ref(storage, `products/${file.name}`);
        setUploading(true);

        try {
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);
            setUploadedImage(url);
            console.log('File available at', url);
        } catch (error) {
            console.error('Error uploading file:', error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="product">
            <div className="product__info">
                <p>{title}</p>
                <p className="product__price">
                    <medium>R</medium>
                    <strong>{price}</strong>
                </p>
                <div className="product__rating">
                    {Array(rating).fill().map((_, index) => (
                        <i key={index} className="fa fa-star" aria-hidden="true"></i>
                    ))}
                </div>
            </div>
            <img src={uploadedImage} alt={title} />
            <input type="file" onChange={handleImageUpload} />
            {uploading && <p>Uploading...</p>}
            <button onClick={addToBasket}>Add to basket</button>
        </div>
    );
}

export default Product;
