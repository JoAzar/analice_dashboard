const express = require('express');
const router = express.Router();
const si = require('systeminformation');

// Conexiones
router.get('/', async (req, res) => {
    try {
        const conns = await si.networkConnections();
        const filtered = conns.filter(c => c.state === 'LISTEN' || c.state === 'ESTABLISHED');
        res.json(filtered);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "No se pudo obtener las conexiones" });
    }
});

module.exports = router;