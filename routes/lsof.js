const express = require('express');
const router = express.Router();
const { execFile } = require('child_process');

router.get('/port/:port', (req, res) => {
    const port = req.params.port;

    if(!/^\d+$/.test(port)) { return res.status(400).json({ error: 'Puerto inválido' }); }

    execFile('lsof', ['-i', `:${port}`], (error, stdout, stderr) => {
        if(!stdout) {
            return res.json({
                success: true,
                count: 0,
                data: [],
                message: 'No hay procesos usando ese puerto'
            });
        }

        const lines = stdout.split('\n').filter(Boolean);
        const dataLines = lines.slice(1);
        const data = dataLines.map(line => {
        const parts = line.trim().split(/\s+/);

            return {
                process: parts[0],
                pid: parts[1],
                user: parts[2],
                type: parts[4],
                name: parts.slice(8).join(' ')
            };
        });

        res.json({
            success: true,
            count: data.length,
            data
        });
    });
});

module.exports = router;


