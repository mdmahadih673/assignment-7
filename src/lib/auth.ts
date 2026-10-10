import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

// Read and validate the deployment setting before passing it to MongoDB.
const mongoUrl = process.env.BETTER_AUTH_MONGODB_URL?.trim();

if (!mongoUrl) {
    throw new Error(
        "BETTER_AUTH_MONGODB_URL is missing. Add the full MongoDB connection URI to your deployment environment variables."
    );
}

if (!/^mongodb(?:\+srv)?:\/\//.test(mongoUrl)) {
    throw new Error(
        "BETTER_AUTH_MONGODB_URL must start with mongodb:// or mongodb+srv://."
    );
}

const client = new MongoClient(mongoUrl);
const db = client.db('bazar_dor');

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.BETTER_AUTH_GOOGLE_CLIENT_SECRET as string,
        },
        github: {
            clientId: process.env.BETTER_AUTH_GITHUB_CLIENT_ID as string,
            clientSecret: process.env.BETTER_AUTH_GITHUB_CLIENT_SECRET as string,
        },
    },
    database: mongodbAdapter(db, {
        client,
    }),
});