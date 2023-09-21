const express = require("express");
const {
  cadastrarUsuario,
  login,
  detalharUsuario,
  atualizarUsuario,
  listarCategorias,
} = require("./controladores/usuarioControlador");
const {
  listarTransacoes,
  cadastrarTransacoes,
  detalharTransacao,
  obterExtratoTransacoes
} = require("./controladores/trasacaoControlador")
const checaToken = require("./intermediarios/checaToken");

const rotas = express();

rotas.post("/usuario", cadastrarUsuario);
rotas.post("/login", login);

rotas.use(checaToken);

rotas.get("/usuario", detalharUsuario);
rotas.put("/usuario", atualizarUsuario);

rotas.get("/categoria", listarCategorias);

rotas.get("/transacao" ,listarTransacoes);
rotas.get("/transacao/extrato", obterExtratoTransacoes);
rotas.get("/transacao/:id", detalharTransacao);
rotas.post("/transacao", cadastrarTransacoes);
rotas.put("/transacao/:id", );
rotas.delete("/transacao/:id", );

module.exports = rotas;
