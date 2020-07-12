<script>
	import { createEventDispatcher } from 'svelte';
    export let color = '';
    export let show = true;

	const dispatch = createEventDispatcher();
    const click = () => dispatch('click')
</script>

{#if show}
<button class="p-4 transition duration-150 bg-gray-700 hover:bg-gray-800 hover:bg-opacity-25" on:click={click}>
    <span class={`py-2 px-4 md:border-l my-2 border-opacity-50 ${color}`}><slot /></span>
</button>
{:else }
<div></div>
{/if}
