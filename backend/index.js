import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"


dotenv.config()
const app = express()


const mongoUrl = process.env.MONGODB_URL
mongoose.connect(mongoUrl).then(() =>{
    console.log('Database is connected')
}).catch((error) => console.log(error))

const PORT = 7000

app.listen(PORT, () => {
    console.log(`The server is running! on ${PORT}`)
});





