const pool = require("../conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const senhaJwt = require("../senhaJwt");

const listarTransacoes = async (req, res) => {
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

const cadastrarTransacoes = async (req, res) => {
  const usuario = req.usuario;
  const { descricao, valor,  categoria_id, tipo } = req.body;

  try {
    if (!descricao) {
      return res.status(400).json({ mensagem: "O campo descrição é obrigatório" });
    }
    if (!valor) {
      return res.status(400).json({ mensagem: "O campo valor é obrigatório" });
    }
    if (!categoria_id) {
      return res.status(400).json({ mensagem: "O campo Categoria Id é obrigatório" });
    }
    if (!tipo) {
      return res.status(400).json({ mensagem: "O campo tipo é obrigatório" });
    }


    if (valor <= 0) {
      return res.status(400).json({ mensagem: "O campo Valor tem que ser maior do que zero " });
    }

    if (tipo !== "entrada" && tipo !== "saida") {
      return res.status(400).json({ mensagem: "O campo tipo tem que ser entrada ou saida" });
    }

    const categoriaExistente = await pool.query(
      "select * from categorias where id = $1",
      [categoria_id]
    );

    if (categoriaExistente.rowCount <= 0) {
      return res.status(404).json({
        mensagem: "Esta Categoria Não Existe.",
      });
    }

    const categoriaNome = categoriaExistente.rows[0]

    const query = "insert into transacoes (tipo, descricao, valor, data, usuario_id, categoria_id )  values($1, $2, $3, $4, $5, $6) returning *"

    const values = [tipo, descricao, valor, new Date(), usuario.id, categoria_id]

    let { rows } = await pool.query(query, values);

    rows[0].categoria_nome = categoriaNome.descricao

    return res.status(201).json(rows[0]);

  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
}

const obterExtratoTransacoes = async (req, res) => {
  const usuario = req.usuario;

  try {

  } catch (error) {

  }
}

module.exports = {
  listarTransacoes,
  cadastrarTransacoes
}