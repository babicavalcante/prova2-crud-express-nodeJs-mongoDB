const express = require('express')
const router = express.Router()
const checkToken = require('../auth')

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
router.post('/autores', autorValidador, checkToken, AutorController.create)
router.get('/autores', checkToken, AutorController.getAll)
router.get('/autores/:id', validarId, checkToken, AutorController.getById)
router.put('/autores/:id', validarId, autorValidador, checkToken, AutorController.update)
router.delete('/autores/:id', validarId, checkToken, AutorController.remove)

// Cliente
router.post('/clientes', clienteValidador, checkToken, ClienteController.create)
router.get('/clientes', checkToken, ClienteController.getAll)
router.get('/clientes/:id', validarId, checkToken, ClienteController.getById)
router.put('/clientes/:id', validarId, clienteValidador, checkToken, ClienteController.update)
router.delete('/clientes/:id', validarId, checkToken, ClienteController.remove)

// Editora
router.post('/editoras', editoraValidador, checkToken, EditoraController.create)
router.get('/editoras', checkToken, EditoraController.getAll)
router.get('/editoras/:id', validarId, checkToken, EditoraController.getById)
router.put('/editoras/:id', validarId, editoraValidador, checkToken, EditoraController.update)
router.delete('/editoras/:id', validarId, checkToken, EditoraController.remove)

// Funcionarios
router.post('/funcionarios', funcionarioValidador, checkToken, FuncionarioController.create)
router.get('/funcionarios', checkToken, FuncionarioController.getAll)
router.get('/funcionarios/:id', validarId, checkToken, FuncionarioController.getById)
router.put('/funcionarios/:id', validarId, funcionarioValidador, checkToken, FuncionarioController.update)
router.delete('/funcionarios/:id', validarId, checkToken, FuncionarioController.remove)

// Livro
router.post('/livros', livroValidador, checkToken, LivroController.create)
router.get('/livros', checkToken, LivroController.getAll)
router.get('/livros/:id', validarId, checkToken, LivroController.getById)
router.put('/livros/:id', validarId, livroValidador, checkToken, LivroController.update)
router.delete('/livros/:id', validarId, checkToken, LivroController.remove)


module.exports = router