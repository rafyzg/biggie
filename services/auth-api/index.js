const express = require('express');
const auth = require('./verifyUserMiddleware');
const { initDb } = require('../../infrastructure/db/');
const app = express();
const port = 5868;
initDb(); //Initializing Sequelize
app.use(express.json());

app.post('/login', [auth.verifyLogin, auth.login]); //Login route

app.listen(port, () => console.log(`Biggie app listening on port ${port}!`))