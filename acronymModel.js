const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AcronymSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    data: {
        type: Array,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Acronym', AcronymSchema);