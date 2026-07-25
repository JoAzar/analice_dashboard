const express = require('express');
const router = express.Router();
const si = require('systeminformation');

router.get('/', async (req, res) => {
    try {
        const conns = await si.networkConnections();
        const openPorts = conns.filter(c => c.state === 'LISTEN');
        res.json(openPorts);
    } catch (err) {
        res.status(500).json({ error: 'No se pudo obtener los puertos abiertos' });
    }
});

module.exports = router;