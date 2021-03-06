<script>
	import { mutate, subscribe } from 'svelte-apollo';
	import { client, user_fingerprint } from './apollo';
	import { ADD_LINK, REMOVE_LINK, LINK_SUBSCRIPTION } from './queries'
	import { makeId, resolveLink, copyLink, stringify, parse, fingerprint } from './utils'
	import InlineButton from './InlineButton'

	const form = {
		url: '',
		name: '',
	}

	// Fetch data & subscribe to updates
	const links = subscribe(client, {
		query: LINK_SUBSCRIPTION,
		variables: {
			order_by: [{ id: "desc" }],
			limit: 5,
			user_fingerprint
		}
	});

	const addLink = async () => {
		const { data } = await mutate(client, {
			mutation: ADD_LINK,
			variables: { name: form.name, full: form.url, short: makeId(6) }
		});

		// Reset
		form.url = ''
		form.name = ''
	}

	const removeLink = async ({ short }) => {
		const { data } = await mutate(client, {
			mutation: REMOVE_LINK,
			variables: { short }
		});
	}
</script>

<style>
:root {
	--neomorphic-shadow: 11px 11px 22px #3e4757,
			 -11px -11px 22px #566379;
}
.text-shadow {
	text-shadow: var(--neomorphic-shadow)
}
.box-shadow {
	box-shadow: var(--neomorphic-shadow)
}
</style>

<main>
	<div class="min-h-screen w-screen flex md:justify-center md:items-center py-16 md:py-0">
		<div class="max-w-2xl">

			<!-- Header -->
			<h1 class="text-10rem md:text-16rem font-black text-gray-700 w-full text-center text-shadow -my-24">URL</h1>

			<!-- New Submission Form -->
			<form class="flex flex-wrap md:flex-no-wrap my-16 px-8 md:px-0" on:submit|preventDefault={addLink}>
				<div class="w-full md:w-40 md:mr-8 mb-8 md:mb-0">
					<input required class="bg-gray-700 box-shadow text-gray-500 outline-none border border-transparent focus:border-gray-600 rounded px-4 py-2 w-full" type="text" placeholder="My Site" bind:value={form.name} />
				</div>
				<div class="flex w-full flex-wrap md:flex-no-wrap ">
					<input pattern="https?://(.*)" required class="mb-8 md:mb-0 bg-gray-700 box-shadow text-gray-500 outline-none border border-transparent focus:border-gray-600 rounded px-4 py-2 w-full" type="text" placeholder="example.com" bind:value={form.url} />
					<button class="w-full md:w-auto box-shadow text-gray-500 px-2 py-2 rounded md:ml-8 focus:outline-none outline-none border border-transparent focus:border-gray-600 hover:bg-gray-800 hover:bg-opacity-25">Save</button>
				</div>
			</form>

			<!-- Recents -->
			<ul class="box-shadow my-16 mx-8 md:mx-0">
			{#await $links}
				<li class="py-40 flex justify-center text-gray-500">Loading Links....</li>
			{:then response}
				{#each response.data.links as link}
					<li class="flex flex-wrap md:flex-no-wrap justify-between border-b border-gray-600 border-opacity-25 last:border-b-0">
						<a href={resolveLink(link).href} class="w-full py-2 flex flex-wrap md:flex-no-wrap transition duration-150 bg-gray-700 hover:bg-gray-800 hover:bg-opacity-25">

							<div class="w-full md:w-48 flex items-center justify-between px-4 text-gray-500">
								<div class="text-sm md:text-base w-full md:w-48 flex items-center justify-start px-4 text-gray-500 text-opacity-50 md:text-opacity-100">{link.name}</div>
							</div>

							<div class="flex flex-wrap w-full flex-1">
								<div class="w-full leading-loose pb-2">
									<span class="hidden md:inline text-gray-500 text-opacity-75 text-sm">{resolveLink(link).base}</span>
									<span class="text-gray-500 italic border-b pb-1 border-gray-600 md:px-1 mx-8 md:mx-0 text-lg md:text-base">{resolveLink(link).code}</span>
								</div>

								<div class="w-full text-gray-600 text-xs leading-none pb-2 mx-8 md:mx-0">{link.full}</div>
							</div>
						</a>

						<div class="flex justify-between w-full md:w-auto md:border-none border-t border-opacity-25 border-gray-600">
							<InlineButton color="text-red-500 border-red-500" show={link.is_owned} on:click={removeLink(link)}>
								Delete
							</InlineButton>

							<InlineButton color="text-green-600 border-green-600" on:click={copyLink(link)}>
								Copy
							</InlineButton>
						</div>
					</li>
				{/each}

			{:catch error}
				<li class="py-40 flex justify-center text-gray-500">Error loading links: {stringify(error)}</li>
			{/await}
			</ul>
		</div>
	</div>
</main>
