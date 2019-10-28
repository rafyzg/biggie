const express = require('express');
const { initDb } = require('../../infrastructure/db/');
const router = require('./router');
const auth = require('./middleware/tokenValidator');
const app = express();
const port = 5867;

(async () => {
    await initDb(); //Initialize database
})();

app.use(express.json());
app.use(auth.validateToken); //Validating user token
app.use('/api/v1', router.biggie);

app.listen(port, () => console.log(`Biggie app listening on port ${port}!`))