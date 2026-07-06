import mongoose from 'mongoose';

const GameSchema = new mongoose.Schema({
    name: String
});

export default mongoose.model('game', GameSchema);