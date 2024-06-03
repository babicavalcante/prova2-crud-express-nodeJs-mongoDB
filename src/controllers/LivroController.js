const Livro = require('../models/Livro')

async function create(req, res) {
    const livro = new Livro(req.body)
    const livroCriado = await livro.save()
    res.status(201).json(livroCriado)
}

async function getAll(req, res) {
    res.json(await Livro.find())
}

async function getById(req, res) {
    const livro = await Livro.findById(req.params.id)
    if (livro) {
        res.json(livro)
    } else {
        res.status(404).json({ mensagem: "Livro não encontrato!" })
    }
}

async function update(req, res) {
    const livroAtulizado = await Livro.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (livroAtulizado) {
        res.json(livroAtulizado)
    } else {
        res.status(404).json({ mensagem: "Livro não encontrato!" })
    }

}

async function remove(req, res) {
    const livroExcluido = await Livro.findByIdAndDelete(req.params.id)
    if (livroExcluido) {
        res.json({
            mensagem: "Livro excluido com sucesso!",
            livroExcluido
        })
    } else {
        res.status(404).json({ mensagem: "Livro não encontrato!" })
    }
}


module.exports = {
    create,
    getAll,
    getById,
    update,
    remove
}