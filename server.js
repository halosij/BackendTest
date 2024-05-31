const express = require('express');
const app = express();
const port = 3000;

// CORS zulassen
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Route definieren, die "test" zurückgibt
app.get('/api/test', (req, res) => {
  res.send('test');
});

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
