const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[6-9]\d{9}$/;

/**
 * @param {Record<string, unknown>} payload
 */
export function validateLoginPayload(payload) {
	const rawIdentifier = typeof payload.identifier === 'string' ? payload.identifier.trim() : '';
	const phoneNumber = rawIdentifier.replace(/\D/g, '');
	const isPhone = phoneNumber.length === 10 && phonePattern.test(phoneNumber);
	const email = rawIdentifier.toLowerCase();
	const password = typeof payload.password === 'string' ? payload.password : '';
	const rememberMe = Boolean(payload.rememberMe);
	const errors = {};

	if (!rawIdentifier) {
		errors.identifier = 'Enter your email ID or mobile number.';
	} else if (!isPhone && !emailPattern.test(email)) {
		errors.identifier = 'Enter a valid email ID or 10-digit Indian mobile number.';
	}

	if (!password) {
		errors.password = 'Enter your password.';
	} else if (password.length < 6) {
		errors.password = 'Password must be at least 6 characters.';
	}

	return {
		ok: Object.keys(errors).length === 0,
		errors,
		data: {
			identifier: isPhone ? phoneNumber : email,
			identifierType: isPhone ? 'phone' : 'email',
			password,
			rememberMe
		}
	};
}
