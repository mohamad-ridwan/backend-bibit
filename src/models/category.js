const mongoose = require('mongoose')

const Schema = mongoose.Schema

const category = new Schema({
    id: {
        type: String
    },
    data: {
        type: Array
    },
    title: {
        type: String
    },
    date: {
        type: String
    },
    image: {
        type: String
    },
    kontenUtama: {
        type: String
    },
    kontenDetail: {
        type: String
    },
    category: {
        type: String
    },
    path: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('category', category)