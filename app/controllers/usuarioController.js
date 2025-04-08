const bcrypt = require("bcryptjs");
const usuarioModel = require("../models/usuarioModel");
const {body, validationResult} = require("express-validator");

const salt = bcrypt.genSaltSync(10);

const usuarioController = {

    //validação
    validacaoFormularioCadastro : [
        body("nome")
            .isLength({min:3, max:45})
            .withMessage("O nome deve ter de 2 a 45 letras"),
        body("email")
            .isEmail()
            .withMessage("O e-mail deve ser válido!"),
        body("senha")
            .isStrongPassword()
            .withMessage("A senha deve possuir no mínimo 8 caracteres:com letra maiúscula e minúscula, número e caracter especial!"),
        body("c-senha")
            .custom((value, { req }) => {
                if( value != req.body.senha ){
                    throw new Error('As senhas não coincidem!');
                }else{
                    return true;
                }
            })        
    ],

    //métodos 
    inserirUsuario: async (req, res) => {
        //recuperar dados da validação
        const listaErros = validationResult(req);
        //verificar se há erros
        if(listaErros.isEmpty()){
            //não há erros - insert
            //criar objeto de dados do fomrulario
            let dadosParaInserir = {"nome":req.body.nome, "email":req.body.email,
                 "senha": bcrypt.hashSync(req.body.senha, salt)};
            //executar o insert
            let resultadoInsert = await usuarioModel.create(dadosParaInserir);
            if(resultadoInsert){
                if(resultadoInsert.insertId > 0){
                    //insert realizado
                    res.redirect("/perfil");
                }else{
                    res.render("pages/cadastro",{"listaErros":null, 
                        "valores":req.body,"falha":"falha ao inserir"});
                }
            }else{
                //falha ao iserir
                res.render("pages/cadastro",{"listaErros":null, 
                    "valores":req.body,"falha":"falha ao inserir"});
            }
        }else{
            //há erros
            console.log(listaErros);
            res.render("pages/cadastro",{"listaErros":listaErros, 
                "valores":req.body,"falha":null});
        }

    }

}



module.exports = usuarioController;