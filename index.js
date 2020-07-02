const express = require('express');
const bodyParser = require('body-parser');
// const https = require('https');
// const fs = require('fs');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '1000mb' }));

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
  if (err) {
    res.status(500).send(err)
  }
});

const PORT = '8080';

// const key = fs.readFileSync('ssl/key.pem', 'utf8');
// const cert = fs.readFileSync('ssl/cert.pem', 'utf8');

// const credentials = { key, cert };
// const server = https.createServer(credentials, app);
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
