
import { MongoClient,Db, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

let cachedDb: Db | null = null;
let cachedClient: MongoClient | null = null;

export async function connectToDb() {

    if (cachedDb && cachedClient) {
        return { client: cachedClient, db: cachedDb };
    }


    const uri = process.env.MONGODB_URI;


    if (!uri) {
        throw new Error('MONGODB_URI is not defined in environment variables');
    }


    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
    });

    await client.connect();

    cachedClient = client;
    cachedDb = client.db('ecommerce-nextjs');

    return { client, db: client.db('ecommerce-nextjs')}
}
