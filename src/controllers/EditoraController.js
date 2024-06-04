const Editora = require('../models/Editora')

async function create(req, res) {
    const editora = new Editora(req.body)
    const editoraCriado = await editora.save()
    res.status(201).json(editoraCriado)
}

async function getAll(req, res) {
    try {
        const editoras = await Editora.find().populate(['autor', 'livro']);
        res.json(editoras);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao buscar editoras", error });
    }
}

async function getById(req, res) {
    const editora = await Editora.findById(req.params.id).populate(['autor', 'livro'])
    if (editora) {
        res.json(editora)
    } else {
        res.status(404).json({ mensagem: "Editora não encontrato!" })
    }
}

async function update(req, res) {
    const editoraAtulizado = await Editora.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (editoraAtulizado) {
        res.json(editoraAtulizado)
    } else {
        res.status(404).json({ mensagem: "Editora não encontrato!" })
    }

}

async function remove(req, res) {
    const editoraExcluido = await Editora.findByIdAndDelete(req.params.id)
    if (editoraExcluido) {
        res.json({
            mensagem: "Editora excluido com sucesso!",
            editoraExcluido
        })
    } else {
        res.status(404).json({ mensagem: "Editora não encontrato!" })
    }
}


module.exports = {
    create,
    getAll,
    getById,
    update,
    remove
}