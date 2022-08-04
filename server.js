require('dotenv').config() //requiero dotenv que es una librería que configura nuestra app con las variables de entorno definidas en el archivo .env
require('./config/database') //requiero la conexion a la base de datos
const Router = require('./routes/routes')
const express = require('express') //requiero el módulo de express
const app = express() //ejecuto express para crear una app
const PORT = 4000 //defino el puerto con la variable de estado "o" un numero
const cors = require('cors') //requiero el modulo de cors
const passport = require("passport")

//creo un archivo .env y defino una variable de entorno con el puerto
//por cuestions de seguridad el archivo .env debe ser ignorado (incluirlo en .gitignore)

//middlewares
app.use(cors())
app.use(express.json())
app.use('/api', Router)
app.use(passport.initialize())



app.get('/', (req, res) => { //.get lee el endpoint
    res.send('SERVER IS ON!') // y en este caso con .send enviamos información desde el back hacia la vista (front)
})


app.listen(process.env.PORT, () => { //.listen escucha el puerto y lo levanta
    console.log('SERVIDOR CORRIENDO EN PUERTO: ' + process.env.PORT) //muestra por consola este texto
})
