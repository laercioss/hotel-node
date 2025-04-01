const express = require("express");
const usuarioController = require("../controllers/usuarioController");
const router = express.Router();
const {body, validationResult} = require("express-validator");


router.get("/", (req, res)=>{
    res.render("pages/index");
});

router.get("/login", (req, res)=>{
    res.render("pages/login");
} )

router.get("/cadastro", (req, res)=>{
    res.render("pages/cadastro", 
        {"listaErros":null, "valores":{nome:"", senha:"","csenha":"", email:""}, "falha":null})
})

router.post("/cadastro", 
    usuarioController.validacaoFormularioCadastro, 
    (req, res) =>{
    usuarioController.inserirUsuario(req, res);
} )


router.get("/perfil", (req, res)=>{
        res.render("pages/perfil", {"listaErros":null,})
})

router.get("/teste", async (req, res) =>{
    //requisitar o model
    const usuarioModel = require("../models/usuarioModel");

    //teste  do findAll
    //let resultados = usuarioModel.findAll();
    //let dadosParaInserir = {"nome":"Joca","senha":"acesso1234","email":"joca@gmail.com"}
    //let resultadoInsert = await usuarioModel.create(dadosParaInserir);
    //let resultados = await usuarioModel.findAll();
})

module.exports = router