import styled from "styled-components";

export const Container = styled.div`
  background: #202024;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 85px;
`;

export const Name = styled.div`
  display: flex;
  flex-direction: column;
  color: #e1e1e6;
  font-size: 16px;
  padding: 1rem;

  span {
    font-weight: bold;
  }
`;

export const Button = styled.button`
  background: transparent;
  padding: 1rem;
  border: none;
`;
