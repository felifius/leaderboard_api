
import appwriteClient from "../appwrite.js";
import { OAuthProvider } from "node-appwrite";

export async function loginUser(req, res) {
    const { account } = await appwriteClient("admin");

    const redirectUrl = await account.createOAuth2Token({
        provider: OAuthProvider.Google,
        success: 'http://localhost:5173/sucess',
        failure: 'http://localhost:5173/fail'
    });

    return res.redirect(redirectUrl);
}
export async function user(req, res) {
    res.send("User route");
}

export async function sucess(req, res) {
    res.send("Successfully logged in");
}

export async function fail(req, res) {
    res.send("Failed to log in");
}