const express = require('express');
const router = express.Router();
const { execFile } = require('child_process');


router.get('/process/:pid', (req, res) => {
    const pid = req.params.pid;

    if(!/^\d+$/.test(pid)) {
        return res.status(400).json({ error: 'PID inválido' });
    }

    execFile('ps', ['-fp', pid], (error, stdout, stderr) => {
        if(error) {
            return res.status(500).json({ error: 'Proceso no encontrado' });
        }
        res.send(stdout);
    });
});

module.exports = router;
