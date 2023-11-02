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

console.log('DB_USER:', process.env.DB_USERNAME);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);

const port = +process.env.PORT
app.listen(port, () => console.log(`App listening on port:${port}!`))