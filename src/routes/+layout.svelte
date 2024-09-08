<script>
	import '../app.css';
	import { base } from '$app/paths';
	import { challengeStarted } from '../store';
</script>

<div class=" flex justify-end p-2">
	{#if $challengeStarted}
		<a href="/candidate" class="btn bg-gray-500 text-white hover:text-black"> Candidate </a>
	{/if}
</div>
<slot />
