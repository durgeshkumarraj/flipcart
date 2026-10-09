import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';

const keyLength = 64;

/**
 * @param {string} password
 */
export function hashPassword(password) {
	const salt = randomBytes(16).toString('hex');
	const hash = scryptSync(password, salt, keyLength).toString('hex');

	return `${salt}:${hash}`;
}

/**
 * @param {string} password
 * @param {unknown} passwordHash
 */
export function verifyPassword(password, passwordHash) {
	const [salt, savedHash] = typeof passwordHash === 'string' ? passwordHash.split(':') : [];

	if (!salt || !savedHash) {
		return false;
	}

	const hash = scryptSync(password, salt, keyLength);
	const saved = Buffer.from(savedHash, 'hex');

	return saved.length === hash.length && timingSafeEqual(saved, hash);
}
