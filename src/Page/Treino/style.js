import styled, { keyframes } from "styled-components";

export const ListExericio = styled.div`
  color: #fff;
  margin: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Card = styled.div`
  width: 325px;
  height: 6.1875rem;
  border-radius: 0.5rem;
  background: var(--platform-aliases-shape-secundria, #29292e);
  padding: 1rem;
  margin-top: 0.8rem;

  p {
    color: #c4c4cc;
    /* Text sm */
    font-family: Roboto;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 160%; /* 1.4rem */
  }
`;

const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  border: 4px solid #00875f;
  border-left-color: #333;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
  animation: ${spinAnimation} 1s linear infinite; /* Apply the animation */

  margin: 10rem auto; /* Center the spinner */
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

  color: ${(props) => (props.selected ? "#00875f" : "#c4c4cc")};
  border: 2px solid ${(props) => (props.selected ? "#00875f" : "#202024")};

  text-align: center;
  font-family: Roboto;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 1.2rem */
  text-transform: uppercase;
`;
