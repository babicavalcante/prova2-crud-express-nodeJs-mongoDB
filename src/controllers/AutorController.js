const Autor = require('../models/Autor')


async function create(req, res) {
    const autor = new Autor(req.body)
    const autorCriado = await autor.save()
    res.status(201).json(autorCriado)
}

async function getAll(req, res) {
    res.json(await Autor.find())
}

async function getById(req, res) {
    const autor = await Autor.findById(req.params.id)
    if (autor) {
        res.json(autor)
    } else {
        res.status(404).json({ mensagem: "Autor não encontrato!" })
    }
}

async function update(req, res) {
    const autorAtualizado = await Autor.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (autorAtualizado) {
        res.json(autorAtualizado)
    } else {
        res.status(404).json({ mensagem: "Autor não encontrato!" })
    }

}

async function remove(req, res) {
    const autorExcluido = await Autor.findByIdAndDelete(req.params.id)
    if (autorExcluido) {
        res.json({
            mensagem: "Autor excluido com sucesso!",
            autorExcluido
        })
    } else {
        res.status(404).json({ mensagem: "Autor não encontrato!" })
    }
}


module.exports = {
    create,
    getAll,
    getById,
    update,
    remove
}