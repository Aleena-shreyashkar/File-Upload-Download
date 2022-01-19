const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
    fileURL:{
        type: String,
        required: true
    },
    uploaded_at:{
        time : { type : Date, default: Date.now }
    }
})

module.exports = fileSchema;