const router = require('express').Router();

const { isAuth } = require('../middlewares/authMiddleware');
const gameService = require('../services/gameServices');
const { getErrorMessage } = require('../utils/utils');

router.get('/create', isAuth, (req, res) => {
    res.render('game/create');
});

router.post('/create', isAuth, async (req, res) => {

    const gameData = req.body;
    try {
        await gameService.create(req.user._id, gameData);
        res.redirect('/catalog');
    } catch (error) {
        return res.status(400).render('game/create', { error: getErrorMessage(error) })
    }




});


module.exports = router;
