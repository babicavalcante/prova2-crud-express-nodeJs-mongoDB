const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true
        },
        nome: {
            type: String,
            required: true
        },
        numeroPagina: {
            type: Number,
            required: true
        },
        autor: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'autor',
            required: false
        },
        editora: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'editora',
            required: false
        },
        
    },
    {
        timestamps: true
    }
)

const Livro = mongoose.model('livro', schema)

module.exports = Livro