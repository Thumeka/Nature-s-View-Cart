import React, { useState, useEffect } from 'react';
import './Home.css';
import Product from '../product/Product';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

function Home() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsCollection = collection(db, 'products');
                const productsSnapshot = await getDocs(productsCollection);
                const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProducts(productsList);

                // Extract unique categories and subcategories from products
                const categoryMap = {};
                productsList.forEach(product => {
                    if (!categoryMap[product.category]) {
                        categoryMap[product.category] = new Set();
                    }
                    categoryMap[product.category].add(product.subcategory);
                });

                const uniqueCategories = Object.keys(categoryMap).map(category => ({
                    name: category,
                    subcategories: Array.from(categoryMap[category])
                }));
                setCategories(uniqueCategories);
            } catch (error) {
                console.error("Error fetching products: ", error);
            }
        };

        fetchProducts();
    }, []);

    const handleCategoryClick = (category) => {
        if (selectedCategory && selectedCategory.name === category.name) {
            setSelectedCategory(null); // Deselect category if it's already selected
            setSelectedSubcategory(null); // Also deselect subcategory
        } else {
            setSelectedCategory(category);
            setSelectedSubcategory(null); // Reset subcategory selection
        }
    };

    const handleSubcategoryClick = (subcategory) => {
        if (selectedSubcategory === subcategory) {
            setSelectedSubcategory(null); // Deselect subcategory if it's already selected
        } else {
            setSelectedSubcategory(subcategory);
        }
    };

    return (
        <>
            <div className="home__background"></div>

            <div className="home__categories">
                {categories.map((category, index) => (
                    <button 
                        key={index} 
                        className="home__categoryButton" 
                        onClick={() => handleCategoryClick(category)}
                    >
                        {category.name}
                    </button>
                ))}
            </div>

            {selectedCategory && (
                <div className="home__subcategory">
                    <h2>{selectedCategory.name}</h2>
                    <div className="home__subcategories">
                        {selectedCategory.subcategories.map((subcategory, subIndex) => (
                            <button 
                                key={subIndex} 
                                className="home__subcategoryItem"
                                onClick={() => handleSubcategoryClick(subcategory)}
                            >
                                {subcategory}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {selectedSubcategory && (
                <div className="home__row">
                    {products
                        .filter(product => product.category === selectedCategory.name && product.subcategory === selectedSubcategory)
                        .map(item => (
                            <Product
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                                category={item.category}
                                subcategory={item.subcategory}
                            />
                        ))}
                </div>
            )}

            {/* Features Section */}
            <section className="features" id="features">
                <h1 className="heading"> our <span>features</span> </h1>

                <div className="box-container">
                    <div className="box">
                        <img src="https://firebasestorage.googleapis.com/v0/b/nature-s-cart.appspot.com/o/dose-juice-atUjuLuFEcc-unsplash%20(1).jpg?alt=media&token=856481ac-3a8c-48ff-aaa8-a2186afd346d" alt="Fresh vegetables and fruits" />
                        <h3>fresh and organic</h3>
                        <p>Fresh vegetables and fruits at cheap prices.</p>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a href="#" className="btn">read more</a>
                    </div>

                    <div className="box">
                        <img src="https://firebasestorage.googleapis.com/v0/b/nature-s-cart.appspot.com/o/rowan-freeman-clYlmCaQbzY-unsplash.jpg?alt=media&token=f8a5783a-4633-4cba-9069-63157bad0ab9" alt="Fast delivery service" />
                        <h3>free delivery</h3>
                        <p>We always do fast delivery for our customers.</p>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a href="#" className="btn">read more</a>
                    </div>

                    <div className="box">
                        <img src="https://firebasestorage.googleapis.com/v0/b/nature-s-cart.appspot.com/o/63559496-online-shopping-with-credit-card-easy-payment-for-order-with-plastic-card-through-internet.jpg?alt=media&token=61396e55-aea5-463d-ae43-8b773ea3373a" alt="Easy payment options" />
                        <h3>easy payments</h3>
                        <p>It's very easy to pay on our website.</p>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a href="#" className="btn">read more</a>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;

