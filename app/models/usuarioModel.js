const pool = require("../../config/pool_conexoes");

const usuarioModel = {
    //metodo para retornar todo os registros da entidade usuario
    findAll: async () => {
        try {
            const [resultados, estrutura] = await
                pool.query("SELECT * FROM usuario u, tipo_usuario t " 
                    + " where t.id_tipo_usuario = u.tipo_usuario and u.status_usuario =1;");
            console.log(resultados);
            console.log(estrutura);
            return resultados;
        } catch (erro) {
            console.log(erro);
            return erro;
        }
    },
    //método para inserir um registro no banco de dados - usa o parametro dadosFormulario para armazenar os dados que serão inseridos no SGBD
    create: async (dadosFormulario) => {
        try {
            const [resultados] = await pool.query("INSERT INTO `usuario` "
                + " (`nome_usuario`,`user_usuario`,`senha_usuario`,`email_usuario`) "
                + " VALUES(?,?,?,?) ", [dadosFormulario.nome, dadosFormulario.nome, dadosFormulario.senha, dadosFormulario.email]);
            console.log(resultados);
            return resultados;
        } catch (erro) {
            console.log(erro);
            return false;
        }
    }
}


module.exports = usuarioModel;