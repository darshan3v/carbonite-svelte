<script lang="ts">
	import { goto } from '$app/navigation';
	import Loader from '$src/components/Loader.svelte';
	import { getWalletSelector } from '$src/wallet/wallet';
	import { onMount } from 'svelte';

	let Loading: boolean = true;

	onMount(async () => {
		const isSignedIn = (await getWalletSelector()).isSignedIn();
		if (!isSignedIn) {
			goto('/');
		} else {
			console.log('Check if user type account , else redirect according to account type');
		}
		Loading = false;
	});
</script>

{#if Loading}
	<Loader />
{:else}
	<slot />
{/if}
