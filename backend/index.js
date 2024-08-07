import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import AccountRouter from "./src/routes/usersRoutes.js"



dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('uploads'))



const mongoUrl = process.env.MONGODB_URL
mongoose.connect(mongoUrl).then(() =>{
    console.log('Database is connected')
}).catch((error) => console.log(error))

const PORT = process.env.PORT || 8080

app.use(AccountRouter)



app.listen(PORT, () => {
    console.log(`The server is running! on ${PORT}`)
});





