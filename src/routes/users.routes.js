const express = require('express');
const router = express.Router();
const Users = require('../controllers/users.controller');

router.get('/auth', Users.auth);

router.get('/', Users.read);

router.post('/', Users.create);

router.put('/:id', Users.update);

router.delete('/:id', Users.delete);

module.exports = router;