const { exec } = require('child_process');
const express = require('express');
const router = express.Router();
const si = require('systeminformation');

router.get('/', (req, res) => {
    exec('who', (err, stdout) => {
        if (err) return res.status(500).json({ error: 'No se pudo ejecutar who' });
        const users = stdout.split('\n').filter(Boolean);
        res.json(users);
    });
});

module.exports = router;