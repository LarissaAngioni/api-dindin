const pool = require("../conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const senhaJwt = require("../senhaJwt");

const listarTransaçaoes = async (req, res) => {
    const usuario = req.usuario;

    try {
        const transacoesEncontradas = await pool.query(
            "select * from transacoes where usuario_id = $1",
            [usuario.id]
        );
        return res.status(200).json(transacoesEncontradas["rows"])


    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
}

module.exports = {
    listarTransaçaoes
}
