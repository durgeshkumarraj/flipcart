<script>
	import AuthPageShell from '#lib/components/auth/AuthPageShell.svelte';

	let email = $state('');
	let message = $state('');
	let error = $state('');
	let submitting = $state(false);

	/**
	 * @param {SubmitEvent} event
	 */
	async function register(event) {
		event.preventDefault();
		message = '';
		error = '';
		submitting = true;

		try {
			const response = await fetch('/api/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email })
			});
			const result = await response.json();

			if (!response.ok) {
				error = result.message ?? result.errors?.email ?? result.errors?.identifier ?? 'Registration failed.';
				return;
			}

			message = result.message;
			email = '';
		} catch {
			error = 'Could not connect to the registration API.';
		} finally {
			submitting = false;
		}
	}
</script>

<svelte:head>
	<title>Sign Up | Flipkart</title>
</svelte:head>

<AuthPageShell
	title="Sign Up"
	description="Create an account to access orders, exclusive offers, rewards and recommendations"
>
	<form class="mx-auto max-w-[510px]" onsubmit={register}>
		<h2 class="text-2xl font-bold text-gray-950">Sign up for the best experience</h2>
		<p class="mt-3 text-2xl text-gray-600">Enter your email ID to continue</p>

		<label class="mt-10 flex h-[85px] items-center rounded border border-gray-300 px-5 focus-within:border-blue-600">
			<input
				bind:value={email}
				type="email"
				placeholder="Email ID"
				required
				class="w-full text-2xl text-gray-900 outline-none placeholder:text-gray-500"
			/>
		</label>

		{#if error}
			<p class="mt-4 text-base font-medium text-red-600">{error}</p>
		{/if}

		{#if message}
			<p class="mt-4 text-base font-medium text-green-600">{message}</p>
		{/if}

		<div class="mt-8 text-right">
			<a href="/login" class="text-xl font-medium text-blue-600 hover:text-blue-700">Use Phone Number</a>
		</div>

		<p class="mt-10 text-lg leading-snug text-gray-600">
			By continuing, you confirm that you are above 18 years of age, and you agree to the Flipkart's
			<a href="/terms" class="text-blue-600">Terms of Use</a>
			and
			<a href="/privacy" class="text-blue-600">Privacy Policy</a>
		</p>

		<button
			type="submit"
			class="mt-32 h-[60px] w-full rounded-sm bg-gray-300 text-xl font-semibold text-white enabled:bg-blue-600"
			disabled={!email || submitting}
		>
			{submitting ? 'Please wait...' : 'Continue'}
		</button>
	</form>
</AuthPageShell>
