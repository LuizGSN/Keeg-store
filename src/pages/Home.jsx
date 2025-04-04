import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaRegStar, FaStar } from "react-icons/fa";
import { useWishlist } from "../context/WishListContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import bannerImage from "../assets/banner.png";

const responsive = {
  mobile: '768px',
};

const Container = styled.div`
  text-align: center;
  padding: 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  padding: 4rem;
`;

const Banner = styled.div`
  background: url(${bannerImage}) center/cover;
  color: white;
  padding: 2rem 1rem;
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);

  @media (min-width: ${responsive.mobile}) {
    padding: 6rem 2rem;
    border-radius: 0;
  }
`

const BannerTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  animation: fadeIn 1s ease-in-out;

  @media (min-width: ${responsive.mobile}) {
    font-size: 2.5rem;
  }
`;

const BannerText = styled.p`
  font-size: 1.2rem;
  margin-top: 0.5rem;
  opacity: 0.9;
`;

const BannerButton = styled(Link)`
  background: #ffffff;
  color: #000000;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  margin-top: 1rem;
  display: inline-block;
  transition: background 0.3s, transform 0.2s;

  &:hover {
    background: #000000;
    color: white;
    transform: scale(1.05);
  }
`;

const CarouselContainer = styled.div`
  width: 100%;
  max-width: 100vw;
  margin: 0 auto;
  padding: 1rem;
  box-sizing: border-box;
`;

const CustomArrow = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1;

  &:hover {
    background: rgba(0, 0, 0, 0.9);
  }

  @media (max-width: ${responsive.mobile}) {
    display: none !important;
  }
`;

const PrevArrow = (props) => (
  <CustomArrow style={{ left: "-60px" }} onClick={props.onClick}>
    ◀
  </CustomArrow>
);

const NextArrow = (props) => (
  <CustomArrow style={{ right: "-60px" }} onClick={props.onClick}>
    ▶
  </CustomArrow>
);

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
  width: 90%;
  max-width: 300px;
  margin: 0 auto;
  overflow: hidden;
  box-sizing: border-box;

  &:hover {
    transform: scale(1.01);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.274);
  }

  @media (max-width: ${responsive.mobile}) {
    padding: 1rem;
    min-height: 350px;
  }
`;

const ProductImage = styled.img`
  width: 140px;
  height: 140px;
  object-fit: contain;
  margin-bottom: 1rem;
  flex-shrink: 0;

  @media (min-width: ${responsive.mobile}) {
    width: 160px;
    height: 160px;
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
  flex-shrink: 0;
`;


const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  width: 100%;
  margin-top: auto;
  flex-shrink: 0;
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
    background:#58626e;
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

const Home = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [favorites, setFavorites] = useState([]);
  const { isInWishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=6")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setNotificationMessage(`${product.title} adicionado ao carrinho!`);
    setNotificationVisible(true);
  
    setTimeout(() => {
      setNotificationVisible(false);
      setNotificationMessage('');
    }, 3000);
  };

  const toggleFavorite = (product) => {
    const isFavorite = favorites.some(fav => fav.id === product.id);
    let updatedFavorites;
    
    if (isFavorite) {
      updatedFavorites = favorites.filter(fav => fav.id !== product.id);
    } else {
      updatedFavorites = [...favorites, product];
    }
    
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          arrows: false
        }
      }
    ]
  };

  return (
    <Container>
      <Banner>
        <BannerTitle>Bem-vindo à Keeg Store</BannerTitle>
        <BannerText>Encontre os melhores produtos com os melhores preços!</BannerText>
        <BannerButton to="/products">Ver Produtos</BannerButton>
      </Banner>
      <div style={{ flex: 1, width: '100%', padding: '2rem 0' }}>
        <h2 style={{ marginBottom: '2rem' }}>Produtos em Destaque</h2>
        <CarouselContainer>
          <Slider {...settings}>
            {products.map(product => (
              <div key={product.id} style={{ padding: '0 10px', boxSizing: 'border-box' }}>
                <ProductCard>
                  <FavoriteIconButton 
                    onClick={() => toggleWishlist(product)}
                    $isFavorite={isInWishlist(product.id)}
                  >
                    {isInWishlist(product.id) ? <FaStar /> : <FaRegStar />}
                  </FavoriteIconButton>
                  <ProductImage src={product.image} alt={product.title} />
                  <ProductTitle>{product.title}</ProductTitle>
                  <ProductPrice>R$ {product.price.toFixed(2)}</ProductPrice>
                  <ButtonsContainer>
                    <DetailsButton to={`/products/${product.id}`}>Ver detalhes</DetailsButton>
                    <CartButton onClick={() => handleAddToCart(product)}>
                      <FaShoppingCart />
                    </CartButton>
                  </ButtonsContainer>
                </ProductCard>
              </div>
            ))}
          </Slider>
        </CarouselContainer>
      </div>
      {notificationVisible && (
        <Notification $visible={notificationVisible}>
          <FaShoppingCart />
          {notificationMessage}
        </Notification>
      )}
    </Container>
  );
};

export default Home;
