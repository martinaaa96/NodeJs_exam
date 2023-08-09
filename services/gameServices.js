const Game = require('../models/Game');


exports.getAll = () => Game.find({}).lean();

exports.getOne = (gameId) => Game.findById(gameId).lean();

exports.create = (ownerId, gameData) => Game.create({ ...gameData, owner: ownerId });

