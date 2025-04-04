import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaStar, FaHeart, FaShoppingCart, FaHome, FaBoxOpen, FaBars, FaTimes, FaTruck, FaSmile } from "react-icons/fa";
import logoImage from "../assets/logo.png";

const breakpoints = {
  mobile: "768px",
  tablet: "992px"
};

const TopBar = styled.div`
  background: #000000;
  color: #FFFFFF;
  padding: 0.5rem 2rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 0.8rem;
  text-align: center;

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    gap: 0.3rem;
    padding: 0.5rem;
    font-size: 0.7rem;
  }
`;

const TopBarItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: ${breakpoints.mobile}) {
    gap: 0.3rem;
  }
`;

const NavWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Nav = styled.nav`
  background: #1E2022;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #F0F5F9;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  z-index: 1001;
`;

const LogoImage = styled.img`
  height: 40px;
  width: auto;
  
  @media (min-width: ${breakpoints.tablet}) {
    height: 50px;
  }
`;

const MobileMenuButton = styled.button`
  background: transparent;
  border: none;
  color: #F0F5F9;
  font-size: 1.5rem;
  cursor: pointer;
  display: none;
  z-index: 1001;
  
  @media (max-width: ${breakpoints.mobile}) {
    display: block;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: ${breakpoints.mobile}) {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 70%;
    background: #1E2022;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transform: ${({ $isOpen }) => $isOpen ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform 0.3s ease-in-out;
    z-index: 1000;
    padding-top: 80px;
  }
`;

const StyledLink = styled(Link)`
  color: #F0F5F9;
  text-decoration: none;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.3s;
  padding: 0.5rem 1rem;

  &:hover {
    color: #C9D6DF;
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.2rem;
    padding: 1rem;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: ${({ $isOpen }) => $isOpen ? '1' : '0'};
  visibility: ${({ $isOpen }) => $isOpen ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease-in-out;
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <NavWrapper>
      <TopBar>
        <TopBarItem>
          <FaTruck /> Frete grátis para todo Brasil
        </TopBarItem>
        <TopBarItem>
          <FaHeart /> Descontos de até 50% OFF
        </TopBarItem>
        <TopBarItem>
          <FaSmile /> Satisfação garantida
        </TopBarItem>
      </TopBar>

      <Nav>
        <Logo to="/" onClick={closeMenu}>
          <LogoImage src={logoImage} alt="Keeg Store Logo" />
        </Logo>
        
        <MobileMenuButton onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </MobileMenuButton>
        
        <NavLinks $isOpen={isOpen}>
          <StyledLink to="/" onClick={closeMenu}>
            <FaHome /> Home
          </StyledLink>
          <StyledLink to="/products" onClick={closeMenu}>
            <FaBoxOpen /> Produtos
          </StyledLink>
          <StyledLink to="/wishlist" onClick={closeMenu}>
            <FaStar /> Wishlist
          </StyledLink>
          <StyledLink to="/cart" onClick={closeMenu}>
            <FaShoppingCart /> Carrinho
          </StyledLink>
        </NavLinks>
      </Nav>
      
      <Overlay $isOpen={isOpen} onClick={closeMenu} />
    </NavWrapper>
  );
};

export default Navbar;