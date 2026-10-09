const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[6-9]\d{9}$/;

/**
 * @param {Record<string, unknown>} payload
 */
export function validateRegisterPayload(payload) {
	const email = typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : '';
	const phoneNumber =
		typeof payload.phoneNumber === 'string' ? payload.phoneNumber.replace(/\D/g, '') : '';
	const fullName = typeof payload.fullName === 'string' ? payload.fullName.trim() : '';
	const errors = {};

	if (!email && !phoneNumber) {
		errors.identifier = 'Enter an email ID or phone number.';
	}

	if (email && !emailPattern.test(email)) {
		errors.email = 'Enter a valid email ID.';
	}

	if (phoneNumber && !phonePattern.test(phoneNumber)) {
		errors.phoneNumber = 'Enter a valid 10-digit Indian phone number.';
	}

	if (fullName && fullName.length < 2) {
		errors.fullName = 'Name must be at least 2 characters.';
	}

	return {
		ok: Object.keys(errors).length === 0,
		errors,
		data: {
			...(email ? { email } : {}),
			...(phoneNumber ? { phoneNumber } : {}),
			...(fullName ? { fullName } : {})
		}
	};
}
