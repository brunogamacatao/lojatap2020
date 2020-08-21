const express = require('express');
const router = express.Router();
const Produto = require('../model/Produto');

// CRIANDO UMA FUNÇÃO DE MIDDLEWARE PARA PEGAR O PRODUTO PELO ID
const getProdutoPorId = async (req, res, next) => {
  try {
    let produto = await Produto.findById(req.params.id);
    if (produto === null) {
      res.status(404).json({erro: 'Não foi encontrado um produto com o id informado'});
    } else {
      req.produto = produto;
      next();
    }
  } catch (erro) {
    res.status(500).json({erro: 'O id informado não é válido'});
  }
};

// RETORNAR TODOS OS PRODUTOS
router.get('/', async (req, res) => {
  res.json(await Produto.find());
});

// RETORNAR O PRODUTO COM O ID INFORMADO
router.get('/:id', getProdutoPorId, (req, res) => {
  res.json(req.produto);
});

// ADICIONAR UM PRODUTO
router.post('/', async (req, res) => {
  let produto = await Produto(req.body).save();
  res.json(produto);
});

// ALTERAR O PRODUTO COM O ID INFORMADO
router.put('/:id', getProdutoPorId, async (req, res) => {
  await Produto.update(req.body);
  res.send('O produto foi atualizado');
});

// EXCLUIR O PRODUTO INFORMADO
router.delete('/:id', getProdutoPorId, async (req, res) => {
  await req.produto.delete();
  res.send('O produto foi removido');
});

module.exports = router;