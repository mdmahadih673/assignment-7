import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const mongoUrl = process.env.BETTER_AUTH_MONGODB_URL?.trim();

if (!mongoUrl) {
throw new Error(
"BETTER_AUTH_MONGODB_URL is missing. Add the full MongoDB connection URI to your deployment environment variables."
);
}

if (!mongoUrl.startsWith("mongodb://") &&
!mongoUrl.startsWith("mongodb+srv://")) {
throw new Error(
"BETTER_AUTH_MONGODB_URL must start with mongodb:// or mongodb+srv://."
);
}

const client = new MongoClient(mongoUrl);
const db = client.db("bazar_dor");

export const auth = betterAuth({
baseURL: process.env.BETTER_AUTH_URL,
secret: process.env.BETTER_AUTH_SECRET,


emailAndPassword: {
    enabled: true,
},

account: {
    accountLinking: {
        trustedProviders: ["google", "github", "email-password"],
        requireLocalEmailVerified: false,
    },
},

socialProviders: {
    google: {
        clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID!,
        clientSecret: process.env.BETTER_AUTH_GOOGLE_CLIENT_SECRET!,
    },

    github: {
        clientId: process.env.BETTER_AUTH_GITHUB_CLIENT_ID!,
        clientSecret: process.env.BETTER_AUTH_GITHUB_CLIENT_SECRET!,
    },
},

database: mongodbAdapter(db, {
    client,
}),


});
