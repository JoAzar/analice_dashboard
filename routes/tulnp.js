const express = require('express');
const router = express.Router();

router.get('/ports', (req, res) => {
    exec('ss -tulnp', (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ error: 'Error obteniendo puertos' });
        }

        res.send(stdout);
    });
});

module.exports = router;
