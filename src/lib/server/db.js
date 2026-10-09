import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/';
const dbName = process.env.MONGODB_DB ?? 'flipcart';

/** @type {Promise<MongoClient> | undefined} */
let clientPromise;
let indexesReady = false;
let loginIndexesReady = false;

function getClient() {
	if (!clientPromise) {
		const client = new MongoClient(uri);
		clientPromise = client.connect();
	}

	return clientPromise;
}

export async function getDb() {
	const client = await getClient();
	return client.db(dbName);
}

export async function getRegisteredUsersCollection() {
	const db = await getDb();
	const collection = db.collection('registered_users');

	if (!indexesReady) {
		await Promise.all([
			collection.createIndex({ email: 1 }, { unique: true, sparse: true }),
			collection.createIndex({ phoneNumber: 1 }, { unique: true, sparse: true }),
			collection.createIndex({ createdAt: -1 })
		]);
		indexesReady = true;
	}

	return collection;
}

export async function getLoginEventsCollection() {
	const db = await getDb();
	const collection = db.collection('login_events');

	if (!loginIndexesReady) {
		await Promise.all([
			collection.createIndex({ identifier: 1 }),
			collection.createIndex({ status: 1 }),
			collection.createIndex({ createdAt: -1 })
		]);
		loginIndexesReady = true;
	}

	return collection;
}
