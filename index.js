import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
const app = express()
dotenv.config();


import initApp from './src/index.routes.js'
//cors 


app.use(cors())
// setup port and the baseUrl
initApp(app, express)



const port = +process.env.PORT
app.listen(port, () => console.log(`App listening on port:${port}!`))