const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./conf/db');

// Trabalhando com o banco de dados
db.on('error', (error) => console.log(error));
db.once('open', async () => {
  console.log('A conexão com o banco de dados está aberta');

  // criar a aplicação express
  const app = express();

  // configurar a aplicação express
  app.use(cors());
  app.use(express.static('public'));
  app.use(bodyParser.json());

  // Adicionando as rotas para os controllers
  app.use('/produtos', require('./controller/ProdutosController'));

  // escutar a porta 3000
  app.listen(5000, () => {
    console.log('Servidor no ar no endereço: http://localhost:5000');
  });
});
