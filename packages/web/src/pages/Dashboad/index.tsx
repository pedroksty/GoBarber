import React from 'react'

import { Container, Header, HeaderContent, Profile } from './styles'

import logoImg from '../../assets/logo.svg'
import { FiPower } from 'react-icons/fi'
import { useAuth } from '../../hooks/auth'

const Dashboad: React.FC = () => {
  const { signOut, user } = useAuth()

  console.log(user)

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="Gobarber" />

          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem Vindo</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
    </Container>
  )
}

export default Dashboad
