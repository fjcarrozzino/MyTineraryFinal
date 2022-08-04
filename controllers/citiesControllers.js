const City = require('../models/cities')

const citiesControllers = {
    getCities: async (req, res) => {
        let cities //defino la variable que va a alojar todos los modelos
        let error = null
        try {
            cities = await City.find() //el metodo find encuentra todas las ciudades
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : { cities },
            success: error ? false : true,
            error: error
        })
    },
    getOneCity: async (req, res) => {
        const id = req.params.id
        let city
        let error = null
        try {
            city = await City.findOne({ _id: id }) //el metodo find con un objeto pasado como parámetro encuentra algo que concida con esa propiedad
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : city,
            success: error ? false : true,
            error: error
        })
    },
    addCity: async (req, res) => { //funcion asincrona que creará un trabajo
        const { name, country, description, image } = req.body.data //desestructuro req.body para utilizar esos datos para crear un nuevo modelo
        let city //defino la variable que va a contener la nueva ciudad
        let error = null //defino el error, que en primer instancia va a ser nulo
        try { //intento utilizar el constructor de modelos
            city = await new City({ //espero esa creación
                name: name,
                country: country,
                description: description,
                image: image
            }).save() //muy importante => guardar el modelo creado
        } catch (err) { error = err } //si no puede crear el modelo, defino el error
        res.json({ 
            response: error ? 'ERROR' : city,  //defino la respuesta como un json con las siguientes propiedades (puedo definir la cantidad de propiedades y el contenido que quiera!)
            success: error ? false : true,
            error: error
        })
    },
    addMultipleCity: async (req, res) => {
        const data = req.body.data
       
        let error = null
        
        try {
             data.map(async(item)=>{
             await new City({
                name: item.name,
                country: item.country,
                description: item.description,
                image: item.image
            }).save()
            
            }) 
        } catch (err) { error = err }
        
        res.json({
            response: error ? 'ERROR' : city,
            success: error ? false : true,
            error: error
        })
    },
    modifyCity: async (req, res) => {
        const id = req.params.id
        const city = req.body.data
        let citydb
        let error = null
        try {
            citydb = await City.findOneAndUpdate({ _id: id }, city,{ new: true }) //el metodo findOneAndUpdate requiere tres parámetros
            //el parametro necesario para el modelo que tiene que encontrar
            //la modificacion que vamos a pasar en body
            //y esta opcion en true que "cambia" el modelo viejo por el actualizado (en caso de false: crea un modelo nuevo con la modificación)
            
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : citydb, //no quiero mostrar el objeto eliminado en el JSON de respuesta
            success: error ? false : true,
            error: {error:error, message:"no es posible modificar la ciudad, verifica los datos enviados"}
        })

    },
    removeCity: async (req,res) => { 
        const id = req.params.id
        let city
        let error = null
        try {
            city = await City.findOneAndDelete({_id: id }) //el metodo findOneAndDelete encuentra y elimina
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : city, //no quiero mostrar el objeto eliminado en el JSON de respuesta
            success: error ? false : true,
            error: error
        })
    }
}
module.exports = citiesControllers //exporto el modulo para utilizarlo en la configuracion de las rutas