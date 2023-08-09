const Game = require('../models/Game');


exports.getAll = () => Game.find({}).lean();

exports.getOne = (gameId) => Game.findById(gameId).lean();

exports.search = async (name, platform) => {

    let game = await this.getAll();

    if (name) {
        game = game.filter(x => x.name.toLowerCase() == name);

    }
    if (platform) {
        game = game.filter(x => x.platform == platform);
    }

    return game;

}
exports.buy = async (userId, gameId) => {

    const game = await Game.findById(gameId);

    game.boughtBy.push(userId);
    return game.save();

    //await Game.findByIdAndUpdate(gameId, { $push: { boughtBy: userId } });


}

exports.create = (ownerId, gameData) => Game.create({ ...gameData, owner: ownerId });

exports.edit = (gameId, gameData) => Game.findByIdAndUpdate(gameId, gameData);

exports.delete = (gameId) => Game.findByIdAndDelete(gameId);
