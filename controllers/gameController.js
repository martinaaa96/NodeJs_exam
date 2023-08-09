const router = require('express').Router();

const { isAuth } = require('../middlewares/authMiddleware');
const gameService = require('../services/gameServices');
const { getErrorMessage } = require('../utils/utils');


router.get('/catalog', async (req, res) => {

    const game = await gameService.getAll();

    res.render('game/catalog', { game });

});

router.get('/:gameId/details', async (req, res) => {

    const game = await gameService.getOne(req.params.gameId);

    const isOwner = game.owner == req.user?._id;

    const isBuyer = game.boughtBy.some(id=> id == req.user?._id)


    res.render('game/details', { game, isOwner, isBuyer});
});

router.get('/:gameId/buy', isAuth, async (req, res) => {

    await gameService.buy(req.user._id, req.params.gameId);

    res.redirect(`/game/${req.params.gameId}/details`)

});

router.get('/create', isAuth, (req, res) => {
    res.render('game/create');
});

router.post('/create', isAuth, async (req, res) => {

    const gameData = req.body;
    try {
        await gameService.create(req.user._id, gameData);


    } catch (error) {
        return res.status(400).render('game/create', { error: getErrorMessage(error) })
    }
    res.redirect('/game/catalog');

});


module.exports = router;
