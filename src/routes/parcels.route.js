const express = require("express");
const router = express.Router();
const Parcels = require("../controllers/parcels.controller");

router.get('/', Parcels.readAll);
router.get('/:id', Parcels.read);
router.post('/', Parcels.create);
router.put('/:id', Parcels.update);
router.delete('/:id', Parcels.delete);

module.exports = router;