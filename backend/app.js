import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import routes from './routes/index.js'
import cors from 'cors'

const app = express()

app.use(express.json())

app.use(
    cors({
        origin: "*", // Explicitly specify the allowed origin
        credentials: true, // Important for cookies, authorization headers with HTTPS
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: [
            "Origin",
            "Content-Type",
            "Accept",
            "Authorization",
            "X-Request-With",
        ],
    })
);

app.use('/api', routes)

const PORT = process.env.PORT || 5555

if (!process.env.DB_URI) {
    console.log("Sem URI de conexão ao MongoDB Atlas no .env")
}

mongoose.connect(process.env.DB_URI)
    .then(() => {
        console.log("Conectado ao MongoDB Atlas com sucesso")
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(`Não foi possivel conectar ao banco de dados: ${error}`)
    })
