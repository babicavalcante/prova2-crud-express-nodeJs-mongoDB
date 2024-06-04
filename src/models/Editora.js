const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: true
        },
        cnpj: {
            type: String,
            required: true
        },
        autor: {
            type: String,
            required: false
        },
        livro: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
)

const Editora = mongoose.model('editora', schema)

module.exports = Editora