import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/logo.png';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #333;

  a {
    color: #fff;
    text-decoration: none;
    padding: 10px;
  }

  a:hover {
    background-color: #555;
  }

  @media (max-width: 768px) {
    flex-direction: column;

    a {
      padding: 15px;
    }
  }
`;

const Logo = styled.img`
  height: 40px;
`;

const SearchInput = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-right: 10px;
`;

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const history = useHistory();

  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`/?search=${searchTerm}`);
  };

  return (
    <Nav>
      <Link to="/">
        <Logo src={logo} alt="Natures View Cart Logo" />
      </Link>
      <div>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/orders">Order History</Link>
        <Link to="/login">Login</Link>
        <form onSubmit={handleSearch}>
          <SearchInput
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </div>
    </Nav>
  );
};

export default Header;

