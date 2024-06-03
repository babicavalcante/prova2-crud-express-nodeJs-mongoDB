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
        cnpj: {
            type: String,
            required: true
        },
        autor: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'funcionario',
            required: false
        },
        livro: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'projeto',
            required: false
        }
    },
    {
        timestamps: true
    }
)

const Editora = mongoose.model('editora', schema)

module.exports = Editora