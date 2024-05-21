import React, { useEffect, useState } from 'react';
import './Home.css';
import Product from '../product/Product';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const productsCollection = collection(db, 'products');
            const productsSnapshot = await getDocs(productsCollection);
            const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProducts(productsList);
        };

        fetchProducts();
    }, []);

    return (
        <div className="home">
            <img className="home__image" src="https://firebasestorage.googleapis.com/v0/b/nature-s-cart.appspot.com/o/Logo.png?alt=media&token=26afe3eb-41d9-4777-af31-dac3499d6dee" alt="Banner" />

            {/* Product id, title, price, rating */}
            <div className="home__row">
                {products.map(item => (
                    <Product
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        image={item.image}
                        price={item.price}
                        rating={item.rating}
                    />
                ))}
            </div>
        </div>
    );
}

export default Home;
