import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import dotenv from "dotenv";

dotenv.config({path: "./config/.env"});

// Armazena usuários em memória (em produção use BD)
const users = new Map();

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.SECRET,
    callbackURL: "http://localhost:5173/google/callback",
}, (accessToken, refreshToken, profile, done) => {
    // Salva o perfil completo em memória
    users.set(profile.id, profile);
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    // Retorna o objeto completo, não só o ID
    const user = users.get(id);
    done(null, user);
});

export default passport;
