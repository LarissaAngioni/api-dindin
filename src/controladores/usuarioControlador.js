const pool = require("../conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const senhaJwt = require("../senhaJwt");

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome) {
    return res.status(400).json({ mensagem: "O campo nome é obrigatório" });
  }
  if (!email) {
    return res.status(400).json({ mensagem: "O campo email é obrigatório" });
  }
  if (!senha) {
    return res.status(400).json({ mensagem: "O campo senha é obrigatório" });
  }

  try {
    const emailExiste = await pool.query(
      "select * from usuarios where email = $1",
      [email]
    );

    if (emailExiste.rowCount > 0) {
      return res.status(400).json({
        mensagem: "Já existe usuário cadastrado com o e-mail informado.",
      });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const query =
      "insert into usuarios (nome, email, senha) values ($1, $2, $3) returning id, nome, email";
    const values = [nome, email, senhaCriptografada];

    const { rows } = await pool.query(query, values);

    return res.status(201).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

const login = async (req, res) => {
  const { email, senha } = req.body;

  if (!email) {
    return res.status(400).json({ mensagem: "O campo email é obrigatório" });
  }
  if (!senha) {
    return res.status(400).json({ mensagem: "O campo senha é obrigatório" });
  }

  try {
    const usuarioExiste = await pool.query(
      "select * from usuarios where email = $1",
      [email]
    );

    if (usuarioExiste.rowCount === 0) {
      return res
        .status(400)
        .json({ mensagem: "Usuário e/ou senha inválido(s)." });
    }

    const { senha: senhaUsuario, ...usuario } = usuarioExiste.rows[0];

    const senhaCorreta = await bcrypt.compare(senha, senhaUsuario);

    if (!senhaCorreta) {
      return res
        .status(400)
        .json({ mensagem: "Usuário e/ou senha inválido(s)." });
    }

    const token = jwt.sign({ id: usuario.id }, senhaJwt, { expiresIn: "8h" });

    return res.json({ usuario, token });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

const detalharUsuario = async (req, res) => {
  const usuario = req.usuario;

  try {
    const { rows } = await pool.query(
      "select id, nome, email from usuarios where id = $1",
      [usuario.id]
    );

    return res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

const atualizarUsuario = async (req, res) => {
  const usuario = req.usuario;
  const usuarioAtualizado = req.body;

  try {
    if (!usuarioAtualizado.nome) {
      return res.status(400).json({ mensagem: "O campo nome é obrigatório" });
    }
    if (!usuarioAtualizado.email) {
      return res.status(400).json({ mensagem: "O campo email é obrigatório" });
    }
    if (!usuarioAtualizado.senha) {
      return res.status(400).json({ mensagem: "O campo senha é obrigatório" });
    }

    const emailExiste = await pool.query(
      "select * from usuarios where email = $1",
      [usuarioAtualizado.email]
    );

    if (emailExiste.rowCount > 0) {
      return res.status(400).json({
        mensagem:
          "O e-mail informado já está sendo utilizado por outro usuário.",
      });
    }

    const senhaCriptografada = await bcrypt.hash(usuarioAtualizado.senha, 10);

    const atualizar = await pool.query(
      `update usuarios
      set nome = $1,
      email = $2,
      senha = $3
      where id = $4`,
      [
        usuarioAtualizado.nome,
        usuarioAtualizado.email,
        senhaCriptografada,
        usuario.id,
      ]
    );

    return res.status(200);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

const listarCategorias = async (req, res) => {
  try {
    const categorias = await pool.query("select * from categorias");

    return res.status(200).json(categorias.rows);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

module.exports = {
  cadastrarUsuario,
  login,
  detalharUsuario,
  atualizarUsuario,
  listarCategorias,
};
