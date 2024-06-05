require('dotenv').config()
const express = require('express')
const bcrypt = require('bcrypt')
const jtw = require('jsonwebtoken')

const app = express()
const PORT = 3000

app.use(express.json())

const DBconnection = require('./database/connection')
DBconnection()

const routes = require('./routes/routes')
app.use("/", routes)

app.listen(PORT, () => {
    console.log(`Aplicação rodando na porta ${PORT}`)
})

/* Criando cadastrando, fazendo login e criando a segurança do banco  ---------------------------------------------------- */

//Modelos
const User = require('./models/User')

// Rota privativa
app.get("/user/:id", checkToken, async (req, res) => {

    const id = req.params.id

    // verificando se o usuário existe
    const user = await User.findById(id, '-senha')

    if(!user) {
        return res.status(404).json({ msg: 'Usuário não encontrado!'})
    }

    res.status(200).json({ user })

})

function checkToken(req, res, next) {
    const authHeader = req.headers['autorization']
    const token = authHeader && authHeader.split(" ")[1]

    if(!token){
        return res.status(401).json({msg:'Acesso negado!'})
    }

    try {

        const secret = process.env.SECRET

        jtw.verify(token, secret)

        next()

    } catch(error){
        res.status(400).json({msg:"Token inválido!"})
    }
}

/* ------------------------------------------------------------------------------------------------------------------------ */

// Registrando Usuário
app.post('/auth/register', async(req, res) => {
    const {nome, email, senha, confirmeSenha} = req.body

    if(!nome){
        return res.status(422).json({ msg: 'O nome é obrigatório!'})
    }
    if(!email){
        return res.status(422).json({ msg: 'O email é obrigatório!'})
    }
    if(!senha){
        return res.status(422).json({ msg: 'A senha é obrigatória!'})
    }

    //confirmando senha ---------------------------------------------------------------
    if(senha !== confirmeSenha) {
        return res.status(422).json({ msg: 'As senhas não conferem!'})
    }

    //Confirmar se o usuário já existe ------------------------------------------------
    const userExist = await User.findOne({email : email})

    if(userExist) {
        return res.status(422).json({ msg: 'Usuário já existe'})
    }

    // Criando senha ------------------------------------------------------------------
    const salt = await bcrypt.genSalt(12) //Essa parte usamos para criptografar a senha
    const passwordHash = await bcrypt.hash(senha, salt)

    // Criando usuário
    const user = new User ({
        nome,
        email,
        senha: passwordHash,
    })

    try {

        await user.save()

        res.status(201).json({ msg: 'Usuário criado com sucesso! '})

    } catch(error){
        console.log(error)

        res
            .status(500)
            .json({
                msg: 'Aconteceu um erro no servidor, tente novamente mais tarde!'
            })
    }
})

/* ------------------------------------------------------------------------------------------------------------------------ */

// rota de login
app.post("/auth/login", async (req, res) => {

    const {email, senha} = req.body

    // validações ---------------------------------------------------------------------
    if(!email){
        return res.status(422).json({ msg: 'O email é obrigatório!'})
    }
    if(!senha){
        return res.status(422).json({ msg: 'A senha é obrigatória!'})
    }

    // validado se o usuário existe
    const user = await User.findOne({email : email})
    if(!user) {
        return res.status(404).json({ msg: 'Usuário não encontrado!'})
    }
    // verificando a senha
    const checkPassword = await bcrypt.compare(senha, user.senha)

    if(!checkPassword) {
        return res.status(422).json({ msg: 'Senha inválida!'})
    }

    try{
        
        const secret = process.env.SECRET

        const token = jtw.sign({
            id: user._id,

        },
        secret,
        )

        res.status(200).json({msg: 'Autenticação realizada com sucesso!', token})

    } catch (error){
        console.log(error)

        res.status(500).json({
            msg: 'Aconteceu um erro no servidor, tente novamente mais tarde.'
        })
    }
})


