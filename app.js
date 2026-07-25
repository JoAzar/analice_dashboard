const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

//routes
const processesRoutes = require('./routes/processes');
const logsRoutes = require('./routes/logs');
const ipRoutes = require('./routes/ip');
const connectionsRoutes = require('./routes/connections');
const diskRoutes = require('./routes/disk');
const portsRoutes = require('./routes/ports');
const whoRoutes = require('./routes/who');
const systemRoutes = require('./routes/system');
const clickJakingAnalizerRoutes = require('./routes/click_jaking_analizer');
const lsofRoutes = require('./routes/lsof');
const psRoutes = require('./routes/ps');
const tulnpRoutes = require('./routes/tulnp');
//const =  require('./routes/');


//app.use(express.static('statics'));
app.use(express.static(path.join(__dirname, 'statics')));

//endpoints
app.use('/api/processes', processesRoutes);
app.use('/api/logs', logsRoutes);
app.use('/api/ip', ipRoutes);
app.use('/api/connections', connectionsRoutes);
app.use('/api/disk', diskRoutes);
app.use('/api/ports', portsRoutes);
app.use('/api/who', whoRoutes);
app.use('/api/system', systemRoutes);
app.use('/api/clickJakingAnalizer', clickJakingAnalizerRoutes);
app.use('/api/lsof', lsofRoutes);
app.use('/api/ps', psRoutes);
app.use('/api/tulnp', tulnpRoutes);
//app.use('/api/', );



//inicio
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`);
});