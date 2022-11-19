<script lang="ts">
	import { nearWallet, setupWallet, walletConfig } from '$src/wallet/wallet';
	import { onMount } from 'svelte';

	import Loader from '$src/components/Loader.svelte';

	let isSignedIn: boolean;
	let Loading = true;
	let loading_msg = 'Loading';

	onMount(async () => {
		isSignedIn = await setupWallet(walletConfig);
		Loading = false;
	});
</script>

{#if Loading}
	<Loader {loading_msg} />
{:else if !isSignedIn}
	<button on:click={async () => await nearWallet.signIn()}>Sign In</button>
{:else}
	<button on:click={async () => await nearWallet.signOut()}>{nearWallet.accountId}</button>

	<button on:click={async () => nearWallet.test_contract()}>Test Contract></button>
{/if}
