const mongoose = require('mongoose') //llamamos al constructor que crea un modelo de pedido de datos

const citySchema = new mongoose.Schema({ //construimos el modelo de tabla
    name:{type:String, required:true},
    country:{type:String, required:true},
    description:{type:String, required:true},
    image:{type:String, required:true}
})
const City = mongoose.model('cities', citySchema) //defino el constructor del modelo con el nombre de coleccion y el nombre de la tabla del modelo
module.exports = City //exportamos el modelo

//ahora establecemos el controlador del modelo