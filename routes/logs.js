const express = require('express');
const router = express.Router();
const { exec } = require('child_process');

// dmesg
router.get('/', (req, res) => {
    exec('dmesg | tail -n 20', (err, stdout) => {
        if (err) return res.status(500).json({ error: "Error ejecutando dmesg" });
        const logs = stdout.split('\n');
        res.json(logs);
    });
});

module.exports = router;