import React from "react";
import styled from "styled-components";

const Foot = styled.footer`
  background: #1E2022;
  color: #F0F5F9;
  text-align: center;
  padding: 1rem;
  margin-top: 2rem;
`;

const Footer = () => {
  return <Foot>&copy; 2025 Keeg Store. Todos os direitos reservados.</Foot>;
};

export default Footer;