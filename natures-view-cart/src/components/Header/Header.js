import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useStateValue } from '../stateProvider/StateProvider';
import { getAuth, signOut } from 'firebase/auth';

function Header() {
    const [{ basket, user }] = useStateValue();
    const navigate = useNavigate();
    const auth = getAuth();

    const handleLogin = () => {
        if (user) {
            signOut(auth);
            navigate('/login');
        }
    };

    const logoUrl = 'https://firebasestorage.googleapis.com/v0/b/nature-s-cart.appspot.com/o/Logo.png?alt=media&token=26afe3eb-41d9-4777-af31-dac3499d6dee';

    return (
        <nav className="header">
            {/* logo on the left -> img */}
            <Link to="/">
                <img className="header__logo" src={logoUrl} alt="new logo" />
            </Link>
            {/* search box */}
            <div className="header__search">
                <input type="text" className="header__searchInput" />
                <SearchIcon className="header__searchIcon" />
            </div>
            {/* 3 links */}
            <div className="header__nav">
                <Link to={!user && "/login"} className="header__link">
                    <div onClick={handleLogin} className="header__option">
                        <span className="header__optionLineOne">Hello {user?.email}</span>
                        <span className="header__optionLineTwo">{user ? "Sign Out" : "Sign In"}</span>
                    </div>
                </Link>
            </div>
            <div className="header__nav">
                <Link to="/order" className="header__link">
                    <div className="header__option">
                        <span className="header__optionLineOne">Returns</span>
                        <span className="header__optionLineTwo">& Orders</span>
                    </div>
                </Link>
            </div>
            <div className="header__nav">
                <Link to="/login" className="header__link">
                    <div className="header__option">
                        <span className="header__optionLineOne">Your</span>
                        <span className="header__optionLineTwo">Prime</span>
                    </div>
                </Link>
            </div>
            <Link to="/checkout" className="header__link">
                <div className="header__optionBasket">
                    <ShoppingBasketIcon />
                    <span className="header__optionLineTwo header__basketCount">{basket?.length}</span>
                </div>
            </Link>
        </nav>
    );
}

export default Header;

