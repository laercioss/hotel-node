const usuarioModel = require("../models/usuarioModel");

const {body, validationResult} = require("express-validator");

const usuarioCintroller = {

    //validação
    validacaoFormularioCadastro : [
        body("nome")
            .isLength({min:3, max:45})
            .withMessage("O nome deve ter de 2 a 45 letras"),
        body("email")
            .isEmail()
            .withMessage("O e-mail deve ser válido"),
        body("senha")
            .isStrongPassword()
            .withMessage("Asenha deve possuir no mínimo 8 caracteres: com letras maiúscula e minúscula, número e caracterer"),
        body("c-senha")
            .custom((value, {req})=>{
                if(value != req.body.senha){
                    throw new Error ('As senhas não coincidem!');
                }
            })
    ],

    //metodos
    inserirUsuario: async (req, res) => {
        //recuperar dados da validação
        const listaErros = validationResult(req);
        //verificar se há erros
        if(listaErros.isEmpty()){
            //não há erros - inser
            //criar objeto de dados do formulario
            let dadosParaInserir = {"nome":req.body.nome, "email":req.body.email, "senha":req.body.senha};
            //executar o insert
            let resultadoInsert = await usuarioModel.create(dadosParaInserir);
            if(resultadoInsert){
                if(resultadoInsert.insertId > 0 ){
                //insert realizado
                res.redirect("/perfil");
                }else{
                    res.render("pages/cadastro",{"listaErros":null, "valores":req.body, "falha":"falha ao inserir"});

                }
            }else{
                //falha ao inserir
                console.log(resultadoInsert);
                res.render("pages/cadastro",{"listaErros":null, "valores":req.body, "falha":"falha ao inserir"});
            }
        
        }else{
            //há erros
            console.log(listaErros);
            res.render("pages/cadastro",{"listaErros":listaErros, "valores":req.body, "falha":null});
        }
    }

}

module.exports = usuarioCintroller;