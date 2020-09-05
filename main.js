require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./conf/db');
const logger = require('./conf/logger');

// Dependências para gravar o log do morgan em um arquivo
const fs = require('fs');
const path = require('path');
const morganStream = fs.createWriteStream(path.join(__dirname, 'requisicoes.log'), {flags: 'a'});

logger.debug('Conectando ao banco de dados ...');

// Trabalhando com o banco de dados
db.on('error', (error) => logger.error(error));
db.once('open', async () => {
  logger.debug('A conexão com o banco de dados está aberta');

  // criar a aplicação express
  const app = express();

  // configurar a aplicação express
  // MIDDLEWARE
  app.use(morgan('short', {stream: morganStream}));
  app.use(cors());
  app.use(express.static('public'));
  app.use(bodyParser.json());

  // Adicionando as rotas para os controllers
  app.use('/produtos', require('./controller/ProdutosController'));
  app.use('/login', require('./controller/AutorizacaoController'));

  // escutar a porta 3000
  app.listen(5000, () => {
    logger.debug('Servidor no ar no endereço: http://localhost:5000');
  });
});
