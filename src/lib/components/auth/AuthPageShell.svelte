<script>
	/** @type {{ title: string, description: string, children: import('svelte').Snippet }} */
	let { title, description, children } = $props();
</script>

<section class="min-h-screen bg-gray-100 px-4 py-6">
	<div class="mx-auto grid min-h-[792px] max-w-[1125px] overflow-hidden rounded-sm bg-white shadow-sm md:grid-cols-[450px_1fr]">
		<aside class="relative flex flex-col bg-blue-600 px-12 py-16 text-white">
			<div>
				<h1 class="text-5xl font-semibold tracking-tight">{title}</h1>
				<p class="mt-8 max-w-[285px] text-3xl leading-snug text-blue-50">
					{description}
				</p>
			</div>

			<div class="absolute bottom-20 left-16 right-16 h-48">
				<div class="absolute bottom-0 left-0 right-0 h-3 rounded-full bg-blue-800"></div>
				<div class="absolute bottom-3 left-16 h-16 w-16 bg-red-500 shadow-sm">
					<div class="absolute left-4 top-10 text-2xl text-white">&#9829;</div>
				</div>
				<div class="absolute bottom-3 left-32 h-24 w-44 rounded-t-lg bg-gray-800 p-2">
					<div class="h-full rounded-sm border-4 border-gray-400 bg-gray-100">
						<div class="mx-auto mt-7 size-6 rounded-full bg-gray-300"></div>
						<div class="mx-auto mt-2 h-5 w-14 rounded-t-full bg-gray-300"></div>
					</div>
					<div class="absolute -bottom-2 left-[-22px] h-3 w-56 rounded-b-full bg-white"></div>
				</div>
				<div class="absolute bottom-3 right-0 h-16 w-18 bg-yellow-300">
					<div class="absolute bottom-2 right-2 text-5xl font-extrabold italic text-blue-700">f</div>
				</div>
				<div class="absolute bottom-16 left-9 h-8 w-8 bg-gray-900">
					<div class="absolute left-2 top-3 text-lg text-white">&#8593;</div>
				</div>
				<div class="absolute right-16 top-0 size-9 rounded-full bg-yellow-300"></div>
				<div class="absolute right-9 top-3 h-8 w-14 rounded-full bg-blue-800"></div>
				<div class="absolute right-24 top-9 h-5 w-10 rounded-full bg-blue-900"></div>
			</div>
		</aside>

		<div class="px-16 py-24">
			{@render children()}
		</div>
	</div>
</section>
