const express = require('express');
const router = express.Router();


const modelo = require('../models/index.js');

//devuelve todas los ranking
router.get('/', (req, res, next) => {
    modelo.ranking.findAll()
        .then(lista => res.json({ ok: true, resp: lista }))
        .catch(err => res.json({ ok: false, error: "Error con la lista de rankings" }));
});

//devuelve un ranking por id
router.get('/:id', (req, res, next) => {
    let idRanking = req.params.id;
    modelo.ranking.findByPk(idRanking)
        .then(lista => res.json({ ok: true, resp: lista }))
        .catch(err => res.json({ ok: false, error: "Error con el ranking" }));
});

module.exports = router;