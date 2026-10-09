import { json } from '@sveltejs/kit';
import { getLoginEventsCollection, getRegisteredUsersCollection } from '#lib/server/db.js';
import { hashPassword, verifyPassword } from '#lib/server/password.js';
import { validateLoginPayload } from '#lib/server/schemas/login.js';

export async function POST({ request, getClientAddress }) {
	const payload = await request.json().catch(() => null);

	if (!payload || typeof payload !== 'object') {
		return json({ success: false, message: 'Invalid request body.' }, { status: 400 });
	}

	const result = validateLoginPayload(payload);

	if (!result.ok) {
		return json({ success: false, errors: result.errors }, { status: 400 });
	}

	const users = await getRegisteredUsersCollection();
	const loginEvents = await getLoginEventsCollection();
	const field = result.data.identifierType === 'phone' ? 'phoneNumber' : 'email';
	const user = await users.findOne({ [field]: result.data.identifier });
	const now = new Date();
	let status = 'success';
	let loginUser = user;

	if (user?.passwordHash && !verifyPassword(result.data.password, user.passwordHash)) {
		status = 'failed';
	}

	if (user && !user.passwordHash) {
		await users.updateOne(
			{ _id: user._id },
			{
				$set: {
					passwordHash: hashPassword(result.data.password),
					updatedAt: now
				}
			}
		);
		loginUser = {
			...user,
			passwordHash: undefined
		};
	}

	if (!user) {
		const insertResult = await users.insertOne({
			[field]: result.data.identifier,
			passwordHash: hashPassword(result.data.password),
			role: 'customer',
			status: 'active',
			createdFrom: 'login_form',
			createdAt: now,
			updatedAt: now
		});

		loginUser = {
			_id: insertResult.insertedId,
			[field]: result.data.identifier
		};
	}

	await loginEvents.insertOne({
		userId: loginUser?._id ?? null,
		identifier: result.data.identifier,
		identifierType: result.data.identifierType,
		rememberMe: result.data.rememberMe,
		status,
		ipAddress: getClientAddress(),
		userAgent: request.headers.get('user-agent') ?? '',
		createdAt: now
	});

	if (status === 'failed') {
		return json({ success: false, message: 'Incorrect password.' }, { status: 401 });
	}

	return json({
		success: true,
		message: user ? 'Login successful.' : 'Account created and login saved.',
		user: {
			id: loginUser?._id.toString(),
			email: loginUser?.email ?? null,
			phoneNumber: loginUser?.phoneNumber ?? null
		}
	});
}
