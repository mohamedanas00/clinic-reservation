import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
const app = express()
dotenv.config();


import initApp from './src/index.routes.js'
//cors 

var corsOptions = {
    origin: process.env.CORS,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
// setup port and the baseUrl
initApp(app, express)



const port = +process.env.PORT
app.listen(port, () => console.log(`App listening on port:${port}!`))