import config from '../helpers/config.js';
import { MongoClient } from 'mongodb';
export default async function conn() {
    try {
        const uri = `mongodb+srv://${config.username}:${config.password}@cluster0.tnoihx3.mongodb.net/${config.database}`;
        const client = await MongoClient.connect(uri);
        return client.db();
    } catch (error) {
        return { status: 500, message: error };
    }
}