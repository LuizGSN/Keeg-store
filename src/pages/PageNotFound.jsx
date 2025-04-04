import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaHome, FaSearch } from 'react-icons/fa';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  text-align: center;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #1E2022;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #52616B;
  margin-bottom: 2rem;
  max-width: 600px;
`;

const NotFoundImage = styled.div`
  width: 200px;
  height: 200px;
  background: #1E2022;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  color: white;
  font-size: 4rem;
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

const HomeButton = styled(Link)`
  background: #1E2022;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s;

  &:hover {
    background: #52616B;
    transform: translateY(-2px);
  }
`;

const ProductsButton = styled(Link)`
  background: #4CAF50;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s;

  &:hover {
    background: #3e8e41;
    transform: translateY(-2px);
  }
`;

const PageNotFound = () => {
  return (
    <Container>
      <NotFoundImage>404</NotFoundImage>
      <Title>Página Não Encontrada</Title>
      <Subtitle>
        Ops! A página que você está procurando não existe ou foi movida.
        Volte para a nossa página inicial ou explore nossos produtos.
      </Subtitle>
      
      <ButtonContainer>
        <HomeButton to="/">
          <FaHome /> Voltar para Home
        </HomeButton>
        <ProductsButton to="/products">
          <FaSearch /> Ver Produtos
        </ProductsButton>
      </ButtonContainer>
    </Container>
  );
};

export default PageNotFound;