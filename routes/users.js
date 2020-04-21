const express = require('express');
const router = express.Router();
const pool = require ('./routes/index');

module.exports = router;


//hente en enkel bruker ut fra et ID
router.get('/:id', (req, res) => {
    pool.query('SELECT * FROM "Users" WHERE id = $1',
        [req.params.id]).then(result => {
        res.json(result.rows);
    });
});

router.post('/:id', (req, res) => {
    pool.query('UPDATE "users" SET name = $1 WHERE id = $2', [req.body.name, req.params.id]).then(result => {
        res.redirect('profile.html'); //når brukeren er oppdatert i databasen skal browseren sendes tilbake til profile.html siden
    });
});

//login via JWT, alternativ til sessions
const jwt = require('jsonwebtoken');
const secret = 'verysecret';

router.post('/login', (req, res) => {
    //sjekk brukernavn og passord mot databasen, hvis korrekt:
    const token = jwt.sign({user_id: user_id}, secret);
    res.send();
})

//setter cookie for å holde styr på hvem som er logget inn
//for å få adgang til brukeren tilføyer vi en middleware, koden kjører før alle route handlers
router.use((req, res, next) => {
    if(req.cookies && req.cookies['jwt-token']){
        const decoded = jwt.verify(req.cookies['jwt-token'],
            secret);
        pool.query('SELECT * FROM "User" WHERE id = $1',
            [decoded.user_id]).then(result => {
                req.user = result.rows[0];
                next();
        });
    } else {
        next();
    };
});
//viktig å kalle next funksjonen når man er ferdig med våres asynkrone kall

//ved å sette req.user vil den være tilgjengelig i alle route handlers
//Brukere som er logget inn kan hente data om seg selv:
router.get('/me', (req, res) => {
    res.json(req.user);
});

