const router = require('express').Router();

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', (req, res) => {
    const { username, email, password, repeatPassword } = req.body;

});

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;

});


module.exports = router;
