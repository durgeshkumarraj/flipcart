<script>
	let mobileMenu = $state(false);

	const categories = [
		'For You',
		'Fashion',
		'Mobiles',
		'Electronics',
		'Beauty',
		'Home',
		'Appliances',
		'Toys, ba...',
		'Food & H...',
		'Auto Acc...',
		'Sports & ...',
		'Flights',
		'2 Wheele...'
	];
</script>

<nav class="border-b border-gray-200 bg-white text-gray-950">
	<div class="mx-auto max-w-[1800px] px-4 sm:px-6">
		<div class="flex min-h-24 flex-col gap-4 py-5 lg:flex-row lg:items-start lg:justify-between">
			<div class="flex items-center gap-5">
				<a
					href="/"
					class="flex h-16 w-48 items-center justify-center gap-3 rounded-2xl bg-yellow-300 text-xl font-extrabold italic text-blue-700 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.6)]"
				>
					<span class="text-5xl leading-none">f</span>
					<span class="text-gray-900">Flipkart</span>
				</a>

				<a
					href="/travel"
					class="hidden h-16 w-48 items-center justify-center gap-3 rounded-2xl bg-gray-100 text-xl font-bold italic text-gray-800 md:flex"
				>
					<span class="text-3xl leading-none">&#9992;</span>
					<span>Travel</span>
				</a>
			</div>

			<div class="flex items-center gap-2 text-lg font-semibold lg:pt-3">
				<span aria-hidden="true" class="text-2xl">&#9679;</span>
				<span>Location not set</span>
				<a href="/location" class="font-semibold text-blue-600 hover:text-blue-700">
					Select delivery location
				</a>
				<span class="text-2xl font-light text-blue-600">&#8250;</span>
			</div>
		</div>

		<div class="grid gap-4 border-b border-gray-200 pb-4 lg:grid-cols-[minmax(320px,1fr)_auto] lg:items-center">
			<label
				class="flex h-16 items-center gap-4 rounded-2xl border-2 border-blue-400 px-7 text-gray-600 focus-within:border-blue-600"
			>
				<span class="text-4xl font-light leading-none">&#8981;</span>
				<input
					class="w-full bg-transparent text-2xl outline-none placeholder:text-gray-600"
					type="search"
					placeholder="Search for Products, Brands and More"
				/>
			</label>

			<div class="flex items-center justify-between gap-7 text-xl lg:justify-end">
				<div class="relative hidden sm:block">
					<a href="/login" class="flex items-center gap-3 hover:text-blue-600">
						<span class="grid size-8 place-items-center rounded-full border-2 border-gray-950 text-lg">&#128100;</span>
						<span>Login</span>
						<span class="text-2xl">&#8964;</span>
					</a>
					<a
						href="/login"
						class="absolute left-1/2 top-12 hidden w-56 -translate-x-1/2 bg-blue-700 px-8 py-6 text-center text-2xl font-semibold text-white shadow-lg lg:block"
					>
						<span class="absolute -top-3 left-1/2 size-6 -translate-x-1/2 rotate-45 bg-blue-700"></span>
						<span class="relative">Login</span>
					</a>
				</div>

				<a href="/more" class="hidden items-center gap-3 hover:text-blue-600 sm:flex">
					<span>More</span>
					<span class="text-2xl">&#8964;</span>
				</a>

				<a href="/cart" class="flex items-center gap-3 hover:text-blue-600">
					<span class="text-4xl leading-none">&#128722;</span>
					<span>Cart</span>
				</a>

				<button
					type="button"
					class="text-3xl lg:hidden"
					aria-label="Toggle navigation menu"
					onclick={() => (mobileMenu = !mobileMenu)}
				>
					&#9776;
				</button>
			</div>
		</div>

		<div class="hidden items-center gap-8 overflow-x-auto whitespace-nowrap text-xl lg:flex">
			{#each categories as category, index}
				<a
					href={index === 0 ? '/' : `/${category.toLowerCase().replaceAll(' ', '-')}`}
					class={[
						'relative py-3',
						index === 0 ? 'font-bold after:absolute after:inset-x-0 after:-bottom-px after:h-1 after:rounded-full after:bg-blue-600' : ''
					]}
				>
					{category}
				</a>
			{/each}
		</div>

		{#if mobileMenu}
			<div class="grid gap-4 border-t border-gray-200 py-4 text-lg lg:hidden">
				<a href="/" class="font-semibold">Home</a>
				<a href="/products">Products</a>
				<a href="/cart">Cart</a>
				<a href="/orders">Orders</a>
				<a href="/login">Login</a>
			</div>
		{/if}
	</div>
</nav>
