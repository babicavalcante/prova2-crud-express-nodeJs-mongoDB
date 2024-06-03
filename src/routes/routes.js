const express = require('express')
const router = express.Router()

// controllers
const AutorController = require('../controllers/AutorController')
const ClienteController = require('../controllers/ClienteController')
const EditoraController = require('../controllers/EditoraController')
const FuncionarioController = require('../controllers/FuncionarioController')
const LivroController = require('../controllers/LivroController')

// validators
const { validarId } = require('../validators/IdValidator')
const { autorValidador } = require('../validators/AutorValidator')
const { clienteValidador } = require('../validators/ClienteValidator')
const { editoraValidador } = require('../validators/EditoraValidator')
const { funcionarioValidador } = require('../validators/FuncionarioValidator')
const { livroValidador } = require('../validators/LivroValidator')

// Autor
router.post('/autores', autorValidador, AutorController.create)
router.get('/autores', AutorController.getAll)
router.get('/autores/:id', validarId, AutorController.getById)
router.put('/autores/:id', validarId, autorValidador, AutorController.update)
router.delete('/autores/:id', validarId, AutorController.remove)

// Cliente
router.post('/clientes', clienteValidador, ClienteController.create)
router.get('/clientes', ClienteController.getAll)
router.get('/clientes/:id', validarId, ClienteController.getById)
router.put('/clientes/:id', validarId, clienteValidador, ClienteController.update)
router.delete('/clientes/:id', validarId, ClienteController.remove)

// Editora
router.post('/editoras', editoraValidador, EditoraController.create)
router.get('/editoras', EditoraController.getAll)
router.get('/editoras/:id', validarId, EditoraController.getById)
router.put('/editoras/:id', validarId, editoraValidador, EditoraController.update)
router.delete('/editoras/:id', validarId, EditoraController.remove)

// Funcionarios
router.post('/funcionarios', funcionarioValidador, FuncionarioController.create)
router.get('/funcionarios', FuncionarioController.getAll)
router.get('/funcionarios/:id', validarId, FuncionarioController.getById)
router.put('/funcionarios/:id', validarId, funcionarioValidador, FuncionarioController.update)
router.delete('/funcionarios/:id', validarId, FuncionarioController.remove)

// Livro
router.post('/livros', livroValidador, LivroController.create)
router.get('/livros', LivroController.getAll)
router.get('/livros/:id', validarId, LivroController.getById)
router.put('/livros/:id', validarId, livroValidador, LivroController.update)
router.delete('/livros/:id', validarId, LivroController.remove)


module.exports = router