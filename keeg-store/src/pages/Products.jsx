import React, { useEffect, useState } from "react";
import { useWishlist } from "../context/WishListContext";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaRegStar, FaStar } from "react-icons/fa";
import { useCart } from "../context/CartContext";

const responsive = {
  mobile: '768px',
};

const Container = styled.div`
  text-align: center;
  padding: 2rem 1rem;
  min-height: 100vh;
  overflow-x: hidden;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #1E2022;

  @media (min-width: ${responsive.mobile}) {
    font-size: 2.5rem;
  }
`;

const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;

  label {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-weight: bold;
    color: #1E2022;
    gap: 0.5rem;
  }

  select {
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 1px solid #C9D6DF;
    background: white;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      border-color: #58626e;
    }
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;

  @media (max-width: ${responsive.mobile}) {
    grid-template-columns: 1fr;
    padding: 0;
  }
`;

const ProductCard = styled.div`
  position: relative;
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  min-height: 380px;

  &:hover {
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-5px);
  }
`;

const ProductImage = styled.img`
  width: 160px;
  height: 160px;
  object-fit: contain;
  margin-bottom: 1rem;

  @media (max-width: ${responsive.mobile}) {
    width: 140px;
    height: 140px;
  }
`;

const ProductTitle = styled.h3`
  font-size: 1.1rem;
  color: #1e2022;
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 3em;
  line-height: 1.5em;
`;

const ProductPrice = styled.p`
  font-size: 1.3rem;
  font-weight: bold;
  color: #4caf50;
  margin-bottom: 1rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  width: 100%;
  margin-top: auto;
`;

const DetailsButton = styled(Link)`
  background: #000000;
  color: #ffffff;
  padding: 0.6rem 1rem;
  border-radius: 5px;
  text-decoration: none;
  transition: background 0.3s;
  font-size: 0.9rem;

  &:hover {
    background: #58626e;
  }
`;

const CartButton = styled.button`
  background: #000000;
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: background 0.3s;
  font-size: 0.9rem;

  &:hover {
    background: #58626e;
  }
`;

const FavoriteIconButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  border: none;
  color: ${props => props.$isFavorite ? '#FFD700' : '#C9D6DF'};
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const Notification = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #03831f;
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  opacity: ${props => (props.$visible ? "1" : "0")};
  transform: ${props => (props.$visible ? "translateY(0)" : "translateY(20px)")};
  transition: opacity 0.5s ease, transform 0.5s ease;
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 1000;
`;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const filteredProducts = products
    .filter(product => (category ? product.category === category : true))
    .sort((a, b) => {
      if (sort === "asc") return a.price - b.price;
      if (sort === "desc") return b.price - a.price;
      return 0;
    });

    const handleAddToCart = (product) => {
      addToCart(product);
      setNotificationMessage(`${product.title} adicionado ao carrinho!`);
      setNotificationVisible(true);
      
      setTimeout(() => {
        setNotificationVisible(false);
      }, 3000);
    };;

  return (
    <Container>
      <PageTitle>Todos os Produtos</PageTitle>
      
      <Filters>
        <label>
          Filtrar por categoria:
          <select onChange={(e) => setCategory(e.target.value)}>
            <option value="">Todas as categorias</option>
            <option value="men's clothing">Roupas Masculinas</option>
            <option value="women's clothing">Roupas Femininas</option>
            <option value="jewelery">Joias</option>
            <option value="electronics">Eletrônicos</option>
          </select>
        </label>
        
        <label>
          Ordenar por preço:
          <select onChange={(e) => setSort(e.target.value)}>
            <option value="">Padrão</option>
            <option value="asc">Menor preço</option>
            <option value="desc">Maior preço</option>
          </select>
        </label>
      </Filters>
      
      <ProductGrid>
        {filteredProducts.map(product => (
          <ProductCard key={product.id}>
            <FavoriteIconButton onClick={() => toggleWishlist(product)} $isFavorite={isInWishlist(product.id)}>
              {isInWishlist(product.id) ? <FaStar /> : <FaRegStar />}
            </FavoriteIconButton>
            <ProductImage src={product.image} alt={product.title} />
            <ProductTitle>{product.title}</ProductTitle>
            <ProductPrice>R$ {product.price.toFixed(2)}</ProductPrice>
            
            <ButtonsContainer>
              <DetailsButton to={`/products/${product.id}`}>
                Ver detalhes
              </DetailsButton>
              <CartButton onClick={() => handleAddToCart(product)}>
                <FaShoppingCart />
              </CartButton>
            </ButtonsContainer>
          </ProductCard>
        ))}
      </ProductGrid>
      {notificationVisible && (
        <Notification $visible={notificationVisible}>
          <FaShoppingCart />
          {notificationMessage}
        </Notification>
      )}
    </Container>
  );
};

export default Products;