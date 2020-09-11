const express = require('express');
const router = express.Router();
const Usuario = require('../model/Usuario');
const bcrypt = require('bcrypt');

const BCRYPT_SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);

// CRIANDO UMA FUNÇÃO DE MIDDLEWARE PARA PEGAR O USUARIO PELO ID
const getUsuarioPorId = async (req, res, next) => {
  try {
    let usuario = await Usuario.findById(req.params.id);
    if (usuario === null) {
      res.status(404).json({erro: 'Não foi encontrado um usuario com o id informado'});
    } else {
      req.usuario = usuario;
      next();
    }
  } catch (erro) {
    res.status(500).json({erro: 'O id informado não é válido'});
  }
};

// RETORNAR TODOS OS USUARIOS
router.get('/', async (req, res) => {
  res.json(await Usuario.find());
});

// RETORNAR O USUARIO COM O ID INFORMADO
router.get('/:id', getUsuarioPorId, (req, res) => {
  res.json(req.usuario);
});

// ADICIONAR UM USUARIO
router.post('/', async (req, res) => {
  req.body.senha = await bcrypt.hash(req.body.senha, BCRYPT_SALT_ROUNDS);
  let usuario = await Usuario(req.body).save();
  res.json(usuario);
});

// ALTERAR O USUARIO COM O ID INFORMADO
router.put('/:id', getUsuarioPorId, async (req, res) => {
  req.usuario.email = req.body.email;
  req.usuario.senha = req.body.senha;
  await req.usuario.save();
  res.send('O usuario foi atualizado');
});

// EXCLUIR O USUARIO INFORMADO
router.delete('/:id', getUsuarioPorId, async (req, res) => {
  await req.usuario.delete();
  res.send('O usuario foi removido');
});

module.exports = router;
