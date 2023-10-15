import express from 'express'
import cors from 'cors'
import recipeRoutes from "./routes/RecipeRoutes.js"
const app = express()
app.use(express.json())
app.use(cors())

app.use('/recipes', recipeRoutes)
app.get('/', (req, res) => {
  res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">FoodShare</h1>')
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`)
})