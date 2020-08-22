import React, { useRef, useCallback, useState } from 'react'
import { FiLogIn, FiMail } from 'react-icons/fi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'

import { useToast } from '../../hooks/toast'

import getValidationErrors from '../../utils/getValidationErros'

import { Container, Content, Background, AnimationContainer } from './styles'

import logo from '../../assets/logo.svg'

import Input from '../../components/Input'
import Button from '../../components/Button'
import api from '../../services/api'

interface ForgotPasswordFormData {
  email: string
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false)

  const formRef = useRef<FormHandles>(null)

  const { addToast } = useToast()
  // const history = useHistory()

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        setLoading(true)

        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um E-mail válido')
        })

        await schema.validate(data, {
          abortEarly: false
        })

        await api.post('/password/forgot', {
          email: data.email
        })

        addToast({
          type: 'success',
          title: 'E-mail de recuperação enviado',
          description:
            'Enviamos um E-mail para confirmar a recuperação de senha, cheque sua caixa de entrada'
        })

        // history.push('/dashboard')
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)

          return
        }
        addToast({
          type: 'error',
          title: 'Erro na recuperação de senha',
          description: 'Cheque se token está correto'
        })
      } finally {
        setLoading(false)
      }
    },
    [addToast]
  )
  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logo} alt="GoBarbe" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuperar senha</h1>

            <Input icon={FiMail} name="email" placeholder="E-mail" />

            <Button loading={loading} type="submit">
              Recuperar
            </Button>
          </Form>

          <Link to="/">
            <FiLogIn />
            Voltar ao login
          </Link>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  )
}

export default ForgotPassword
