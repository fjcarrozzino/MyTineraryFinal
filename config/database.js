const mongoose = require('mongoose')
//mongoose es una libreria que me proporciona un monton de funciones para conectar mi servidor/app a la base de datos de MONGO
mongoose.connect(process.env.MONGO,{ //utilizo el método connect de mongoose que requiere dos parámetros(la url de conexion y un objeto con dos propiedades)
    useUnifiedTopology: true, //Set to true to opt in to using the MongoDB driver's new connection management engine. You should set this option to true, except for the unlikely case that it prevents you from maintaining a stable connection.
    useNewUrlParser: true, //allow users to fall back to the old parser if they find a bug in the new parser.
})
.then(() => console.log('Database connected')) //si se logra conectar, me avisa por consola
.catch(err => console.error(err)) //si no se conecta, me informa el error

//una vez configurada la conexión, la tengo que requerir antes de que se inicie la app
//luego configuro los modelos