import { useContext } from "react";
import { Button, Container, Name } from "./style";
import { AuthContext } from "../../contexts/AuthContext";
import imgRestart from "../../assets/restart.svg";
export function Header({ aluno, atualizarTreino }) {
  const { signOut } = useContext(AuthContext);

  function sairDoApp() {
    signOut();
  }

  return (
    <Container>
      <Name>
        <p>Olá</p>
        <span>{aluno}</span>
      </Name>
      <div>
        <Button onClick={atualizarTreino}>
          <img src={imgRestart} alt="update" width={28} />
        </Button>
        <Button onClick={sairDoApp}>
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18.4125 8.78753C18.7542 8.44582 19.3083 8.44582 19.65 8.78753L24.2437 13.3813C24.5854 13.723 24.5854 14.277 24.2437 14.6187L19.65 19.2125C19.3083 19.5542 18.7542 19.5542 18.4125 19.2125C18.0708 18.8708 18.0708 18.3167 18.4125 17.975L22.3876 14L18.4125 10.025C18.0708 9.68326 18.0708 9.12924 18.4125 8.78753Z"
              fill="#C4C4CC"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.5 14C10.5 13.5168 10.8918 13.125 11.375 13.125H23.625C24.1082 13.125 24.5 13.5168 24.5 14C24.5 14.4832 24.1082 14.875 23.625 14.875H11.375C10.8918 14.875 10.5 14.4832 10.5 14Z"
              fill="#C4C4CC"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.01256 4.01256C4.34075 3.68438 4.78587 3.5 5.25 3.5H11.375C11.8582 3.5 12.25 3.89175 12.25 4.375C12.25 4.85825 11.8582 5.25 11.375 5.25L5.25 5.25L5.25 22.75H11.375C11.8582 22.75 12.25 23.1418 12.25 23.625C12.25 24.1082 11.8582 24.5 11.375 24.5H5.25C4.78587 24.5 4.34075 24.3156 4.01256 23.9874C3.68437 23.6592 3.5 23.2141 3.5 22.75V5.25C3.5 4.78587 3.68438 4.34075 4.01256 4.01256Z"
              fill="#C4C4CC"
            />
          </svg>
        </Button>
      </div>
    </Container>
  );
}
