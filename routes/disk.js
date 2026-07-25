const si = require('systeminformation');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const disks = await si.fsSize();
        res.json(disks);
    } catch (err) {
        res.status(500).json({ error: 'No se pudo obtener información de discos' });
    }
});

module.exports = router;