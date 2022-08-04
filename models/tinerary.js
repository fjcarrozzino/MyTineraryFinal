const mongoose = require('mongoose') //llamamos al constructor que crea un modelo de pedido de datos

const tinerarySchema = new mongoose.Schema({ //construimos el modelo de tabla
    tineraryName:{type:String, required:true},
    imagePerson:{type:String, required:true},
    namePerson:{type:String, required:true},
    price:{type:Number, required:true},
    hashtags:{type:String, required:true},
    likes:{type:Array},
    duration:{type:Number, required:true},
    activities:{type:Array, required:true},
    author:{type:mongoose.Types.ObjectId, ref:'user'},
    comments:[{
        date:{type: Date},
        comment: {type: String},
        userId: {type: mongoose.Types.ObjectId, ref:'user'}
    }],
    city: {type: mongoose.Types.ObjectId, ref:'cities'}
})
const Tinerary = mongoose.model('tineraries', tinerarySchema) //defino el constructor del modelo con el nombre de coleccion y el nombre de la tabla del modelo
module.exports = Tinerary //exportamos el modelo

//ahora establecemos el controlador del modelo