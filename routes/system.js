const express = require('express');
const router = express.Router();
const si = require('systeminformation');

router.get('/', async (req, res) => {
    try {
        const cpu = await si.cpu();
        const mem = await si.mem();
        const load = await si.currentLoad();
        res.json({ cpu, mem, load });
    } catch (err) {
        res.status(500).json({ error: 'No se pudo obtener información del sistema' });
    }
});

module.exports = router;