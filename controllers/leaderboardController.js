import Leaderboard from '../models/leaderboard.js';
import Player from '../models/Player.js';
import Game from '../models/Game.js';

export async function addScore(req, res) {
    try {
        const { gameName, name, score } = req.body;
        const game = await Game.create({ name: gameName });
        const gameId = game._id;
        const player = await Player.create({ name, score, gameId });
        res.send({ message: 'Score added successfully', body: { gameName, name, score } });
    } catch (error) {
        res.status(500).send({ message: 'Error adding score', error });
    }
}

//export async function getLeaderboardByGame(req, res) {}