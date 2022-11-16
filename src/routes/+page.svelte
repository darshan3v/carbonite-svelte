<script lang="ts">
	import { isSignedIn, nearWallet, setupWallet, walletConfig } from '$src/wallet/wallet';
	import { onMount } from 'svelte';
	console.log(isSignedIn);

	onMount(async () => {
		setupWallet(walletConfig);
	})

</script>

<!-- sign in and sign out button -->
{#if !$isSignedIn}
	<button on:click={async () => nearWallet.signIn()}>Sign In</button>
{:else}
	<button on:click={async () => nearWallet.signOut()}>{nearWallet.accountId}</button>

	<button on:click={async () => nearWallet.test_contract()}>Test Contract></button>
{/if}
