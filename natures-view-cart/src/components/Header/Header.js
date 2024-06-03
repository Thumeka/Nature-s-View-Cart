import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useStateValue } from '../stateProvider/StateProvider';
import { getAuth, signOut } from 'firebase/auth';
import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";

function Header() {
    const [{ basket, user }, dispatch] = useStateValue();// eslint-disable-next-line
    const navigate = useNavigate();
    const auth = getAuth();
    const firestore = getFirestore(); // Initialize Firestore
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');

    const handleLogin = () => {
        if (user) {
            signOut(auth).then(() => {
                navigate('/login');
            });
        } else {
            navigate('/login');
        }
    };

    const handleSearchSubmit = async (event) => {
        event.preventDefault(); // Prevent default form behavior
        const searchTermLower = searchTerm.toLowerCase();
        const categoryLower = category.toLowerCase();
        const productsRef = collection(firestore, "products");
        let q;

        if (category && searchTerm) {
            // Search by both category and name using lowercased fields for case-insensitive matching
            q = query(productsRef, where("category_lower", "==", categoryLower), where("name_lower", "==", searchTermLower));
        } else if (category) {
            // Search by category only, using lowercased field
            q = query(productsRef, where("category_lower", "==", categoryLower));
        } else if (searchTerm) {
            // Search by name only, using lowercased field
            q = query(productsRef, where("name_lower", "==", searchTermLower));
        } else {
            // Get all products if no filters are applied
            q = query(productsRef);
        }

        const querySnapshot = await getDocs(q);
        const products = [];
        querySnapshot.forEach((doc) => {
            products.push({ id: doc.id, ...doc.data() });
        });

        // Example: Navigate to a search results page with products as state
        navigate('/search-results', { state: { products } });
    };

    return (
        <nav className="header">
            <Link to="/">
                <img className="header__logo" src="https://firebasestorage.googleapis.com/v0/b/nature-s-cart.appspot.com/o/Logo.png?alt=media&token=26afe3eb-41d9-4777-af31-dac3499d6dee" alt="Store Logo" />
            </Link>
            
            <form className="header__search" onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    className="header__searchInput"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="header__searchCategory"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    <option value="dairy">Dairy</option>
                    <option value="fruits">Fruits</option>
                    <option value="poultry & meat">Poultry & Meat</option>
                    <option value="bakery">Bakery</option>
                    <option value="vegetables">Vegetables</option>
                </select>
                <button type="submit" className="header__searchIcon">
                    <SearchIcon />
                </button>
            </form>

            <div className="header__nav">
                <Link to={!user && "/login"} className="header__link" onClick={handleLogin}>
                    <div className="header__option">
                        <span className="header__optionLineOne">Hello, {user ? user.email : "Guest"}</span>
                        <span className="header__optionLineTwo">{user ? "Sign Out" : "Sign In"}</span>
                    </div>
                </Link>
                <Link to="/orders" className="header__link">
                    <div className="header__option">
                        <span className="header__optionLineOne">Returns</span>
                        <span className="header__optionLineTwo">& Orders</span>
                    </div>
                </Link>
                <Link to="/checkout" className="header__link">
                    <div className="header__optionBasket">
                        <ShoppingBasketIcon />
                        <span className="header__optionLineTwo header__basketCount">{basket?.length}</span>
                    </div>
                </Link>
            </div>
        </nav>
    );
}

export default Header;
