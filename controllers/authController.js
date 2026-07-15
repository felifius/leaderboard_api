import passport from "passport";

export const login = passport.authenticate('google', {scope: ['email', 'profile']});

export const googleCallback = passport.authenticate('google', {
    failureRedirect: '/fail',
    successRedirect: '/success'
});

export function checkAuth(req, res) {
    if (req.user) {
        return res.json({
            authenticated: true,
            user: {
                id: req.user.id,
                displayName: req.user.displayName,
                email: req.user.emails?.[0]?.value,
                photo: req.user.photos?.[0]?.value,
            }
        });
    } else {
        return res.json({ authenticated: false });
    }
}

export function success(req, res) {
    if (!req.user) {
        return res.status(401).json({ error: "Não autenticado" });
    }
    
    const user = req.user;
    
    res.redirect(`/`);
}

export function logout(req, res) {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao fazer logout" });
        }
        res.clearCookie('connect.sid');
        res.json({ success: true, message: "Logout realizado" });
    });
}

export function fail(req, res) {
    res.send("Failed to log in");
}