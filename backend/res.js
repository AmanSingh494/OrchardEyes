import { Client } from '@gradio/client'

const client = await Client.connect('4darsh-Dev/orchard_eyes-chatbot')
const result = await client.predict('/chat', {
  message: 'What are the different disease types in apple trees!!'
})

console.log(result.data)
