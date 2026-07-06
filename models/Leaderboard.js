import mongoose from 'mongoose';

const leaderboardSchema = new mongoose.Schema({
    playerId: { type: mongoose.Schema.Types.ObjectId, ref: 'player' },
    gameName: { type: String, ref: 'game' },
    PlayerScore : { type: Number, ref: 'player' },
});

export default mongoose.model('leaderboard', leaderboardSchema);