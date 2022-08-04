const Tinerary = require('../models/tinerary')

const tineraryController = { 

    getTineraries: async (req,res) => { 
        let tineraries 
        let error = null 
        try { 
            tineraries = await Tinerary.find()
        } catch (err) {
            error = err
            console.log(error)
        } 
        res.json({ 
            response: error ? 'ERROR' : {tineraries}, 
            success: error ? false:true, 
            error: error 
        })
    },

    addTinerary: async (req,res) => {
        const {
            tineraryName,
            imagePerson,
            namePerson,
            price,
            hashtags,
            likes,
            duration,
            activities,
            city} = req.body.data
        let tineraries
        let error = null
        try {
            tineraries = await new Tinerary ({
                tineraryName: tineraryName,
                imagePerson: imagePerson,
                namePerson: namePerson,
                price: price,
                hashtags: hashtags,
                likes: likes,
                duration: duration,
                activities: activities,
                city: city}).save()
    } catch (err) { error = err }

    res.json({
        response: error ? 'ERROR' : tineraries,
        success: error ? false : true,
        error: error
    })
},

    removeTinerary: async (req,res) => {
        const id = req.params.id
        let tineraries
        let error = null
        try {
           tineraries = await Tinerary.findOneAndDelete({_id:id}) 
        } catch (err) { error = err }

        res.json({
            response: error ? 'ERROR' : tineraries,
            success: error ? false : true,
            error: error
        })
    },
    getOneTinerary: async (req,res) => { 
        let id = req.params.id 
        let tinerary 
        let error = null 
        try { 
            tinerary = await Tinerary.findOne({ _id:id })
            tinerary.populate("comments.user", { firstName: 1})
            console.log(tinerary.comments[0])
        } catch (err) { error = err } 
        res.json({ 
            response: error ? 'ERROR' : tinerary, 
            success: error ? false:true, 
            error: error 
        })
    },

    modifyTinerary: async (req, res) => {
        const id = req.params.id
        const tineraries = req.body.data
        let tinerarydb
        let error = null
        try {
            tinerarydb = await Tinerary.findOneAndUpdate({_id: id}, tineraries, {new: true})
        } catch (err) {error = err}
        res.json({
            response: error ? 'ERROR' : tinerarydb,
            success: error ? false : true,
            error: {error: error, message: "It's not possible to modify the itinerary. Please verify the data."}
        })
    },
    
    findTinFromCity: async (req,res) => { 
        let cityId = req.params.id
        let tineraries 
        let error = null 
        try { 
            tineraries = await Tinerary.find({city:cityId}).populate("comments.userId", {firstName:1, urlImage:1})
        } catch (err) { error = err } 
        res.json({ 
            response: error ? 'ERROR' : {tineraries}, 
            success: error ? false : true, 
            error: error 
        })
    },

    likeDislike: async (req, res) => {
        const id = req.params.id
        const user = req.user.id

        await Tinerary.findOne({ _id: id })

        .then(( tinerary ) => {
            if( tinerary.likes.includes(user) ) {
                Tinerary.findOneAndUpdate({ _id: id }, { $pull:{likes:user}}, {new: true})
                .then((newtinerary) => res.json({success: true, response: newtinerary.likes}))
                .catch((error) => console.log(error))
            } else {
                Tinerary.findOneAndUpdate({ _id: id}, {$push: {likes: user}}, {new: true})
                .then((newtinerary) => res.json({success: true, response: newtinerary.likes}))
                .catch((error) => console.log(error))
            }
        })
        .catch((error) => res.json({success: false, response: error}))
    }
}
module.exports = tineraryController