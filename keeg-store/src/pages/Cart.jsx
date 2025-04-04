import React from "react";
import styled from "styled-components";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  min-height: 100vh;
`;

const CartTitle = styled.h1`
  font-size: 2.5rem;
  color: #1e2022;
  margin-bottom: 2rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const EmptyCart = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;

  p {
    font-size: 1.2rem;
    color: #52616b;
    margin-bottom: 1.5rem;
  }
`;

const CartList = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const CartItem = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr auto auto auto;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem 0;
  border-bottom: 1px solid #f0f5f9;

  @media (max-width: 768px) {
    grid-template-columns: 80px 1fr;
    grid-template-areas:
      "image title"
      "image price"
      "quantity quantity"
      "remove remove";
  }
`;

const CartImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
  border-radius: 10px;

  @media (max-width: 768px) {
    grid-area: image;
    width: 80px;
    height: 80px;
  }
`;

const ItemTitle = styled(Link)`
  font-size: 1.1rem;
  color: #1e2022;
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: #52616b;
  }

  @media (max-width: 768px) {
    grid-area: title;
  }
`;

const ItemPrice = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  color: #4caf50;

  @media (max-width: 768px) {
    grid-area: price;
  }
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    grid-area: quantity;
    justify-content: center;
    margin-top: 1rem;
  }
`;

const QuantityButton = styled.button`
  background: #1e2022;
  color: white;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #52616b;
  }

  &:disabled {
    background: #c9d6df;
    cursor: not-allowed;
  }
`;

const QuantityInput = styled.input`
  width: 50px;
  text-align: center;
  padding: 0.3rem;
  border: 1px solid #c9d6df;
  border-radius: 5px;
  font-size: 1rem;
`;

const RemoveButton = styled.button`
  background: #000000;
  color: white;
  border: none;
  padding: 0.6rem 0.6rem;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #ff4444;
  }

  @media (max-width: 768px) {
    grid-area: remove;
    justify-content: center;
    margin-top: 1rem;
  }
`;

const Summary = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;

  div {
    display: flex;
    gap: 1rem;
    width: 100%;
    justify-content: flex-end;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
    }
  }
`;

const TotalPrice = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #1e2022;
  margin-bottom: 1.5rem;

  span {
    color: #4caf50;
  }
`;

const CheckoutButton = styled(Link)`
  background: #3aca5a;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  text-decoration: none;
  font-size: 1rem;
  font-weight: bold;
  display: inline-block;
  transition: background 0.3s;
  margin-top: 1rem;

  &:hover {
    background: #078021;
    text-decoration: none;
    color: white;
  }
`;

const ContinueShopping = styled(Link)`
  background: #1e2022;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  text-decoration: none;
  font-size: 1rem;
  font-weight: bold;
  display: inline-block;
  transition: background 0.3s;
  margin-top: 1rem;

  &:hover {
    background: #52616b;
    text-decoration: none;
    color: white;
  }
`;

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const totalPrice = cart
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(id, newQuantity);
    }
  };

  return (
    <Container>
      <CartTitle>Seu Carrinho</CartTitle>

      {cart.length === 0 ? (
        <EmptyCart>
          <p>Seu carrinho está vazio</p>
          <ContinueShopping to="/products">Continue comprando</ContinueShopping>
        </EmptyCart>
      ) : (
        <>
          <CartList>
            {cart.map((item) => (
              <CartItem key={item.id}>
                <CartImage src={item.image} alt={item.title} />
                <ItemTitle to={`/products/${item.id}`}>{item.title}</ItemTitle>
                <ItemPrice>
                  R$ {(item.price * item.quantity).toFixed(2)}
                </ItemPrice>

                <QuantityControl>
                  <QuantityButton
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                  >
                    <FaMinus />
                  </QuantityButton>
                  <QuantityInput
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) =>
                      handleQuantityChange(item.id, parseInt(e.target.value))
                    }
                  />
                  <QuantityButton
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                  >
                    <FaPlus />
                  </QuantityButton>
                </QuantityControl>

                <RemoveButton onClick={() => removeFromCart(item.id)}>
                  <FaTrash />
                </RemoveButton>
              </CartItem>
            ))}
          </CartList>

          <Summary>
            <TotalPrice>
              Total: <span>R$ {totalPrice}</span>
            </TotalPrice>
            <div>
              <ContinueShopping to="/products">
                Continue comprando
              </ContinueShopping>
              <CheckoutButton to="/checkout">Finalizar Compra</CheckoutButton>
            </div>
          </Summary>
        </>
      )}
    </Container>
  );
};

export default Cart;
