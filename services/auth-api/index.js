const express = require('express');
const auth = require('./verifyUser');
const { initDb } = require('../../infrastructure/db/');
const app = express();
const port = 5868;

(async () => {
    await initDb(); //Initialize  database
})();

app.use(express.json());
app.post('/login', [auth.verifyLoginMiddleware, auth.login]); //Login route

app.listen(port, () => console.log(`Biggie - auth api listening on port ${port}!`));
