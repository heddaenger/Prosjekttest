const express = require('express');
const app = express();

app.listen(4000, () => {
    console.log('listening');
});

const router = require("./routes/users");
const pool = require ("./routes");


app.use(express.static('public'));
app.use('/users', router); //forteller at alle router som starter med /users skal håndteres av våres router fra routes/users.js

//en route handler som returnerer alle brukere i databasen
router.get('', (req, res) => { //når den modtager et GET request til '' skal den kjøre route handleren
    pool.query('SELECT * FROM "Users"').then(result =>{
        res.json(result.rows); //vi vil gjerne sende JSON tilbake til klienten
    });
});

//for å kunne lese data som blir sendt fra formen
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

//for å kunne tilgå req.cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser());
