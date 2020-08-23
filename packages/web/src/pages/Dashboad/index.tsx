import React, { useState, useCallback, useEffect, useMemo } from 'react'
import DayPicker, { DayModifiers } from 'react-day-picker'
import 'react-day-picker/lib/style.css'

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Section,
  Appointment,
  Calendar
} from './styles'

import logoImg from '../../assets/logo.svg'
import { FiPower, FiClock } from 'react-icons/fi'
import { useAuth } from '../../hooks/auth'
import api from '../../services/api'

interface MonthAvailabilityItem {
  day: number
  available: boolean
}

const Dashboad: React.FC = () => {
  const { user, signOut } = useAuth()

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([])

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) {
      setSelectedDate(day)
    }
  }, [])

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month)
  }, [])

  useEffect(() => {
    api
      .get(`/providers/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1
        }
      })
      .then(response => {
        setMonthAvailability(response.data)
      })
  }, [currentMonth, user.id])

  const disableDays = useMemo(() => {
    const dates = monthAvailability
      .filter(monthDay => monthDay.available === false)
      .map(monthDay => {
        const year = currentMonth.getFullYear()
        const month = currentMonth.getMonth()

        return new Date(year, month, monthDay.day)
      })

    return dates
  }, [currentMonth, monthAvailability])

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

          <Section>
            <strong>Manhã</strong>

            <Appointment>
              <span>
                <FiClock />
                10:00
              </span>

              <div>
                <img
                  src="https://avatars1.githubusercontent.com/u/40571556?s=400&u=4e470b535fe9442fc6737bec46d5bcff69d57964&v=4"
                  alt="Brenda Calado"
                />
                <strong>Brenda Calado</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock />
                10:00
              </span>

              <div>
                <img
                  src="https://avatars1.githubusercontent.com/u/40571556?s=400&u=4e470b535fe9442fc6737bec46d5bcff69d57964&v=4"
                  alt="Brenda Calado"
                />
                <strong>Brenda Calado</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock />
                10:00
              </span>

              <div>
                <img
                  src="https://avatars1.githubusercontent.com/u/40571556?s=400&u=4e470b535fe9442fc6737bec46d5bcff69d57964&v=4"
                  alt="Brenda Calado"
                />
                <strong>Brenda Calado</strong>
              </div>
            </Appointment>
          </Section>

          <Section>
            <strong>Tarde</strong>

            <Appointment>
              <span>
                <FiClock />
                10:00
              </span>

              <div>
                <img
                  src="https://avatars1.githubusercontent.com/u/40571556?s=400&u=4e470b535fe9442fc6737bec46d5bcff69d57964&v=4"
                  alt="Brenda Calado"
                />
                <strong>Brenda Calado</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>

        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disableDays]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] }
            }}
            onMonthChange={handleMonthChange}
            selectedDays={selectedDate}
            onDayClick={handleDateChange}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro'
            ]}
          />
        </Calendar>
      </Content>
    </Container>
  )
}

export default Dashboad
