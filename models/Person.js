const mongoose = require('mongoose')



const personSchema = new mongoose.Schema({
    name: {
        required: true,
        unique: true,
        type: String
    },
    guesses: {
        required: true,
        type: String
    }

})



module.exports = mongoose.model('Person', personSchema)