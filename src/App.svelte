<script>
	import gql from 'graphql-tag';
	import ApolloClient from 'apollo-client';
	import { client } from './apollo';
	import { setClient, getClient, query, mutate, subscribe } from 'svelte-apollo';

	setClient(client);

	const LINK_LIST = gql`
    query {
      links(order_by: [{name: asc}]) {
		name,
		full,
		short
      }
    }
  `;
    const ADD_LINK = gql`
    mutation($name: String!, $full: String!, $short: String!) {
      insert_links(objects: [{name: $name, full: $full, short: $short}]) {
        affected_rows
      }
    }
  `;
  const REMOVE_LINK = gql`
    mutation($short: String!) {
      delete_links(where: { short: { _eq: $short } }) {
        affected_rows
      }
    }
  `;

  const LINK_SUBSCRIPTION = gql`
    subscription {
      links(order_by: [{name: asc}]) {
		name,
		full,
		short
      }
    }
  `;

//   async function preload() {
//     return {
//       linkCache: await client.query({ query: LINK_LIST })
//     };
//   }

	// let links = query(getClient(), { query: LINK_LIST })
	const links = subscribe(client, { query: LINK_SUBSCRIPTION });

	let url = '';
	let name = ''

	function makeId(length) {
		let result = '';
		let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		let charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}

	const submitForm = async () => {
		await mutate(client, {
			mutation: ADD_LINK,
			variables: { name, full: url, short: makeId(6) }
		});

		// links.refetch()

		url = ''
		name = ''
	}

	const removeLink = async ({ short }) => {
		await mutate(client, {
			mutation: REMOVE_LINK,
			variables: { short }
		});

		// links.refetch();
	}

	// const linkPreloading = preload();
	// const resolveLink = ({ short }) => `https://a.j0.nz/${short}`
	const resolveLink = ({ short }) => `${window.origin}/go/${short}`

</script>

<main>
	<div class="h-screen w-screen flex justify-center items-center">
		<div class="w-full max-w-lg">
			<h1 class="text-3xl text-gray-400 w-full text-center mb-2">Neato URL Shortener Thingy</h1>

			<form class="flex" on:submit|preventDefault={submitForm}>
				<div class="w-32 mr-4">
					<input required class="border border-gray-200 shadow rounded px-4 py-2 w-full" type="text" placeholder="My Site" bind:value={name} />
				</div>
				<div class="flex w-full">
					<input required class="border border-gray-200 shadow rounded px-4 py-2 w-full" type="text" placeholder="example.com" bind:value={url} />
					<button class="px-2 text-gray-600 bg-gray-100 hover:bg-gray-200 shadow rounded ml-4">Save</button>
				</div>
			</form>

			<ul class="shadow my-4">
			{#await $links}
				<li>Preloading articles....</li>
			{:then response}
				{#each response.data.links as link}
					<li class="flex justify-between">
						<a href={resolveLink(link)} class="flex py-2">
							<div class="w-32 flex items-center justify-start px-4 text-gray-500">{link.name}</div>
							<div class="flex flex-wrap w-full flex-1">
								<div class="w-full leading-loose">{resolveLink(link)}</div>
								<div class="w-full text-gray-500 text-xs leading-none">{link.full}</div>
							</div>
						</a>
						<button class="p-4 text-red-400" on:click={removeLink(link)}>Delete</button>
					</li>
				{/each}
			{:catch error}
				<li>Error preloading articles: {error}</li>
			{/await}
			</ul>
		</div>
	</div>
</main>
