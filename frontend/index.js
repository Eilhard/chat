const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, './public/')));

let config = {
    ip: '0.0.0.0',
    port: 18002
}
app.listen(config.port, config.ip, () => {
  console.log(`Server initiated on ${config.ip}:${config.port}`);
});
