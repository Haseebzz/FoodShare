import express from 'express'
import cors from 'cors'
const app = express()
app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
  res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">ON THE FLY</h1>')
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`)
})