import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { FaCreditCard, FaTruck, FaCheckCircle } from "react-icons/fa";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const CheckoutTitle = styled.h1`
  font-size: 2.5rem;
  color: #1e2022;
  margin-bottom: 2rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CheckoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const FormContainer = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const SummaryContainer = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #1e2022;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #52616b;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.8rem 1rem;
  border: 1px solid #c9d6df;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #1e2022;
  }
`;

const Select = styled.select`
  padding: 0.8rem 1rem;
  border: 1px solid #c9d6df;
  border-radius: 8px;
  font-size: 1rem;
  background-color: white;
  cursor: pointer;
`;

const PaymentMethod = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PaymentOption = styled.label`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem;
  border: 1px solid #c9d6df;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border-color: #1e2022;
  }

  input[type="radio"]:checked + & {
    border-color: #4caf50;
    background-color: #f0f5f9;
  }
`;

const RadioInput = styled.input`
  display: none;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #f0f5f9;
  flex-wrap: wrap;
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ItemImage = styled.img`
  width: 50px;
  height: 50px;
  
  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
  }
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemTitle = styled.span`
  font-weight: 500;
  color: #1e2022;
`;

const ItemPrice = styled.span`
  color: #4caf50;
  font-weight: bold;
`;

const TotalPrice = styled.div`
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 2px solid #1e2022;
  display: flex;
  justify-content: space-between;
  font-size: 1.3rem;
  font-weight: bold;
`;

const PriceValue = styled.span`
  color: #4caf50;
`;

const SubmitButton = styled.button`
  background: #4caf50;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background 0.3s;

  &:hover {
    background: #3e8e41;
  }

  &:disabled {
    background: #c9d6df;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 0.7rem;
    font-size: 0.9rem;
  }
`;

const SuccessMessage = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1rem;
    
    h2 {
      font-size: 1.5rem;
    }
    
    p {
      font-size: 0.9rem;
    }
  }
`;

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    paymentMethod: "credit",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      clearCart();
      setIsSuccess(true);
      setIsProcessing(false);
    }, 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const totalPrice = cart
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  if (isSuccess) {
    return (
      <Container>
        <SuccessMessage>
          <FaCheckCircle
            size={60}
            color="#4CAF50"
            style={{ marginBottom: "1rem" }}
          />
          <h2>Pedido realizado com sucesso!</h2>
          <p>Obrigado por comprar conosco.</p>
          <p>Seu pedido está sendo processado.</p>
          <p>Você será redirecionado para a página inicial.</p>
        </SuccessMessage>
      </Container>
    );
  }

  return (
    <Container>
      <CheckoutTitle>Finalizar Compra</CheckoutTitle>

      {cart.length === 0 ? (
        <SuccessMessage>
          <h2>Seu carrinho está vazio</h2>
          <p>Não há itens para finalizar a compra.</p>
        </SuccessMessage>
      ) : (
        <CheckoutGrid>
          <FormContainer>
            <SectionTitle>
              <FaTruck /> Informações de Entrega
            </SectionTitle>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Nome Completo</Label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Endereço</Label>
                <Input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "1rem",
                }}
              >
                <FormGroup>
                  <Label>Cidade</Label>
                  <Input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Estado</Label>
                  <Input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label>CEP</Label>
                  <Input
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </div>

              <SectionTitle>
                <FaCreditCard /> Método de Pagamento
              </SectionTitle>

              <PaymentMethod>
                <RadioInput
                  type="radio"
                  id="credit"
                  name="paymentMethod"
                  value="credit"
                  checked={formData.paymentMethod === "credit"}
                  onChange={handleChange}
                />
                <PaymentOption htmlFor="credit">
                  Cartão de Crédito
                </PaymentOption>

                <RadioInput
                  type="radio"
                  id="debit"
                  name="paymentMethod"
                  value="debit"
                  checked={formData.paymentMethod === "debit"}
                  onChange={handleChange}
                />
                <PaymentOption htmlFor="debit">Cartão de Débito</PaymentOption>

                <RadioInput
                  type="radio"
                  id="pix"
                  name="paymentMethod"
                  value="pix"
                  checked={formData.paymentMethod === "pix"}
                  onChange={handleChange}
                />
                <PaymentOption htmlFor="pix">PIX</PaymentOption>
              </PaymentMethod>

              <SubmitButton type="submit" disabled={isProcessing}>
                {isProcessing ? "Processando..." : "Confirmar Pedido"}
              </SubmitButton>
            </Form>
          </FormContainer>

          <SummaryContainer>
            <SectionTitle>Resumo do Pedido</SectionTitle>

            {cart.map((item) => (
              <CartItem key={item.id}>
                <ItemInfo>
                  <ItemImage src={item.image} alt={item.title} />
                  <ItemDetails>
                    <ItemTitle>{item.title}</ItemTitle>
                    <div>
                      {item.quantity} × R$ {item.price.toFixed(2)}
                    </div>
                  </ItemDetails>
                </ItemInfo>
                <ItemPrice>
                  R$ {(item.price * item.quantity).toFixed(2)}
                </ItemPrice>
              </CartItem>
            ))}

            <TotalPrice>
              <span>Total:</span>
              <PriceValue>R$ {totalPrice}</PriceValue>
            </TotalPrice>
          </SummaryContainer>
        </CheckoutGrid>
      )}
    </Container>
  );
};

export default Checkout;
