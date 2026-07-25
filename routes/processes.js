const express = require('express');
const router = express.Router();
const si = require('systeminformation');

router.get('/', async (req, res) => {
    const data = await si.processes();
    res.json(data.list.slice(0, 20));
});

module.exports = router;