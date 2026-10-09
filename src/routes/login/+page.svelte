<script>
	let identifier = $state('');
	let password = $state('');
	let rememberMe = $state(true);
	let showPassword = $state(false);
	let submitting = $state(false);
	let message = $state('');
	let error = $state('');
	let forgotOpen = $state(false);

	/**
	 * @param {SubmitEvent} event
	 */
	async function login(event) {
		event.preventDefault();
		message = '';
		error = '';
		submitting = true;

		try {
			const response = await fetch('/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ identifier, password, rememberMe })
			});
			const result = await response.json();

			if (!response.ok) {
				error =
					result.message ??
					result.errors?.identifier ??
					result.errors?.password ??
					'Login failed.';
				return;
			}

			message = result.message;
			password = '';
		} catch {
			error = 'Could not connect to the login API.';
		} finally {
			submitting = false;
		}
	}

	function showForgotPassword() {
		forgotOpen = true;
		message = identifier
			? `Password reset help is ready for ${identifier}.`
			: 'Enter your email or mobile number, then use forgot password again.';
		error = '';
	}
</script>

<svelte:head>
	<title>Login | Flipkart</title>
</svelte:head>

<section class="login-screen h-screen overflow-hidden bg-white text-gray-950">
	<div class="grid h-full lg:grid-cols-[38vw_1fr]">
		<aside class="relative hidden h-full overflow-hidden bg-[#2874f0] px-12 py-10 text-white md:flex md:flex-col">
			<a href="/" class="flex items-center gap-5">
				<span class="grid size-16 place-items-center rounded-xl bg-yellow-300 text-5xl font-black italic leading-none text-[#2874f0] shadow-md xl:size-20 xl:text-6xl">
					f
				</span>
				<span class="text-4xl font-bold italic leading-none xl:text-5xl">Flipkart</span>
			</a>

			<div class="mt-16 xl:mt-24">
				<h1 class="text-6xl font-bold leading-tight xl:text-7xl">Login</h1>
				<p class="mt-8 max-w-[520px] text-4xl font-semibold leading-[1.45] text-blue-50 xl:mt-12 xl:text-5xl">
					Get access to your Orders, Wishlist and Recommendations
				</p>
			</div>

			<div class="absolute bottom-0 left-8 right-8 h-[250px] xl:h-[320px]">
				<div class="absolute bottom-0 left-[18%] h-48 w-40 rounded-t-[34px] border-[14px] border-[#3f3f46] bg-cyan-100 shadow-xl xl:h-60 xl:w-52 xl:border-[18px]">
					<div class="mx-auto mt-5 h-2 w-24 rounded-full bg-[#3f3f46]"></div>
					<div class="mx-auto mt-5 grid h-24 w-24 place-items-center rounded-xl bg-white xl:mt-7 xl:h-28 xl:w-28">
						<span class="text-5xl xl:text-6xl">%</span>
					</div>
				</div>
				<div class="absolute bottom-24 left-[13%] h-12 w-[260px] skew-x-[-26deg] bg-orange-600 shadow-xl xl:bottom-28 xl:h-16 xl:w-[330px]"></div>
				<div class="absolute bottom-24 left-[24%] h-12 w-14 skew-x-[-26deg] bg-slate-300 xl:bottom-28 xl:h-16 xl:w-16"></div>
				<div class="absolute bottom-24 left-[39%] h-12 w-14 skew-x-[-26deg] bg-slate-400 xl:bottom-28 xl:h-16 xl:w-16"></div>
				<div class="absolute bottom-4 left-0 h-20 w-20 bg-orange-600 xl:h-24 xl:w-24"></div>
				<div class="absolute bottom-0 right-0 h-28 w-40 rounded-t-[40px] bg-yellow-300 shadow-xl xl:h-36 xl:w-48 xl:rounded-t-[48px]">
					<span class="absolute bottom-3 right-7 text-7xl font-black italic leading-none text-[#2874f0] xl:bottom-4 xl:right-8 xl:text-8xl">f</span>
				</div>
			</div>
		</aside>

		<div class="login-pattern flex h-full items-center justify-center overflow-hidden px-5 py-6 md:px-10">
			<div class="w-full max-w-[820px]">
				<form
					class="bg-gray-200/90 px-8 py-8 shadow-[0_10px_30px_rgba(15,23,42,0.22)] md:px-16 md:py-10 xl:px-20 xl:py-12"
					onsubmit={login}
				>
					<div class="overflow-hidden rounded-xl bg-white shadow-[0_0_10px_rgba(40,116,240,0.45)]">
						<label class="block border-b-2 border-[#2874f0] px-7 py-5 xl:px-8 xl:py-6">
							<span class="sr-only">Email or mobile number</span>
							<input
								bind:value={identifier}
								type="text"
								autocomplete="username"
								placeholder="Enter Email/Mobile number"
								required
								class="w-full bg-transparent text-2xl text-gray-900 outline-none placeholder:text-gray-400 xl:text-3xl"
							/>
						</label>

						<label class="flex items-center gap-4 px-7 py-5 xl:px-8 xl:py-6">
							<span class="sr-only">Password</span>
							<input
								bind:value={password}
								type={showPassword ? 'text' : 'password'}
								autocomplete="current-password"
								placeholder="Enter Password"
								required
								minlength="6"
								class="w-full bg-transparent text-2xl text-gray-900 outline-none placeholder:text-gray-400 xl:text-3xl"
							/>
							<button
								type="button"
								class="grid size-10 shrink-0 place-items-center text-3xl text-orange-600 xl:size-12 xl:text-4xl"
								aria-label={showPassword ? 'Hide password' : 'Show password'}
								title={showPassword ? 'Hide password' : 'Show password'}
								onclick={() => (showPassword = !showPassword)}
							>
								{@html showPassword ? '&#9673;' : '&#128274;'}
							</button>
						</label>
					</div>

					<div class="mt-8 flex flex-col gap-4 text-xl font-semibold text-gray-600 sm:flex-row sm:items-center sm:justify-between xl:mt-10 xl:text-2xl">
						<label class="flex items-center gap-4">
							<input bind:checked={rememberMe} type="checkbox" class="size-6 accent-orange-600" />
							<span>Remember me</span>
						</label>
						<button
							type="button"
							class="text-left font-semibold text-[#2874f0] hover:text-blue-700"
							onclick={showForgotPassword}
						>
							Forgot Password?
						</button>
					</div>

					{#if error}
						<p class="mt-4 text-lg font-semibold text-red-600 xl:text-xl">{error}</p>
					{/if}

					{#if message}
						<p class="mt-4 text-lg font-semibold text-green-700 xl:text-xl">{message}</p>
					{/if}

					{#if forgotOpen}
						<p class="mt-4 text-lg font-medium text-gray-600">
							Reset support uses the same email or mobile number entered above.
						</p>
					{/if}

					<button
						type="submit"
						class="mt-8 h-[72px] w-full rounded-md bg-[#2874f0] text-3xl font-semibold text-white shadow-md transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300 xl:mt-12 xl:h-20 xl:text-4xl"
						disabled={!identifier || !password || submitting}
					>
						{submitting ? 'Saving...' : 'Login'}
					</button>
				</form>

				<a
					href="/signup"
					class="mt-8 block bg-white px-6 py-7 text-center text-3xl font-semibold text-[#2874f0] shadow-[0_8px_24px_rgba(15,23,42,0.18)] hover:text-blue-700 xl:mt-10 xl:py-8 xl:text-4xl"
				>
					New to Flipkart? Sign up
				</a>
			</div>
		</div>
	</div>
</section>
