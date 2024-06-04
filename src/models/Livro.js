const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: true
        },
        numeroPagina: {
            type: Number,
            required: true
        },
        autor: {
            type: String,
            required: false
        },
        editora: {
            type: String,
            required: false
        },
        
    },
    {
        timestamps: true
    }
)

const Livro = mongoose.model('livro', schema)

module.exports = Livro