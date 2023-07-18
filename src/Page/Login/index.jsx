import React, { useState, useContext } from 'react'
import { ButtonContainer, Container, Content, FormLogin } from './style'
import Logo from '../../assets/Logo.png'

//import { AuthContext } from '../../contexts/AuthContext'
//import { toast } from 'react-toastify'

export function Login() {
 // const { signIn } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (email === '' || password === '') {
      //toast.warning('Preencha todos os campos')
      return
    }

    // signIn(email, password)
    
  }

  return (
    <Container>
      <Content>
        <img src={Logo} alt="Logo Academia" width={370}/>
        <FormLogin>
          <span>Acesse sua conta</span>
          <input
            type="text"
            placeholder="Título"
            onChange={handleEmailChange}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={handlePasswordChange}
          />
          <ButtonContainer onClick={handleLogin}>Acessar</ButtonContainer>
        </FormLogin>
      </Content>
    </Container>
  )
}
