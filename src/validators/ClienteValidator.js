const yup = require('yup')

const schema = yup.object().shape({
    id: yup
        .number('Preencha somente com números')
        .required('campo obrigatório'),
    nome: yup
        .string('campo precisa ser um texto')
        .required('campo obrigatório'),
    cpf: yup
        .string('campo precisa ser um texto')
        .required('campo obrigatório'),
    telefone: yup
        .number('Preencha somente com números')
        .required('campo obrigatório'),
    endereco: yup
        .string('campo precisa ser um texto')
        .required('campo obrigatório')
})

function clienteValidador(req, res, next) {
    schema
        .validate(req.body, { abortEarly: false })
        .then(() => next())
        .catch(err => {
            const errors = err.inner.map(e => {
                const erro = {
                    campo: e.path,
                    erros: e.errors
                }
                return erro
            })
            res.status(400).json(
                {
                    mensagem: "Falha na validação dos campos",
                    erros: errors
                }
            )
        })
}

module.exports = {
    clienteValidador
}