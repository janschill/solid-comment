import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const express = require('express');
const app = express();

app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

app.listen(3333, () => console.log('Solid Comment server listening on port 3333!'));
