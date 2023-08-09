const Game = require('../models/Game');


exports.getAll = () => Game.find({}).lean();

exports.getOne = (gameId) => Game.findById(gameId).lean();

exports.buy = async (userId, gameId) => {

    const game = await Game.findById(gameId);

    game.boughtBy.push(userId);
    return  game.save();

    //await Game.findByIdAndUpdate(gameId, { $push: { boughtBy: userId } });


}

exports.create = (ownerId, gameData) => Game.create({ ...gameData, owner: ownerId });

