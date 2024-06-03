const yup = require('yup')

const schema = yup.object().shape({
    id: yup
        .required('campo obrigatório'),
    nome: yup
        .string('campo precisa ser um texto')
        .required('campo obrigatório'),
    livro: yup
        .required('campo obrigatório'),
    cpf: yup
        .required('campo obrigatório'),
    telefone: yup
        .number('campo precisa ser um numero')
})

function autorValidador(req, res, next) {
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
    autorValidador
}