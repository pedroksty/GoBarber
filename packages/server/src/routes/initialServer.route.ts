import { Router } from 'express'
import { port } from 'src/app'

const initialServer = Router()

initialServer.get('/', (request, response) => {
  const { name } = request.body

  return response.json({ message: `Server running in port ${port}. ${name}` })
})

export default initialServer
