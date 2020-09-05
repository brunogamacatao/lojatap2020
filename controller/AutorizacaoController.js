const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

JWT_SECRET = process.env.JWT_SECRET;

router.post('/', (req, res) => {
  if (req.body.username === 'admin' && req.body.password === 'admin') {
    let payload = {
      username: 'admin',
      roles: ['ADMIN', 'USUARIO']
    };

    let token = jwt.sign(payload, JWT_SECRET, {expiresIn: 300});

    res.status(200).json({auth: true, token: token});
  } else {
    res.status(500).json({auth: false, mensagem: 'login ou senha inválidos'});
  }
});

router.get('/valida', (req, res) => {
  if (!req.headers.authorization || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    return res.status(401).json({auth: false, mensagem: 'token não informado'});
  } else {
    let token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(500).json({auth: false, mensagem: 'token não autorizado'});
      } else {
        res.status(200).json({auth: true, payload: decoded});
      }
    });
  }
});

module.exports = router;