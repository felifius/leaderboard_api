import mongoose from 'mongoose';

const PlayerSchema = new mongoose.Schema({
    name: String,
    score: Number,
    gameId: { type: mongoose.Schema.Types.ObjectId, ref: 'game' }
});

export default mongoose.model('player', PlayerSchema);