const express = require("express");
const router = express.Router();
const Parcels = require("../controllers/parcels.controller");

router.get('/', Parcels.read);
router.post('/', Parcels.create);

module.exports = router;