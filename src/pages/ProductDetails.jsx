import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { useCart } from "../context/CartContext";
import { FaShoppingCart, FaArrowLeft, FaRegStar, FaStar } from "react-icons/fa";
import { useWishlist } from "../context/WishListContext";

const responsive = {
  mobile: '768px',
  tablet: '992px'
};


const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  min-height: 100vh;

  @media (min-width: ${responsive.tablet}) {
    padding: 3rem;
  }
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #1E2022;
  color: white;
  padding: 0.6rem 1rem;
  border-radius: 5px;
  text-decoration: none;
  margin-bottom: 2rem;
  transition: background 0.3s;

  &:hover {
    background: #52616B;
  }
`;

const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

  @media (min-width: ${responsive.tablet}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  object-fit: contain;
  border-radius: 10px;
  margin: 0 auto;
`;

const ProductInfo = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
`;

const ProductTitle = styled.h1`
  font-size: 1.8rem;
  color: #1E2022;
  margin-bottom: 1rem;

  @media (min-width: ${responsive.mobile}) {
    font-size: 2.2rem;
  }
`;

const ProductCategory = styled.span`
  display: inline-block;
  background: #F0F5F9;
  color: #52616B;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
`;

const ProductDescription = styled.p`
  color: #52616B;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ProductPrice = styled.h2`
  font-size: 2rem;
  color: #4CAF50;
  margin-bottom: 2rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: auto;
`;

const AddToCartButton = styled.button`
  background: #000000;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.3s;
  font-size: 1rem;

  &:hover {
    background: #58626e;
  }
`;

const FavoriteButton = styled.button`
  background: #000000;
  color: #ffffff;
  border: 1px solid #C9D6DF;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s;
  font-size: 1rem;

  &:hover {
    background: #58626e;
  }

  &.active {
    background: #FFD700;
    color: #1E2022;
    border-color: #FFD700;
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

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setIsFavorite(favorites.some(fav => fav.id === data.id));
      })
      .catch(() => setLoading(false));
  }, [id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    if (isFavorite) {
      const updatedFavorites = favorites.filter(fav => fav.id !== product.id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      localStorage.setItem('favorites', JSON.stringify([...favorites, product]));
    }
    
    setIsFavorite(!isFavorite);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setNotificationMessage(`${product.title} adicionado ao carrinho!`);
    setNotificationVisible(true);
  
    setTimeout(() => {
      setNotificationVisible(false);
      setNotificationMessage('');
    }, 3000);
  };

  if (loading) return (
    <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <p>Carregando...</p>
    </Container>
  );

  if (!product) return (
    <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <p>Produto não encontrado</p>
    </Container>
  );

  return (
    <Container>
      <BackButton to="/products">
        <FaArrowLeft /> Voltar para produtos
      </BackButton>

      <ProductContainer>
        <ProductImage src={product.image} alt={product.title} />
        
        <ProductInfo>
          <ProductTitle>{product.title}</ProductTitle>
          <ProductCategory>{product.category}</ProductCategory>
          <ProductDescription>{product.description}</ProductDescription>
          <ProductPrice>R$ {product.price.toFixed(2)}</ProductPrice>
          
          <ButtonsContainer>
           <AddToCartButton onClick={() => handleAddToCart(product)}>
              <FaShoppingCart /> Adicionar ao Carrinho
            </AddToCartButton>
            
            <FavoriteButton onClick={() => toggleWishlist(product)}className={isInWishlist(product.id) ? 'active' : ''}>
              {isInWishlist(product.id) ? <FaStar /> : <FaRegStar />}
              {isInWishlist(product.id) ? 'Favoritado' : 'Favoritar'}
            </FavoriteButton>
          </ButtonsContainer>
        </ProductInfo>
      </ProductContainer>
      {notificationVisible && (
        <Notification $visible={notificationVisible}>
          <FaShoppingCart />
          {notificationMessage}
        </Notification>
      )}
    </Container>
  );
};

export default ProductDetails;