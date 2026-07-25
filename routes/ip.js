const express = require('express');
const router = express.Router();
const si = require('systeminformation');

//IP local
router.get('/', async (req, res) => {
    const nets = await si.networkInterfaces();
    res.json(nets);
});

module.exports = router;