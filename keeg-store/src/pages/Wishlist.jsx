import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useWishlist } from "../context/WishListContext";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const responsive = {
  mobile: '768px',
  tablet: '992px'
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  min-height: 100vh;
  
`;

const WishTittle = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #1E2022;
  text-align: center;

  @media (min-width: ${responsive.mobile}) {
    font-size: 2.5rem;
  }
`;

const WishlistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  padding: 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const WishlistItem = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProductImage = styled.img`
  width: 160px;
  height: 160px;
  object-fit: contain;
  margin-bottom: 1rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  width: 100%;
  justify-content: center;
`;

const RemoveButton = styled.button`
  background: #ff4444;
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s;

  &:hover {
    background: #cc0000;
    transform: scale(1.05);
  }
`;

const AddToCartButton = styled.button`
  background: #1E2022;
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s;

  &:hover {
    background: #52616B;
    transform: scale(1.05);
  }
`;

const Notification = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background:#03831f;
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  opacity: ${(props) => (props.$visible ? "1" : "0")};
  transform: ${(props) => (props.$visible ? "translateY(0)" : "translateY(20px)")};
  transition: opacity 0.5s ease, transform 0.5s ease;
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 1000;
`;

const Wishlist = () => {
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    setNotificationMessage(`${product.title} adicionado ao carrinho!`);
    setNotificationVisible(true);
  
    setTimeout(() => {
      setNotificationVisible(false);
      setNotificationMessage('');
    }, 3000);
  };

  const handleRemove = (product) => {
    if (window.confirm(`Remover ${product.title} da sua wishlist?`)) {
      toggleWishlist(product);
      toast.error(`${product.title} removido da wishlist!`, {
        position: "bottom-right",
        autoClose: 3000
      });
    }
  }

  return (
    <Container>
      <WishTittle>Minha Wishlist</WishTittle>
      {wishlist.length === 0 ? (
        <div style={{ 
          background: 'white', 
          padding: '2rem', 
          borderRadius: '15px',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          maxWidth: '600px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Sua wishlist está vazia.</p>
          <Link to="/products" style={{ 
            display: 'inline-block',
            background: '#1E2022',
            color: 'white',
            padding: '0.8rem 1.5rem',
            borderRadius: '5px',
            textDecoration: 'none',
            transition: 'background 0.3s',
            fontWeight: 'bold',
            ':hover': {
              background: '#52616B'
            }
          }}>
            Ver Produtos
          </Link>
        </div>
      ) : (
        <WishlistGrid>
          {wishlist.map((item) => (
            <WishlistItem key={item.id}>
              <ProductImage src={item.image} alt={item.title} />
              <h3>{item.title}</h3>
              <p style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#4CAF50' }}>
                R$ {item.price.toFixed(2)}
              </p>
              <ButtonsContainer>
                <AddToCartButton onClick={() => handleAddToCart(item)}>
                  <FaShoppingCart /> Comprar
                </AddToCartButton>
                <RemoveButton onClick={() => handleRemove(item)}>
                  <FaTrash /> Remover
                </RemoveButton>
              </ButtonsContainer>
            </WishlistItem>
          ))}
        </WishlistGrid>
      )}
      {notificationVisible && (
              <Notification $visible={notificationVisible}>
                <FaShoppingCart />
                {notificationMessage}
              </Notification>
            )}
    </Container>
  );
};

export default Wishlist;