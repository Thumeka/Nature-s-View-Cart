import React from 'react';
import styled from 'styled-components';

const ProductCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  margin: 16px;
  flex: 1;

  img {
    max-width: 100%;
    height: auto;
    border-bottom: 1px solid #ccc;
    padding-bottom: 16px;
  }

  h2 {
    font-size: 1.5rem;
    margin: 16px 0;
  }

  p {
    font-size: 1.2rem;
    color: #333;
  }

  button {
    padding: 10px 20px;
    background-color: #28a745;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #218838;
  }

  @media (max-width: 768px) {
    flex: 1 1 100%;
    margin: 8px 0;
  }
`;

const ProductItem = ({ product }) => (
  <ProductCard>
    <img src={product.imageUrl} alt={product.name} />
    <h2>{product.name}</h2>
    <p>{product.price}</p>
    <button>Add to Cart</button>
  </ProductCard>
);

export default ProductItem;
