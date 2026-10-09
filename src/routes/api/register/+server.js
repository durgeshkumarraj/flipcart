import { json } from '@sveltejs/kit';
import { getRegisteredUsersCollection } from '#lib/server/db.js';
import { validateRegisterPayload } from '#lib/server/schemas/register.js';

export async function POST({ request }) {
	const payload = await request.json().catch(() => null);

	if (!payload || typeof payload !== 'object') {
		return json({ success: false, message: 'Invalid request body.' }, { status: 400 });
	}

	const result = validateRegisterPayload(payload);

	if (!result.ok) {
		return json({ success: false, errors: result.errors }, { status: 400 });
	}

	const collection = await getRegisteredUsersCollection();
	const existingUser = await collection.findOne({
		$or: [
			...(result.data.email ? [{ email: result.data.email }] : []),
			...(result.data.phoneNumber ? [{ phoneNumber: result.data.phoneNumber }] : [])
		]
	});

	if (existingUser) {
		return json(
			{ success: false, message: 'This account is already registered.' },
			{ status: 409 }
		);
	}

	const now = new Date();
	const user = {
		...result.data,
		role: 'customer',
		status: 'active',
		createdAt: now,
		updatedAt: now
	};

	const insertResult = await collection.insertOne(user);

	return json(
		{
			success: true,
			message: 'Registration successful.',
			user: {
				id: insertResult.insertedId.toString(),
				email: user.email ?? null,
				phoneNumber: user.phoneNumber ?? null
			}
		},
		{ status: 201 }
	);
}
