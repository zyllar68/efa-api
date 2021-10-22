const express = require('express');
const router = express.Router();
const Users = require('../controllers/users.controller');

router.post('/auth', Users.auth);
router.post('/check', Users.readUser );
router.get('/', Users.readAll);
router.get('/:id', Users.read);
router.post('/', Users.create);
router.put('/:id', Users.update);
router.delete('/:id', Users.delete);

module.exports = router;