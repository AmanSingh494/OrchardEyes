import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import twilio from 'twilio'
import userRoutes from './src/routes/user.js'
dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors({ origin: 'http://localhost:5173' }))

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN

const client = twilio(accountSid, authToken)

async function createMessage() {
  const message = await client.messages.create({
    body: 'Hello there!',
    from: 'whatsapp:+14155238886',
    to: 'whatsapp:+919717599515'
  })

  console.log(message.body)
}
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.post('/sendMsg', (req, res) => {
  try {
    createMessage()
    res.status(200).send('Message sent successfully')
  } catch (error) {
    res.status(500).send('Internal server error')
  }
})
app.use('/user', userRoutes)
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
