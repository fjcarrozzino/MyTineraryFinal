const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName:{type: String, required: true},
    lastName:{type: String, required: true},
    email:{type: String, required: true},
    password:[{type: String, required: true}],
    from:{type: Array},
    urlImage: {type: String, required: true},
    uniqueString:{type: String, required: true},
    emailVerification:{type: Boolean, required:true},
    isConnected:{type:Boolean},
    lastConnection:{type:Date},
    country: {type: String, required: true}
})

const User = mongoose.model('user', userSchema)
module.exports = User