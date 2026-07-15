import path from 'path';
import { fileURLToPath } from 'url';
import { client } from '../app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function addScore(req, res) {
    try {
        const playerName = req.user.displayName;
        if(!playerName) {
            return res.status(401).send({ message: 'User not authenticated' });
        }
        const { gameName, score } = req.body;

        const key = `leaderboard:${gameName}`;
        const scoreValue = parseFloat(score);

        await client.zAdd(key, [{score:scoreValue, value:playerName}]);

        res.status(200).send({ 
            message: 'Score added successfully',
            gameName,
            playerName,
            score: scoreValue
        });
    } catch (error) {
        console.error("Erro em addScore:", error);
        res.status(500).send({ message: 'Error adding score', error: error.message });
    }
}

export async function getLeaderboardByGame(req, res) {
    try {
        const gameName = (req.query.gameName || "Game 1").toString().trim();
        const key = `leaderboard:${gameName}`;

        res.header("Content-Type", "text/event-stream");
        res.header("Connection", "keep-alive");
        res.header("Cache-Control", "no-cache");

        const sendLeaderboard = async () => {
            try {
                const leaderboard = await client.zRange(key, 0, -1, {
                    byScore: false,
                    rev: true
                });

                const scores = await client.zmScore(key, leaderboard);
                const numericScores = scores.map(score => score ? parseFloat(score) : null);

                const isAuthenticated = !!req.user;

                if (leaderboard.length === 0) {
                    res.write(`data: ${JSON.stringify({ 
                        game: gameName, 
                        players: [],
                        message: "Nenhum jogador ainda",
                        authenticated: isAuthenticated
                    })}\n\n`);
                } else {
                    res.write(`data: ${JSON.stringify({
                        game: gameName,
                        leaderboard: leaderboard,
                        score: numericScores,
                        authenticated: isAuthenticated
                    })}\n\n`);
                }
            } catch (err) {
                console.error("Erro ao buscar leaderboard:", err);
                res.write(`data: ${JSON.stringify({
                    error: "Erro ao buscar leaderboard"
                })}\n\n`);
            }
        };

        await sendLeaderboard();

        const interval = setInterval(sendLeaderboard, 2000);

        req.on("close", () => {
            clearInterval(interval);
            res.end();
        });

    } catch (error) {
        res.write(`data: ${JSON.stringify({ error: "Erro na conexão" })}\n\n`);
        res.end();
    }
}

export async function index(req, res) {
    try {
        const gameName = await client.keys("leaderboard:*");
        const games = gameName.slice(0, 5).map(key => key.replace("leaderboard:", ""));
        res.render(path.join(__dirname, '../views/index.ejs'), { games: games });
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving leaderboard', error });
    }
}

export async function addGame(req, res) {
    try {
        res.render(path.join(__dirname, '../views/addGame.ejs'));
    } catch (error) {
        res.status(500).send({ message: 'Error rendering add game page', error });
    }
}