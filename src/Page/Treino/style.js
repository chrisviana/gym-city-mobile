import styled from "styled-components";

export const ListExericio = styled.div`
  color: #fff;
`;

export const ContentButton = styled.div`
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  max-width: 325px;
  justify-content: start;
  margin: 2rem;
  gap: 1rem;
`;
export const Button = styled.button`
  width: 6rem;
  padding: 0.75rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.25rem;
  background: var(--platform-aliases-shape-principal, #202024);
  border: none;

  color: var(--platform-aliases-texto-base, #c4c4cc);
  text-align: center;
  font-family: Roboto;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 1.2rem */
  text-transform: uppercase;
`;
