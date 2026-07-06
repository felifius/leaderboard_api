import { Client, Databases, Account } from "node-appwrite";
import dotenv from "dotenv";

dotenv.config({ path: "./config/.env" });

const appwriteClient = async (type, session) => {
    const { ENDPOINT, PROJECT_ID, API_KEY } = process.env;
    const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID);

    if (type === "admin") {
        client.setKey(API_KEY);
    }

    if (type === "session" && session) {
        client.setSession(session);
    }

    return {
        account: new Account(client),
        databases: new Databases(client),
    };
};

export default appwriteClient;