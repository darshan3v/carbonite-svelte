<script lang="ts">
	import { nearWallet, setup, setupWallet, walletConfig } from '$src/wallet/wallet';
	import { onMount } from 'svelte';

	import Loader from '$src/components/Loader.svelte';

	let isSignedIn: boolean;
	let Loading = true;

	onMount(async () => {
		setup();
		isSignedIn = await setupWallet(walletConfig);
		Loading = false;
	});
</script>

{#if Loading}
	<Loader />
{:else if !isSignedIn}
	<button on:click={async () => await nearWallet.signIn()}>Sign In</button>
{:else}
	<button on:click={async () => await nearWallet.signOut()}>{nearWallet.accountId}</button>

	<button on:click={async () => nearWallet.test_contract()}>Test Contract></button>
{/if}
