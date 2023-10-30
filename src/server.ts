import express from "express"
import "express-async-errors"
import router from "./routes/routes"

const app = express()

app.use(express.json())

app.use(router)

app.use((err: Error, request: express.Request, response: express.Response, next: express.NextFunction) => {
  return response.status(500).json({
    status: "error",
    message: err.message
  })
})
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000')
})