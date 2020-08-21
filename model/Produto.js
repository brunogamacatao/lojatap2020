const mongoose = require('mongoose');

// Crio o schema
const produtoSchema = new mongoose.Schema({
  nome: String,
  valor: Number
});

// Crio e exporto o modelo
module.exports = mongoose.model('Produto', produtoSchema);