const Game = require('../models/Game');
exports.getAll = ()=> 

exports.create = (ownerId, gameData) => Game.create({ ...gameData, owner: ownerId });

