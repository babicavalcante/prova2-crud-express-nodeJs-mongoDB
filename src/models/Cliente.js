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
        cpf: {
            type: String,
            required: false
        },
        telefone: {
            type: Number,
            required: true
        },
        endereco: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
)

const Cliente = mongoose.model('cliente', schema)

module.exports = Cliente