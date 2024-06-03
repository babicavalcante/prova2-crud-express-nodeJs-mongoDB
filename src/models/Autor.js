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
        livro: {
            type: String,
            required: true
        },
        cpf: {
            type: String,
            required: false
        },
        telefone: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Autor = mongoose.model('autor', schema)

module.exports = Autor