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

// inicializa o banco com dados de teste
router.get('/popula', async (req, res) => {
  await new Produto({'nome': 'Coca-Cola Lata', 'valor': 3.0, 'foto': 'https://d3efjz1jvymzgz.cloudfront.net/Custom/Content/Products/10/11/1011792_refrigerante-coca-cola-lata-350ml-fardo-c-12-unidades_m1_637051111791632885.png'}).save();
  await new Produto({'nome': 'Suco de Laranja - Jarra', 'valor': 8.0, 'foto': 'https://image.freepik.com/fotos-gratis/jarra-de-suco-de-laranja-e-frutas-laranja-isoladas_80510-975.jpg'}).save();
  await new Produto({'nome': 'Batata Frita', 'valor': 11.0, 'foto': 'https://cdn.panelinha.com.br/receita/953607600000-Batata-frita-tradicional.jpg'}).save();
  await new Produto({'nome': 'Pão de Alho', 'valor': 10.0, 'foto': 'https://i0.statig.com.br/bancodeimagens/20/i5/r8/20i5r8xxhtcnc4yne9k4ewt9l.jpg'}).save();
  await new Produto({'nome': 'Filé a Parmegiana', 'valor': 18.0, 'foto': 'https://leianoticias.com.br/wp-content/uploads/Fil%C3%A9-capa.jpg'}).save();
  await new Produto({'nome': 'Feijoada', 'valor': 35.0, 'foto': 'https://img.cybercook.com.br/receitas/776/feijoada-623x350.jpeg'}).save();

  res.status(201).json({"status": "sucesso"});
});

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