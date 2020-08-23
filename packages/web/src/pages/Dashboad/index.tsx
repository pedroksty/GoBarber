import React from 'react'

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Calendar
} from './styles'

import logoImg from '../../assets/logo.svg'
import { FiPower, FiClock } from 'react-icons/fi'
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

      <Content>
        <Schedule>
          <h1>Hórarios agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda-feira</span>
          </p>

          <NextAppointment>
            <strong>Atendimento a seguir</strong>

            <div>
              <img
                src="https://avatars1.githubusercontent.com/u/40571556?s=400&u=4e470b535fe9442fc6737bec46d5bcff69d57964&v=4"
                alt="Brenda Calado"
              />
              <strong>Brenda Calado</strong>
              <span>
                <FiClock />
                09:00
              </span>
            </div>
          </NextAppointment>
        </Schedule>

        <Calendar />
      </Content>
    </Container>
  )
}

export default Dashboad
